'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';

const registerSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  licenseCode: z.string().min(1, 'El código de licencia es requerido'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(result.error || 'Error al registrar usuario');
      }
    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Registro Exitoso!</h2>
            <p className="text-gray-600 mb-4">
              Tu cuenta ha sido creada correctamente.
            </p>
            <p className="text-sm text-gray-500">
              Serás redirigido al inicio de sesión en breve...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
          <CardDescription>
            Regístrate para comenzar a estudiar la Ley de Tránsito 109
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <Input
                  {...register('firstName')}
                  placeholder="Juan"
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <Input
                  {...register('lastName')}
                  placeholder="Pérez"
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                {...register('email')}
                type="email"
                placeholder="tu@email.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="licenseCode" className="text-sm font-medium text-gray-700">
                Código de Licencia
              </label>
              <Input
                {...register('licenseCode')}
                placeholder="Código proporcionado por el administrador"
                className={errors.licenseCode ? 'border-red-500' : ''}
              />
              {errors.licenseCode && (
                <p className="text-sm text-red-600">{errors.licenseCode.message}</p>
              )}
              <p className="text-xs text-gray-500">
                Solicita tu código de licencia al administrador para activar tu cuenta
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Crear Cuenta
            </Button>

            <div className="text-center">
              <div className="text-sm text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}