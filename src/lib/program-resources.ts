import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Program types
export type ProgramType = "modelun" | "mocktrial" | "mathletes";

// Resource categories (topic-based per CONTENT-CREATION.md)
export type ResourceCategory =
  | "Skills"
  | "Background"
  | "Rules"
  | "Reference"
  | "Examples"
  | "Strategy";

// Resource format types
export type ResourceFormat = "PDF" | "Video" | "Article" | "Worksheet";

// Resource metadata from frontmatter
export interface ResourceMeta {
  slug: string;
  title: string;
  description: string;
  category: ResourceCategory;
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

// Program configuration
export interface ProgramConfig {
  type: ProgramType;
  contentDirectory: string;
  dataFile: string;
  basePath: string; // e.g., "/modelun/resources"
  translationNamespace: string;
  detailTranslationNamespace: string;
  metaTranslationNamespace: string;
  contactEmail: string;
  // Theme colors
  colors: {
    primary: string; // e.g., "emerald" for Model UN
    primaryBg: string; // e.g., "bg-emerald-600"
    primaryBgLight: string; // e.g., "bg-emerald-100"
    primaryText: string; // e.g., "text-emerald-600"
    primaryTextLight: string; // e.g., "text-emerald-700"
    primaryBorder: string; // e.g., "border-emerald-200"
    primaryRing: string; // e.g., "ring-emerald-500/30"
    gradientFrom: string; // e.g., "from-emerald-50/50"
    gradientVia: string; // e.g., "via-white"
    gradientTo: string; // e.g., "to-sky-50"
    heroBlob1: string; // e.g., "from-emerald-400/10 to-sky-400/10"
    heroBlob2: string; // e.g., "from-jamun-blue/10 to-emerald-400/10"
  };
  // Icon for the program (component name)
  iconName: "BookOpen" | "Scale" | "Calculator";
}

// Program configurations
export const programConfigs: Record<ProgramType, ProgramConfig> = {
  modelun: {
    type: "modelun",
    contentDirectory: "content/modelun-resources",
    dataFile: "modelun-resources.json",
    basePath: "/modelun/resources",
    translationNamespace: "ResourcesPage",
    detailTranslationNamespace: "ResourcePage",
    metaTranslationNamespace: "ResourcesPageMetadata",
    contactEmail: "modelun@jamun.org",
    colors: {
      primary: "emerald",
      primaryBg: "bg-emerald-600",
      primaryBgLight: "bg-emerald-100",
      primaryText: "text-emerald-600",
      primaryTextLight: "text-emerald-700",
      primaryBorder: "border-emerald-200",
      primaryRing: "ring-emerald-500/30",
      gradientFrom: "from-emerald-50/50",
      gradientVia: "via-white",
      gradientTo: "to-sky-50",
      heroBlob1: "from-emerald-400/10 to-sky-400/10",
      heroBlob2: "from-jamun-blue/10 to-emerald-400/10",
    },
    iconName: "BookOpen",
  },
  mocktrial: {
    type: "mocktrial",
    contentDirectory: "content/mocktrial-resources",
    dataFile: "mocktrial-resources.json",
    basePath: "/mocktrial/resources",
    translationNamespace: "MockTrialResourcesPage",
    detailTranslationNamespace: "MockTrialResourcePage",
    metaTranslationNamespace: "MockTrialResourcesPageMetadata",
    contactEmail: "mocktrial@jamun.org",
    colors: {
      primary: "purple",
      primaryBg: "bg-purple-600",
      primaryBgLight: "bg-purple-100",
      primaryText: "text-purple-600",
      primaryTextLight: "text-purple-700",
      primaryBorder: "border-purple-200",
      primaryRing: "ring-purple-500/30",
      gradientFrom: "from-purple-50/50",
      gradientVia: "via-white",
      gradientTo: "to-violet-50",
      heroBlob1: "from-purple-400/10 to-violet-400/10",
      heroBlob2: "from-purple-500/10 to-violet-400/10",
    },
    iconName: "Scale",
  },
  mathletes: {
    type: "mathletes",
    contentDirectory: "content/mathletes-resources",
    dataFile: "mathletes-resources.json",
    basePath: "/mathletes/resources",
    translationNamespace: "MathletesResourcesPage",
    detailTranslationNamespace: "MathletesResourcePage",
    metaTranslationNamespace: "MathletesResourcesPageMetadata",
    contactEmail: "mathletes@jamun.org",
    colors: {
      primary: "emerald",
      primaryBg: "bg-emerald-600",
      primaryBgLight: "bg-emerald-100",
      primaryText: "text-emerald-600",
      primaryTextLight: "text-emerald-700",
      primaryBorder: "border-emerald-200",
      primaryRing: "ring-emerald-500/30",
      gradientFrom: "from-emerald-50/50",
      gradientVia: "via-white",
      gradientTo: "to-teal-50",
      heroBlob1: "from-emerald-400/10 to-teal-400/10",
      heroBlob2: "from-teal-500/10 to-emerald-400/10",
    },
    iconName: "Calculator",
  },
};

const defaultLocale = "en";

// Dynamically import resource data
function getResourceData(program: ProgramType): Record<string, ResourceMeta[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(`@/data/${programConfigs[program].dataFile}`);
  } catch {
    return { en: [], es: [], zh: [] };
  }
}

