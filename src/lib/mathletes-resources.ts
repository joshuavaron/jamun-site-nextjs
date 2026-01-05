import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Pre-generated resources data for edge runtime (Cloudflare Workers)
import mathletesResourcesData from "@/data/mathletes-resources.json";

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

