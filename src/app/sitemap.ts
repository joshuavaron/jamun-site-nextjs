import { MetadataRoute } from "next";
import { getAllSlugsAllLocales } from "@/lib/blog";
import { getAllCommitteeSlugsAllLocales } from "@/lib/committees";
import { getAllResourceSlugsAllLocales } from "@/lib/resources";

export const dynamic = "force-static";

const BASE_URL = "https://jamun.org";
const LOCALES = ["en", "es"] as const;

function getLocalizedUrl(path: string, locale: string): string {
  if (locale === "en") {
    return `${BASE_URL}${path}`;
  }
  return `${BASE_URL}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getAllSlugsAllLocales();
  const committeeSlugs = getAllCommitteeSlugsAllLocales();
  const resourceSlugs = getAllResourceSlugsAllLocales();

  // Main pages with priority and change frequency (for all locales)
  const mainPages: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    {
      url: getLocalizedUrl("", locale),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: getLocalizedUrl("/about", locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: getLocalizedUrl("/programs", locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: getLocalizedUrl("/donate", locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: getLocalizedUrl("/grants", locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: getLocalizedUrl("/register", locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);

  // Program pages (for all locales)
  const programPages: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    {
      url: getLocalizedUrl("/modelun", locale),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: getLocalizedUrl("/modelun/resources", locale),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: getLocalizedUrl("/modelun/committees", locale),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: getLocalizedUrl("/mocktrial", locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: getLocalizedUrl("/mocktrial/resources", locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: getLocalizedUrl("/mathletes", locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: getLocalizedUrl("/mathletes/resources", locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

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

  // Blog pages (for all locales)
  const blogIndexPage: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: getLocalizedUrl("/blog", locale),
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // Blog post pages (dynamic, per locale)
  const blogPostPages: MetadataRoute.Sitemap = blogSlugs.map(({ slug, locale }) => ({
    url: getLocalizedUrl(`/blog/${slug}`, locale),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Other pages (for all locales)
  const otherPages: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    {
      url: getLocalizedUrl("/leaderboards", locale),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: getLocalizedUrl("/privacy", locale),
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: getLocalizedUrl("/terms", locale),
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ]);

  return [
    ...mainPages,
    ...programPages,
    ...committeePages,
    ...resourcePages,
    ...blogIndexPage,
    ...blogPostPages,
    ...otherPages,
  ];
}
