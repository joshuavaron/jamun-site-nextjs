import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content/mocktrial-resources");

// Mock Trial resource categories
export type MockTrialResourceCategory =
  | "Trial Basics"
  | "Opening Statements"
  | "Direct Examination"
  | "Cross-Examination"
  | "Closing Arguments"
  | "Objections"
  | "Evidence Rules"
  | "Witness Preparation"
  | "Video Tutorials";

// Resource difficulty levels
export type MockTrialResourceLevel = "Beginner" | "Intermediate" | "Advanced";

// Resource format types
export type MockTrialResourceFormat = "PDF" | "Video" | "Article" | "Template" | "Worksheet";

// Resource metadata from frontmatter
export interface MockTrialResourceMeta {
  slug: string;
  title: string;
  description: string;
  category: MockTrialResourceCategory;
  level: MockTrialResourceLevel;
  format: MockTrialResourceFormat;
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
export interface MockTrialResource extends MockTrialResourceMeta {
  content: string; // MDX content
}

export function getAllMockTrialResources(): MockTrialResourceMeta[] {
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
        category: data.category || "Trial Basics",
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
      } as MockTrialResourceMeta;
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  return resources;
}

export function getMockTrialResourceBySlug(slug: string): MockTrialResource | null {
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
    category: data.category || "Trial Basics",
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

export function getAllMockTrialResourceSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getMockTrialResourcesByCategory(category: MockTrialResourceCategory): MockTrialResourceMeta[] {
  const resources = getAllMockTrialResources();
  return resources.filter((resource) => resource.category === category);
}

export function getFeaturedMockTrialResources(): MockTrialResourceMeta[] {
  const resources = getAllMockTrialResources();
  return resources.filter((resource) => resource.featured);
}

export function getMockTrialResourcesByLevel(level: MockTrialResourceLevel): MockTrialResourceMeta[] {
  const resources = getAllMockTrialResources();
  return resources.filter((resource) => resource.level === level);
}

export function getMockTrialResourcesByFormat(format: MockTrialResourceFormat): MockTrialResourceMeta[] {
  const resources = getAllMockTrialResources();
  return resources.filter((resource) => resource.format === format);
}

export function getRelatedMockTrialResources(currentSlug: string, limit: number = 4): MockTrialResourceMeta[] {
  const allResources = getAllMockTrialResources();
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
