"use client";

/**
 * CaseLandingContent — the case overview page.
 * Caption, charges, cast of characters, and a table-of-contents grid linking to
 * each component, plus a "read full case" entry point. Components are the source
 * of truth — this page derives everything from the manifest.
 */

import { motion } from "framer-motion";
import { ArrowLeft, Layers, Download, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Heading, PillButton, IconTile } from "@/components/ui";
import { fontBody, fontSerif, bodySize } from "@/lib/typography";
import type { CaseManifest } from "@/lib/case-types";
import { CaseCaption } from "./CaseCaption";
import { componentTypeConfig, SIDE_CONFIG } from "./case-ui";

export function CaseLandingContent({ manifest }: { manifest: CaseManifest }) {
  const t = useTranslations("MockTrialCases");
  const base = `/mocktrial/case`;

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Header ───── */}
      <section className="bg-white border-b border-black/5">
        <Container className="pt-10 md:pt-14 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/mocktrial"
              className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#9333ea] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span style={fontBody} className="text-sm font-medium">
                {t("backToMockTrial")}
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Heading size="hero" className="text-[#0a0a0a]">
              {manifest.title}
            </Heading>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            style={fontBody}
            className={`mt-5 max-w-2xl ${bodySize.lead}`}
          >
            {manifest.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <PillButton href={`${base}/full`} tone="custom" color="#9333ea" withArrow>
              {t("readFullCase")}
            </PillButton>
            {manifest.downloadUrl && (
              <a
                href={manifest.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                style={fontBody}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold rounded-full border-2 border-black/10 text-neutral-700 hover:border-black/20 transition-colors"
              >
                <Download className="w-4 h-4" />
                {t("downloadPacket")}
              </a>
            )}
          </motion.div>
        </Container>
      </section>

      {/* ───── Caption ───── */}
      <section className="bg-white">
        <Container className="pt-12 md:pt-16">
          <CaseCaption caption={manifest.caption} caseType={manifest.caseType} />
        </Container>
      </section>

      {/* ───── Charges + Cast ───── */}
      <section className="bg-white">
        <Container className="py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Charges */}
            {manifest.charges && manifest.charges.length > 0 && (
              <div>
                <h2
                  style={fontBody}
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-5"
                >
                  {t("charges")}
                </h2>
                <ul className="space-y-4">
                  {manifest.charges.map((charge, i) => (
                    <li
                      key={i}
                      className="rounded-xl border border-black/5 bg-neutral-50/50 px-5 py-4"
                    >
                      {charge.count && (
                        <span
                          style={fontBody}
                          className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b91c1c]"
                        >
                          {charge.count}
                        </span>
                      )}
                      <p style={fontSerif} className="mt-1 text-lg text-[#0a0a0a]">
                        {charge.title}
                      </p>
                      {charge.statute && (
                        <p
                          style={fontBody}
                          className="mt-1 text-sm text-neutral-500 tabular-nums"
                        >
                          {charge.statute}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cast */}
            {manifest.cast && manifest.cast.length > 0 && (
              <div>
                <h2
                  style={fontBody}
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-5"
                >
                  {t("cast")}
                </h2>
                <ul className="space-y-3">
                  {manifest.cast.map((member, i) => {
                    const sideCfg = SIDE_CONFIG[member.side ?? "neutral"];
                    return (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-4 rounded-xl border border-black/5 px-5 py-3.5"
                      >
                        <div>
                          <p style={fontBody} className="font-semibold text-[#0a0a0a]">
                            {member.name}
                          </p>
                          <p style={fontBody} className="text-sm text-neutral-500">
                            {member.role}
                          </p>
                        </div>
                        {member.side && (
                          <span
                            style={{
                              ...fontBody,
                              backgroundColor: `${sideCfg.color}1a`,
                              color: sideCfg.color,
                            }}
                            className="shrink-0 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full"
                          >
                            {t(sideCfg.labelKey)}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ───── Documents (TOC grid) ───── */}
      <section className="bg-white border-t border-black/5">
        <Container className="py-14 md:py-20">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2
                style={fontBody}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-2"
              >
                {t("caseDocuments")}
              </h2>
              <p style={fontSerif} className="text-2xl md:text-3xl text-[#0a0a0a]">
                {t("documentsCount", { count: manifest.components.length })}
              </p>
            </div>
            <Link
              href={`${base}/full`}
              style={fontBody}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#9333ea] hover:opacity-80 transition-opacity"
            >
              <Layers className="w-4 h-4" />
              {t("readFullCase")}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manifest.components.map((c, i) => {
              const cfg = componentTypeConfig(c.type);
              const sideCfg = SIDE_CONFIG[c.side ?? "neutral"];
              return (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
                >
                  <Link
                    href={`${base}/${c.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-black/5 p-6 transition-colors hover:border-black/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <IconTile icon={cfg.icon} color={cfg.color} size="sm" />
                      {c.side && c.side !== "neutral" && (
                        <span
                          style={{
                            ...fontBody,
                            backgroundColor: `${sideCfg.color}1a`,
                            color: sideCfg.color,
                          }}
                          className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] rounded-full"
                        >
                          {t(sideCfg.labelKey)}
                        </span>
                      )}
                    </div>
                    <p
                      style={{ ...fontBody, color: cfg.color }}
                      className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-2"
                    >
                      {t(cfg.labelKey)}
                    </p>
                    <Heading size="micro" className="text-[#0a0a0a] group-hover:text-[#9333ea] transition-colors mb-2">
                      {c.title}
                    </Heading>
                    {c.description && (
                      <p style={fontBody} className={`${bodySize.micro} line-clamp-2`}>
                        {c.description}
                      </p>
                    )}
                    <span
                      style={fontBody}
                      className="mt-4 pt-3 border-t border-black/5 inline-flex items-center gap-1.5 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#9333ea]" />
                      <span className="text-[#9333ea]">{t("readDocument")} →</span>
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
