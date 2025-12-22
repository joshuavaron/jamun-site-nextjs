"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is Model UN for middle school students?",
    answer:
      "Model UN is an educational simulation where students represent different countries and debate global issues as if they were real UN delegates. Our program is specifically designed for grades 5-8, with beginner-friendly materials and experienced mentors to guide students through the process.",
  },
  {
    question: "How do I prepare for my first Mock Trial competition?",
    answer:
      "We provide comprehensive preparation materials including case studies, role guidelines, and practice sessions. New participants receive mentorship from experienced students and coaches. Our step-by-step tutorials cover everything from understanding legal terminology to delivering opening statements.",
  },
  {
    question: "What grades can participate in JAMUN programs?",
    answer:
      "JAMUN programs are designed for students in grades 5-8 (middle school). We welcome students of all experience levels, from complete beginners to those who have participated in competitions before.",
  },
  {
    question: "Are there free resources for math competitions?",
    answer:
      "Yes! We offer a variety of free resources for Mathletes preparation, including practice problems, study guides, and video tutorials. Premium materials and personalized coaching are also available for schools and individual students.",
  },
  {
    question: "How can my school start a Model UN or Mock Trial program?",
    answer:
      "We provide complete startup kits for schools, including curriculum guides, training materials, and ongoing support. Contact us to schedule a consultation where we'll help you assess your needs and create an implementation plan tailored to your school.",
  },
  {
    question: "Is JAMUN a nonprofit organization?",
    answer:
      "Yes, JAMUN (The Junior Assembly of the Model United Nations) is a registered 501(c)(3) nonprofit organization. We are 100% volunteer-run and youth-led, with all proceeds going directly to supporting our educational programs and making them accessible to students nationwide.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900 group-hover:text-jamun-blue transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section background="gray">
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about getting started with Model UN, Mock Trial, and Mathletes."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200"
      >
        <div className="px-6 md:px-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