function getContentDirectory(program: ProgramType): string {
  return path.join(process.cwd(), programConfigs[program].contentDirectory);
}

function getLocaleDirectory(program: ProgramType, locale: string): string {
  return path.join(getContentDirectory(program), locale);
}

function localeExists(program: ProgramType, locale: string): boolean {
  const localeDir = getLocaleDirectory(program, locale);
  return fs.existsSync(localeDir);
}

export function getAllResources(program: ProgramType, locale: string = defaultLocale): ResourceMeta[] {
  // Use pre-generated JSON data (works in edge runtime)
  const resourcesData = getResourceData(program);
  const localeKey = (locale in resourcesData ? locale : "en") as keyof typeof resourcesData;
  const resources = resourcesData[localeKey] || resourcesData.en || [];
  return resources as ResourceMeta[];
}

export function getResourceBySlug(program: ProgramType, slug: string, locale: string = defaultLocale): Resource | null {
  // Try requested locale first
  const localePath = path.join(getLocaleDirectory(program, locale), `${slug}.mdx`);

  if (fs.existsSync(localePath)) {
    return parseResourceFile(localePath, slug, locale);
  }

  // Fall back to default locale
  if (locale !== defaultLocale) {
    const fallbackPath = path.join(getLocaleDirectory(program, defaultLocale), `${slug}.mdx`);
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
    category: data.category || "Skills",
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

export function getAllResourceSlugs(program: ProgramType, locale: string = defaultLocale): string[] {
  const effectiveLocale = localeExists(program, locale) ? locale : defaultLocale;
  const localeDir = getLocaleDirectory(program, effectiveLocale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

// Get all slugs across all locales for static generation
export function getAllResourceSlugsAllLocales(program: ProgramType): { slug: string; locale: string }[] {
  const result: { slug: string; locale: string }[] = [];
  const contentDirectory = getContentDirectory(program);

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

export function getRelatedResources(program: ProgramType, currentSlug: string, limit: number = 4, locale: string = defaultLocale): ResourceMeta[] {
  const allResources = getAllResources(program, locale);
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
export function getAlternateLanguages(program: ProgramType, slug: string, currentLocale: string): { locale: string; slug: string }[] {
  const alternates: { locale: string; slug: string }[] = [];
  const contentDirectory = getContentDirectory(program);

  if (!fs.existsSync(contentDirectory)) {
    return alternates;
  }

  // Get the canonical slug from the current resource
  const currentResource = getResourceBySlug(program, slug, currentLocale);
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

// Helper to get program config
export function getProgramConfig(program: ProgramType): ProgramConfig {
  return programConfigs[program];
}
