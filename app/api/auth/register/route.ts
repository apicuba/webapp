import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  licenseCode: z.string().min(1, 'El código de licencia es requerido'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, licenseCode } = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Ya existe un usuario con este email' },
        { status: 400 }
      );
    }

    // Verify license code
    const license = await prisma.license.findUnique({
      where: {
        code: licenseCode,
        status: 'ACTIVE',
      },
    });

    if (!license) {
      return NextResponse.json(
        { error: 'Código de licencia inválido o ya utilizado' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user and update license
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          isActive: true,
          licenseId: license.id,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      });

      // Update license status
      await tx.license.update({
        where: { id: license.id },
        data: { status: 'USED' },
      });

      return newUser;
    });

    return NextResponse.json({
      message: 'Usuario registrado exitosamente',
      user,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}