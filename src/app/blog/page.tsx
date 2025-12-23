import { Metadata } from "next";
import { getAllPosts, getCategories } from "@/lib/blog";
import BlogPageClient from "./BlogPageClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Model UN Tips, Mock Trial Guides & Academic Competition Resources | JAMUN Blog",
  description:
    "Expert guides for Model UN position papers, Mock Trial cross-examination, and math competition strategies. Student success stories, delegate tips, and resources for middle school academic competitions.",
  keywords: [
    "Model UN tips",
    "position paper guide",
    "Mock Trial strategies",
    "math competition preparation",
    "MUN delegate advice",
    "Model UN conference prep",
    "academic competition blog",
    "public speaking tips students",
    "debate strategies middle school",
    "Model UN resolution writing",
  ],
  openGraph: {
    title: "JAMUN Blog - Academic Competition Tips & Resources",
    description:
      "Discover strategies to excel in Model UN, Mock Trial, and Mathletes. Expert guides, student stories, and tips for middle school competitors.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  // Transform posts to match BlogPost interface expected by BlogCard
  const blogPosts = posts.map((post, index) => ({
    id: String(index + 1),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    category: post.category,
    author: post.author,
    publishedAt: post.publishedAt,
    readTime: post.readTime,
  }));

  return <BlogPageClient posts={blogPosts} categories={categories} />;
}
