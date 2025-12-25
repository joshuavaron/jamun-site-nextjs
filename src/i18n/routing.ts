import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // No prefix for English, /es for Spanish
});

export type Locale = (typeof routing.locales)[number];
