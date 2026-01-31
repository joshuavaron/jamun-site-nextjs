"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Video,
  File,
  Star,
  Tag,
  Scale,
  Calculator,
} from "lucide-react";
import { Section, Button } from "@/components/ui";
import MDXComponents from "@/components/mdx/MDXComponents";
import { Resource, ResourceMeta, ResourceFormat, ProgramConfig } from "@/lib/program-resources";
import { cn } from "@/lib/utils";
import ResourceNavSidebar from "./ResourceNavSidebar";
import ResourceHeader from "./ResourceHeader";
import ResourceToolbar from "./ResourceToolbar";

interface ResourcePageContentProps {
  resource: Resource;
  relatedResources: ResourceMeta[];
  programConfig: ProgramConfig;
}

// Format icons - returns JSX element (needed for related resources cards)
function renderFormatIcon(format: ResourceFormat, className?: string) {
  switch (format) {
    case "Video":
      return <Video className={className} />;
    case "PDF":
      return <FileText className={className} />;
    case "Worksheet":
      return <File className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}

// Format colors (needed for related resources cards)
function getFormatColor(format: ResourceFormat) {
  switch (format) {
    case "Video":
      return { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" };
    case "PDF":
      return { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" };
    case "Worksheet":
      return { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200" };
  }
}

// Get the program icon component
function ProgramIcon({ iconName, className }: { iconName: ProgramConfig["iconName"]; className?: string }) {
  switch (iconName) {
    case "Scale":
      return <Scale className={className} />;
    case "Calculator":
      return <Calculator className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}

export default function ResourcePageContent({
  resource,
  relatedResources,
  programConfig,
}: ResourcePageContentProps) {
  const t = useTranslations(programConfig.detailTranslationNamespace);
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  const { colors, basePath, iconName } = programConfig;

  // Get translated category name
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

  // Dynamic classes based on program colors
  const getGradientTextClasses = () => cn(
    "bg-gradient-to-r bg-clip-text text-transparent",
    programConfig.type === "mocktrial"
      ? "from-purple-600 via-violet-600 to-purple-600"
      : "from-emerald-600 via-jamun-blue to-emerald-600"
  );

  const getProseClasses = () => cn(
    "prose prose-lg prose-gray max-w-none",
    "prose-headings:text-gray-900 prose-headings:font-semibold",
    "prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:mb-6 prose-h1:mt-10",
    "prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200",
    "prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mb-3 prose-h3:mt-8",
    "prose-h4:text-lg prose-h4:md:text-xl prose-h4:mb-2 prose-h4:mt-6",
    "prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4",
    "prose-strong:text-gray-900 prose-strong:font-semibold",
    "prose-ul:text-gray-600 prose-ul:my-4",
    "prose-ol:text-gray-600 prose-ol:my-4",
    "prose-li:text-gray-600 prose-li:my-1",
    // Dynamic blockquote color based on program
    programConfig.type === "mocktrial"
      ? "prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50"
      : "prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50",
    "prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-700 prose-blockquote:italic prose-blockquote:not-italic",
    "prose-hr:my-8 prose-hr:border-gray-200",
    // Dynamic link color based on program
    programConfig.type === "mocktrial"
      ? "prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline"
      : "prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline",
    "prose-table:w-full prose-table:border-collapse",
    "prose-th:bg-gray-50 prose-th:border prose-th:border-gray-200 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold",
    "prose-td:border prose-td:border-gray-200 prose-td:px-4 prose-td:py-2"
  );

  return (
    <main>
      {/* Hero Section - Header + Toolbar */}
      <ResourceHeader
        resource={resource}
        programConfig={programConfig}
        getCategoryName={getCategoryName}
        allResourcesLabel={t("allResources")}
        featuredLabel={t("featured")}
        pagesLabel={t("pages")}
      />

      {/* Toolbar sits within the hero gradient area - render in a continuation section */}
      <div className={cn(
        "bg-gradient-to-br pb-8",
        colors.gradientFrom,
        colors.gradientVia,
        colors.gradientTo
      )}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ResourceToolbar
            resource={resource}
            programConfig={programConfig}
            downloadLabel={t("downloadResource")}
            saveAsPdfLabel={t("saveAsPdf")}
          />
        </div>
      </div>

      {/* Content Section with Sidebar */}
      <section className="bg-white">
        <div className="flex">
          {/* Left Sidebar - Navigation */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 bg-gray-50/50" data-print-hidden="true">
            <div className="sticky top-16 h-[calc(100vh-4rem)]">
              <ResourceNavSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 py-16 md:py-20 px-6 sm:px-8 lg:px-12 xl:px-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={getProseClasses()}
              >
                {mdxSource ? (
                  <MDXRemote {...mdxSource} components={MDXComponents} />
                ) : (
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3 mt-8" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                  </div>
                )}
              </motion.div>

              {/* Tags */}
              {resource.tags && resource.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="mt-12 pt-8 border-t border-gray-200"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      {t("tags")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-600 rounded-full"
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

      {/* Recommended Resources Section */}
      {relatedResources.length > 0 && (
        <Section background="gray" className="py-16 md:py-20" data-print-hidden="true">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <p className={cn("text-sm font-semibold uppercase tracking-widest mb-4", colors.primaryText)}>
                {t("continueLearningEyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                {t("recommendedTitle")}
                <span className={getGradientTextClasses()}>
                  {t("recommendedTitleHighlight")}
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("recommendedDescription")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedResources.map((related, index) => {
                const relatedFormatColor = getFormatColor(related.format);
                return (
                  <motion.div
                    key={related.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`${basePath}/${related.slug}`}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                      >
                        {/* Header: Format Icon + Featured Badge */}
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className={cn(
                              "w-9 h-9 rounded-lg flex items-center justify-center",
                              relatedFormatColor.bg,
                              relatedFormatColor.text
                            )}
                          >
                            {renderFormatIcon(related.format, "w-4 h-4")}
                          </div>
                          {related.featured && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
                              <Star className="w-3 h-3" />
                            </span>
                          )}
                        </div>

                        {/* Category */}
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          {getCategoryName(related.category)}
                        </p>

                        {/* Title */}
                        <h4 className={cn(
                          "text-base font-semibold text-gray-900 mb-2 transition-colors line-clamp-2",
                          `group-hover:${colors.primaryText}`
                        )}>
                          {related.title}
                        </h4>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-2">
                          {related.description.split(".")[0]}.
                        </p>

                        {/* Arrow indicator */}
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <span className={cn(
                            "inline-flex items-center text-sm font-medium",
                            colors.primaryText
                          )}>
                            {t("readMore")}
                            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </Section>
      )}

      {/* CTA Section */}
      <Section background="white" className="py-16 md:py-20" data-print-hidden="true">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className={cn("inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full", colors.primaryBgLight)}>
            <ProgramIcon iconName={iconName} className={cn("w-4 h-4", colors.primaryText)} />
            <span className={cn("text-sm font-medium", colors.primaryTextLight)}>
              {t("ctaBadge")}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
            {t("ctaTitle")}
            <span className={getGradientTextClasses()}>
              {t("ctaTitleHighlight")}
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {t("ctaDescription")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href={t("primaryButtonHref")} size="lg" className="group">
                {t("primaryButton")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href={basePath} variant="outline" size="lg">
                {t("browseAllButton")}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Section>
    </main>
  );
}
