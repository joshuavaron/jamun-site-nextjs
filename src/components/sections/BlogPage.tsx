"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Container,
  Heading,
  PillButton,
} from "@/components/ui";
import { DiagonalSpread } from "@/components/sections/DiagonalSpread";
import { TestimonialSpread } from "@/components/sections/TestimonialSpread";
import { fontBody, bodySize } from "@/lib/typography";
import { cn } from "@/lib/utils";

// ────────── Conference photos — distinct from LandingPage / ProgramsPage / AboutPage ──────────
const PHOTOS = {
  hero: "/images/conferences/DSCF9449.webp",
  testimonial: "/images/conferences/DSC01722.webp",
  finalCta: "/images/conferences/DSC01852.webp",
} as const;

// ────────── Shared types & helpers ──────────

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: { name: string; avatar?: string };
  publishedAt: string;
  readTime: string;
}

const CATEGORY_HEX: Record<string, string> = {
  "MUN Prep": "#397bce",
  "Delegate Advice": "#9333ea",
  "MUN Skills": "#10b981",
  "Crisis Committees": "#f97316",
  "Global Impact": "#0ea5e9",
  "Model UN": "#397bce",
  "Mock Trial": "#9333ea",
  Mathletes: "#10b981",
  News: "#eab308",
  Events: "#ec4899",
  Resources: "#0ea5e9",
};

function categoryColor(category: string): string {
  return CATEGORY_HEX[category] || "#397bce";
}

