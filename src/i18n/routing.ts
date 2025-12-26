import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // No prefix for English, /es for Spanish, /zh for Chinese
});

export type Locale = (typeof routing.locales)[number];
