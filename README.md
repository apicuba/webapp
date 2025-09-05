# Plataforma de Estudio - Ley de Tránsito 109 de Cuba

Una aplicación web moderna y completa para estudiar y practicar la Ley de Tránsito 109 de Cuba. Diseñada como una plataforma escalable con capacidades white-label para personalización institucional.

## 🚀 Características Principales

### 📚 Sistema de Estudio
- **Contenido Estructurado**: Ley organizada por secciones, capítulos y artículos
- **Progreso de Estudio**: Seguimiento detallado del progreso de cada usuario
- **Interfaz Responsive**: Optimizada para dispositivos móviles y desktop

### 📝 Sistema de Exámenes
- **Banco de Preguntas**: Base de datos con preguntas categorizadas por dificultad
- **Exámenes Adaptativos**: Generación dinámica de exámenes personalizados
- **Calificación Automática**: Sistema de puntuación con feedback inmediato
- **Explicaciones Detalladas**: Respuestas explicadas con referencias a la ley

### 📊 Dashboard y Estadísticas
- **Gráficos Interactivos**: Visualización del progreso y rendimiento
- **Análisis de Rendimiento**: Identificación de áreas de mejora
- **Historial de Exámenes**: Registro completo de intentos y calificaciones

### 🔐 Sistema de Licencias
- **Activación por Código**: Sistema seguro de activación de cuentas
- **Gestión de Usuarios**: Panel administrativo completo
- **Roles y Permisos**: Sistema de roles (Admin/Usuario)

### 🎨 White-Label Ready
- **Personalización Visual**: Colores, logos y favicon personalizables
- **Contenido Editable**: Textos legales y copy editables desde el admin
- **Marca Configurable**: Adaptable para cualquier institución

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Prisma ORM
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT con tokens de acceso y refresco
- **UI Components**: Radix UI + shadcn/ui
- **Gráficos**: Recharts
- **Iconos**: Lucide React

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- PostgreSQL 12+
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd cuban-traffic-law-platform
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/cuban_traffic_law"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Configurar la base de datos
```bash
# Ejecutar migraciones
npm run db:migrate

# Generar el cliente Prisma
npm run db:generate

# Poblar la base de datos con datos iniciales
npm run db:seed
```

### 5. Ejecutar en desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📋 Datos de Prueba

Después de ejecutar el seed, tendrás disponible:

**Usuario Administrador:**
- Email: `admin@traffic-law.com`
- Contraseña: `admin123`

**Códigos de Licencia de Prueba:**
El seed genera 5 códigos de licencia que se muestran en la consola al ejecutar `npm run db:seed`

## 🏗️ Estructura del Proyecto

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── admin/             # Panel administrativo
│   ├── dashboard/         # Dashboard de usuario
│   ├── study/             # Módulo de estudio
│   └── exam/              # Módulo de exámenes
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base de UI
│   └── layout/           # Componentes de layout
├── lib/                   # Utilidades y configuraciones
├── prisma/               # Schema y migraciones
└── public/               # Archivos estáticos
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Ejecutar en desarrollo
npm run build        # Construir para producción
npm run start        # Ejecutar en producción
npm run db:push      # Sincronizar schema con DB
npm run db:migrate   # Ejecutar migraciones
npm run db:seed      # Poblar base de datos
npm run lint         # Ejecutar linter
```

## 🚀 Despliegue

### Vercel (Recomendado para Frontend)
1. Conectar repository en Vercel
2. Configurar variables de entorno
3. Deploy automático

### Railway/Render (Para Base de Datos)
1. Crear instancia PostgreSQL
2. Configurar DATABASE_URL
3. Ejecutar migraciones

## 📖 Uso de la Plataforma

### Para Estudiantes
1. **Registro**: Usar código de licencia proporcionado por el admin
2. **Estudio**: Navegar por las secciones de la ley
3. **Práctica**: Tomar exámenes adaptativos
4. **Progreso**: Revisar estadísticas en el dashboard

### Para Administradores
1. **Gestión de Usuarios**: Crear, editar y gestionar usuarios
2. **Licencias**: Generar códigos de activación
3. **Contenido**: Gestionar artículos y preguntas
4. **Personalización**: Configurar branding y textos
5. **Estadísticas**: Monitorear uso de la plataforma

## 🎨 Personalización White-Label

El sistema permite personalización completa:

- **Colores**: Paleta de colores configurable
- **Logos**: Logo y favicon personalizables
- **Textos**: Copy y textos legales editables
- **Marca**: Adaptable para cualquier institución

## 🤝 Contribución

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Para soporte y consultas:
- Email: support@traffic-law-platform.com
- Issues: GitHub Issues

---

**Desarrollado con ❤️ para la educación en seguridad vial cubana**