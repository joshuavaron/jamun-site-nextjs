"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

  return (
    <Section background="gray">
      <SectionHeader
        eyebrow="GOT QUESTIONS?"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about getting started with Model UN, Mock Trial, and Mathletes."
      />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {/* Header decoration */}
          <div className="h-1 bg-gradient-to-r from-jamun-blue via-purple-500 to-jamun-orange" />

          <div className="px-6 md:px-8 py-2">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
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
          <p className="text-gray-600 mb-3">Still have questions?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-jamun-blue font-semibold hover:text-jamun-blue-dark transition-colors group"
          >
            <MessageCircle className="w-5 h-5" />
            Get in touch with us
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}
