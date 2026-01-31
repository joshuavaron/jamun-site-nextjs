"use client";

/**
 * FinalDraftLayer - Layer 1: Final Position Paper
 *
 * Per PP-Writer.md: The grand finale with satisfying assembly
 *
 * Features:
 * - Live preview: Watch paper assemble as Layer 2 fills in
 * - Section highlighting: Click section to jump to its L2 input
 * - Conclusion helper: "Help me summarize" button (Mode 4) with typing animation
 * - Edit mode: Toggle to directly edit assembled paper
 * - Export options: Copy, download as .txt, word count
 * - Visual completion: Progress ring showing paper completeness
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Lightbulb,
  Copy,
  Check,
  Download,
  Eye,
  Edit3,
  HelpCircle,
  FileText,
} from "lucide-react";
import { fadeInUp, defaultViewport } from "@/lib/animations";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useBGWriter } from "../BGWriterContext";
import { AIAssistButton } from "../AIAssistButton";
import { generatePositionPaperTemplate } from "@/lib/bg-writer/templates";
import { PARAGRAPH_ORDER, PARAGRAPH_LABELS } from "@/lib/bg-writer/questions";
import type { ParagraphType } from "@/lib/bg-writer/types";

type ViewMode = "preview" | "edit";

// Progress ring component
function ProgressRing({
  progress,
  size = 60,
  strokeWidth = 6,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="-rotate-90 transform"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={cn(
            progress === 100
              ? "text-green-500"
              : progress >= 50
              ? "text-amber-500"
              : "text-jamun-blue"
          )}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-gray-700">{progress}%</span>
      </div>
    </div>
  );
}

/**
 * Renders markdown-like content as styled HTML with clickable sections
 */
function RenderedPaper({
  content,
  onSectionClick,
}: {
  content: string;
  onSectionClick?: (paragraph: ParagraphType) => void;
}) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentKey = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) continue;

    // Main title (# heading)
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1
          key={currentKey++}
          className="mb-2 text-center text-2xl font-bold text-gray-900 md:text-3xl"
        >
          {trimmed.slice(2)}
        </h1>
      );
      continue;
    }

    // Section headers (## heading) - make clickable
    if (trimmed.startsWith("## ")) {
      const sectionName = trimmed.slice(3).toLowerCase();
      const paragraph = PARAGRAPH_ORDER.find(
        (p) => PARAGRAPH_LABELS[p].toLowerCase() === sectionName
      );

      elements.push(
        <h2
          key={currentKey++}
          onClick={() => paragraph && onSectionClick?.(paragraph)}
          className={cn(
            "mb-3 mt-8 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800",
            paragraph && onSectionClick && "cursor-pointer hover:text-jamun-blue"
          )}
        >
          {trimmed.slice(3)}
        </h2>
      );
      continue;
    }

    // Subsection headers (### heading)
    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3
          key={currentKey++}
          className="mb-2 mt-6 text-lg font-medium text-gray-700"
        >
          {trimmed.slice(4)}
        </h3>
      );
      continue;
    }

    // Horizontal rule
    if (trimmed === "---") {
      elements.push(<hr key={currentKey++} className="my-6 border-gray-200" />);
      continue;
    }

    // Bold metadata lines
    if (trimmed.startsWith("**") && trimmed.includes(":**")) {
      const match = trimmed.match(/^\*\*(.+?):\*\*\s*(.*)$/);
      if (match) {
        elements.push(
          <p key={currentKey++} className="text-center text-gray-600">
            <strong className="font-semibold text-gray-800">{match[1]}:</strong>{" "}
            {match[2]}
          </p>
        );
        continue;
      }
    }

    // Italic footer
    if (trimmed.startsWith("*") && trimmed.endsWith("*") && !trimmed.startsWith("**")) {
      elements.push(
        <p
          key={currentKey++}
          className="mt-8 text-center text-sm italic text-gray-500"
        >
          {trimmed.slice(1, -1)}
        </p>
      );
      continue;
    }

    // Placeholder text (in brackets)
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      elements.push(
        <p
          key={currentKey++}
          className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center italic text-gray-400"
        >
          {trimmed.slice(1, -1)}
        </p>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={currentKey++} className="mb-4 leading-relaxed text-gray-700">
        {trimmed}
      </p>
    );
  }

  return (
    <article className="prose prose-gray max-w-none">{elements}</article>
  );
}

