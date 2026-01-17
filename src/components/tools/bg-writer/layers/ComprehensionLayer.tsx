"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Lightbulb } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { useBGWriter } from "../BGWriterContext";
import { QuestionCard } from "../QuestionCard";
import { getQuestionsForLayer } from "@/lib/bg-writer/questions";

export function ComprehensionLayer() {
  const t = useTranslations("BGWriter");
  const { getAnswer, updateAnswer, updateCountry, updateCommittee, updateTopic } = useBGWriter();

  const questions = getQuestionsForLayer("comprehension");

  const handleChange = (questionId: string, value: string) => {
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
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Tip */}
      <motion.div
        variants={fadeInUp}
        className="flex items-start gap-3 rounded-xl border border-jamun-blue/20 bg-jamun-blue/5 p-4"
      >
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-jamun-blue" />
        <p className="text-sm text-gray-700">{t("tips.comprehension")}</p>
      </motion.div>

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
    </motion.div>
  );
}
