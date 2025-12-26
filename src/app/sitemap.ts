import { MetadataRoute } from "next";
import { getAllSlugsAllLocales } from "@/lib/blog";
import { getAllCommitteeSlugsAllLocales } from "@/lib/committees";
import { getAllResourceSlugsAllLocales } from "@/lib/resources";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

const BASE_URL = "https://jamun.org";
const LOCALES = routing.locales;
const DEFAULT_LOCALE = routing.defaultLocale;

// All static pages in src/app/[locale]/ - update this when adding new pages
const STATIC_PAGES = [
  { path: "", priority: 1.0, changeFrequency: "daily" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/programs", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/donate", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/grants", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/register", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "daily" as const },
  { path: "/modelun", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/modelun/resources", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/modelun/committees", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/mocktrial", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/mocktrial/resources", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/mathletes", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/mathletes/resources", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/leaderboards", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

function getLocalizedUrl(pagePath: string, locale: string): string {
  if (locale === DEFAULT_LOCALE) {
    return `${BASE_URL}${pagePath}`;
  }
  return `${BASE_URL}/${locale}${pagePath}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Dynamic content slugs
  const blogSlugs = getAllSlugsAllLocales();
  const committeeSlugs = getAllCommitteeSlugsAllLocales();
  const resourceSlugs = getAllResourceSlugsAllLocales();

  // Generate entries for all static pages across all locales
  const staticPageEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    STATIC_PAGES.map((page) => ({
      url: getLocalizedUrl(page.path, locale),
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  );

  // Committee pages (dynamic, per locale)
  const committeePages: MetadataRoute.Sitemap = committeeSlugs.map(({ slug, locale }) => ({
    url: getLocalizedUrl(`/modelun/committees/${slug}`, locale),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Resource pages (dynamic, per locale)
  const resourcePages: MetadataRoute.Sitemap = resourceSlugs.map(({ slug, locale }) => ({
    url: getLocalizedUrl(`/modelun/resources/${slug}`, locale),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Blog post pages (dynamic, per locale)
  const blogPostPages: MetadataRoute.Sitemap = blogSlugs.map(({ slug, locale }) => ({
    url: getLocalizedUrl(`/blog/${slug}`, locale),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPageEntries,
    ...committeePages,
    ...resourcePages,
    ...blogPostPages,
  ];
}
