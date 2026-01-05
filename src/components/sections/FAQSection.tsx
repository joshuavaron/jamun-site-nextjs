"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/utils";
import { fadeInUp, defaultViewport } from "@/lib/animations";

const faqKeys = [
  { questionKey: "faq1Question", answerKey: "faq1Answer" },
  { questionKey: "faq2Question", answerKey: "faq2Answer" },
  { questionKey: "faq3Question", answerKey: "faq3Answer" },
  { questionKey: "faq4Question", answerKey: "faq4Answer" },
  { questionKey: "faq5Question", answerKey: "faq5Answer" },
  { questionKey: "faq6Question", answerKey: "faq6Answer" },
  { questionKey: "faq7Question", answerKey: "faq7Answer" },
] as const;

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-gray-100 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className={cn(
          "w-full py-5 flex items-center justify-between text-left group transition-all duration-200",
          isOpen && "pb-3"
        )}
        aria-expanded={isOpen}
      >
        <span className={cn(
          "text-lg font-medium transition-colors pr-4",
          isOpen ? "text-jamun-blue" : "text-gray-900 group-hover:text-jamun-blue"
        )}>
          {question}
        </span>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
          isOpen
            ? "bg-jamun-blue text-white rotate-180"
            : "bg-gray-100 text-gray-500 group-hover:bg-jamun-blue/10 group-hover:text-jamun-blue"
        )}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5 pl-0">
              <div className="bg-gradient-to-r from-jamun-blue/5 to-purple-50 rounded-lg p-4 border-l-4 border-jamun-blue">
                <p className="text-gray-600 leading-relaxed">{answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = useTranslations("FAQSection");

  return (
    <Section background="gray">
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {/* Header decoration */}
          <div className="h-1 bg-gradient-to-r from-jamun-blue via-purple-500 to-jamun-orange" />

          <div className="px-6 md:px-8 py-2">
            {faqKeys.map((faq, index) => (
              <FAQItem
                key={index}
                question={t(faq.questionKey)}
                answer={t(faq.answerKey)}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 mb-3">{t("stillHaveQuestions")}</p>
          <a
            href="mailto:contact@jamun.org"
            className="inline-flex items-center gap-2 text-jamun-blue font-semibold hover:text-jamun-blue-dark transition-colors group"
          >
            <MessageCircle className="w-5 h-5" />
            {t("contactUs")}
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
