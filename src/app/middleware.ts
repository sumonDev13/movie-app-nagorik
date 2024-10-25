import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('auth_token');

  if (request.nextUrl.pathname.startsWith('/watchlist') && !isAuthenticated) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set({
      name: 'redirect_url',
      value: request.nextUrl.pathname,
      path: '/',
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/watchlist/:path*',
};