"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Globe,
  FileText,
  Download,
  BookOpen,
  Scale,
  File,
  GraduationCap,
  User,
} from "lucide-react";
import { Container, Heading, IconTile } from "@/components/ui";
import { fontBody, fontHeading, bodySize } from "@/lib/typography";
import { DiagonalSpread } from "@/components/sections/DiagonalSpread";
import { SectionIntro } from "@/components/sections/SectionIntro";
import MDXComponents from "@/components/mdx/MDXComponents";
import type { Committee } from "@/lib/committees";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

// ────────── ShiftingTopic for Ad-Hoc committees ──────────
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

  return <span className="font-mono">{topics[currentIndex]}</span>;
}

// ────────── Color helpers ──────────
const CATEGORY_HEX: Record<string, string> = {
  "General Assembly": "#397bce",
  "Security Council": "#ef4444",
  "Specialized Agency": "#9333ea",
  "Regional Body": "#10b981",
  Crisis: "#f97316",
};

const LEVEL_HEX: Record<string, string> = {
  "Beginner-Friendly": "#10b981",
  Intermediate: "#f97316",
  Advanced: "#ef4444",
};

const documentIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "background-guide": BookOpen,
  rules: Scale,
  "position-paper": FileText,
  other: File,
};

function getFlagUrl(countryCode: string): string {
  return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
}

// ────────── Component ──────────

interface CommitteePageContentProps {
  committee: Committee;
}

