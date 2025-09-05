import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { 
  BookOpen, 
  FileText, 
  BarChart3, 
  Users, 
  Award, 
  CheckCircle2,
  Star,
  TrendingUp
} from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <BookOpen className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight fade-in-up">
              Domina la{' '}
              <span className="text-yellow-400">Ley de Tránsito 109</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto fade-in-up">
              Estudia, practica y aprueba con nuestra plataforma interactiva diseñada 
              especialmente para la legislación cubana de tránsito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 fade-in-up">
              <Link href="/register">
                <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 px-8 py-4 text-lg">
                  Comenzar Ahora
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 text-lg">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas para estudiar
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Una plataforma completa con herramientas modernas para dominar la Ley de Tránsito
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Contenido Estructurado</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  La Ley 109 organizada por secciones, capítulos y artículos 
                  para un estudio progresivo y sistemático.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Exámenes Adaptativos</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Genera exámenes personalizados con preguntas de diferentes 
                  niveles de dificultad y feedback inmediato.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Seguimiento del Progreso</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Visualiza tu progreso con gráficos detallados, estadísticas 
                  de rendimiento y áreas de mejora.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                  <CardTitle>Sistema de Calificaciones</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Calificación automática con explicaciones detalladas 
                  para cada respuesta incorrecta.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                    <Users className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle>Panel Administrativo</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Gestión completa de usuarios, contenido, preguntas 
                  y personalización de la plataforma.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                    <CheckCircle2 className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle>White-Label Ready</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Personalización completa de colores, logos y textos 
                  para adaptarse a cualquier marca o institución.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">98%</div>
              <div className="text-gray-600">Tasa de Aprobación</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">5,000+</div>
              <div className="text-gray-600">Usuarios Activos</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-gray-600">Preguntas de Práctica</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">4.9/5</div>
              <div className="text-gray-600">Calificación</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para comenzar tu preparación?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de estudiantes que ya dominan la Ley de Tránsito 109 
            con nuestra plataforma especializada.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 px-8 py-4 text-lg">
              Comenzar Gratis
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}