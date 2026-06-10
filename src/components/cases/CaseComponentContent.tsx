"use client";

/**
 * CaseComponentContent — a single case document on its own page.
 * Header (back link + print), the rendered document, and prev/next navigation
 * across the case's components in manifest order.
 */

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Printer, Layers } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui";
import { fontBody } from "@/lib/typography";
import type { CaseComponent, CaseComponentRef, CaseManifest } from "@/lib/case-types";
import { CaseDocument } from "./CaseDocument";

interface CaseComponentContentProps {
  manifest: CaseManifest;
  component: CaseComponent;
  prev: CaseComponentRef | null;
  next: CaseComponentRef | null;
  index: number;
  total: number;
}

export function CaseComponentContent({
  manifest,
  component,
  prev,
  next,
  index,
  total,
}: CaseComponentContentProps) {
  const t = useTranslations("MockTrialCases");
  const base = `/mocktrial/case`;

  const handlePrint = () => window.print();

  return (
    <div className="bg-white text-[#0a0a0a]">
      <Container className="pt-10 md:pt-14 pb-16 md:pb-20" narrow>
        {/* Breadcrumb + actions */}
        <div
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
          data-print-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
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
          </motion.div>

          <div className="flex items-center gap-3">
            <Link
              href={`${base}/full`}
              style={fontBody}
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-[#9333ea] transition-colors"
            >
              <Layers className="w-4 h-4" />
              {t("fullCase")}
            </Link>
            <button
              onClick={handlePrint}
              style={fontBody}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full border-2 border-black/10 text-neutral-700 hover:border-black/20 transition-colors"
            >
              <Printer className="w-4 h-4" />
              {t("saveAsPdf")}
            </button>
          </div>
        </div>

        {/* Position indicator */}
        {total > 0 && index >= 0 && (
          <p
            style={fontBody}
            className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400"
            data-print-hidden="true"
          >
            {t("componentPosition", { current: index + 1, total })}
          </p>
        )}

        {/* The document */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <CaseDocument component={component} />
        </motion.div>

        {/* Prev / next */}
        {(prev || next) && (
          <nav
            className="mt-14 pt-8 border-t border-black/5 grid grid-cols-1 sm:grid-cols-2 gap-4"
            data-print-hidden="true"
            aria-label={t("documentNav")}
          >
            {prev ? (
              <Link
                href={`${base}/${prev.slug}`}
                className="group rounded-2xl border border-black/5 p-5 transition-colors hover:border-black/10"
              >
                <span
                  style={fontBody}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {t("previous")}
                </span>
                <p
                  style={fontBody}
                  className="mt-2 font-semibold text-[#0a0a0a] group-hover:text-[#9333ea] transition-colors"
                >
                  {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`${base}/${next.slug}`}
                className="group rounded-2xl border border-black/5 p-5 text-right transition-colors hover:border-black/10"
              >
                <span
                  style={fontBody}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400"
                >
                  {t("next")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <p
                  style={fontBody}
                  className="mt-2 font-semibold text-[#0a0a0a] group-hover:text-[#9333ea] transition-colors"
                >
                  {next.title}
                </p>
              </Link>
            )}
          </nav>
        )}
      </Container>
    </div>
  );
}
