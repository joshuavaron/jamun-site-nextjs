"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is Model UN and how does it benefit middle school students?",
    answer:
      "Model UN (Model United Nations) is an educational simulation where students represent different countries and debate global issues as UN delegates. For middle school students in grades 5-8, Model UN develops critical skills including public speaking, research, diplomatic negotiation, and understanding of international relations. Students learn to write position papers, draft resolutions, and deliver speeches—skills that prepare them for high school debate, magnet school applications, and future college success.",
  },
  {
    question: "How do I prepare for my first Mock Trial competition?",
    answer:
      "We provide comprehensive Mock Trial preparation materials including case analysis guides, opening statement templates, cross-examination techniques, and practice sessions. New participants learn courtroom procedures, evidence rules, and objection strategies through step-by-step tutorials. Our experienced mentors help students master both attorney and witness roles, building confidence in legal reasoning and persuasive argumentation.",
  },
  {
    question: "What math competitions does JAMUN prepare students for?",
    answer:
      "Our Mathletes program prepares middle school students for competitions including MATHCOUNTS, AMC 8, Math League, and Math Olympiad. We provide practice problems covering number theory, algebra, geometry, and problem-solving strategies. Students develop speed, accuracy, and creative mathematical thinking through team-based learning and individual challenges.",
  },
  {
    question: "Are JAMUN's academic programs affordable?",
    answer:
      "Yes! JAMUN is committed to making academic competitions accessible to all students regardless of financial circumstances. All of our resources, curriculum guides, and training materials are completely free. Our conferences are low-cost, and we offer a grant program that can subsidize up to 100% of conference costs for students who need financial assistance. This includes registration fees, travel costs, and competition materials. As a 501(c)(3) nonprofit, all donations directly support student programs and our grant fund.",
  },
  {
    question: "How can my school start a Model UN club or academic team?",
    answer:
      "JAMUN provides complete startup kits for schools including free curriculum guides, training materials, position paper templates, and ongoing mentorship. Whether you want to start a Model UN club, Mock Trial team, or Mathletes program, we offer free resources and support for educators. Contact us to schedule a consultation where we'll help you create an implementation plan tailored to your school's needs.",
  },
  {
    question: "Do academic competitions help with college admissions?",
    answer:
      "Academic competitions demonstrate intellectual curiosity, leadership, and commitment—qualities college admissions officers value highly. Model UN, Mock Trial, and Mathletes develop transferable skills like public speaking, critical thinking, teamwork, and time management. Students who participate in these activities from middle school build impressive track records that strengthen high school and college applications.",
  },
  {
    question: "What skills do students develop in JAMUN programs?",
    answer:
      "JAMUN programs develop essential 21st-century skills including public speaking and debate, critical thinking and analysis, research and writing, teamwork and collaboration, leadership and confidence, and problem-solving abilities. These skills transfer to academic success, standardized test performance, and future career readiness. Studies show that students who participate in debate and academic competitions perform better on SAT/ACT tests and in college.",
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
          <a
            href="mailto:contact@jamun.org"
            className="inline-flex items-center gap-2 text-jamun-blue font-semibold hover:text-jamun-blue-dark transition-colors group"
          >
            <MessageCircle className="w-5 h-5" />
            Get in touch with us
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