export function FinalDraftLayer() {
  const t = useTranslations("BGWriter");
  const {
    draft,
    updateFinalPaper,
    setCurrentLayer,
    generateConclusionDraft,
    aiLoading,
  } = useBGWriter();

  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [conclusionDraft, setConclusionDraft] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const template = draft ? generatePositionPaperTemplate(draft, t) : "";
  const content = draft?.layers.finalPaper || "";
  const displayContent = content || template;

  // Calculate completion percentage based on Layer 2 fields
  const completionPercent = useCallback((): number => {
    if (!draft) return 0;

    const l2 = draft.layers.paragraphComponents;
    const fields = Object.values(l2);
    const filled = fields.filter((v) => v?.trim()).length;
    const total = 24; // Total L2 sections per spec

    return Math.round((filled / total) * 100);
  }, [draft]);

  // Word count
  const plainText = displayContent
    .replace(/^#{1,3}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/^---$/gm, "")
    .replace(/\[|\]/g, "");

  const wordCount = plainText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current && viewMode === "edit") {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(400, textareaRef.current.scrollHeight)}px`;
    }
  }, [displayContent, viewMode]);

  const handleCopy = async () => {
    const plainVersion = displayContent
      .replace(/^#{1,3}\s+/gm, "")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/^---$/gm, "\n")
      .replace(/\n{3,}/g, "\n\n");

    await navigator.clipboard.writeText(plainVersion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const plainVersion = displayContent
      .replace(/^#{1,3}\s+/gm, "")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/^---$/gm, "\n")
      .replace(/\n{3,}/g, "\n\n");

    const blob = new Blob([plainVersion], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `position-paper-${draft?.country || "draft"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleChange = (value: string) => {
    updateFinalPaper(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSectionClick = (_paragraph: ParagraphType) => {
    setCurrentLayer("paragraphComponents");
    // TODO: Scroll to the specific paragraph section after layer switch.
    // Requires cross-layer state (e.g., a scrollTarget in the store) so
    // ParagraphComponentsLayer can pick it up on mount and scrollIntoView.
  };

  const handleGenerateConclusion = async () => {
    const result = await generateConclusionDraft();
    return {
      success: result.success,
      result: result.draft,
      error: result.error,
    };
  };

  if (!draft) return null;

  const progress = completionPercent();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      viewport={defaultViewport}
      className="space-y-6"
    >
      {/* Header with progress */}
      <div className="flex flex-col gap-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {t("finalPaperTitle")}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {t("finalPaperDescription")}
            </p>
          </div>
        </div>
        <ProgressRing progress={progress} />
      </div>

      {/* Conclusion helper */}
      <div className="rounded-xl border border-pink-200 bg-pink-50 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-pink-600" />
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                {t("needHelpWithConclusion")}
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                {t("conclusionHelperDescription")}
              </p>
            </div>
          </div>
          <AIAssistButton
            mode="draftConclusion"
            onTrigger={handleGenerateConclusion}
            disabled={aiLoading.draftingConclusion || progress < 30}
            disabledMessage={progress < 30 ? t("fillMoreSectionsFirst") : undefined}
            showResultInline={true}
            onResult={(result) => setConclusionDraft(result)}
          />
        </div>

        {/* Show draft conclusion */}
        <AnimatePresence>
          {conclusionDraft && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 overflow-hidden"
            >
              <div className="rounded-lg bg-white p-3 shadow-sm">
                <p className="text-sm font-medium text-gray-700">
                  {t("suggestedConclusion")}:
                </p>
                <p className="mt-1 text-sm italic text-gray-600">
                  &ldquo;{conclusionDraft}&rdquo;
                </p>
                <button
                  onClick={() => {
                    // Insert into conclusion section
                    // For now, just copy to clipboard
                    navigator.clipboard.writeText(conclusionDraft);
                  }}
                  className="mt-2 text-xs text-jamun-blue hover:underline"
                >
                  {t("copyThisConclusion")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Editor card */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              {t("finalDraftTemplate.title", { country: draft.country || "___" })}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {t("finalDraftTemplate.wordCount", { count: wordCount })}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* View mode toggle */}
            <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-1">
              <button
                onClick={() => setViewMode("preview")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  viewMode === "preview"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Eye className="h-4 w-4" />
                {t("actions.preview")}
              </button>
              <button
                onClick={() => setViewMode("edit")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  viewMode === "edit"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Edit3 className="h-4 w-4" />
                {t("actions.edit")}
              </button>
            </div>

            <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-2">
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  {t("actions.copied")}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  {t("actions.copyToClipboard")}
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {t("actions.download")}
            </Button>
          </div>
        </div>

        {/* Content area */}
        <div className="p-6">
          {viewMode === "preview" ? (
            <div className="rounded-lg border border-gray-100 bg-gradient-to-b from-white to-gray-50/50 p-6 shadow-inner md:p-8 lg:p-10">
              <RenderedPaper
                content={displayContent}
                onSectionClick={handleSectionClick}
              />
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={displayContent}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={t("finalDraftTemplate.placeholder")}
              className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm leading-relaxed text-gray-900 focus:border-jamun-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-jamun-blue/20"
              style={{ minHeight: "400px" }}
            />
          )}
        </div>

        {/* Footer with metadata */}
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
            <span>
              <strong>{t("finalDraftTemplate.committeeLabel")}:</strong>{" "}
              {draft.committee || "—"}
            </span>
            <span>
              <strong>{t("finalDraftTemplate.topicLabel")}:</strong>{" "}
              {draft.topic || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Section quick links */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
          <FileText className="h-4 w-4" />
          {t("quickJumpToSection")}
        </h4>
        <div className="flex flex-wrap gap-2">
          {PARAGRAPH_ORDER.map((paragraph) => (
            <button
              key={paragraph}
              onClick={() => handleSectionClick(paragraph)}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-jamun-blue hover:bg-jamun-blue/5 hover:text-jamun-blue"
            >
              {PARAGRAPH_LABELS[paragraph]}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default FinalDraftLayer;
