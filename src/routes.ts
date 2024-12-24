/**
 * Routes that don't require authentication
 */
// export const publicRoutes = ['/', '/login', '/register', '/about', '/contact'];

/**
 * Routes that require authentication
 */
export const privateRoutes = [
  '/profile',
  '/settings',
  '/users/:id',
  '/wishlists/:id',
  '/users/:id/wishlists',
];

/**
 * Routes that are only accessible to non-authenticated users
 * (like login/register - we don't want logged in users to see these)
 */
export const authRoutes = ['/login', '/register'];

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = '/';

type RouteConfig = {
  path: string;
  dynamic?: boolean;
  pattern?: RegExp;
};

export const publicRoutes: RouteConfig[] = [
  { path: '/home' },
  { path: '/login' },
  { path: '/register' },
  { path: '/about' },
  {
    path: '/wishlists',
    dynamic: true,
    pattern: /^\/wishlists\/\d+$/,
  },
];

export function isPublicRoute(path: string): boolean {
  console.log('path', path);
  return publicRoutes.some((route) => {
    if (!route.dynamic && route.path === path) {
      console.log('route.path', route.path);
      return true;
    }

    if (route.dynamic && route.pattern) {
      console.log('route.pattern', route.pattern);
      return route.pattern.test(path);
    }

    return path.startsWith(route.path);
  });
}
