import { createResourceLoader, BaseResourceMeta } from "./resource-loader";
import mocktrialResourcesData from "@/data/mocktrial-resources.json";

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
export interface MockTrialResourceMeta extends Omit<BaseResourceMeta, "category" | "level" | "format"> {
  category: MockTrialResourceCategory;
  level: MockTrialResourceLevel;
  format: MockTrialResourceFormat;
}

// Full resource with MDX content
export interface MockTrialResource extends MockTrialResourceMeta {
  content: string;
}

// Create the loader with Mock Trial configuration
const loader = createResourceLoader({
  contentDirectory: "content/mocktrial-resources",
  dataFile: mocktrialResourcesData as { resources: BaseResourceMeta[] },
  defaultLocale: "en",
  defaults: {
    category: "Trial Basics",
    level: "Beginner",
    format: "Article",
  },
  supportsLocales: false,
});

// Export typed functions
export function getAllMockTrialResources(): MockTrialResourceMeta[] {
  return loader.getAllResources() as MockTrialResourceMeta[];
}

export function getMockTrialResourceBySlug(slug: string): MockTrialResource | null {
  return loader.getResourceBySlug(slug) as MockTrialResource | null;
}

export function getAllMockTrialResourceSlugs(): string[] {
  return loader.getAllResourceSlugs();
}

export function getMockTrialResourcesByCategory(category: MockTrialResourceCategory): MockTrialResourceMeta[] {
  return loader.getResourcesByCategory(category) as MockTrialResourceMeta[];
}

export function getFeaturedMockTrialResources(): MockTrialResourceMeta[] {
  return loader.getFeaturedResources() as MockTrialResourceMeta[];
}

export function getMockTrialResourcesByLevel(level: MockTrialResourceLevel): MockTrialResourceMeta[] {
  return loader.getResourcesByLevel(level) as MockTrialResourceMeta[];
}

export function getMockTrialResourcesByFormat(format: MockTrialResourceFormat): MockTrialResourceMeta[] {
  return loader.getResourcesByFormat(format) as MockTrialResourceMeta[];
}

export function getRelatedMockTrialResources(currentSlug: string, limit: number = 4): MockTrialResourceMeta[] {
  return loader.getRelatedResources(currentSlug, limit) as MockTrialResourceMeta[];
}
