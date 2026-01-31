"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { fadeInUp, defaultViewport } from "@/lib/animations";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  image?: string;
  accentColor?: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  image,
  accentColor = "border-l-jamun-blue",
  className,
}: TestimonialCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className={cn(
        "relative bg-white rounded-2xl shadow-[var(--shadow-card)] p-6 md:p-8",
        "border-l-4",
        accentColor,
        "transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]",
        className
      )}
    >
      {/* Decorative quote mark */}
      <svg
        className="absolute top-4 right-4 w-12 h-12 text-gray-900/[0.05]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
      </svg>

      <blockquote className="relative">
        <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
          &ldquo;{quote}&rdquo;
        </p>

        <footer className="flex items-center gap-3">
          {image && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
              <Image src={image} alt={author} fill className="object-cover" />
            </div>
          )}
          <div>
            <cite className="not-italic font-semibold text-gray-900 block">
              {author}
            </cite>
            {role && (
              <span className="text-sm text-gray-500">{role}</span>
            )}
          </div>
        </footer>
      </blockquote>
    </motion.div>
  );
}
