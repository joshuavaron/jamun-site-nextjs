import { createResourceLoader, BaseResourceMeta } from "./resource-loader";
import mathletesResourcesData from "@/data/mathletes-resources.json";

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
export interface MathletesResourceMeta extends Omit<BaseResourceMeta, "category" | "level" | "format"> {
  category: MathletesResourceCategory;
  level: MathletesResourceLevel;
  format: MathletesResourceFormat;
}

// Full resource with MDX content
export interface MathletesResource extends MathletesResourceMeta {
  content: string;
}

// Create the loader with Mathletes configuration
const loader = createResourceLoader({
  contentDirectory: "content/mathletes-resources",
  dataFile: mathletesResourcesData as { resources: BaseResourceMeta[] },
  defaultLocale: "en",
  defaults: {
    category: "Getting Started",
    level: "Beginner",
    format: "Article",
  },
  supportsLocales: false,
});

// Export typed functions
export function getAllMathletesResources(): MathletesResourceMeta[] {
  return loader.getAllResources() as MathletesResourceMeta[];
}

export function getMathletesResourceBySlug(slug: string): MathletesResource | null {
  return loader.getResourceBySlug(slug) as MathletesResource | null;
}

export function getAllMathletesResourceSlugs(): string[] {
  return loader.getAllResourceSlugs();
}

export function getMathletesResourcesByCategory(category: MathletesResourceCategory): MathletesResourceMeta[] {
  return loader.getResourcesByCategory(category) as MathletesResourceMeta[];
}

export function getFeaturedMathletesResources(): MathletesResourceMeta[] {
  return loader.getFeaturedResources() as MathletesResourceMeta[];
}

export function getMathletesResourcesByLevel(level: MathletesResourceLevel): MathletesResourceMeta[] {
  return loader.getResourcesByLevel(level) as MathletesResourceMeta[];
}

export function getMathletesResourcesByFormat(format: MathletesResourceFormat): MathletesResourceMeta[] {
  return loader.getResourcesByFormat(format) as MathletesResourceMeta[];
}

export function getRelatedMathletesResources(currentSlug: string, limit: number = 4): MathletesResourceMeta[] {
  return loader.getRelatedResources(currentSlug, limit) as MathletesResourceMeta[];
}
