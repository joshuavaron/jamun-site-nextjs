import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Pre-generated resources data for edge runtime (Cloudflare Workers)
import resourcesData from "@/data/modelun-resources.json";

const contentDirectory = path.join(process.cwd(), "content/modelun-resources");
const defaultLocale = "en";

// Resource categories
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
export interface ResourceMeta {
  slug: string;
  title: string;
  description: string;
  category: ResourceCategory;
  level: ResourceLevel;
  format: ResourceFormat;
  duration?: string; // For videos, e.g., "15 min"
  pages?: number; // For PDFs
  downloadUrl?: string; // Direct download link if applicable
  image?: string;
  author?: string;
  featured?: boolean;
  tags?: string[];
  publishedAt?: string;
  canonicalSlug?: string; // Links translations together
  locale: string;
}

// Full resource with MDX content
export interface Resource extends ResourceMeta {
  content: string; // MDX content
}

function getLocaleDirectory(locale: string): string {
  return path.join(contentDirectory, locale);
}

function localeExists(locale: string): boolean {
  const localeDir = getLocaleDirectory(locale);
  return fs.existsSync(localeDir);
}

export function getAllResources(locale: string = defaultLocale): ResourceMeta[] {
  // Use pre-generated JSON data (works in edge runtime)
  // Falls back to English if locale not available in JSON
  const localeKey = (locale in resourcesData ? locale : "en") as keyof typeof resourcesData;
  const resources = resourcesData[localeKey] || resourcesData.en || [];

  return resources as ResourceMeta[];
}

export function getResourceBySlug(slug: string, locale: string = defaultLocale): Resource | null {
  // Try requested locale first
  const localePath = path.join(getLocaleDirectory(locale), `${slug}.mdx`);

  if (fs.existsSync(localePath)) {
    return parseResourceFile(localePath, slug, locale);
  }

  // Fall back to default locale
  if (locale !== defaultLocale) {
    const fallbackPath = path.join(getLocaleDirectory(defaultLocale), `${slug}.mdx`);
    if (fs.existsSync(fallbackPath)) {
      return parseResourceFile(fallbackPath, slug, defaultLocale);
    }
  }

  return null;
}

function parseResourceFile(fullPath: string, slug: string, locale: string): Resource {
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || "Untitled Resource",
    description: data.description || "",
    category: data.category || "Research Guide",
    level: data.level || "Beginner",
    format: data.format || "Article",
    duration: data.duration,
    pages: data.pages,
    downloadUrl: data.downloadUrl,
    image: data.image,
    author: data.author,
    featured: data.featured || false,
    tags: data.tags || [],
    publishedAt: data.publishedAt,
    canonicalSlug: data.canonicalSlug,
    locale,
    content,
  };
}

export function getAllResourceSlugs(locale: string = defaultLocale): string[] {
  const effectiveLocale = localeExists(locale) ? locale : defaultLocale;
  const localeDir = getLocaleDirectory(effectiveLocale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

// Get all slugs across all locales for static generation
export function getAllResourceSlugsAllLocales(): { slug: string; locale: string }[] {
  const result: { slug: string; locale: string }[] = [];

  if (!fs.existsSync(contentDirectory)) {
    return result;
  }

  const localeDirs = fs.readdirSync(contentDirectory).filter((dir) => {
    const dirPath = path.join(contentDirectory, dir);
    return fs.statSync(dirPath).isDirectory();
  });

  for (const locale of localeDirs) {
    const localeDir = path.join(contentDirectory, locale);
    const files = fs.readdirSync(localeDir);

    for (const file of files) {
      if (file.endsWith(".mdx")) {
        result.push({
          slug: file.replace(/\.mdx$/, ""),
          locale,
        });
      }
    }
  }

  return result;
}

export function getResourcesByCategory(category: ResourceCategory, locale: string = defaultLocale): ResourceMeta[] {
  const resources = getAllResources(locale);
  return resources.filter((resource) => resource.category === category);
}

export function getFeaturedResources(locale: string = defaultLocale): ResourceMeta[] {
  const resources = getAllResources(locale);
  return resources.filter((resource) => resource.featured);
}

export function getResourcesByLevel(level: ResourceLevel, locale: string = defaultLocale): ResourceMeta[] {
  const resources = getAllResources(locale);
  return resources.filter((resource) => resource.level === level);
}

export function getResourcesByFormat(format: ResourceFormat, locale: string = defaultLocale): ResourceMeta[] {
  const resources = getAllResources(locale);
  return resources.filter((resource) => resource.format === format);
}

export function getRelatedResources(currentSlug: string, limit: number = 4, locale: string = defaultLocale): ResourceMeta[] {
  const allResources = getAllResources(locale);
  const currentResource = allResources.find((r) => r.slug === currentSlug);

  if (!currentResource) {
    return allResources.slice(0, limit);
  }

  // Score resources by relevance
  const scoredResources = allResources
    .filter((r) => r.slug !== currentSlug)
    .map((resource) => {
      let score = 0;

      // Same category: +3 points
      if (resource.category === currentResource.category) {
        score += 3;
      }

      // Same level: +2 points
      if (resource.level === currentResource.level) {
        score += 2;
      }

      // Shared tags: +1 point per tag
      const currentTags = currentResource.tags || [];
      const resourceTags = resource.tags || [];
      const sharedTags = currentTags.filter((tag) => resourceTags.includes(tag));
      score += sharedTags.length;

      // Featured resources get a small boost
      if (resource.featured) {
        score += 1;
      }

      return { resource, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ resource }) => resource);

  return scoredResources;
}

// Get alternate language versions of a resource
export function getAlternateLanguages(slug: string, currentLocale: string): { locale: string; slug: string }[] {
  const alternates: { locale: string; slug: string }[] = [];

  if (!fs.existsSync(contentDirectory)) {
    return alternates;
  }

  // Get the canonical slug from the current resource
  const currentResource = getResourceBySlug(slug, currentLocale);
  const canonicalSlug = currentResource?.canonicalSlug || slug;

  const localeDirs = fs.readdirSync(contentDirectory).filter((dir) => {
    const dirPath = path.join(contentDirectory, dir);
    return fs.statSync(dirPath).isDirectory() && dir !== currentLocale;
  });

  for (const locale of localeDirs) {
    const localeDir = path.join(contentDirectory, locale);
    const files = fs.readdirSync(localeDir);

    for (const file of files) {
      if (file.endsWith(".mdx")) {
        const fileSlug = file.replace(/\.mdx$/, "");
        const filePath = path.join(localeDir, file);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);

        // Match by canonical slug or by same slug
        if (data.canonicalSlug === canonicalSlug || fileSlug === slug) {
          alternates.push({ locale, slug: fileSlug });
          break;
        }
      }
    }
  }

  return alternates;
}
