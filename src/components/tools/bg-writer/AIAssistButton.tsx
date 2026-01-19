"use client";

/**
 * AIAssistButton - Unified assistance button for all modes
 *
 * Supports 3 modes:
 * - Summarize selected bookmarks
 * - Check idea against research
 * - Draft conclusion
 *
 * Features:
 * - Mode-specific icons and labels
 * - Loading/success/error states
 * - Expandable result display
 */

import { useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type AIMode = "summarize" | "checkIdea" | "draftConclusion";

interface AIAssistButtonProps {
  /** Which AI mode this button triggers */
  mode: AIMode;
  /** Async function to call when clicked */
  onTrigger: () => Promise<{ success: boolean; result?: string; error?: string }>;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Custom disabled message */
  disabledMessage?: string;
  /** Whether to show the result inline */
  showResultInline?: boolean;
  /** Callback when result is received */
  onResult?: (result: string) => void;
  /** Custom class name */
  className?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Children to render instead of default label */
  children?: ReactNode;
}

const MODE_CONFIG: Record<AIMode, { icon: string; gradient: string }> = {
  summarize: {
    icon: "M13 10V3L4 14h7v7l9-11h-7z", // Lightning bolt
    gradient: "from-jamun-blue to-purple-600",
  },
  checkIdea: {
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", // Check circle
    gradient: "from-green-500 to-teal-600",
  },
  draftConclusion: {
    icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z", // Pencil
    gradient: "from-orange-500 to-red-600",
  },
};

const SIZE_CLASSES = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-5 py-2.5 text-base gap-2.5",
};

export function AIAssistButton({
  mode,
  onTrigger,
  disabled = false,
  disabledMessage,
  showResultInline = false,
  onResult,
  className,
  size = "md",
  children,
}: AIAssistButtonProps) {
  const t = useTranslations("BGWriter");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const config = MODE_CONFIG[mode];

  const handleClick = useCallback(async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await onTrigger();

      if (response.success && response.result) {
        setResult(response.result);
        onResult?.(response.result);
      } else if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [disabled, isLoading, onTrigger, onResult]);

  const getLabel = useCallback(() => {
    if (isLoading) {
      switch (mode) {
        case "summarize":
          return t("combining");
        case "checkIdea":
          return t("checking");
        case "draftConclusion":
          return t("drafting");
      }
    }

    switch (mode) {
      case "summarize":
        return t("helpMeCombine");
      case "checkIdea":
        return t("checkMyIdea");
      case "draftConclusion":
        return t("helpMeSummarize");
    }
  }, [mode, isLoading, t]);

  return (
    <div className={cn("relative", className)}>
      {/* Main button */}
      <motion.button
        onClick={handleClick}
        disabled={disabled || isLoading}
        whileHover={!disabled && !isLoading ? { scale: 1.02 } : undefined}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
        className={cn(
          "relative flex items-center justify-center rounded-lg font-medium transition-all",
          SIZE_CLASSES[size],
          disabled || isLoading
            ? "cursor-not-allowed bg-gray-100 text-gray-400"
            : `bg-gradient-to-r ${config.gradient} text-white shadow-sm hover:shadow-md`
        )}
      >
        {/* Loading spinner - always show when loading */}
        {isLoading && (
          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {/* Default icon - only show when no children and not loading */}
        {!isLoading && !children && (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={config.icon}
            />
          </svg>
        )}
        {/* Label or custom children */}
        {children || <span>{getLabel()}</span>}
      </motion.button>

      {/* Disabled message */}
      {disabled && disabledMessage && (
        <p className="mt-1 text-xs text-gray-400">{disabledMessage}</p>
      )}

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 overflow-hidden"
          >
            <div className="rounded-lg bg-red-50 p-2 text-sm text-red-600">
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline result */}
      <AnimatePresence>
        {showResultInline && result && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 overflow-hidden"
          >
            <div
              className={cn(
                "rounded-lg p-3",
                mode === "summarize" && "bg-gradient-to-r from-jamun-blue/10 to-purple-100",
                mode === "checkIdea" && "bg-gradient-to-r from-green-50 to-teal-50",
                mode === "draftConclusion" && "bg-gradient-to-r from-orange-50 to-red-50"
              )}
            >
              <p className="text-sm italic text-gray-700">&ldquo;{result}&rdquo;</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * CheckIdeaPanel - Expanded panel showing matching bookmarks
 * Used for Mode 3 results
 */
interface CheckIdeaPanelProps {
  matchingBookmarks: Array<{
    bookmark: { id: string; content: string; category: string };
    explanation: string;
  }>;
  suggestions: string;
  onClose?: () => void;
}

export function CheckIdeaPanel({
  matchingBookmarks,
  suggestions,
  onClose,
}: CheckIdeaPanelProps) {
  const t = useTranslations("BGWriter");

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="mt-3 overflow-hidden rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-teal-50"
    >
      <div className="p-4">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <h4 className="flex items-center gap-2 text-sm font-medium text-green-800">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {t("ideaSupport")}
          </h4>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Matching bookmarks */}
        {matchingBookmarks.length > 0 ? (
          <div className="space-y-2">
            {matchingBookmarks.map((match, index) => (
              <div
                key={match.bookmark.id || index}
                className="rounded-lg bg-white/60 p-3"
              >
                <p className="line-clamp-2 text-sm text-gray-700">
                  &ldquo;{match.bookmark.content}&rdquo;
                </p>
                <p className="mt-1 text-xs text-green-700">
                  → {match.explanation}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            {t("noMatchingResearch")}
          </p>
        )}

        {/* Suggestions */}
        {suggestions && (
          <div className="mt-3 border-t border-green-200 pt-3">
            <p className="text-sm text-gray-700">
              <span className="font-medium">{t("suggestion")}:</span> {suggestions}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default AIAssistButton;
