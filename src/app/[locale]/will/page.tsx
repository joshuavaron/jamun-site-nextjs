"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Section } from "@/components/ui";
import {
  ArrowLeft,
  Quote,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  fadeInUp,
  staggerContainer,
  defaultViewport,
} from "@/lib/animations";

export default function WillPage() {
  const t = useTranslations("WillPage");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <main className="relative bg-gradient-to-b from-white via-emerald-50/30 to-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center overflow-hidden pt-20 pb-16"
      >

        {/* Floating shapes */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-[15%] w-16 h-16 bg-emerald-200/60 rounded-2xl -z-10"
        />
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-[10%] w-12 h-12 bg-amber-200/60 rounded-full -z-10"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-1/2 left-[5%] w-8 h-8 bg-teal-200/50 rounded-lg rotate-45 -z-10"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium">{t("backToAbout")}</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image column */}
            <motion.div
              style={{ y: imageY }}
              className="relative order-1 lg:order-2 flex justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {/* Decorative frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-emerald-200 via-teal-100 to-amber-100 rounded-3xl rotate-3" />
                <div className="absolute -inset-4 bg-gradient-to-tr from-amber-100 via-emerald-100 to-teal-200 rounded-3xl -rotate-2 opacity-60" />

                {/* Main image */}
                <motion.div
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white"
                >
                  <Image
                    src="/images/team/will.webp"
                    alt={t("heroImageAlt")}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                {/* Fun floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-full shadow-lg border-2 border-emerald-200"
                >
                  <span className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Star className="w-4 h-4" />
                    {t("heroBadgeRole")}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Text column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 text-center lg:text-left"
            >
              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-4"
              >
                {t("heroName")}
              </motion.h1>

              {/* Title */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl sm:text-2xl text-emerald-600 font-medium mb-8"
              >
                {t("heroTitle")}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                {t("heroDescription")}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <Section background="cream" className="py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-emerald-700 bg-emerald-100 rounded-full">
              {t("storyEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t("storyTitle")}
            </h2>
          </motion.div>

          <motion.div variants={fadeInUp} className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              {t("storyParagraph1")}
            </p>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              {t("storyParagraph2")}
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t("storyParagraph3")}
            </p>
          </motion.div>
        </motion.div>
      </Section>

      {/* What Makes Will Special */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-amber-700 bg-amber-100 rounded-full">
                {t("traitsEyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                {t("traitsTitle")}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: t("trait1Title"), description: t("trait1Description"), color: "emerald" },
                { title: t("trait2Title"), description: t("trait2Description"), color: "amber" },
                { title: t("trait3Title"), description: t("trait3Description"), color: "teal" },
              ].map((trait) => (
                <motion.div
                  key={trait.title}
                  variants={fadeInUp}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 border border-gray-100"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl mb-5 flex items-center justify-center",
                    trait.color === "emerald" && "bg-emerald-100",
                    trait.color === "amber" && "bg-amber-100",
                    trait.color === "teal" && "bg-teal-100"
                  )}>
                    <div className={cn(
                      "w-4 h-4 rounded-full",
                      trait.color === "emerald" && "bg-emerald-500",
                      trait.color === "amber" && "bg-amber-500",
                      trait.color === "teal" && "bg-teal-500"
                    )} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {trait.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {trait.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <Section background="white" className="py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative bg-gradient-to-br from-emerald-50 via-white to-amber-50 rounded-3xl p-10 md:p-14 shadow-[var(--shadow-card)] border border-emerald-100"
          >
            {/* Quote icon */}
            <Quote className="w-14 h-14 text-emerald-200 mx-auto mb-6" />

            {/* Quote text */}
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed mb-8">
              &ldquo;{t("quote")}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald-200">
                <Image
                  src="/images/team/will.webp"
                  alt={t("heroName")}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">{t("heroName")}</p>
                <p className="text-sm text-emerald-600">{t("quoteRole")}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Section>

    </main>
  );
}
