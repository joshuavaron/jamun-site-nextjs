import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content/background-guides");
const defaultLocale = "en";

// Background guide metadata from frontmatter
export interface BackgroundGuideMeta {
  slug: string;
  title: string;
  author: string;
  publishedAt: string;
  canonicalSlug?: string;
  locale: string;
}

// Full background guide with MDX content
export interface BackgroundGuide extends BackgroundGuideMeta {
  content: string; // MDX content
}

function getLocaleDirectory(locale: string): string {
  return path.join(contentDirectory, locale);
}

function localeExists(locale: string): boolean {
  const localeDir = getLocaleDirectory(locale);
  return fs.existsSync(localeDir);
}

export function getAllBackgroundGuides(locale: string = defaultLocale): BackgroundGuideMeta[] {
  // Fall back to English if the requested locale directory doesn't exist
  const effectiveLocale = localeExists(locale) ? locale : defaultLocale;
  const localeDir = getLocaleDirectory(effectiveLocale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir).filter((file) => file.endsWith(".mdx"));

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(localeDir, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled Background Guide",
      author: data.author || "JAMUN Staff",
      publishedAt: data.publishedAt || "",
      canonicalSlug: data.canonicalSlug,
      locale: effectiveLocale,
    };
  });
}

export function getBackgroundGuideBySlug(slug: string, locale: string = defaultLocale): BackgroundGuide | null {
  // Try requested locale first
  const localePath = path.join(getLocaleDirectory(locale), `${slug}.mdx`);

  if (fs.existsSync(localePath)) {
    return parseBackgroundGuideFile(localePath, slug, locale);
  }

  // Fall back to default locale
  if (locale !== defaultLocale) {
    const fallbackPath = path.join(getLocaleDirectory(defaultLocale), `${slug}.mdx`);
    if (fs.existsSync(fallbackPath)) {
      return parseBackgroundGuideFile(fallbackPath, slug, defaultLocale);
    }
  }

  return null;
}

function parseBackgroundGuideFile(fullPath: string, slug: string, locale: string): BackgroundGuide {
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || "Untitled Background Guide",
    author: data.author || "JAMUN Staff",
    publishedAt: data.publishedAt || "",
    canonicalSlug: data.canonicalSlug,
    locale,
    content,
  };
}

export function getAllBackgroundGuideSlugs(locale: string = defaultLocale): string[] {
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
export function getAllBackgroundGuideSlugsAllLocales(): { slug: string; locale: string }[] {
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

// Get alternate language versions of a background guide
export function getAlternateLanguages(slug: string, currentLocale: string): { locale: string; slug: string }[] {
  const alternates: { locale: string; slug: string }[] = [];

  if (!fs.existsSync(contentDirectory)) {
    return alternates;
  }

  // Get the canonical slug from the current guide
  const currentGuide = getBackgroundGuideBySlug(slug, currentLocale);
  const canonicalSlug = currentGuide?.canonicalSlug || slug;

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
