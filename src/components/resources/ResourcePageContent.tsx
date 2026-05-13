"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Video,
  File,
  Download,
  Clock,
  Star,
  Tag,
  Calendar,
  User,
  Printer,
} from "lucide-react";
import {
  Container,
  Heading,
  PillButton,
  IconTile,
} from "@/components/ui";
import { fontBody, bodySize } from "@/lib/typography";
import { DiagonalSpread } from "@/components/sections/DiagonalSpread";
import { SectionIntro } from "@/components/sections/SectionIntro";
import MDXComponents from "@/components/mdx/MDXComponents";
import {
  Resource,
  ResourceMeta,
  ResourceFormat,
  ResourceCategory,
  ProgramConfig,
} from "@/lib/program-resources";
import { cn } from "@/lib/utils";
import ResourceNavSidebar from "./ResourceNavSidebar";
import type { LucideIcon } from "lucide-react";

// ────────── Photos — final CTA ──────────
const PHOTOS = {
  finalCta: "/images/conferences/DSC01640.webp",
} as const;

// ────────── Format config ──────────
const FORMAT_CONFIG: Record<
  ResourceFormat,
  { icon: LucideIcon; color: string }
> = {
  Article: { icon: BookOpen, color: "#10b981" },
  PDF: { icon: FileText, color: "#397bce" },
  Video: { icon: Video, color: "#ef4444" },
  Worksheet: { icon: File, color: "#f97316" },
};

// ────────── Category colors (raw hex) ──────────
const CATEGORY_COLORS: Record<ResourceCategory, string> = {
  Skills: "#397bce",
  Background: "#9333ea",
  Rules: "#f97316",
  Reference: "#10b981",
  Examples: "#0ea5e9",
  Strategy: "#ef4444",
};

// ────────── Program accent colors ──────────
function getProgramAccent(type: ProgramConfig["type"]): string {
  switch (type) {
    case "mocktrial":
      return "#9333ea";
    case "mathletes":
      return "#10b981";
    default:
      return "#397bce";
  }
}

// ────────── Props ──────────
interface ResourcePageContentProps {
  resource: Resource;
  relatedResources: ResourceMeta[];
  programConfig: ProgramConfig;
}

