import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Base resource metadata interface that all resource types extend
export interface BaseResourceMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  level: string;
  format: string;
  duration?: string;
  pages?: number;
  downloadUrl?: string;
  image?: string;
  author?: string;
  featured?: boolean;
  tags?: string[];
  publishedAt?: string;
  canonicalSlug?: string;
  locale: string;
}

// Full resource with MDX content
export interface BaseResource extends BaseResourceMeta {
  content: string;
}

// Configuration for creating a resource loader
export interface ResourceLoaderConfig {
  contentDirectory: string;
  dataFile: { [locale: string]: BaseResourceMeta[] } | { resources: BaseResourceMeta[] };
  defaultLocale?: string;
  defaults: {
    category: string;
    level: string;
    format: string;
  };
  supportsLocales: boolean;
}

function getLocaleDirectory(contentDirectory: string, locale: string): string {
  return path.join(process.cwd(), contentDirectory, locale);
}

function localeExists(contentDirectory: string, locale: string): boolean {
  const localeDir = getLocaleDirectory(contentDirectory, locale);
  return fs.existsSync(localeDir);
}

// Factory function to create a resource loader for any program
export function createResourceLoader(config: ResourceLoaderConfig) {
  const {
    contentDirectory,
    dataFile,
    defaultLocale = "en",
    defaults,
    supportsLocales,
  } = config;

  // Get all resources for a locale
  function getAllResources(locale: string = defaultLocale): BaseResourceMeta[] {
    if (supportsLocales) {
      // Locale-based data structure (e.g., { en: [...], es: [...] })
      const data = dataFile as { [locale: string]: BaseResourceMeta[] };
      const localeKey = locale in data ? locale : "en";
      return data[localeKey] || data.en || [];
    } else {
      // Simple structure (e.g., { resources: [...] })
      const data = dataFile as { resources: BaseResourceMeta[] };
      return data.resources || [];
    }
  }

  // Get a single resource by slug
  function getResourceBySlug(slug: string, locale: string = defaultLocale): BaseResource | null {
    const contentDir = path.join(process.cwd(), contentDirectory);

    if (supportsLocales) {
      // Try requested locale first
      const localePath = path.join(getLocaleDirectory(contentDirectory, locale), `${slug}.mdx`);
      if (fs.existsSync(localePath)) {
        return parseResourceFile(localePath, slug, locale);
      }

      // Fall back to default locale
      if (locale !== defaultLocale) {
        const fallbackPath = path.join(getLocaleDirectory(contentDirectory, defaultLocale), `${slug}.mdx`);
        if (fs.existsSync(fallbackPath)) {
          return parseResourceFile(fallbackPath, slug, defaultLocale);
        }
      }
    } else {
      // Non-locale content directory
      const filePath = path.join(contentDir, `${slug}.mdx`);
      if (fs.existsSync(filePath)) {
        return parseResourceFile(filePath, slug, defaultLocale);
      }
    }

    return null;
  }

  function parseResourceFile(fullPath: string, slug: string, locale: string): BaseResource {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled Resource",
      description: data.description || "",
      category: data.category || defaults.category,
      level: data.level || defaults.level,
      format: data.format || defaults.format,
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

  // Get all slugs for a locale
  function getAllResourceSlugs(locale: string = defaultLocale): string[] {
    const contentDir = path.join(process.cwd(), contentDirectory);

    if (supportsLocales) {
      const effectiveLocale = localeExists(contentDirectory, locale) ? locale : defaultLocale;
      const localeDir = getLocaleDirectory(contentDirectory, effectiveLocale);

      if (!fs.existsSync(localeDir)) {
        return [];
      }

      const files = fs.readdirSync(localeDir);
      return files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""));
    } else {
      if (!fs.existsSync(contentDir)) {
        return [];
      }

      const files = fs.readdirSync(contentDir);
      return files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""));
    }
  }

  // Get all slugs across all locales for static generation
  function getAllResourceSlugsAllLocales(): { slug: string; locale: string }[] {
    const result: { slug: string; locale: string }[] = [];
    const contentDir = path.join(process.cwd(), contentDirectory);

    if (!fs.existsSync(contentDir)) {
      return result;
    }

    if (supportsLocales) {
      const localeDirs = fs.readdirSync(contentDir).filter((dir) => {
        const dirPath = path.join(contentDir, dir);
        return fs.statSync(dirPath).isDirectory();
      });

      for (const locale of localeDirs) {
        const localeDir = path.join(contentDir, locale);
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
    } else {
      // Non-locale content - return with default locale
      const files = fs.readdirSync(contentDir);
      for (const file of files) {
        if (file.endsWith(".mdx")) {
          result.push({
            slug: file.replace(/\.mdx$/, ""),
            locale: defaultLocale,
          });
        }
      }
    }

    return result;
  }

  // Filter by category
  function getResourcesByCategory(category: string, locale: string = defaultLocale): BaseResourceMeta[] {
    const resources = getAllResources(locale);
    return resources.filter((resource) => resource.category === category);
  }

  // Get featured resources
  function getFeaturedResources(locale: string = defaultLocale): BaseResourceMeta[] {
    const resources = getAllResources(locale);
    return resources.filter((resource) => resource.featured);
  }

  // Filter by level
  function getResourcesByLevel(level: string, locale: string = defaultLocale): BaseResourceMeta[] {
    const resources = getAllResources(locale);
    return resources.filter((resource) => resource.level === level);
  }

  // Filter by format
  function getResourcesByFormat(format: string, locale: string = defaultLocale): BaseResourceMeta[] {
    const resources = getAllResources(locale);
    return resources.filter((resource) => resource.format === format);
  }

  // Get related resources based on similarity scoring
  function getRelatedResources(currentSlug: string, limit: number = 4, locale: string = defaultLocale): BaseResourceMeta[] {
    const allResources = getAllResources(locale);
    const currentResource = allResources.find((r) => r.slug === currentSlug);

    if (!currentResource) {
      return allResources.slice(0, limit);
    }

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
  function getAlternateLanguages(slug: string, currentLocale: string): { locale: string; slug: string }[] {
    const alternates: { locale: string; slug: string }[] = [];
    const contentDir = path.join(process.cwd(), contentDirectory);

    if (!supportsLocales || !fs.existsSync(contentDir)) {
      return alternates;
    }

    // Get the canonical slug from the current resource
    const currentResource = getResourceBySlug(slug, currentLocale);
    const canonicalSlug = currentResource?.canonicalSlug || slug;

    const localeDirs = fs.readdirSync(contentDir).filter((dir) => {
      const dirPath = path.join(contentDir, dir);
      return fs.statSync(dirPath).isDirectory() && dir !== currentLocale;
    });

    for (const locale of localeDirs) {
      const localeDir = path.join(contentDir, locale);
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

  return {
    getAllResources,
    getResourceBySlug,
    getAllResourceSlugs,
    getAllResourceSlugsAllLocales,
    getResourcesByCategory,
    getFeaturedResources,
    getResourcesByLevel,
    getResourcesByFormat,
    getRelatedResources,
    getAlternateLanguages,
  };
}
