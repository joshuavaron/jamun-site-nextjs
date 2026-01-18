"use client";

/**
 * ParagraphComponentsLayer - Layer 2: Polished Paragraph Components
 *
 * Per PP-Writer.md: 24 polished sentence sections organized by the 5 paragraphs:
 * - Intro (5): introSentence, broadContext, alternatePerspective, callToAction, thesis
 * - Background (6): bgIntroSentence, keyFact1, analysis1, keyFact2, analysis2, bgSummary
 * - Position (5): posIntroSentence, positionStatement, posEvidence, posAnalysis, reasoning
 * - Solutions (5): solIntroSentence, solutionProposal, solEvidence, connectionToSolution, alternateSolution
 * - Conclusion (3): summaryEvidence, summaryPosition, summarySolution
 *
 * Features:
 * - Collapsible paragraph sections with autofill support
 * - Shows formed idea from Layer 3 (if available)
 * - "Does my research support this?" button
 * - Progress checkmarks as sections complete
 */

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Lightbulb, FileText, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/animations";
import { useBGWriter } from "../BGWriterContext";
import { QuestionCard } from "../QuestionCard";
import { AIAssistButton, CheckIdeaPanel } from "../AIAssistButton";
import {
  getQuestionsForParagraph,
  PARAGRAPH_ORDER,
  PARAGRAPH_LABELS,
  type ParagraphComponentQuestion,
} from "@/lib/bg-writer/questions";
import type { ParagraphType } from "@/lib/bg-writer/types";

// Paragraph colors for visual distinction
const PARAGRAPH_COLORS: Record<ParagraphType, { border: string; bg: string; header: string; text: string; accent: string }> = {
  intro: {
    border: "border-blue-200",
    bg: "bg-blue-50",
    header: "bg-blue-100",
    text: "text-blue-800",
    accent: "bg-blue-500",
  },
  background: {
    border: "border-purple-200",
    bg: "bg-purple-50",
    header: "bg-purple-100",
    text: "text-purple-800",
    accent: "bg-purple-500",
  },
  position: {
    border: "border-green-200",
    bg: "bg-green-50",
    header: "bg-green-100",
    text: "text-green-800",
    accent: "bg-green-500",
  },
  solutions: {
    border: "border-orange-200",
    bg: "bg-orange-50",
    header: "bg-orange-100",
    text: "text-orange-800",
    accent: "bg-orange-500",
  },
  conclusion: {
    border: "border-pink-200",
    bg: "bg-pink-50",
    header: "bg-pink-100",
    text: "text-pink-800",
    accent: "bg-pink-500",
  },
};

interface ParagraphComponentsLayerProps {
  className?: string;
}

