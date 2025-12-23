import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content/committees");

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
}

// Full committee with MDX content
export interface Committee extends CommitteeMeta {
  letterFromChair: string; // MDX content for the letter
}

export function getAllCommittees(): CommitteeMeta[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  const committees = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(contentDirectory, file);
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
      } as CommitteeMeta;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return committees;
}

export function getCommitteeBySlug(slug: string): Committee | null {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

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
    letterFromChair: content,
  };
}

export function getAllCommitteeSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getCommitteesByCategory(category: string): CommitteeMeta[] {
  const committees = getAllCommittees();
  if (category === "All") return committees;
  return committees.filter((committee) => committee.category === category);
}

export function getFeaturedCommittees(): CommitteeMeta[] {
  const committees = getAllCommittees();
  return committees.filter((committee) => committee.featured);
}

// Helper to get available countries count
export function getAvailableCountriesCount(committee: CommitteeMeta): number {
  return committee.countries.filter((c) => c.available !== false).length;
}
