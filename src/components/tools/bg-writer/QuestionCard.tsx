"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";
import type { QuestionInputType } from "@/lib/bg-writer/types";

interface QuestionCardProps {
  questionId: string;
  translationKey: string;
  helpTextKey?: string;
  inputType: QuestionInputType;
  value: string;
  isAIFilled?: boolean;
  onChange: (value: string) => void;
  required?: boolean;
}

export function QuestionCard({
  questionId,
  translationKey,
  helpTextKey,
  inputType,
  value,
  isAIFilled,
  onChange,
  required,
}: QuestionCardProps) {
  const t = useTranslations("BGWriter");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const renderInput = () => {
    const baseClasses = cn(
      "w-full rounded-lg border px-4 py-3 text-gray-900 transition-colors",
      "focus:border-jamun-blue focus:outline-none focus:ring-2 focus:ring-jamun-blue/20",
      // Yellow highlight for AI-filled fields
      isAIFilled && value
        ? "border-amber-300 bg-amber-50/50"
        : "border-gray-200 bg-white"
    );

    if (inputType === "text") {
      return (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="..."
          className={baseClasses}
          required={required}
        />
      );
    }

    if (inputType === "bullets") {
      // Auto-format bullets on change
      const handleBulletChange = (rawValue: string) => {
        // Process each line
        const lines = rawValue.split("\n");
        const formattedLines = lines.map((line) => {
          const trimmed = line.trim();
          // Skip empty lines
          if (!trimmed) return "";
          // Already has bullet/dash
          if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*")) {
            // Normalize to bullet point
            return "• " + trimmed.replace(/^[-•*]\s*/, "");
          }
          // Add bullet if this is a new line with content
          return "• " + trimmed;
        });
        onChange(formattedLines.join("\n"));
      };

      // Handle key events for better bullet point UX
      const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const target = e.currentTarget;
          const { selectionStart, value } = target;
          // Insert new line with bullet
          const before = value.slice(0, selectionStart);
          const after = value.slice(selectionStart);
          const newValue = before + "\n• " + after;
          onChange(newValue);
          // Set cursor position after the bullet
          setTimeout(() => {
            target.selectionStart = target.selectionEnd = selectionStart + 3;
          }, 0);
        }
      };

      return (
        <div className="space-y-2">
          <textarea
            ref={textareaRef}
            value={value || ""}
            onChange={(e) => handleBulletChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="• First point\n• Second point\n• Third point"
            className={cn(baseClasses, "min-h-[120px] resize-none")}
            rows={4}
          />
          <p className="text-xs text-gray-500">
            {t("questions.bulletPointHint")}
          </p>
        </div>
      );
    }

    // textarea
    return (
      <textarea
        ref={textareaRef}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your answer here..."
        className={cn(baseClasses, "min-h-[100px] resize-none")}
        rows={3}
      />
    );
  };

  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        "rounded-xl border p-6 shadow-sm",
        isAIFilled && value
          ? "border-amber-200 bg-amber-50/30"
          : "border-gray-200 bg-white"
      )}
    >
      <div className="mb-4 space-y-1">
        <div className="flex items-start justify-between gap-4">
          <label
            htmlFor={questionId}
            className="text-base font-medium text-gray-900"
          >
            {t(`questions.${translationKey}`)}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {isAIFilled && value && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
              <Sparkles className="h-3 w-3" />
              {t("autofill.aiFilled")}
            </span>
          )}
        </div>
        {helpTextKey && (
          <p className="text-sm text-gray-500">
            {t(`questions.${helpTextKey}`)}
          </p>
        )}
      </div>

      {renderInput()}
    </motion.div>
  );
}
