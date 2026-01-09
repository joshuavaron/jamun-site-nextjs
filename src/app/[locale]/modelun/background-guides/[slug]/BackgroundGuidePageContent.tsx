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
  ArrowRight,
  BookOpen,
  Calendar,
  User,
  Printer,
  Users,
} from "lucide-react";
import { Section, Button } from "@/components/ui";
import MDXComponents from "@/components/mdx/MDXComponents";
import { BackgroundGuide } from "@/lib/background-guides";
import { Committee } from "@/lib/committees";
import { cn } from "@/lib/utils";
import ResourceNavSidebar from "@/components/resources/ResourceNavSidebar";

interface BackgroundGuidePageContentProps {
  guide: BackgroundGuide;
  committee: Committee | null;
}

export default function BackgroundGuidePageContent({
  guide,
  committee,
}: BackgroundGuidePageContentProps) {
  const t = useTranslations("BackgroundGuidePage");
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    async function compileMDX() {
      const source = await serialize(guide.content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      });
      setMdxSource(source);
    }
    compileMDX();
  }, [guide.content]);

  const handlePrintPDF = () => {
    window.print();
  };

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
    "prose-blockquote:border-l-4 prose-blockquote:border-jamun-blue prose-blockquote:bg-jamun-blue/5",
    "prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-700 prose-blockquote:italic prose-blockquote:not-italic",
    "prose-hr:my-8 prose-hr:border-gray-200",
    "prose-a:text-jamun-blue prose-a:no-underline hover:prose-a:underline",
    "prose-table:w-full prose-table:border-collapse",
    "prose-th:bg-gray-50 prose-th:border prose-th:border-gray-200 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold",
    "prose-td:border prose-td:border-gray-200 prose-td:px-4 prose-td:py-2"
  );

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50 py-16 md:py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-jamun-blue/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            {committee ? (
              <Link
                href={`/modelun/committees/${committee.slug}`}
                className="inline-flex items-center gap-2 text-gray-600 transition-colors group hover:text-jamun-blue"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                {t("backToCommittee")}: {committee.abbreviation}
              </Link>
            ) : (
              <Link
                href="/modelun/committees"
                className="inline-flex items-center gap-2 text-gray-600 transition-colors group hover:text-jamun-blue"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                {t("backToCommittees")}
              </Link>
            )}
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-2 mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full border bg-jamun-blue/10 text-jamun-blue border-jamun-blue/20">
              <BookOpen className="w-4 h-4" />
              {t("backgroundGuide")}
            </span>
            {committee && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full border bg-purple-100 text-purple-700 border-purple-200">
                <Users className="w-4 h-4" />
                {committee.abbreviation}
              </span>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4"
          >
            {guide.title}
          </motion.h1>

          {/* Committee topic if available */}
          {committee && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed"
            >
              {committee.topic}
            </motion.p>
          )}

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center gap-6 text-sm text-gray-500"
          >
            {guide.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{guide.author}</span>
              </div>
            )}
            {guide.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(guide.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {/* Print/Save as PDF button */}
            <button
              onClick={handlePrintPDF}
              data-print-hidden="true"
              className="inline-flex items-center gap-2 px-6 py-3 bg-jamun-blue text-white font-semibold rounded-full hover:bg-jamun-blue/90 transition-colors"
            >
              <Printer className="w-5 h-5" />
              {t("saveAsPdf")}
            </button>
          </motion.div>
        </div>
      </section>

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
          </div>
        </div>
      </section>

      {/* CTA Section - Link back to committee */}
      {committee && (
        <Section background="gray" className="py-16 md:py-20" data-print-hidden="true">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-jamun-blue/10">
              <Users className="w-4 h-4 text-jamun-blue" />
              <span className="text-sm font-medium text-jamun-blue">
                {committee.abbreviation}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
              {t("readyToParticipate")}{" "}
              <span className="bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent">
                {committee.name}
              </span>
            </h2>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              {t("viewCommitteeDetails")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button href={`/modelun/committees/${committee.slug}`} size="lg" className="group">
                  {t("viewCommittee")}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button href="/modelun/committees" variant="outline" size="lg">
                  {t("browseAllCommittees")}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </Section>
      )}
    </main>
  );
}