/** Hex-tinted pill badge for a blog category. */
export function CategoryBadge({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  const color = categoryColor(category);
  return (
    <span
      style={{ backgroundColor: `${color}1a`, color }}
      className={cn(
        "inline-block px-3 py-1 rounded-full text-xs font-semibold",
        className,
      )}
    >
      {category}
    </span>
  );
}

/** Standard blog card used in both the index grid and the "related articles" section on post pages. */
export function PostCard({
  post,
  index,
}: {
  post: BlogPostItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.7 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="h-full rounded-2xl overflow-hidden border border-black/5">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
            />
            <div className="absolute top-4 left-4">
              <CategoryBadge
                category={post.category}
                className="backdrop-blur-sm !bg-white/80"
              />
            </div>
          </div>

          <div className="p-5 md:p-6">
            <Heading
              size="micro"
              className="mb-2 group-hover:text-[#397bce] transition-colors line-clamp-2"
            >
              {post.title}
            </Heading>
            <p
              style={fontBody}
              className={`${bodySize.micro} line-clamp-2 mb-4`}
            >
              {post.excerpt}
            </p>
            <div
              style={fontBody}
              className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500"
            >
              <span className="font-medium text-neutral-700">
                {post.author.name}
              </span>
              <span className="text-neutral-300">·</span>
              <span>{post.publishedAt}</span>
              <span className="text-neutral-300">·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ────────── Page component ──────────

interface BlogPageProps {
  posts: BlogPostItem[];
  categories: { name: string; count: number }[];
}

export function BlogPage({ posts, categories }: BlogPageProps) {
  const t = useTranslations("BlogPage");
  const [selectedCategory, setSelectedCategory] = useState(t("categoryAll"));
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === t("categoryAll") ||
      post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isFiltering =
    selectedCategory !== t("categoryAll") || searchQuery.length > 0;
  const featuredPost = posts[0];
  const gridPosts = isFiltering
    ? filteredPosts
    : filteredPosts.filter((p) => p.id !== featuredPost?.id);

  const uniqueAuthors = new Set(posts.map((p) => p.author.name)).size;

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero — DiagonalSpread ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.hero}
        photoAlt={t("heroPhotoAlt")}
        photoPriority
        photoClassName="min-h-[60svh]"
        minHeight="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        <Heading size="hero">
          {t("heroTitlePart1")}
          <span className="text-[#397bce]">{t("heroTitleHighlight")}</span>
        </Heading>

        <p style={fontBody} className={`mt-6 max-w-lg ${bodySize.lead}`}>
          {t("heroDescription")}
        </p>

        {/* Search */}
        <div className="relative max-w-md mt-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={fontBody}
            className="w-full pl-12 pr-4 py-3.5 rounded-full border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#397bce]/30 focus:border-[#397bce] transition-all text-[15px]"
          />
        </div>

        {/* Stats */}
        <div
          style={fontBody}
          className="flex gap-6 mt-8 text-sm text-neutral-500"
        >
          <span>
            <strong className="text-[#0a0a0a]">{posts.length}</strong>{" "}
            {t("articles")}
          </span>
          <span className="text-neutral-300">·</span>
          <span>
            <strong className="text-[#0a0a0a]">{categories.length - 1}</strong>{" "}
            {t("categories")}
          </span>
          <span className="text-neutral-300">·</span>
          <span>
            <strong className="text-[#0a0a0a]">{uniqueAuthors}</strong>{" "}
            {t("authors")}
          </span>
        </div>
      </DiagonalSpread>

      {/* ───── Featured Post ───── */}
      {!isFiltering && featuredPost && (
        <section className="bg-white">
          <Container className="py-14 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block"
              >
                <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-black/5">
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[380px] overflow-hidden">
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width:768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                    <CategoryBadge
                      category={featuredPost.category}
                      className="mb-5 self-start"
                    />
                    <Heading
                      size="cardLg"
                      className="mb-4 group-hover:text-[#397bce] transition-colors"
                    >
                      {featuredPost.title}
                    </Heading>
                    <p
                      style={fontBody}
                      className={`${bodySize.base} line-clamp-3 mb-6`}
                    >
                      {featuredPost.excerpt}
                    </p>
                    <div
                      style={fontBody}
                      className="flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-neutral-500 mt-auto pt-5 border-t border-black/5"
                    >
                      <span className="font-semibold text-[#0a0a0a]">
                        {featuredPost.author.name}
                      </span>
                      <span className="text-neutral-300">·</span>
                      <span>{featuredPost.publishedAt}</span>
                      <span className="text-neutral-300">·</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </Container>
        </section>
      )}

      {/* ───── Filter + Grid ───── */}
      <section className="bg-white border-t border-black/5">
        <Container className="py-14 md:py-20">
          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mb-12 md:mb-16"
          >
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                style={fontBody}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  selectedCategory === cat.name
                    ? "bg-[#397bce] text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
                )}
              >
                {cat.name}
                <span className="ml-1.5 text-xs opacity-60">{cat.count}</span>
              </button>
            ))}
          </motion.div>

          {/* Grid or empty state */}
          {gridPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <Heading size="micro" className="mb-2">
                {t("noArticlesTitle")}
              </Heading>
              <p
                style={fontBody}
                className={`${bodySize.base} mb-6 max-w-md mx-auto`}
              >
                {t("noArticlesDescription")}
              </p>
              <PillButton
                onClick={() => {
                  setSelectedCategory(t("categoryAll"));
                  setSearchQuery("");
                }}
                tone="outline"
                size="md"
              >
                {t("clearFilters")}
              </PillButton>
            </motion.div>
          ) : (
            <div
              key={`${selectedCategory}-${searchQuery}`}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            >
              {gridPosts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ───── Testimonial break — keeps the rhythm ───── */}
      <TestimonialSpread
        bg="#397bce"
        photoSide="left"
        photoSrc={PHOTOS.testimonial}
        photoAlt={t("testimonialPhotoAlt")}
        heading={t("testimonialHeading")}
        quote={t("testimonialQuote")}
        attribution={t("testimonialAttribution")}
      />

      {/* ───── Final CTA — DiagonalSpread ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.finalCta}
        photoAlt={t("ctaPhotoAlt")}
        clip="none"
        minHeight="min-h-[70svh]"
        panelClassName="py-16 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          {t("shareStoryTitle")}
          <span className="text-[#397bce]">
            {t("shareStoryTitleHighlight")}
          </span>
        </Heading>

        <p style={fontBody} className={`${bodySize.lead} mb-9 max-w-md`}>
          {t("shareStoryDescription")}
        </p>

        <div className="flex flex-wrap gap-3">
          <PillButton href="mailto:contact@jamun.org" withArrow>
            {t("submitStory")}
          </PillButton>
          <PillButton href="/modelun/resources" tone="outline">
            {t("browseResources")}
          </PillButton>
        </div>

        <p style={fontBody} className="mt-8 text-sm text-neutral-600">
          {t("questionsReachOut")}{" "}
          <a
            href="mailto:contact@jamun.org"
            className="font-semibold text-[#397bce] hover:text-[#2a5fa3] transition-colors"
          >
            contact@jamun.org
          </a>
        </p>
      </DiagonalSpread>
    </div>
  );
}
