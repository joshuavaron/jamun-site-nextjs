import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Pre-generated resources data for edge runtime (Cloudflare Workers)
import mocktrialResourcesData from "@/data/mocktrial-resources.json";

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
  // Use pre-generated JSON data (works in edge runtime)
  return (mocktrialResourcesData.resources || []) as MockTrialResourceMeta[];
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

