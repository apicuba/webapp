import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, verifyRefreshToken, generateAccessToken, JWTPayload } from './lib/auth';

const publicPaths = ['/login', '/register', '/forgot-password', '/', '/terms', '/privacy'];
const adminPaths = ['/admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.some(path => pathname === path || pathname.startsWith('/api/auth'))) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  let user: JWTPayload | null = null;

  // Try to verify access token
  if (accessToken) {
    user = verifyAccessToken(accessToken);
  }

  // If access token is invalid, try refresh token
  if (!user && refreshToken) {
    const refreshPayload = verifyRefreshToken(refreshToken);
    
    if (refreshPayload) {
      // Generate new access token
      const newAccessToken = generateAccessToken(refreshPayload);
      
      const response = NextResponse.next();
      response.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60, // 15 minutes
      });

      user = refreshPayload;
      return response;
    }
  }

  // If no valid tokens, redirect to login
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check admin access
  if (adminPaths.some(path => pathname.startsWith(path)) && user.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};