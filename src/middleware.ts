import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

const intlMiddleware = createIntlMiddleware(routing);

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/:locale/online/dashboard(.*)',
  '/:locale/online/programs(.*)',
  '/:locale/online/activities(.*)',
  '/:locale/online/teams(.*)',
  '/:locale/online/settings(.*)',
  '/:locale/online/admin(.*)',
]);

// Auth routes (login/signup) - redirect away if already logged in
const isAuthRoute = createRouteMatcher([
  '/:locale/online/login(.*)',
  '/:locale/online/signup',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const pathname = req.nextUrl.pathname;

  // Extract locale from pathname (e.g., /es/online -> es, /online -> en)
  const pathSegments = pathname.split('/').filter(Boolean);
  const possibleLocale = pathSegments[0];
  const isLocalePrefix = routing.locales.includes(possibleLocale as 'en' | 'es' | 'zh');
  const locale = isLocalePrefix ? possibleLocale : routing.defaultLocale;

  // Check if route is protected and user is not authenticated
  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL(`/${locale}/online/login`, req.url);
    signInUrl.searchParams.set('redirect_url', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users away from auth pages to dashboard
  if (isAuthRoute(req) && userId) {
    return NextResponse.redirect(new URL(`/${locale}/online/dashboard`, req.url));
  }

  // Run the intl middleware for locale handling
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Match all pathnames except:
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - Files with extensions (e.g., .jpg, .css, .js)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
