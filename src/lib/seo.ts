import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

/**
 * Canonical / hreflang helpers.
 *
 * Policy (agreed): every page self-canonicalizes to its OWN localized URL on
 * the canonical origin (https://www.jamun.org, no trailing slash), and every
 * page emits a full hreflang map plus an `x-default` pointing at the English
 * variant. localePrefix is `as-needed`, so English has no prefix and the other
 * locales are prefixed with `/<locale>`.
 *
 * Always produce ABSOLUTE URLs so the values never depend on metadataBase
 * resolution and never pick up a trailing slash.
 */

const { defaultLocale, locales } = routing;

/** Path segment for a locale under localePrefix:'as-needed' (en -> '', else '/<locale>'). */
export function localePrefix(locale: string): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/**
 * Absolute, no-trailing-slash URL for a locale + un-prefixed path.
 * `path` must start with '/' (or be '' for the home page).
 */
export function localizedUrl(locale: string, path = ""): string {
  return `${siteConfig.url}${localePrefix(locale)}${path}`;
}

type Alternates = {
  canonical: string;
  languages: Record<string, string>;
};

/**
 * Alternates for a STATIC page that exists (as translated UI) in every locale.
 * `path` is the English/un-prefixed path, e.g. "/about" or "" for the homepage.
 * Self-canonical for the current locale + hreflang for all locales + x-default.
 */
export function staticAlternates(locale: string, path = ""): Alternates {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = localizedUrl(l, path);
  }
  languages["x-default"] = localizedUrl(defaultLocale, path);
  return {
    canonical: localizedUrl(locale, path),
    languages,
  };
}

/**
 * Alternates for a CONTENT page whose translations exist only in specific
 * locales (blog, committees, program resources).
 *
 * @param locale       the locale being rendered
 * @param currentPath  un-prefixed path for the current locale (e.g. "/blog/x")
 * @param alts         every locale that has content, with its un-prefixed path
 *                     (may or may not include the current locale)
 *
 * x-default points to the English variant when one exists, otherwise to the
 * current page (so the map is always self-consistent).
 */
export function contentAlternates(
  locale: string,
  currentPath: string,
  alts: Array<{ locale: string; path: string }>,
): Alternates {
  const languages: Record<string, string> = {};
  languages[locale] = localizedUrl(locale, currentPath);
  for (const a of alts) {
    languages[a.locale] = localizedUrl(a.locale, a.path);
  }

  const en = alts.find((a) => a.locale === defaultLocale);
  languages["x-default"] =
    locale === defaultLocale
      ? localizedUrl(defaultLocale, currentPath)
      : en
        ? localizedUrl(defaultLocale, en.path)
        : localizedUrl(locale, currentPath);

  return {
    canonical: localizedUrl(locale, currentPath),
    languages,
  };
}
