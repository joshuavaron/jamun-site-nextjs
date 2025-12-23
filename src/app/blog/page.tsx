import { getAllPosts, getCategories } from "@/lib/blog";
import BlogPageClient from "./BlogPageClient";

export const metadata = {
  title: "Blog | JAMUN",
  description:
    "Discover competition strategies, student success stories, program updates, and resources to help you excel in Model UN, Mock Trial, and Mathletes.",
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
