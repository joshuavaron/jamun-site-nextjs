import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content/mathletes-resources");

// Mathletes resource categories
export type MathletesResourceCategory =
  | "Getting Started"
  | "Problem Solving"
  | "Number Theory"
  | "Algebra"
  | "Geometry"
  | "Counting & Probability"
  | "Mental Math"
  | "Competition Prep"
  | "Video Tutorials";

// Resource difficulty levels
export type MathletesResourceLevel = "Beginner" | "Intermediate" | "Advanced";

// Resource format types
export type MathletesResourceFormat = "PDF" | "Video" | "Article" | "Template" | "Worksheet";

// Resource metadata from frontmatter
export interface MathletesResourceMeta {
  slug: string;
  title: string;
  description: string;
  category: MathletesResourceCategory;
  level: MathletesResourceLevel;
  format: MathletesResourceFormat;
  duration?: string; // For videos, e.g., "15 min"
  pages?: number; // For PDFs
  downloadUrl?: string; // Direct download link if applicable
  image?: string;
  author?: string;
  featured?: boolean;
  tags?: string[];
  publishedAt?: string;
}

// Full resource with MDX content
export interface MathletesResource extends MathletesResourceMeta {
  content: string; // MDX content
}

export function getAllMathletesResources(): MathletesResourceMeta[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  const resources = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled Resource",
        description: data.description || "",
        category: data.category || "Getting Started",
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
      } as MathletesResourceMeta;
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  return resources;
}

export function getMathletesResourceBySlug(slug: string): MathletesResource | null {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || "Untitled Resource",
    description: data.description || "",
    category: data.category || "Getting Started",
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
    content,
  };
}

export function getAllMathletesResourceSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getMathletesResourcesByCategory(category: MathletesResourceCategory): MathletesResourceMeta[] {
  const resources = getAllMathletesResources();
  return resources.filter((resource) => resource.category === category);
}

export function getFeaturedMathletesResources(): MathletesResourceMeta[] {
  const resources = getAllMathletesResources();
  return resources.filter((resource) => resource.featured);
}

export function getMathletesResourcesByLevel(level: MathletesResourceLevel): MathletesResourceMeta[] {
  const resources = getAllMathletesResources();
  return resources.filter((resource) => resource.level === level);
}

export function getMathletesResourcesByFormat(format: MathletesResourceFormat): MathletesResourceMeta[] {
  const resources = getAllMathletesResources();
  return resources.filter((resource) => resource.format === format);
}

export function getRelatedMathletesResources(currentSlug: string, limit: number = 4): MathletesResourceMeta[] {
  const allResources = getAllMathletesResources();
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
