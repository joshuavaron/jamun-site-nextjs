"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BlogPost {
  id: string;
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
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  "Model UN": { bg: "bg-jamun-blue/10", text: "text-jamun-blue" },
  "Mock Trial": { bg: "bg-purple-100", text: "text-purple-600" },
  Mathletes: { bg: "bg-emerald-100", text: "text-emerald-600" },
  News: { bg: "bg-amber-100", text: "text-amber-600" },
  Events: { bg: "bg-rose-100", text: "text-rose-600" },
  Resources: { bg: "bg-cyan-100", text: "text-cyan-600" },
};

export function BlogCard({ post, featured = false, className }: BlogCardProps) {
  const colors = categoryColors[post.category] || {
    bg: "bg-gray-100",
    text: "text-gray-600",
  };

  if (featured) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className={cn(
          "group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300",
          className
        )}
      >
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[380px] overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col">
              {/* Category & Featured badge */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold",
                    colors.bg,
                    colors.text
                  )}
                >
                  {post.category}
                </span>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                  Featured
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 group-hover:text-jamun-blue transition-colors">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              {/* Author & Meta - pushed to bottom */}
              <div className="mt-auto pt-5 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  {post.author.avatar ? (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-jamun-blue/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-jamun-blue" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {post.author.name}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span>{post.publishedAt}</span>
                      <span className="text-gray-300">·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-jamun-blue group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm",
                colors.bg,
                colors.text
              )}
            >
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-jamun-blue transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-jamun-blue/10 flex items-center justify-center">
                  <User className="w-3 h-3 text-jamun-blue" />
                </div>
              )}
              <span className="text-sm text-gray-600">{post.author.name}</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{post.publishedAt}</span>
              <span className="text-gray-300">•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
