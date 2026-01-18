"use client";

/**
 * ComprehensionLayer - Layer 4: Background Guide Comprehension
 *
 * Per PP-Writer.md: 25 questions organized into 7 collapsible category sections:
 * - Topic Fundamentals (3): topicDefinition, keyTerms, scope
 * - Historical Context (3): origin, timeline, evolution
 * - Current Situation (3): presentState, keyStatistics, recentDevelopments
 * - Stakeholders (3): affectedPopulations, keyActors, powerDynamics
 * - Existing Efforts (4): unActions, regionalEfforts, successStories, failures
 * - Points of Contention (3): majorDebates, competingInterests, barriers
 * - Country-Specific (6): country, committee, topic, countryInvolvement, pastPositions, countryInterests, allies, constraints
 *
 * Features:
 * - Collapsible category sections
 * - Bookmark import with auto-classification
 * - Progress tracking per category
 */

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Lightbulb, Check, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/animations";
import { useBGWriter } from "../BGWriterContext";
import { QuestionCard } from "../QuestionCard";
import {
  getQuestionsForLayer,
  COMPREHENSION_CATEGORY_GROUPS,
  type ComprehensionQuestion,
} from "@/lib/bg-writer/questions";

// Category colors for visual distinction
const CATEGORY_COLORS: Record<string, { border: string; bg: string; header: string; text: string; accent: string }> = {
  topicFundamentals: {
    border: "border-blue-200",
    bg: "bg-blue-50",
    header: "bg-blue-100",
    text: "text-blue-800",
    accent: "bg-blue-500",
  },
  historicalContext: {
    border: "border-purple-200",
    bg: "bg-purple-50",
    header: "bg-purple-100",
    text: "text-purple-800",
    accent: "bg-purple-500",
  },
  currentSituation: {
    border: "border-green-200",
    bg: "bg-green-50",
    header: "bg-green-100",
    text: "text-green-800",
    accent: "bg-green-500",
  },
  stakeholders: {
    border: "border-orange-200",
    bg: "bg-orange-50",
    header: "bg-orange-100",
    text: "text-orange-800",
    accent: "bg-orange-500",
  },
  existingEfforts: {
    border: "border-teal-200",
    bg: "bg-teal-50",
    header: "bg-teal-100",
    text: "text-teal-800",
    accent: "bg-teal-500",
  },
  pointsOfContention: {
    border: "border-red-200",
    bg: "bg-red-50",
    header: "bg-red-100",
    text: "text-red-800",
    accent: "bg-red-500",
  },
  countrySpecific: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    header: "bg-amber-100",
    text: "text-amber-800",
    accent: "bg-amber-500",
  },
};

interface ComprehensionLayerProps {
  className?: string;
}

export function ComprehensionLayer({ className }: ComprehensionLayerProps) {
  const t = useTranslations("BGWriter");
  const {
    getAnswer,
    updateAnswer,
    updateCountry,
    updateCommittee,
    updateTopic,
  } = useBGWriter();

  // Track which categories are expanded (start with first one expanded)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["countrySpecific"]) // Start with country-specific expanded
  );

  // Get all Layer 4 questions
  const allQuestions = useMemo(
    () => getQuestionsForLayer("comprehension") as ComprehensionQuestion[],
    []
  );

  // Group questions by category
  const questionsByCategory = useMemo(() => {
    const groups: Record<string, ComprehensionQuestion[]> = {};

    for (const group of COMPREHENSION_CATEGORY_GROUPS) {
      groups[group.id] = allQuestions.filter((q) =>
        group.questions.includes(q.id)
      );
    }

    return groups;
  }, [allQuestions]);

  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  const handleChange = useCallback(
    (questionId: string, value: string) => {
      // Handle special fields that update draft-level properties
      if (questionId === "country") {
        updateCountry(value);
      } else if (questionId === "committee") {
        updateCommittee(value);
      } else if (questionId === "topic") {
        updateTopic(value);
      } else {
        updateAnswer("comprehension", questionId, value);
      }
    },
    [updateAnswer, updateCountry, updateCommittee, updateTopic]
  );

  // Calculate completion for a category
  const getCategoryCompletion = useCallback(
    (categoryId: string): { completed: number; total: number } => {
      const questions = questionsByCategory[categoryId] || [];
      let completed = 0;
      for (const q of questions) {
        const answer = getAnswer("comprehension", q.id);
        if (answer?.trim()) {
          completed++;
        }
      }
      return { completed, total: questions.length };
    },
    [questionsByCategory, getAnswer]
  );

  // Calculate total completion
  const totalCompletion = useMemo(() => {
    let completed = 0;
    let total = 0;
    for (const category of COMPREHENSION_CATEGORY_GROUPS) {
      const stats = getCategoryCompletion(category.id);
      completed += stats.completed;
      total += stats.total;
    }
    return { completed, total };
  }, [getCategoryCompletion]);

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
        className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4"
      >
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-jamun-blue" />
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {t("comprehensionTitle")}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {t("comprehensionDescription")}
            </p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              {totalCompletion.completed}/{totalCompletion.total} {t("questionsAnswered")}
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
              className="h-full rounded-full bg-gradient-to-r from-jamun-blue to-purple-600"
            />
          </div>
        </div>
      </motion.div>

      {/* Category sections */}
      {COMPREHENSION_CATEGORY_GROUPS.map((category) => {
        const questions = questionsByCategory[category.id];
        const isExpanded = expandedCategories.has(category.id);
        const { completed, total } = getCategoryCompletion(category.id);
        const colors = CATEGORY_COLORS[category.id] || CATEGORY_COLORS.topicFundamentals;
        const isComplete = completed === total;

        return (
          <motion.div
            key={category.id}
            variants={fadeInUp}
            className={cn(
              "overflow-hidden rounded-xl border-2 transition-colors",
              colors.border,
              isExpanded ? colors.bg : "bg-white"
            )}
          >
            {/* Category header */}
            <button
              onClick={() => toggleCategory(category.id)}
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
                    <BookOpen className="h-3 w-3" />
                  )}
                </div>
                <span className={cn("text-lg font-semibold", isExpanded ? colors.text : "text-gray-700")}>
                  {t(`categoryGroups.${category.id}`)}
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

            {/* Category content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 p-4">
                    {/* Category description */}
                    <p className="text-sm text-gray-600">
                      {t(`categoryDescriptions.${category.id}`)}
                    </p>

                    {/* Questions */}
                    {questions.map((question) => (
                      <QuestionCard
                        key={question.id}
                        questionId={question.id}
                        translationKey={question.translationKey}
                        helpTextKey={question.helpTextKey}
                        inputType={question.inputType}
                        value={getAnswer("comprehension", question.id)}
                        onChange={(value) => handleChange(question.id, value)}
                        required={question.required}
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

export default ComprehensionLayer;