export default function CommitteePageContent({
  committee,
}: CommitteePageContentProps) {
  const t = useTranslations("CommitteeDetailPage");
  const [mdxSource, setMdxSource] =
    useState<MDXRemoteSerializeResult | null>(null);

  const catHex = CATEGORY_HEX[committee.category] || "#397bce";
  const lvlHex = LEVEL_HEX[committee.level] || "#10b981";

  const getLevelName = (level: string): string => {
    switch (level) {
      case "Beginner-Friendly":
        return t("levelBeginnerFriendly");
      case "Intermediate":
        return t("levelIntermediate");
      case "Advanced":
        return t("levelAdvanced");
      default:
        return level;
    }
  };

  const getCategoryName = (category: string): string => {
    switch (category) {
      case "General Assembly":
        return t("categoryGeneralAssembly");
      case "Security Council":
        return t("categorySecurityCouncil");
      case "Specialized Agency":
        return t("categorySpecializedAgency");
      case "Regional Body":
        return t("categoryRegionalBody");
      case "Crisis":
        return t("categoryCrisis");
      default:
        return category;
    }
  };

  useEffect(() => {
    async function compileMDX() {
      const source = await serialize(committee.letterFromChair, {
        mdxOptions: { remarkPlugins: [remarkGfm] },
      });
      setMdxSource(source);
    }
    compileMDX();
  }, [committee.letterFromChair]);

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={committee.image || "/images/conferences/DSC00848.webp"}
        photoAlt={committee.name}
        photoPriority
        minHeight="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        {/* Back link */}
        <Link
          href="/modelun/committees"
          style={fontBody}
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-[#397bce] transition-colors group mb-6"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {t("backLink")}
        </Link>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span
            style={{
              ...fontBody,
              backgroundColor: `${catHex}1a`,
              color: catHex,
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full"
          >
            <Globe className="w-3.5 h-3.5" />
            {getCategoryName(committee.category)}
          </span>
          <span
            style={{
              ...fontBody,
              backgroundColor: `${lvlHex}1a`,
              color: lvlHex,
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            {getLevelName(committee.level)}
          </span>
        </div>

        {/* Committee name */}
        <Heading size="hero">{committee.name}</Heading>

        {/* Abbreviation */}
        <span
          style={{ ...fontHeading, fontWeight: 600 }}
          className="block mt-1 text-2xl md:text-3xl text-[#397bce]"
        >
          {committee.abbreviation}
        </span>

        {/* Topic */}
        <div className="mt-5">
          <span
            style={fontBody}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500"
          >
            {t("topic")}
          </span>
          <p
            style={fontBody}
            className={`mt-1 max-w-lg ${bodySize.lead} font-medium`}
          >
            {committee.isAdHoc &&
            committee.redHerringTopics &&
            committee.redHerringTopics.length > 0 ? (
              <ShiftingTopic topics={committee.redHerringTopics} />
            ) : (
              committee.topic
            )}
          </p>
        </div>

        {/* Quick stats */}
        <div
          style={fontBody}
          className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-neutral-500"
        >
          <span>
            <strong className="text-[#0a0a0a]">
              {committee.delegateCount}
            </strong>{" "}
            {t("delegates")}
          </span>
          <span className="text-neutral-300">·</span>
          <span>
            <strong className="text-[#0a0a0a]">
              {committee.delegationSize}
            </strong>{" "}
            {t("delegation")}
          </span>
          <span className="text-neutral-300">·</span>
          <span>
            <strong className="text-[#0a0a0a]">
              {committee.countries.length}
            </strong>{" "}
            {t("countries")}
          </span>
        </div>
      </DiagonalSpread>

      {/* ───── Committee Info + Letter from Chair ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
            {/* Left column: Committee information */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <Heading size="cardLg" className="mb-8">
                {t("committeeInformation")}
              </Heading>

              <div className="space-y-4">
                {/* Topic card */}
                <div className="rounded-2xl border border-black/5 p-5">
                  <p
                    style={fontBody}
                    className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.18em] mb-1"
                  >
                    {t("topic")}
                  </p>
                  <p
                    style={fontBody}
                    className="text-base font-medium text-[#0a0a0a]"
                  >
                    {committee.isAdHoc &&
                    committee.redHerringTopics &&
                    committee.redHerringTopics.length > 0 ? (
                      <ShiftingTopic topics={committee.redHerringTopics} />
                    ) : (
                      committee.topic
                    )}
                  </p>
                </div>

                {/* Delegation size + count */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-black/5 p-5">
                    <p
                      style={fontBody}
                      className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.18em] mb-1"
                    >
                      {t("delegationSize")}
                    </p>
                    <p
                      style={fontBody}
                      className="text-base font-medium text-[#0a0a0a]"
                    >
                      {committee.delegationSize}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-black/5 p-5">
                    <p
                      style={fontBody}
                      className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.18em] mb-1"
                    >
                      {t("numberOfDelegates")}
                    </p>
                    <p
                      style={fontBody}
                      className="text-base font-medium text-[#0a0a0a]"
                    >
                      {committee.delegateCount}
                    </p>
                  </div>
                </div>

                {/* Difficulty */}
                <div className="rounded-2xl border border-black/5 p-5">
                  <p
                    style={fontBody}
                    className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.18em] mb-2"
                  >
                    {t("difficultyLevel")}
                  </p>
                  <span
                    style={{
                      ...fontBody,
                      backgroundColor: `${lvlHex}1a`,
                      color: lvlHex,
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-semibold rounded-full"
                  >
                    <GraduationCap className="w-4 h-4" />
                    {getLevelName(committee.level)}
                  </span>
                </div>

                {/* Committee Executives */}
                {committee.executives.length > 0 && (
                  <div
                    className="rounded-2xl border border-black/5 p-5"
                    style={{ backgroundColor: `${catHex}08` }}
                  >
                    <p
                      style={fontBody}
                      className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.18em] mb-4"
                    >
                      {t("committeeExecutives")}
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
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${catHex}1a` }}
                            >
                              <User
                                className="w-5 h-5"
                                style={{ color: catHex }}
                              />
                            </div>
                          )}
                          <div>
                            <p
                              style={fontBody}
                              className="font-medium text-[#0a0a0a]"
                            >
                              {exec.name}
                            </p>
                            <p
                              style={fontBody}
                              className="text-sm text-neutral-500"
                            >
                              {exec.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right column: Letter from Chair + Documents */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
            >
              {/* Letter from Chair */}
              <div className="mb-10">
                <Heading size="cardLg" className="mb-6">
                  {t("letterFromChair")}
                </Heading>
                <div className="prose prose-neutral max-w-none prose-headings:text-[#0a0a0a] prose-p:text-neutral-700 prose-strong:text-[#0a0a0a] prose-ul:text-neutral-700 prose-li:text-neutral-700">
                  {mdxSource ? (
                    <MDXRemote {...mdxSource} components={MDXComponents} />
                  ) : (
                    <div className="space-y-4">
                      <div className="h-4 bg-neutral-200 rounded animate-pulse" />
                      <div className="h-4 bg-neutral-200 rounded animate-pulse w-5/6" />
                      <div className="h-4 bg-neutral-200 rounded animate-pulse w-4/6" />
                    </div>
                  )}
                </div>
              </div>

              {/* Committee Documents */}
              <div id="documents">
                <Heading size="cardLg" className="mb-6">
                  {t("committeeDocuments")}
                </Heading>
                {committee.backgroundGuide || committee.documents.length > 0 ? (
                  <div className="space-y-3">
                    {/* Background Guide */}
                    {committee.backgroundGuide && (
                      <Link
                        href={`/modelun/background-guides/${committee.backgroundGuide}`}
                        className="group flex items-center gap-4 rounded-2xl border border-black/5 p-5 transition-colors hover:border-black/10"
                      >
                        <IconTile
                          icon={BookOpen}
                          color="#397bce"
                          size="sm"
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            style={fontBody}
                            className="font-semibold text-[#0a0a0a] group-hover:text-[#397bce] transition-colors"
                          >
                            {t("backgroundGuide")}
                          </p>
                          <p
                            style={fontBody}
                            className="text-sm text-neutral-500 truncate"
                          >
                            {t("backgroundGuideDescription")}
                          </p>
                        </div>
                        <span
                          style={fontBody}
                          className="text-sm font-semibold text-[#397bce] shrink-0"
                        >
                          →
                        </span>
                      </Link>
                    )}

                    {/* Other Documents (PDF downloads) */}
                    {committee.documents.map((doc, index) => {
                      const IconComponent =
                        documentIcons[doc.icon || "other"] || File;
                      return (
                        <a
                          key={index}
                          href={doc.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="group flex items-center gap-4 rounded-2xl border border-black/5 p-5 transition-colors hover:border-black/10"
                        >
                          <IconTile
                            icon={IconComponent}
                            color="#397bce"
                            size="sm"
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              style={fontBody}
                              className="font-semibold text-[#0a0a0a] group-hover:text-[#397bce] transition-colors"
                            >
                              {doc.title}
                            </p>
                            {doc.description && (
                              <p
                                style={fontBody}
                                className="text-sm text-neutral-500 truncate"
                              >
                                {doc.description}
                              </p>
                            )}
                          </div>
                          <Download className="w-5 h-5 text-neutral-400 group-hover:text-[#397bce] transition-colors shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-black/5 p-8 text-center">
                    <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                    <p style={fontBody} className="text-neutral-500">
                      {t("documentsComingSoon")}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ───── Country Assignments ───── */}
      <section className="bg-white border-t border-black/5">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("countryAssignmentsTitle")}
            subtitle={t("countryAssignmentsSubtitle")}
          />

          {committee.countries.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {committee.countries.map((country, index) => (
                <motion.div
                  key={country.code}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 6) * 0.03, duration: 0.6 }}
                  className={cn(
                    "rounded-2xl border border-black/5 p-4 text-center",
                    country.available === false && "opacity-60"
                  )}
                >
                  <div className="w-16 h-12 mx-auto mb-3 rounded-md overflow-hidden border border-black/5 relative">
                    <Image
                      src={getFlagUrl(country.code)}
                      alt={`${country.name} flag`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <p
                    style={fontBody}
                    className="font-medium text-[#0a0a0a] text-sm leading-tight"
                  >
                    {country.name}
                  </p>
                  {country.available === false && (
                    <span
                      style={{
                        ...fontBody,
                        backgroundColor: "#0a0a0a0d",
                        color: "#737373",
                      }}
                      className="inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full"
                    >
                      {t("assigned")}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-black/5 p-8 text-center">
              <Globe className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p style={fontBody} className={bodySize.base}>
                {t("countryAssignmentsComingSoon")}
              </p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
