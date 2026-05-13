"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { fontBody } from "@/lib/typography";

// A single-open accordion of question/answer rows. The first row is open
// by default; clicking another opens it and closes the previous. Click an
// open row to close it. Rows are separated by hairline rules and use the
// site's blue accent on the open state.

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  /** Index of the row that starts open. Pass `null` to start fully collapsed. */
  defaultOpen?: number | null;
}

export function FaqAccordion({ items, defaultOpen = 0 }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  return (
    <div>
      {items.map((item, i) => (
        <FaqRow
          key={i}
          question={item.q}
          answer={item.a}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}

function FaqRow({
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
    <div className="border-b border-black/10">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between text-left py-5 md:py-6 gap-6 group"
      >
        <span
          style={{ ...fontBody, fontWeight: 500 }}
          className={`text-base md:text-lg leading-snug transition-colors ${
            isOpen
              ? "text-[#397bce]"
              : "text-neutral-900 group-hover:text-[#397bce]"
          }`}
        >
          {question}
        </span>
        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-[#397bce] text-white rotate-45"
              : "bg-neutral-100 text-neutral-500 group-hover:bg-[#397bce]/10 group-hover:text-[#397bce]"
          }`}
        >
          <Plus className="w-4 h-4" />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p style={fontBody} className="pb-6 pr-12 text-base text-neutral-700 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
