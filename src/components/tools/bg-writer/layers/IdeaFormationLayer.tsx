"use client";

/**
 * IdeaFormationLayer - Layer 3: Bridge between comprehension and polished paragraphs
 *
 * Per PP-Writer.md: This is the key bridge layer. For each Layer 2 section:
 * - Shows the section goal ("Form This Idea")
 * - Shows which L4 sources to combine
 * - Displays relevant bookmarks filtered by category (Mode 1 - no AI)
 * - Allows bookmark selection for Mode 2 summarization
 * - Provides input for student's formed idea in casual language
 * - Visual flow showing L4 → L3 → L2 progression
 */

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations";
import { useBGWriter } from "../BGWriterContext";
import { BookmarkFilterPanel } from "../BookmarkFilterPanel";
import {
  getQuestionsForLayer,
  PARAGRAPH_ORDER,
  PARAGRAPH_LABELS,
  type IdeaFormationQuestion,
} from "@/lib/bg-writer/questions";
import type { ParagraphType, ClassifiedBookmark, BookmarkCategory } from "@/lib/bg-writer/types";
import { CATEGORY_TO_L4_QUESTION, BOOKMARK_CATEGORY_LABELS } from "@/lib/bg-writer/types";

// Group questions by paragraph
function groupQuestionsByParagraph(
  questions: IdeaFormationQuestion[]
): Record<ParagraphType, IdeaFormationQuestion[]> {
  const groups: Record<ParagraphType, IdeaFormationQuestion[]> = {
    intro: [],
    background: [],
    position: [],
    solutions: [],
    conclusion: [],
  };

  for (const q of questions) {
    if (q.paragraph && groups[q.paragraph]) {
      groups[q.paragraph].push(q);
    }
  }

  return groups;
}

// Paragraph colors for visual distinction
const PARAGRAPH_COLORS: Record<ParagraphType, string> = {
  intro: "border-blue-200 bg-blue-50",
  background: "border-purple-200 bg-purple-50",
  position: "border-green-200 bg-green-50",
  solutions: "border-orange-200 bg-orange-50",
  conclusion: "border-pink-200 bg-pink-50",
};

const PARAGRAPH_HEADER_COLORS: Record<ParagraphType, string> = {
  intro: "bg-blue-100 text-blue-800",
  background: "bg-purple-100 text-purple-800",
  position: "bg-green-100 text-green-800",
  solutions: "bg-orange-100 text-orange-800",
  conclusion: "bg-pink-100 text-pink-800",
};

interface IdeaFormationLayerProps {
  className?: string;
}

