"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import { Button, Section } from "@/components/ui";
import MDXComponents from "@/components/mdx/MDXComponents";
import { BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

interface BlogPostContentProps {
  post: BlogPost;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  "Model UN": { bg: "bg-jamun-blue/10", text: "text-jamun-blue" },
  "Mock Trial": { bg: "bg-purple-100", text: "text-purple-600" },
  Mathletes: { bg: "bg-emerald-100", text: "text-emerald-600" },
  News: { bg: "bg-amber-100", text: "text-amber-600" },
  Events: { bg: "bg-rose-100", text: "text-rose-600" },
  Resources: { bg: "bg-cyan-100", text: "text-cyan-600" },
};

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const colors = categoryColors[post.category] || {
    bg: "bg-gray-100",
    text: "text-gray-600",
  };

  useEffect(() => {
    async function compileMDX() {
      const source = await serialize(post.content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      });
      setMdxSource(source);
    }
    compileMDX();
  }, [post.content]);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out this article: ${post.title}`;

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50 pt-8 pb-16 md:pt-12 md:pb-20">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-jamun-orange/10 to-pink-400/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-jamun-blue transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Post header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category badge */}
            <span
              className={cn(
                "inline-block px-3 py-1.5 rounded-full text-xs font-semibold mb-6",
                colors.bg,
                colors.text
              )}
            >
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author and meta */}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-jamun-blue/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-jamun-blue" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Share buttons */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-500 mr-2 hidden sm:block">
                  Share:
                </span>
                <button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        shareText
                      )}&url=${encodeURIComponent(shareUrl)}`,
                      "_blank"
                    )
                  }
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareUrl
                      )}`,
                      "_blank"
                    )
                  }
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                        shareUrl
                      )}&title=${encodeURIComponent(post.title)}`,
                      "_blank"
                    )
                  }
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative"
                  aria-label="Copy link"
                >
                  <LinkIcon className="w-4 h-4 text-gray-600" />
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4"
      >
        <div className="relative aspect-[2/1] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Article Content */}
      <Section background="white" className="py-12 md:py-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto prose prose-lg"
        >
          {mdxSource ? (
            <MDXRemote {...mdxSource} components={MDXComponents} />
          ) : (
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
            </div>
          )}
        </motion.article>
      </Section>

      {/* Author Card */}
      <Section background="gray" className="py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-jamun-blue/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-10 h-10 text-jamun-blue" />
                </div>
              )}
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-500 mb-1">Written by</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.author.name}
                </h3>
                <p className="text-gray-600">
                  A member of the JAMUN team passionate about empowering students
                  through academic competition. Want to contribute? Reach out at{" "}
                  <a
                    href="mailto:contact@jamun.org"
                    className="text-jamun-blue hover:underline"
                  >
                    contact@jamun.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* CTA Section */}
      <Section background="white" className="py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Want to read more?
          </h2>
          <p className="text-gray-600 mb-8">
            Explore more articles about Model UN, Mock Trial, Mathletes, and
            everything JAMUN.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/blog" variant="primary" size="lg">
              Browse All Articles
            </Button>
            <Button href="/programs" variant="outline" size="lg">
              Explore Programs
            </Button>
          </div>
        </motion.div>
      </Section>
    </main>
  );
}
