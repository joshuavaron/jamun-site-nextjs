import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content/committees");
const defaultLocale = "en";


// Committee executive (chair, vice chair, etc.)
export interface CommitteeExecutive {
  name: string;
  role: string;
  avatar?: string;
}

// Document/resource for download
export interface CommitteeDocument {
  title: string;
  description?: string;
  file: string; // Path to file in /public/files/committees/
  icon?: "background-guide" | "rules" | "position-paper" | "other";
}

// Country assignment
export interface CountryAssignment {
  name: string;
  code: string; // ISO 3166-1 alpha-2 country code for flag
  available?: boolean; // Whether the country is still available for delegation
}

// Committee metadata from frontmatter
export interface CommitteeMeta {
  slug: string;
  name: string;
  abbreviation: string;
  category: "General Assembly" | "Security Council" | "Specialized Agency" | "Regional Body" | "Crisis";
  topic: string;
  description: string;
  level: "Beginner-Friendly" | "Intermediate" | "Advanced";
  delegationSize: "Single" | "Double";
  delegateCount: number;
  image?: string;
  color?: string; // Tailwind color class
  executives: CommitteeExecutive[];
  documents: CommitteeDocument[];
  countries: CountryAssignment[];
  featured?: boolean;
  isAdHoc?: boolean;
  redHerringTopics?: string[];
  canonicalSlug?: string; // Links translations together
  backgroundGuide?: string; // Slug of associated background guide
  locale: string;
}

// Full committee with MDX content
export interface Committee extends CommitteeMeta {
  letterFromChair: string; // MDX content for the letter
}

function getLocaleDirectory(locale: string): string {
  return path.join(contentDirectory, locale);
}

function localeExists(locale: string): boolean {
  const localeDir = getLocaleDirectory(locale);
  return fs.existsSync(localeDir);
}

export function getAllCommittees(locale: string = defaultLocale): CommitteeMeta[] {
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
      name: data.name || "Untitled Committee",
      abbreviation: data.abbreviation || slug.toUpperCase(),
      category: data.category || "General Assembly",
      topic: data.topic || "",
      description: data.description || "",
      level: data.level || "Beginner-Friendly",
      delegationSize: data.delegationSize || "Single",
      delegateCount: data.delegateCount || 0,
      image: data.image || "/images/conferences/model-un.webp",
      color: data.color || "bg-jamun-blue",
      executives: data.executives || [],
      documents: data.documents || [],
      countries: data.countries || [],
      featured: data.featured || false,
      isAdHoc: data.isAdHoc || false,
      redHerringTopics: data.redHerringTopics || [],
      canonicalSlug: data.canonicalSlug,
      backgroundGuide: data.backgroundGuide,
      locale: effectiveLocale,
    };
  });
}

export function getCommitteeBySlug(slug: string, locale: string = defaultLocale): Committee | null {
  // Try requested locale first
  const localePath = path.join(getLocaleDirectory(locale), `${slug}.mdx`);

  if (fs.existsSync(localePath)) {
    return parseCommitteeFile(localePath, slug, locale);
  }

  // Fall back to default locale
  if (locale !== defaultLocale) {
    const fallbackPath = path.join(getLocaleDirectory(defaultLocale), `${slug}.mdx`);
    if (fs.existsSync(fallbackPath)) {
      return parseCommitteeFile(fallbackPath, slug, defaultLocale);
    }
  }

  return null;
}

function parseCommitteeFile(fullPath: string, slug: string, locale: string): Committee {
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    name: data.name || "Untitled Committee",
    abbreviation: data.abbreviation || slug.toUpperCase(),
    category: data.category || "General Assembly",
    topic: data.topic || "",
    description: data.description || "",
    level: data.level || "Beginner-Friendly",
    delegationSize: data.delegationSize || "Single",
    delegateCount: data.delegateCount || 0,
    image: data.image || "/images/conferences/model-un.webp",
    color: data.color || "bg-jamun-blue",
    executives: data.executives || [],
    documents: data.documents || [],
    countries: data.countries || [],
    featured: data.featured || false,
    isAdHoc: data.isAdHoc || false,
    redHerringTopics: data.redHerringTopics || [],
    canonicalSlug: data.canonicalSlug,
    backgroundGuide: data.backgroundGuide,
    locale,
    letterFromChair: content,
  };
}

export function getAllCommitteeSlugs(locale: string = defaultLocale): string[] {
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
export function getAllCommitteeSlugsAllLocales(): { slug: string; locale: string }[] {
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

// Get alternate language versions of a committee
export function getAlternateLanguages(slug: string, currentLocale: string): { locale: string; slug: string }[] {
  const alternates: { locale: string; slug: string }[] = [];

  if (!fs.existsSync(contentDirectory)) {
    return alternates;
  }

  // Get the canonical slug from the current committee
  const currentCommittee = getCommitteeBySlug(slug, currentLocale);
  const canonicalSlug = currentCommittee?.canonicalSlug || slug;

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
