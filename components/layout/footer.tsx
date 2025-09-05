import Link from 'next/link';
import { BookOpen } from 'lucide-react';

interface FooterProps {
  branding?: {
    logoUrl?: string;
    primaryColor: string;
    homePageTitle: string;
  };
}

export function Footer({ branding }: FooterProps) {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {branding?.logoUrl ? (
                <img src={branding.logoUrl} alt="Logo" className="h-8 w-8" />
              ) : (
                <BookOpen className="h-8 w-8" style={{ color: branding?.primaryColor }} />
              )}
              <span className="font-bold text-lg">
                {branding?.homePageTitle || 'Ley de Tránsito 109'}
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Plataforma de estudio para la Ley de Tránsito 109 de Cuba.
              Aprende, practica y domina las normas de tránsito.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/study" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Estudiar
                </Link>
              </li>
              <li>
                <Link href="/exam" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Examen
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Plataforma de Estudio Ley de Tránsito 109. 
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}