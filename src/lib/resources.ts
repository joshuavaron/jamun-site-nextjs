import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content/modelun-resources");

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
}

// Full resource with MDX content
export interface Resource extends ResourceMeta {
  content: string; // MDX content
}

export function getAllResources(): ResourceMeta[] {
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
      } as ResourceMeta;
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  return resources;
}

export function getResourceBySlug(slug: string): Resource | null {
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
    content,
  };
}

export function getAllResourceSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getResourcesByCategory(category: ResourceCategory): ResourceMeta[] {
  const resources = getAllResources();
  return resources.filter((resource) => resource.category === category);
}

export function getFeaturedResources(): ResourceMeta[] {
  const resources = getAllResources();
  return resources.filter((resource) => resource.featured);
}

export function getResourcesByLevel(level: ResourceLevel): ResourceMeta[] {
  const resources = getAllResources();
  return resources.filter((resource) => resource.level === level);
}

export function getResourcesByFormat(format: ResourceFormat): ResourceMeta[] {
  const resources = getAllResources();
  return resources.filter((resource) => resource.format === format);
}

export function getRelatedResources(currentSlug: string, limit: number = 4): ResourceMeta[] {
  const allResources = getAllResources();
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
