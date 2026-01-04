import { createResourceLoader, BaseResourceMeta, BaseResource } from "./resource-loader";
import resourcesData from "@/data/modelun-resources.json";

// Resource categories for Model UN
export type ResourceCategory =
  | "Research Guide"
  | "Position Papers"
  | "Public Speaking"
  | "Parliamentary Procedure"
  | "Country Profiles"
  | "Sample Documents"
  | "Video Tutorials";

// Resource difficulty levels
export type ResourceLevel = "Beginner" | "Intermediate" | "Advanced";

// Resource format types
export type ResourceFormat = "PDF" | "Video" | "Article" | "Template" | "Worksheet";

// Resource metadata from frontmatter
export interface ResourceMeta extends Omit<BaseResourceMeta, "category" | "level" | "format"> {
  category: ResourceCategory;
  level: ResourceLevel;
  format: ResourceFormat;
}

// Full resource with MDX content
export interface Resource extends ResourceMeta {
  content: string;
}

// Create the loader with Model UN configuration
const loader = createResourceLoader({
  contentDirectory: "content/modelun-resources",
  dataFile: resourcesData as { [locale: string]: BaseResourceMeta[] },
  defaultLocale: "en",
  defaults: {
    category: "Research Guide",
    level: "Beginner",
    format: "Article",
  },
  supportsLocales: true,
});

// Export typed functions
export function getAllResources(locale: string = "en"): ResourceMeta[] {
  return loader.getAllResources(locale) as ResourceMeta[];
}

export function getResourceBySlug(slug: string, locale: string = "en"): Resource | null {
  return loader.getResourceBySlug(slug, locale) as Resource | null;
}

export function getAllResourceSlugs(locale: string = "en"): string[] {
  return loader.getAllResourceSlugs(locale);
}

export function getAllResourceSlugsAllLocales(): { slug: string; locale: string }[] {
  return loader.getAllResourceSlugsAllLocales();
}

export function getResourcesByCategory(category: ResourceCategory, locale: string = "en"): ResourceMeta[] {
  return loader.getResourcesByCategory(category, locale) as ResourceMeta[];
}

export function getFeaturedResources(locale: string = "en"): ResourceMeta[] {
  return loader.getFeaturedResources(locale) as ResourceMeta[];
}

export function getResourcesByLevel(level: ResourceLevel, locale: string = "en"): ResourceMeta[] {
  return loader.getResourcesByLevel(level, locale) as ResourceMeta[];
}

export function getResourcesByFormat(format: ResourceFormat, locale: string = "en"): ResourceMeta[] {
  return loader.getResourcesByFormat(format, locale) as ResourceMeta[];
}

export function getRelatedResources(currentSlug: string, limit: number = 4, locale: string = "en"): ResourceMeta[] {
  return loader.getRelatedResources(currentSlug, limit, locale) as ResourceMeta[];
}

export function getAlternateLanguages(slug: string, currentLocale: string): { locale: string; slug: string }[] {
  return loader.getAlternateLanguages(slug, currentLocale);
}