export default function ResourcePageContent({
  resource,
  relatedResources,
  programConfig,
}: ResourcePageContentProps) {
  const t = useTranslations(programConfig.detailTranslationNamespace);
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null,
  );

  const { basePath } = programConfig;
  const accent = getProgramAccent(programConfig.type);
  const fmt = FORMAT_CONFIG[resource.format] || FORMAT_CONFIG.Article;
  const categoryColor =
    CATEGORY_COLORS[resource.category] || CATEGORY_COLORS.Skills;

  const getCategoryName = (category: string): string => {
    const categoryMap: Record<string, string> = {
      Skills: t("categorySkills"),
      Background: t("categoryBackground"),
      Rules: t("categoryRules"),
      Reference: t("categoryReference"),
      Examples: t("categoryExamples"),
      Strategy: t("categoryStrategy"),
    };
    return categoryMap[category] || category;
  };

  useEffect(() => {
    async function compileMDX() {
      const source = await serialize(resource.content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      });
      setMdxSource(source);
    }
    compileMDX();
  }, [resource.content]);

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Header ───── */}
      <section className="bg-white border-b border-black/5">
        <Container className="pt-10 md:pt-14 pb-12 md:pb-16">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href={basePath}
              className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#397bce] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span style={fontBody} className="text-sm font-medium">
                {t("allResources")}
              </span>
            </Link>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-wrap items-center gap-2 mb-5"
          >
            {/* Format badge */}
            <span
              style={{
                ...fontBody,
                backgroundColor: `${fmt.color}1a`,
                color: fmt.color,
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full"
            >
              <fmt.icon className="w-3.5 h-3.5" />
              {resource.format}
            </span>

            {/* Category badge */}
            <span
              style={{
                ...fontBody,
                backgroundColor: `${categoryColor}1a`,
                color: categoryColor,
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full"
            >
              {getCategoryName(resource.category)}
            </span>

            {/* Featured badge */}
            {resource.featured && (
              <span
                style={{
                  ...fontBody,
                  backgroundColor: "#f973161a",
                  color: "#f97316",
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full"
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                {t("featured")}
              </span>
            )}
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <Heading size="section">{resource.title}</Heading>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={fontBody}
            className={`mt-5 max-w-3xl ${bodySize.lead}`}
          >
            {resource.description}
          </motion.p>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            style={fontBody}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-sm text-neutral-500"
          >
            {resource.author && (
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {resource.author}
              </span>
            )}
            {resource.publishedAt && (
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(resource.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
            {resource.duration && (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {resource.duration}
              </span>
            )}
            {resource.pages && (
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {resource.pages} {t("pages")}
              </span>
            )}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {resource.downloadUrl && (
              <a
                href={resource.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                style={{
                  ...fontBody,
                  backgroundColor: accent,
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold rounded-full text-white hover:opacity-90 transition-opacity"
              >
                <Download className="w-4.5 h-4.5" />
                {t("downloadResource")}
              </a>
            )}
            <button
              onClick={handlePrintPDF}
              data-print-hidden="true"
              style={fontBody}
              className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold rounded-full border-2 border-black/10 text-neutral-700 hover:border-black/20 transition-colors"
            >
              <Printer className="w-4.5 h-4.5" />
              {t("saveAsPdf")}
            </button>
          </motion.div>
        </Container>
      </section>

      {/* ───── Content + Sidebar ───── */}
      <section className="bg-white">
        <div className="flex">
          {/* Sidebar */}
          <aside
            className="hidden lg:block w-64 xl:w-72 flex-shrink-0 border-r border-black/5"
            data-print-hidden="true"
          >
            <div className="sticky top-16 h-[calc(100vh-4rem)]">
              <ResourceNavSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 py-14 md:py-20 px-6 sm:px-8 lg:px-12 xl:px-16">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn(
                "prose prose-lg max-w-none",
                // Headings
                "prose-headings:text-[#0a0a0a]",
                "prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:mb-6 prose-h1:mt-10",
                "prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:pb-2 prose-h2:border-b prose-h2:border-black/5",
                "prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mb-3 prose-h3:mt-8",
                "prose-h4:text-lg prose-h4:md:text-xl prose-h4:mb-2 prose-h4:mt-6",
                // Body text
                "prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:mb-4",
                "prose-strong:text-[#0a0a0a] prose-strong:font-semibold",
                "prose-ul:text-neutral-700 prose-ul:my-4",
                "prose-ol:text-neutral-700 prose-ol:my-4",
                "prose-li:text-neutral-700 prose-li:my-1",
                // Blockquote — uses program accent
                `prose-blockquote:border-l-2 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-neutral-700 prose-blockquote:not-italic`,
                // Links — uses program accent
                "prose-a:no-underline hover:prose-a:underline",
                // Tables
                "prose-hr:my-8 prose-hr:border-black/5",
                "prose-table:w-full prose-table:border-collapse",
                "prose-th:bg-neutral-50 prose-th:border prose-th:border-black/10 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold",
                "prose-td:border prose-td:border-black/10 prose-td:px-4 prose-td:py-2",
              )}
              style={
                {
                  "--tw-prose-links": accent,
                  "--tw-prose-quotes": accent,
                  "--tw-prose-quote-borders": accent,
                } as React.CSSProperties
              }
            >
              {mdxSource ? (
                <MDXRemote {...mdxSource} components={MDXComponents} />
              ) : (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-neutral-200 rounded w-full" />
                  <div className="h-4 bg-neutral-200 rounded w-5/6" />
                  <div className="h-4 bg-neutral-200 rounded w-4/6" />
                  <div className="h-8 mt-6" />
                  <div className="h-4 bg-neutral-200 rounded w-full" />
                  <div className="h-4 bg-neutral-200 rounded w-3/4" />
                </div>
              )}
            </motion.div>

            {/* Tags */}
            {resource.tags && resource.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-12 pt-8 border-t border-black/5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-neutral-400" />
                  <span
                    style={fontBody}
                    className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.18em]"
                  >
                    {t("tags")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      style={fontBody}
                      className="px-3 py-1.5 text-sm font-medium bg-neutral-100 text-neutral-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ───── Related Resources ───── */}
      {relatedResources.length > 0 && (
        <section
          className="bg-white border-t border-black/5"
          data-print-hidden="true"
        >
          <Container className="py-14 md:py-20">
            <SectionIntro
              title={
                <>
                  {t("recommendedTitle")}
                  <span style={{ color: accent }}>
                    {t("recommendedTitleHighlight")}
                  </span>
                </>
              }
              subtitle={t("recommendedDescription")}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedResources.map((related, i) => {
                const relFmt =
                  FORMAT_CONFIG[related.format] || FORMAT_CONFIG.Article;
                return (
                  <motion.div
                    key={related.slug}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      delay: (i % 4) * 0.08,
                      duration: 0.7,
                    }}
                  >
                    <Link
                      href={`${basePath}/${related.slug}`}
                      className="group block h-full rounded-2xl border border-black/5 p-5 md:p-6 transition-colors hover:border-black/10"
                    >
                      {/* Format icon + featured */}
                      <div className="flex items-start justify-between mb-3">
                        <IconTile
                          icon={relFmt.icon}
                          color={relFmt.color}
                          size="sm"
                        />
                        {related.featured && (
                          <span
                            style={{
                              ...fontBody,
                              backgroundColor: "#f973161a",
                              color: "#f97316",
                            }}
                            className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold shrink-0 flex items-center gap-1"
                          >
                            <Star className="w-3 h-3 fill-current" />
                          </span>
                        )}
                      </div>

                      {/* Category */}
                      <p
                        style={fontBody}
                        className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.18em] mb-2"
                      >
                        {getCategoryName(related.category)}
                      </p>

                      {/* Title */}
                      <Heading
                        size="micro"
                        className="text-[#0a0a0a] group-hover:text-[#397bce] transition-colors mb-2 line-clamp-2"
                      >
                        {related.title}
                      </Heading>

                      {/* Description */}
                      <p
                        style={fontBody}
                        className={`${bodySize.micro} flex-1 line-clamp-2`}
                      >
                        {related.description}
                      </p>

                      {/* Footer */}
                      <div
                        style={fontBody}
                        className="mt-4 pt-3 border-t border-black/5"
                      >
                        <span
                          className="inline-flex items-center gap-1.5 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: accent }}
                        >
                          {t("readMore")} →
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ───── Final CTA ───── */}
      <div data-print-hidden="true">
        <DiagonalSpread
          photoSide="right"
          photoSrc={PHOTOS.finalCta}
          photoAlt={t("finalCtaPhotoAlt")}
          clip="none"
          minHeight="min-h-[70svh]"
          panelClassName="py-16 md:py-0"
        >
          <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
            {t("ctaTitle")}
            <span className="text-[#f97316]">{t("ctaTitleHighlight")}</span>
          </Heading>
          <p style={fontBody} className={`${bodySize.lead} mb-9`}>
            {t("ctaDescription")}
          </p>
          <div className="flex flex-wrap gap-3">
            <PillButton href={t("primaryButtonHref")} withArrow>
              {t("primaryButton")}
            </PillButton>
            <PillButton href={basePath} tone="outline">
              {t("browseAllButton")}
            </PillButton>
          </div>
        </DiagonalSpread>
      </div>
    </div>
  );
}
