"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Quote, Star } from "lucide-react";
import { Section } from "@/components/ui";
import { fadeInUp, defaultViewport } from "@/lib/animations";

export function TestimonialSection() {
  const t = useTranslations("TestimonialSection");
  return (
    <Section background="cream">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="max-w-5xl mx-auto"
      >
        <div className="relative bg-white rounded-2xl shadow-[var(--shadow-card)] overflow-hidden group transition-shadow duration-500 hover:shadow-[var(--shadow-glow-blue)]">
          <div className="grid md:grid-cols-5">
            {/* Image side */}
            <div className="relative md:col-span-2 h-64 md:h-auto overflow-hidden">
              <Image
                src="/images/conferences/DSC00217.webp"
                alt={t("imageAlt")}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 md:bg-gradient-to-t md:from-transparent md:to-black/20" />

              {/* Floating rating badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-jamun-orange text-jamun-orange" />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quote side */}
            <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center relative">
              {/* Decorative SVG quote mark */}
              <svg
                className="absolute top-4 right-4 w-24 h-24 text-gray-900/[0.05]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
              </svg>

              {/* Quote icon */}
              <div className="w-12 h-12 rounded-xl bg-jamun-blue flex items-center justify-center mb-6 shadow-lg shadow-jamun-blue/20">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Quote text */}
              <blockquote className="relative z-10 text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                &ldquo;{t("quotePart1")}{" "}
                <span className="text-jamun-blue font-semibold">{t("quoteHighlight")}</span>.&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-jamun-blue flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">{t("authorInitials")}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {t("author")}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {t("role")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
