import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es', 'zh', 'ar', 'hi', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];

/** Map app locale to OpenGraph locale string. */
const OG_LOCALE_MAP: Record<string, string> = {
  en: "en_US",
  es: "es_ES",
  zh: "zh_CN",
  ar: "ar_SA",
  hi: "hi_IN",
  tr: "tr_TR",
};

export function ogLocale(locale: string): string {
  return OG_LOCALE_MAP[locale] ?? "en_US";
}

/** BCP-47 language tag (hyphenated) for JSON-LD `inLanguage`. */
export function bcp47Locale(locale: string): string {
  return (OG_LOCALE_MAP[locale] ?? "en_US").replace("_", "-");
}
