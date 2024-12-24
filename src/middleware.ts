import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { isPublicRoute } from './routes';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (!isPublicRoute(path)) {
    const token = request.cookies.get('jwt')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
};
