"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Lightbulb, FileText } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { useBGWriter } from "../BGWriterContext";
import { QuestionCard } from "../QuestionCard";
import { getQuestionsForLayer } from "@/lib/bg-writer/questions";
import type { SectionType } from "@/lib/bg-writer/types";

const SECTIONS: SectionType[] = ["introduction", "background", "position", "solutions", "conclusion"];

export function ResearchLayer() {
  const t = useTranslations("BGWriter");
  const { getAnswer, updateAnswer, getAutoPopulatedValue } = useBGWriter();

  const questions = getQuestionsForLayer("research");

  // Group questions by section
  const questionsBySection = SECTIONS.reduce(
    (acc, section) => {
      acc[section] = questions.filter((q) => q.section === section);
      return acc;
    },
    {} as Record<SectionType, typeof questions>
  );

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Tip */}
      <motion.div
        variants={fadeInUp}
        className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4"
      >
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <p className="text-sm text-gray-700">{t("tips.research")}</p>
      </motion.div>

      {/* Questions grouped by section */}
      {SECTIONS.map((section) => {
        const sectionQuestions = questionsBySection[section];
        if (!sectionQuestions || sectionQuestions.length === 0) return null;

        return (
          <motion.div key={section} variants={fadeInUp} className="space-y-4">
            {/* Section header */}
            <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
              <FileText className="h-5 w-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                {t(`sectionHeaders.${section}`)}
              </h3>
            </div>

            {/* Section questions */}
            <div className="space-y-4 pl-2">
              {sectionQuestions.map((question) => (
                <QuestionCard
                  key={question.id}
                  questionId={question.id}
                  translationKey={question.translationKey}
                  helpTextKey={question.helpTextKey}
                  inputType={question.inputType}
                  value={getAnswer("research", question.id)}
                  autoPopulatedValue={getAutoPopulatedValue(question.id)}
                  autoPopulatedFromLayer={question.autoPopulateFrom?.layer}
                  onChange={(value) => updateAnswer("research", question.id, value)}
                  required={question.required}
                />
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
