'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, UserRole } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Menu, 
  X, 
  User as UserIcon, 
  Settings, 
  LogOut,
  BarChart3,
  FileText
} from 'lucide-react';

interface NavbarProps {
  user?: (User & { role: UserRole }) | null;
  branding?: {
    logoUrl?: string;
    primaryColor: string;
    homePageTitle: string;
  };
}

export function Navbar({ user, branding }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {branding?.logoUrl ? (
              <img src={branding.logoUrl} alt="Logo" className="h-8 w-8" />
            ) : (
              <BookOpen className="h-8 w-8" style={{ color: branding?.primaryColor }} />
            )}
            <span className="font-bold text-xl text-gray-900 hidden sm:block">
              {branding?.homePageTitle || 'Ley de Tránsito 109'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                <Link href="/study">
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Estudiar</span>
                  </Button>
                </Link>
                <Link href="/exam">
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>Examen</span>
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <BarChart3 className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Button>
                </Link>
                {isAdmin && (
                  <Link href="/admin">
                    <Button variant="ghost" className="flex items-center space-x-1">
                      <Settings className="h-4 w-4" />
                      <span>Admin</span>
                    </Button>
                  </Link>
                )}
                <div className="flex items-center space-x-2 border-l pl-4">
                  <UserIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.firstName}</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
            {!user && (
              <div className="space-x-2">
                <Link href="/login">
                  <Button variant="outline">Iniciar Sesión</Button>
                </Link>
                <Link href="/register">
                  <Button>Registrarse</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {user && (
              <div className="space-y-2">
                <Link href="/study" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Estudiar
                  </Button>
                </Link>
                <Link href="/exam" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Examen
                  </Button>
                </Link>
                <Link href="/dashboard" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                {isAdmin && (
                  <Link href="/admin" className="block">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <UserIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">{user.firstName}</span>
                  </div>
                  <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </div>
              </div>
            )}
            {!user && (
              <div className="space-y-2">
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button className="w-full">Registrarse</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}