export function ParagraphComponentsLayer({ className }: ParagraphComponentsLayerProps) {
  const t = useTranslations("BGWriter");
  const {
    draft,
    getAnswer,
    updateAnswer,
    aiFilledFields,
    checkIdeaAgainstResearch,
    aiLoading,
  } = useBGWriter();

  // Track which paragraphs are expanded
  const [expandedParagraphs, setExpandedParagraphs] = useState<Set<ParagraphType>>(
    new Set(["intro"]) // Start with intro expanded
  );

  // Track check idea results per question
  const [checkResults, setCheckResults] = useState<
    Record<string, { matchingBookmarks: Array<{ bookmark: { id: string; content: string; category: string }; explanation: string }>; suggestions: string }>
  >({});

  const toggleParagraph = useCallback((paragraph: ParagraphType) => {
    setExpandedParagraphs((prev) => {
      const next = new Set(prev);
      if (next.has(paragraph)) {
        next.delete(paragraph);
      } else {
        next.add(paragraph);
      }
      return next;
    });
  }, []);

  // Get completion stats for a paragraph
  const getParagraphCompletion = useCallback(
    (paragraph: ParagraphType): { completed: number; total: number } => {
      const questions = getQuestionsForParagraph("paragraphComponents", paragraph);
      let completed = 0;
      for (const q of questions) {
        const answer = getAnswer("paragraphComponents", q.id);
        if (answer?.trim()) {
          completed++;
        }
      }
      return { completed, total: questions.length };
    },
    [getAnswer]
  );

  // Calculate total completion
  const totalCompletion = useMemo(() => {
    let completed = 0;
    let total = 0;
    for (const paragraph of PARAGRAPH_ORDER) {
      const stats = getParagraphCompletion(paragraph);
      completed += stats.completed;
      total += stats.total;
    }
    return { completed, total };
  }, [getParagraphCompletion]);

  // Handle "Check my idea" for a question
  const handleCheckIdea = useCallback(
    async (questionId: string, idea: string) => {
      const result = await checkIdeaAgainstResearch(idea);
      if (result.success) {
        setCheckResults((prev) => ({
          ...prev,
          [questionId]: {
            matchingBookmarks: result.matchingBookmarks,
            suggestions: result.suggestions,
          },
        }));
      }
      return {
        success: result.success,
        result: result.suggestions,
        error: result.error,
      };
    },
    [checkIdeaAgainstResearch]
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
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      viewport={defaultViewport}
      className={cn("space-y-6", className)}
    >
      {/* Layer description */}
      <motion.div
        variants={fadeInUp}
        className="rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-4"
      >
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {t("paragraphComponentsTitle")}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {t("paragraphComponentsDescription")}
            </p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              {totalCompletion.completed}/{totalCompletion.total} {t("sectionsComplete")}
            </span>
            <span>
              {Math.round((totalCompletion.completed / totalCompletion.total) * 100)}%
            </span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(totalCompletion.completed / totalCompletion.total) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Paragraph sections */}
      {PARAGRAPH_ORDER.map((paragraph) => {
        const questions = getQuestionsForParagraph("paragraphComponents", paragraph) as ParagraphComponentQuestion[];
        const isExpanded = expandedParagraphs.has(paragraph);
        const { completed, total } = getParagraphCompletion(paragraph);
        const colors = PARAGRAPH_COLORS[paragraph];
        const isComplete = completed === total;

        return (
          <motion.div
            key={paragraph}
            variants={fadeInUp}
            className={cn(
              "overflow-hidden rounded-xl border-2 transition-colors",
              colors.border,
              isExpanded ? colors.bg : "bg-white"
            )}
          >
            {/* Paragraph header */}
            <button
              onClick={() => toggleParagraph(paragraph)}
              className={cn(
                "flex w-full items-center justify-between px-4 py-3 text-left transition-colors",
                isExpanded ? colors.header : "hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-3">
                {/* Completion indicator */}
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full transition-colors",
                    isComplete
                      ? "bg-green-500 text-white"
                      : colors.accent + " text-white opacity-50"
                  )}
                >
                  {isComplete ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <FileText className="h-3 w-3" />
                  )}
                </div>
                <span className={cn("text-lg font-semibold", isExpanded ? colors.text : "text-gray-700")}>
                  {PARAGRAPH_LABELS[paragraph]}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    isComplete
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  )}
                >
                  {completed}/{total}
                </span>
              </div>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400"
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
                    {questions.map((question) => {
                      const value = getAnswer("paragraphComponents", question.id);
                      const isAIFilled = aiFilledFields.has(question.id);
                      const checkResult = checkResults[question.id];

                      // Get the Layer 3 idea if available
                      const l3Idea = question.autoPopulateFrom
                        ? getAnswer("ideaFormation", question.autoPopulateFrom.questionId)
                        : null;

                      return (
                        <div key={question.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                          {/* Show Layer 3 idea if available */}
                          {l3Idea && (
                            <div className="mb-3 rounded bg-indigo-50 p-2">
                              <p className="text-xs font-medium text-indigo-700">
                                {t("yourIdea")}:
                              </p>
                              <p className="mt-1 text-sm italic text-gray-600">
                                &ldquo;{l3Idea}&rdquo;
                              </p>
                            </div>
                          )}

                          {/* Question card */}
                          <QuestionCard
                            questionId={question.id}
                            translationKey={question.translationKey}
                            helpTextKey={question.helpTextKey}
                            inputType={question.inputType}
                            value={value}
                            onChange={(newValue) =>
                              updateAnswer("paragraphComponents", question.id, newValue)
                            }
                            required={question.required}
                            isAIFilled={isAIFilled}
                          />

                          {/* Check my idea button */}
                          {value?.trim() && (
                            <div className="mt-3">
                              <AIAssistButton
                                mode="checkIdea"
                                onTrigger={() => handleCheckIdea(question.id, value)}
                                disabled={aiLoading.checkingIdea}
                                size="sm"
                              >
                                <Search className="mr-1 h-3 w-3" />
                                {t("doesResearchSupport")}
                              </AIAssistButton>

                              {/* Check result */}
                              <AnimatePresence>
                                {checkResult && (
                                  <CheckIdeaPanel
                                    matchingBookmarks={checkResult.matchingBookmarks}
                                    suggestions={checkResult.suggestions}
                                    onClose={() => {
                                      setCheckResults((prev) => {
                                        const next = { ...prev };
                                        delete next[question.id];
                                        return next;
                                      });
                                    }}
                                  />
                                )}
                              </AnimatePresence>
                            </div>
                          )}
                        </div>
                      );
                    })}
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

// Keep old export name for backward compatibility during transition
export { ParagraphComponentsLayer as ResearchLayer };

export default ParagraphComponentsLayer;
