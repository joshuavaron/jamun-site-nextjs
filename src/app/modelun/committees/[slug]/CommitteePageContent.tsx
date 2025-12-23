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
  Users,
  Globe,
  FileText,
  Download,
  BookOpen,
  Scale,
  File,
  GraduationCap,
  User,
  Flag,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui";
import MDXComponents from "@/components/mdx/MDXComponents";
import { Committee, CommitteeDocument } from "@/lib/committees";
import { cn } from "@/lib/utils";

// Shifting topic component for Ad-Hoc committee
function ShiftingTopic({ topics }: { topics: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (topics.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topics.length);
    }, 100);
    return () => clearInterval(interval);
  }, [topics.length]);

  if (topics.length === 0) return <span>CLASSIFIED</span>;

  return (
    <span className="font-mono">{topics[currentIndex]}</span>
  );
}

interface CommitteePageContentProps {
  committee: Committee;
}

const levelColors: Record<string, { bg: string; text: string; border: string }> = {
  "Beginner-Friendly": {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
  },
  Intermediate: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  Advanced: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
  },
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  "General Assembly": { bg: "bg-jamun-blue/10", text: "text-jamun-blue" },
  "Security Council": { bg: "bg-red-100", text: "text-red-600" },
  "Specialized Agency": { bg: "bg-purple-100", text: "text-purple-600" },
  "Regional Body": { bg: "bg-emerald-100", text: "text-emerald-600" },
  Crisis: { bg: "bg-amber-100", text: "text-amber-600" },
};

const documentIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "background-guide": BookOpen,
  rules: Scale,
  "position-paper": FileText,
  other: File,
};

// Helper to get country flag URL from country code
function getFlagUrl(countryCode: string): string {
  return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
}

export default function CommitteePageContent({
  committee,
}: CommitteePageContentProps) {
  const [mdxSource, setMdxSource] = useState<any>(null);

  const levelColor = levelColors[committee.level] || levelColors["Beginner-Friendly"];
  const catColor = categoryColors[committee.category] || categoryColors["General Assembly"];

  useEffect(() => {
    async function compileMDX() {
      const source = await serialize(committee.letterFromChair, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      });
      setMdxSource(source);
    }
    compileMDX();
  }, [committee.letterFromChair]);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-jamun-orange/10 to-pink-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-100/30 to-blue-100/30 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <Link
              href="/modelun/committees"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-jamun-blue transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              All Committees
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap items-center gap-2 mb-4"
              >
                <span
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full border",
                    catColor.bg,
                    catColor.text
                  )}
                >
                  <Globe className="w-4 h-4" />
                  {committee.category}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full border",
                    levelColor.bg,
                    levelColor.text,
                    levelColor.border
                  )}
                >
                  <GraduationCap className="w-4 h-4" />
                  {committee.level}
                </span>
              </motion.div>

              {/* Committee name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-2"
              >
                {committee.name}
              </motion.h1>

              {/* Abbreviation */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent mb-4"
              >
                {committee.abbreviation}
              </motion.p>

              {/* Topic */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-4"
              >
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Topic
                </p>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                  {committee.isAdHoc && committee.redHerringTopics && committee.redHerringTopics.length > 0 ? (
                    <ShiftingTopic topics={committee.redHerringTopics} />
                  ) : (
                    committee.topic
                  )}
                </h2>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="flex flex-wrap gap-6"
              >
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5 text-jamun-blue" />
                  <span>
                    <strong className="text-gray-900">{committee.delegateCount}</strong>{" "}
                    Delegates
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Flag className="w-5 h-5 text-purple-600" />
                  <span>
                    <strong className="text-gray-900">{committee.delegationSize}</strong>{" "}
                    Delegation
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  <span>
                    <strong className="text-gray-900">{committee.countries.length}</strong>{" "}
                    Countries
                  </span>
                </div>
              </motion.div>

            </motion.div>

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={committee.image || "/images/conferences/DSC00848.webp"}
                  alt={committee.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-jamun-blue/30 to-purple-400/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-purple-400/30 to-jamun-blue/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Two-Column Section: Committee Info + Letter from Chair */}
      <Section background="white" className="py-16 md:py-20">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
          {/* Left Column: Committee Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
              Committee Information
            </h2>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Topic
                </p>
                <p className="text-lg font-medium text-gray-900">
                  {committee.isAdHoc && committee.redHerringTopics && committee.redHerringTopics.length > 0 ? (
                    <ShiftingTopic topics={committee.redHerringTopics} />
                  ) : (
                    committee.topic
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Delegation Size
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    {committee.delegationSize}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Number of Delegates
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    {committee.delegateCount}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Difficulty Level
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full",
                      levelColor.bg,
                      levelColor.text
                    )}
                  >
                    <GraduationCap className="w-4 h-4" />
                    {committee.level}
                  </span>
                </div>
              </div>

              {/* Committee Executives */}
              {committee.executives.length > 0 && (
                <div className="bg-gradient-to-br from-jamun-blue/5 to-purple-50 rounded-xl p-5 border border-jamun-blue/10">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Committee Executives
                  </p>
                  <div className="space-y-3">
                    {committee.executives.map((exec, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {exec.avatar ? (
                          <Image
                            src={exec.avatar}
                            alt={exec.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-jamun-blue/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-jamun-blue" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{exec.name}</p>
                          <p className="text-sm text-gray-500">{exec.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Letter from Chair + Documents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Letter from Chair */}
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                Letter from the Chair
              </h2>
              <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900 prose-ul:text-gray-600 prose-li:text-gray-600">
                {mdxSource ? (
                  <MDXRemote {...mdxSource} components={MDXComponents} />
                ) : (
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
                  </div>
                )}
              </div>
            </div>

            {/* Committee Documents */}
            <div id="documents">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                Committee Documents
              </h2>
              {committee.documents.length > 0 ? (
                <div className="space-y-4">
                  {committee.documents.map((doc, index) => {
                    const IconComponent = documentIcons[doc.icon || "other"] || File;
                    return (
                      <motion.a
                        key={index}
                        href={doc.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        whileHover={{ y: -2 }}
                        className="group flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-200 hover:border-jamun-blue/30 hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-xl bg-jamun-blue/10 flex items-center justify-center group-hover:bg-jamun-blue/20 transition-colors">
                          <IconComponent className="w-6 h-6 text-jamun-blue" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 group-hover:text-jamun-blue transition-colors">
                            {doc.title}
                          </p>
                          {doc.description && (
                            <p className="text-sm text-gray-500 truncate">
                              {doc.description}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-jamun-blue group-hover:text-white transition-all">
                            <Download className="w-5 h-5" />
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    Documents will be uploaded soon. Check back later!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Country Assignments Section */}
      <Section background="gray" className="py-16 md:py-20">
        <SectionHeader
          eyebrow="Country Assignments"
          title="Available Delegations"
          subtitle="The following countries are available for delegation in this committee."
        />

        {committee.countries.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {committee.countries.map((country, index) => (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 text-center",
                  country.available === false && "opacity-60"
                )}
              >
                <div className="w-16 h-12 mx-auto mb-3 rounded-md overflow-hidden shadow-sm border border-gray-100 relative">
                  <Image
                    src={getFlagUrl(country.code)}
                    alt={`${country.name} flag`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <p className="font-medium text-gray-900 text-sm leading-tight">
                  {country.name}
                </p>
                {country.available === false && (
                  <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">
                    Assigned
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
            <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              Country assignments will be posted soon.
            </p>
          </div>
        )}
      </Section>

    </main>
  );
}
