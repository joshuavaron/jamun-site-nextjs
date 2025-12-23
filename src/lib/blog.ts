import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: string;
  featured?: boolean;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title || "Untitled",
        excerpt: data.excerpt || "",
        coverImage: data.coverImage || "/images/conferences/hero-main.webp",
        category: data.category || "News",
        author: {
          name: data.author?.name || "JAMUN Team",
          avatar: data.author?.avatar,
        },
        publishedAt: data.publishedAt || new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        readTime: `${Math.ceil(stats.minutes)} min read`,
        featured: data.featured || false,
      } as BlogPostMeta;
    })
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "Untitled",
    excerpt: data.excerpt || "",
    coverImage: data.coverImage || "/images/conferences/hero-main.webp",
    category: data.category || "News",
    author: {
      name: data.author?.name || "JAMUN Team",
      avatar: data.author?.avatar,
    },
    publishedAt: data.publishedAt || new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    readTime: `${Math.ceil(stats.minutes)} min read`,
    featured: data.featured || false,
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  const posts = getAllPosts();
  if (category === "All") return posts;
  return posts.filter((post) => post.category === category);
}

export function getCategories(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  });

  const categories = [{ name: "All", count: posts.length }];
  categoryMap.forEach((count, name) => {
    categories.push({ name, count });
  });

  return categories;
}
