import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getAllSlugsAllLocales } from "@/lib/blog";
import { getAllCommitteeSlugsAllLocales } from "@/lib/committees";
import { getAllResourceSlugsAllLocales } from "@/lib/resources";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

const BASE_URL = "https://jamun.org";
const LOCALES = routing.locales;
const DEFAULT_LOCALE = routing.defaultLocale;

// Fixed build date for static pages - updated each deployment
const BUILD_DATE = new Date();

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

// Get file modification time for MDX content
function getContentModifiedDate(contentDir: string, slug: string, locale: string): Date {
  const filePath = path.join(process.cwd(), "content", contentDir, locale, `${slug}.mdx`);

  try {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      return stats.mtime;
    }
  } catch {
    // Fall back to build date if file access fails
  }

  // Fallback: try English version
  const enPath = path.join(process.cwd(), "content", contentDir, "en", `${slug}.mdx`);
  try {
    if (fs.existsSync(enPath)) {
      const stats = fs.statSync(enPath);
      return stats.mtime;
    }
  } catch {
    // Fall back to build date
  }

  return BUILD_DATE;
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
      lastModified: BUILD_DATE,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  );

  // Committee pages with actual file modification dates
  const committeePages: MetadataRoute.Sitemap = committeeSlugs.map(({ slug, locale }) => ({
    url: getLocalizedUrl(`/modelun/committees/${slug}`, locale),
    lastModified: getContentModifiedDate("committees", slug, locale),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Resource pages with actual file modification dates
  const resourcePages: MetadataRoute.Sitemap = resourceSlugs.map(({ slug, locale }) => ({
    url: getLocalizedUrl(`/modelun/resources/${slug}`, locale),
    lastModified: getContentModifiedDate("modelun-resources", slug, locale),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Blog post pages with actual file modification dates
  const blogPostPages: MetadataRoute.Sitemap = blogSlugs.map(({ slug, locale }) => ({
    url: getLocalizedUrl(`/blog/${slug}`, locale),
    lastModified: getContentModifiedDate("blog", slug, locale),
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
