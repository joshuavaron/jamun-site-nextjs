import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except:
    // - /api, /_next, /_vercel
    // - Files with extensions (e.g., .jpg, .css, .js)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