export function IdeaFormationLayer({ className }: IdeaFormationLayerProps) {
  const t = useTranslations("BGWriter");
  const {
    draft,
    getAnswer,
    updateAnswer,
    summarizeSelectedBookmarks,
    aiLoading,
  } = useBGWriter();

  // Track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<Set<ParagraphType>>(
    new Set(["intro"]) // Start with intro expanded
  );

  // Track summaries for each question
  const [summaries, setSummaries] = useState<Record<string, string>>({});

  // Get all Layer 3 questions grouped by paragraph
  const allQuestions = useMemo(
    () => getQuestionsForLayer("ideaFormation") as IdeaFormationQuestion[],
    []
  );
  const questionsByParagraph = useMemo(
    () => groupQuestionsByParagraph(allQuestions),
    [allQuestions]
  );

  const toggleSection = useCallback((paragraph: ParagraphType) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(paragraph)) {
        next.delete(paragraph);
      } else {
        next.add(paragraph);
      }
      return next;
    });
  }, []);

  // Calculate completion for a paragraph
  const getCompletionCount = useCallback(
    (paragraph: ParagraphType): { completed: number; total: number } => {
      const questions = questionsByParagraph[paragraph] || [];
      let completed = 0;
      for (const q of questions) {
        const answer = getAnswer("ideaFormation", q.id);
        if (answer?.trim()) {
          completed++;
        }
      }
      return { completed, total: questions.length };
    },
    [questionsByParagraph, getAnswer]
  );

  // Handle bookmark combination (Mode 2)
  const handleCombineBookmarks = useCallback(
    async (questionId: string, bookmarks: ClassifiedBookmark[]) => {
      const result = await summarizeSelectedBookmarks(bookmarks.map((b) => b.id));
      if (result.success && result.summary) {
        setSummaries((prev) => ({ ...prev, [questionId]: result.summary }));
      }
      return result;
    },
    [summarizeSelectedBookmarks]
  );

  // Get L4 (comprehension) answer by question ID
  const getL4Answer = useCallback(
    (questionId: string): string => {
      return getAnswer("comprehension", questionId);
    },
    [getAnswer]
  );

  if (!draft) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-500">
        {t("selectOrCreateDraft")}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={staggerContainer}
      className={cn("space-y-6", className)}
    >
      {/* Layer description */}
      <motion.div variants={fadeInUp} className="rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {t("ideaFormationTitle")}
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          {t("ideaFormationDescription")}
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <span className="rounded bg-white px-2 py-1">{t("layer4")}</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <span className="rounded bg-indigo-100 px-2 py-1 font-medium text-indigo-700">
            {t("layer3")}
          </span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <span className="rounded bg-white px-2 py-1">{t("layer2")}</span>
        </div>
      </motion.div>

      {/* Paragraphs */}
      {PARAGRAPH_ORDER.map((paragraph) => {
        const questions = questionsByParagraph[paragraph];
        const isExpanded = expandedSections.has(paragraph);
        const { completed, total } = getCompletionCount(paragraph);

        return (
          <motion.div
            key={paragraph}
            variants={fadeInUp}
            className={cn(
              "overflow-hidden rounded-xl border-2 transition-colors",
              PARAGRAPH_COLORS[paragraph]
            )}
          >
            {/* Paragraph header */}
            <button
              onClick={() => toggleSection(paragraph)}
              className={cn(
                "flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:opacity-80",
                PARAGRAPH_HEADER_COLORS[paragraph]
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold">
                  {PARAGRAPH_LABELS[paragraph]}
                </span>
                <span className="rounded-full bg-white/50 px-2 py-0.5 text-xs font-medium">
                  {completed}/{total} {t("completed")}
                </span>
              </div>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.span>
            </button>

            {/* Paragraph content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6 p-4">
                    {questions.map((question) => (
                      <IdeaFormationCard
                        key={question.id}
                        question={question}
                        value={getAnswer("ideaFormation", question.id)}
                        onChange={(value) =>
                          updateAnswer("ideaFormation", question.id, value)
                        }
                        summary={summaries[question.id]}
                        onCombineBookmarks={(bookmarks) =>
                          handleCombineBookmarks(question.id, bookmarks)
                        }
                        isCombining={aiLoading.summarizing}
                        getL4Answer={getL4Answer}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/**
 * IdeaFormationCard - Individual card for each Layer 3 question
 */
interface IdeaFormationCardProps {
  question: IdeaFormationQuestion;
  value: string;
  onChange: (value: string) => void;
  summary?: string;
  onCombineBookmarks: (bookmarks: ClassifiedBookmark[]) => Promise<{ success: boolean; summary?: string }>;
  isCombining: boolean;
  /** Function to get L4 answer by question ID */
  getL4Answer: (questionId: string) => string;
}

function IdeaFormationCard({
  question,
  value,
  onChange,
  summary,
  onCombineBookmarks,
  isCombining,
  getL4Answer,
}: IdeaFormationCardProps) {
  const t = useTranslations("BGWriter");
  const [showL4Answers, setShowL4Answers] = useState(false);

  // Get L4 answers for relevant categories
  const l4Answers = useMemo(() => {
    if (!question.l4Sources || question.l4Sources.length === 0) return [];

    return question.l4Sources
      .map((category) => {
        const questionId = CATEGORY_TO_L4_QUESTION[category as BookmarkCategory];
        if (!questionId) return null;

        const answer = getL4Answer(questionId);
        if (!answer?.trim()) return null;

        return {
          category: category as BookmarkCategory,
          label: BOOKMARK_CATEGORY_LABELS[category as BookmarkCategory] || category,
          answer: answer.trim(),
        };
      })
      .filter(Boolean) as Array<{ category: BookmarkCategory; label: string; answer: string }>;
  }, [question.l4Sources, getL4Answer]);

  const hasL4Content = l4Answers.length > 0;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Idea goal */}
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
            {t("formThisIdea")}
          </span>
        </div>
        <p className="mt-1 text-sm font-medium text-gray-800">
          {question.ideaGoal}
        </p>
      </div>

      {/* Combine from hint */}
      {question.combineFrom && (
        <div className="mb-3 rounded bg-gray-50 p-2">
          <p className="text-xs text-gray-600">
            <span className="font-medium">{t("byCombining")}:</span>{" "}
            {question.combineFrom}
          </p>
        </div>
      )}

      {/* Your Research (L4 answers) - Show what student wrote in Comprehension layer */}
      {question.l4Sources && question.l4Sources.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setShowL4Answers(!showL4Answers)}
            className={cn(
              "flex w-full items-center justify-between rounded-lg border p-2 text-left text-xs transition-colors",
              hasL4Content
                ? "border-green-200 bg-green-50 text-green-800 hover:bg-green-100"
                : "border-gray-200 bg-gray-50 text-gray-500"
            )}
          >
            <div className="flex items-center gap-2">
              <svg
                className={cn("h-4 w-4", hasL4Content ? "text-green-600" : "text-gray-400")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="font-medium">
                {t("yourResearch")} {hasL4Content ? `(${l4Answers.length})` : `(${t("noneYet")})`}
              </span>
            </div>
            <motion.span animate={{ rotate: showL4Answers ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.span>
          </button>

          <AnimatePresence>
            {showL4Answers && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
                  {hasL4Content ? (
                    l4Answers.map((item) => (
                      <div key={item.category} className="rounded border border-gray-200 bg-white p-2">
                        <div className="mb-1 flex items-center gap-1">
                          <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-700">
                            {item.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-700 whitespace-pre-wrap">{item.answer}</p>
                      </div>
                    ))
                  ) : (
                    <p className="py-2 text-center text-xs text-gray-500">
                      {t("fillInComprehensionFirst")}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Bookmark filter panel */}
      {question.l4Sources && question.l4Sources.length > 0 && (
        <div className="mb-4">
          <BookmarkFilterPanel
            relevantCategories={question.l4Sources}
            onSelectionChange={() => {
              // We'll get bookmarks from context
            }}
            onCombineRequest={async (bookmarks) => {
              const result = await onCombineBookmarks(bookmarks);
              return result;
            }}
            isCombining={isCombining}
            combineSummary={summary}
            maxHeight="200px"
          />
        </div>
      )}

      {/* Input field for the idea */}
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">
          {t("yourIdea")}
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("writeYourIdeaHere")}
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors focus:border-jamun-blue focus:outline-none focus:ring-1 focus:ring-jamun-blue"
        />
        <p className="mt-1 text-xs text-gray-400">
          {t("writeInYourOwnWords")}
        </p>
      </div>

      {/* Use summary button */}
      {summary && !value && (
        <button
          onClick={() => onChange(summary)}
          className="mt-2 text-xs text-jamun-blue hover:underline"
        >
          {t("useSummaryAsStart")}
        </button>
      )}
    </div>
  );
}

export default IdeaFormationLayer;
