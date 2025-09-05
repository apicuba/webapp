import { PrismaClient, QuestionDifficulty } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create branding settings
  await prisma.brandingSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      primaryColor: '#2563eb',
      secondaryColor: '#64748b',
      homePageTitle: 'Plataforma de Estudio - Ley de Tránsito 109',
      homePageSubtitle: 'Estudia y practica la Ley de Tránsito de Cuba',
      welcomeMessage: '¡Bienvenido a tu plataforma de estudio!',
      termsOfService: 'Términos y condiciones de uso de la plataforma...',
      privacyPolicy: 'Política de privacidad y protección de datos...',
    },
  });

  // Create admin license
  const adminLicense = await prisma.license.create({
    data: {
      code: uuidv4(),
      status: 'ACTIVE',
    },
  });

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@traffic-law.com',
      password: hashedPassword,
      firstName: 'Administrador',
      lastName: 'Sistema',
      role: 'ADMIN',
      isActive: true,
      licenseId: adminLicense.id,
    },
  });

  // Update license to USED
  await prisma.license.update({
    where: { id: adminLicense.id },
    data: { status: 'USED' },
  });

  // Create sample user licenses
  const sampleLicenses = [];
  for (let i = 0; i < 5; i++) {
    const license = await prisma.license.create({
      data: {
        code: uuidv4(),
        status: 'ACTIVE',
      },
    });
    sampleLicenses.push(license);
  }

  // Create law structure
  const section1 = await prisma.lawSection.create({
    data: {
      title: 'Disposiciones Generales',
      description: 'Principios fundamentales y definiciones de la Ley de Tránsito',
      orderIndex: 1,
    },
  });

  const chapter1 = await prisma.chapter.create({
    data: {
      title: 'Objeto y Ámbito de Aplicación',
      description: 'Definición del objeto y campo de aplicación de la ley',
      orderIndex: 1,
      sectionId: section1.id,
    },
  });

  const article1 = await prisma.article.create({
    data: {
      title: 'Artículo 1 - Objeto de la Ley',
      content: `La presente Ley tiene por objeto establecer los principios y normas que rigen el tránsito 
      en el territorio nacional, con el fin de garantizar la circulación ordenada y segura de personas 
      y vehículos, proteger la vida, la integridad física de las personas y los bienes.
      
      Esta ley se aplica a todas las vías públicas del territorio nacional y regula la circulación de 
      peatones, ciclistas, conductores de vehículos de tracción animal y mecánica, así como las 
      actividades relacionadas con el tránsito.`,
      orderIndex: 1,
      chapterId: chapter1.id,
    },
  });

  const article2 = await prisma.article.create({
    data: {
      title: 'Artículo 2 - Definiciones',
      content: `Para los efectos de esta Ley se entiende por:

      a) Conductor: Persona habilitada para conducir un vehículo en las vías públicas.
      b) Vía pública: Espacio destinado al tránsito de vehículos y peatones.
      c) Vehículo: Todo medio de transporte terrestre que circula por las vías públicas.
      d) Peatón: Persona que transita a pie por las vías públicas.
      e) Accidente de tránsito: Suceso eventual o acción involuntaria que cause daños a personas o bienes.`,
      orderIndex: 2,
      chapterId: chapter1.id,
    },
  });

  // Create sample questions
  const questions = [
    {
      questionText: '¿Cuál es el objeto principal de la Ley de Tránsito 109?',
      explanation: 'El artículo 1 establece claramente que el objeto es garantizar la circulación ordenada y segura.',
      difficulty: QuestionDifficulty.EASY,
      articleId: article1.id,
      options: [
        { text: 'Regular solo el tránsito de vehículos', isCorrect: false, orderIndex: 1 },
        { text: 'Garantizar la circulación ordenada y segura de personas y vehículos', isCorrect: true, orderIndex: 2 },
        { text: 'Controlar únicamente a los peatones', isCorrect: false, orderIndex: 3 },
        { text: 'Establecer impuestos de tránsito', isCorrect: false, orderIndex: 4 },
      ],
    },
    {
      questionText: 'Según la Ley 109, ¿qué se entiende por conductor?',
      explanation: 'El artículo 2 define conductor como la persona habilitada para conducir un vehículo en las vías públicas.',
      difficulty: QuestionDifficulty.MEDIUM,
      articleId: article2.id,
      options: [
        { text: 'Cualquier persona que maneje un vehículo', isCorrect: false, orderIndex: 1 },
        { text: 'Persona habilitada para conducir un vehículo en las vías públicas', isCorrect: true, orderIndex: 2 },
        { text: 'Solo los choferes profesionales', isCorrect: false, orderIndex: 3 },
        { text: 'Personas mayores de 21 años', isCorrect: false, orderIndex: 4 },
      ],
    },
    {
      questionText: '¿A qué tipo de vías se aplica la Ley de Tránsito 109?',
      explanation: 'La ley se aplica específicamente a todas las vías públicas del territorio nacional.',
      difficulty: QuestionDifficulty.EASY,
      articleId: article1.id,
      options: [
        { text: 'Solo a las autopistas', isCorrect: false, orderIndex: 1 },
        { text: 'Únicamente a vías urbanas', isCorrect: false, orderIndex: 2 },
        { text: 'A todas las vías públicas del territorio nacional', isCorrect: true, orderIndex: 3 },
        { text: 'Solo a vías rurales', isCorrect: false, orderIndex: 4 },
      ],
    },
    {
      questionText: 'Según las definiciones de la ley, ¿qué es un accidente de tránsito?',
      explanation: 'El artículo 2 define accidente de tránsito como suceso eventual o acción involuntaria que cause daños.',
      difficulty: QuestionDifficulty.HARD,
      articleId: article2.id,
      options: [
        { text: 'Solo colisiones entre vehículos', isCorrect: false, orderIndex: 1 },
        { text: 'Suceso eventual o acción involuntaria que cause daños a personas o bienes', isCorrect: true, orderIndex: 2 },
        { text: 'Únicamente accidentes con heridos', isCorrect: false, orderIndex: 3 },
        { text: 'Solo accidentes en intersecciones', isCorrect: false, orderIndex: 4 },
      ],
    },
  ];

  for (const questionData of questions) {
    const { options, ...questionInfo } = questionData;
    
    const question = await prisma.question.create({
      data: questionInfo,
    });

    for (const optionData of options) {
      await prisma.questionOption.create({
        data: {
          ...optionData,
          questionId: question.id,
        },
      });
    }
  }

  console.log('✅ Seed completed successfully!');
  console.log('\n📋 Summary:');
  console.log(`👤 Admin user created: admin@traffic-law.com (password: admin123)`);
  console.log(`🎟️  Admin license code: ${adminLicense.code}`);
  console.log(`🎫 Sample licenses created: ${sampleLicenses.length}`);
  console.log(`📖 Law sections created: 1`);
  console.log(`📚 Chapters created: 1`);
  console.log(`📄 Articles created: 2`);
  console.log(`❓ Questions created: ${questions.length}`);
  
  console.log('\n🎫 Available license codes for testing:');
  sampleLicenses.forEach((license, index) => {
    console.log(`${index + 1}. ${license.code}`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });