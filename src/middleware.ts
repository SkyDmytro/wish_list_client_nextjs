import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { isPublicRoute } from './routes';
import decodeJWT from './utils/decodeJwt';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('jwt')?.value;

  if (path === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!isPublicRoute(path)) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (token && (path === '/login' || path === '/register')) {
    const decoded = decodeJWT(token || ' ');
    console.log('decoded', decoded);
    return NextResponse.redirect(new URL(`/users/${decoded._id}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
};
