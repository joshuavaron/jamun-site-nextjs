"use client";

/**
 * CaseFullContent — the entire case packet on one page, in manifest order.
 * Caption + contents list + every component concatenated, with a single
 * "print whole packet" action. The legal print stylesheet page-breaks between
 * each `.case-component`, so one browser print produces the full PDF.
 */

import { motion } from "framer-motion";
import { ArrowLeft, Printer, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Heading } from "@/components/ui";
import { fontBody, fontSerif } from "@/lib/typography";
import type { FullCase } from "@/lib/case-types";
import { CaseCaption } from "./CaseCaption";
import { CaseDocument } from "./CaseDocument";
import { componentTypeConfig } from "./case-ui";

export function CaseFullContent({ fullCase }: { fullCase: FullCase }) {
  const t = useTranslations("MockTrialCases");
  const { manifest, components } = fullCase;
  const base = `/mocktrial/case`;

  const handlePrint = () => window.print();

  return (
    <div className="bg-white text-[#0a0a0a]">
      <Container className="pt-10 md:pt-14 pb-16 md:pb-20" narrow>
        {/* Breadcrumb + actions */}
        <div
          className="mb-10 flex flex-wrap items-center justify-between gap-4"
          data-print-hidden="true"
        >
          <Link
            href={base}
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#9333ea] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span style={fontBody} className="text-sm font-medium">
              {manifest.shortTitle || manifest.title}
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {manifest.downloadUrl && (
              <a
                href={manifest.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                style={{ ...fontBody, backgroundColor: "#9333ea" }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full text-white hover:opacity-90 transition-opacity"
              >
                <Download className="w-4 h-4" />
                {t("downloadPdf")}
              </a>
            )}
            <button
              onClick={handlePrint}
              style={fontBody}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full border-2 border-black/10 text-neutral-700 hover:border-black/20 transition-colors"
            >
              <Printer className="w-4 h-4" />
              {t("printFullCase")}
            </button>
          </div>
        </div>

        {/* Packet title (print-friendly) */}
        <div className="mb-8 text-center">
          <p
            style={fontBody}
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-3"
          >
            {t("fullCaseLabel")}
          </p>
          <Heading size="section" className="text-[#0a0a0a]">
            {manifest.title}
          </Heading>
        </div>

        <CaseCaption caption={manifest.caption} caseType={manifest.caseType} className="mb-12" />

        {/* Contents */}
        <nav
          className="mb-14 rounded-2xl border border-black/5 bg-neutral-50/50 px-6 py-6 md:px-8 md:py-7"
          aria-label={t("contents")}
        >
          <p
            style={fontBody}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400 mb-4"
          >
            {t("contents")}
          </p>
          <ol className="space-y-2">
            {components.map((c, i) => {
              const cfg = componentTypeConfig(c.type);
              return (
                <li key={c.slug}>
                  <a
                    href={`#${c.slug}`}
                    style={fontBody}
                    className="group flex items-baseline gap-3 text-neutral-700 hover:text-[#9333ea] transition-colors"
                  >
                    <span className="tabular-nums text-sm text-neutral-400 w-6 shrink-0">
                      {i + 1}.
                    </span>
                    <span className="font-medium">{c.title}</span>
                    <span
                      style={{ color: cfg.color }}
                      className="text-[11px] uppercase tracking-[0.14em] opacity-70"
                    >
                      {t(cfg.labelKey)}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Intro / overview */}
        {manifest.intro?.trim() && (
          <p style={fontSerif} className="mb-14 text-lg md:text-xl leading-relaxed text-neutral-700">
            {manifest.description}
          </p>
        )}

        {/* Every document, in order */}
        <div className="space-y-16 md:space-y-20">
          {components.map((component, i) => (
            <motion.div
              key={component.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: Math.min(i, 3) * 0.05 }}
            >
              <CaseDocument component={component} />
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
