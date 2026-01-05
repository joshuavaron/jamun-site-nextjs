import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Pre-generated resources data for edge runtime (Cloudflare Workers)
import mathletesResourcesData from "@/data/mathletes-resources.json";

const contentDirectory = path.join(process.cwd(), "content/mathletes-resources");

// Mathletes resource categories (topic-based per CONTENT-CREATION.md)
export type MathletesResourceCategory =
  | "Skills"
  | "Background"
  | "Rules"
  | "Reference"
  | "Examples"
  | "Strategy";

// Resource format types
export type MathletesResourceFormat = "PDF" | "Video" | "Article" | "Worksheet";

// Resource metadata from frontmatter
export interface MathletesResourceMeta {
  slug: string;
  title: string;
  description: string;
  category: MathletesResourceCategory;
  format: MathletesResourceFormat;
  duration?: string; // For videos, e.g., "15 min"
  pages?: number; // For PDFs
  downloadUrl?: string; // Direct download link if applicable
  image?: string;
  author?: string;
  featured?: boolean;
  tags?: string[];
  publishedAt?: string;
  canonicalSlug?: string; // Links translations together
}

// Full resource with MDX content
export interface MathletesResource extends MathletesResourceMeta {
  content: string; // MDX content
}

export function getAllMathletesResources(): MathletesResourceMeta[] {
  // Use pre-generated JSON data (works in edge runtime)
  return (mathletesResourcesData.resources || []) as MathletesResourceMeta[];
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

