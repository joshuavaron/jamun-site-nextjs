"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Lightbulb, Copy, Check, Download, Eye, Edit3 } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useBGWriter } from "../BGWriterContext";
import { generatePositionPaperTemplate } from "@/lib/bg-writer/templates";

type ViewMode = "preview" | "edit";

/**
 * Renders markdown-like content as styled HTML
 */
function RenderedPaper({ content }: {
  content: string;
}) {
  // Parse the markdown-ish content into sections
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentKey = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines (we handle spacing with CSS)
    if (!trimmed) continue;

    // Main title (# heading)
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={currentKey++} className="mb-2 text-center text-2xl font-bold text-gray-900 md:text-3xl">
          {trimmed.slice(2)}
        </h1>
      );
      continue;
    }

    // Section headers (## heading)
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={currentKey++} className="mb-3 mt-8 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800">
          {trimmed.slice(3)}
        </h2>
      );
      continue;
    }

    // Subsection headers (### heading)
    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={currentKey++} className="mb-2 mt-6 text-lg font-medium text-gray-700">
          {trimmed.slice(4)}
        </h3>
      );
      continue;
    }

    // Horizontal rule
    if (trimmed === "---") {
      elements.push(
        <hr key={currentKey++} className="my-6 border-gray-200" />
      );
      continue;
    }

    // Bold metadata lines (like **Committee:** ...)
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

    // Italic footer (starts with *)
    if (trimmed.startsWith("*") && trimmed.endsWith("*") && !trimmed.startsWith("**")) {
      elements.push(
        <p key={currentKey++} className="mt-8 text-center text-sm italic text-gray-500">
          {trimmed.slice(1, -1)}
        </p>
      );
      continue;
    }

    // Placeholder text (in brackets)
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      elements.push(
        <p key={currentKey++} className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-gray-400 italic">
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
    <article className="prose prose-gray max-w-none">
      {elements}
    </article>
  );
}

export function FinalDraftLayer() {
  const t = useTranslations("BGWriter");
  const { draft, updateFinalDraft } = useBGWriter();
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const template = draft ? generatePositionPaperTemplate(draft, t) : "";
  const content = draft?.layers.finalDraft || "";
  const displayContent = content || template;

  // Word count (exclude markdown syntax)
  const plainText = displayContent
    .replace(/^#{1,3}\s+/gm, "") // Remove headings
    .replace(/\*\*(.+?)\*\*/g, "$1") // Remove bold
    .replace(/\*(.+?)\*/g, "$1") // Remove italic
    .replace(/^---$/gm, "") // Remove hr
    .replace(/\[|\]/g, ""); // Remove brackets

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
    // Copy plain text version for pasting into documents
    const plainVersion = displayContent
      .replace(/^#{1,3}\s+/gm, "") // Remove markdown headings but keep text
      .replace(/\*\*(.+?)\*\*/g, "$1") // Remove bold markers
      .replace(/\*(.+?)\*/g, "$1") // Remove italic markers
      .replace(/^---$/gm, "\n") // Replace hr with newline
      .replace(/\n{3,}/g, "\n\n"); // Collapse multiple newlines

    await navigator.clipboard.writeText(plainVersion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Download as .txt for easier use
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
    updateFinalDraft(value);
  };

  if (!draft) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="space-y-6"
    >
      {/* Tip */}
      <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
        <p className="text-sm text-gray-700">{t("tips.finalDraft")}</p>
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

            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
            >
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
              <RenderedPaper content={displayContent} />
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
    </motion.div>
  );
}
