"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckCircle, BookOpen, Trophy, Rocket } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/utils";
import { fadeInUpLarge, defaultViewport } from "@/lib/animations";

const features = [
  {
    subtitleKey: "feature1Subtitle" as const,
    titleKey: "feature1Title" as const,
    descriptionKey: "feature1Description" as const,
    bulletKeys: ["feature1Bullet1", "feature1Bullet2", "feature1Bullet3"] as const,
    image: "/images/conferences/DSC01852.webp",
    imagePosition: "left" as const,
    icon: BookOpen,
    accentColor: "jamun-blue",
    badgeBg: "bg-jamun-blue/10",
    badgeText: "text-jamun-blue",
    checkBg: "bg-jamun-blue/10",
    checkColor: "text-jamun-blue",
    blobColor: "bg-jamun-blue/5",
    circleColor: "bg-jamun-blue/10",
  },
  {
    subtitleKey: "feature2Subtitle" as const,
    titleKey: "feature2Title" as const,
    descriptionKey: "feature2Description" as const,
    bulletKeys: ["feature2Bullet1", "feature2Bullet2", "feature2Bullet3"] as const,
    image: "/images/conferences/DSC02012.webp",
    imagePosition: "right" as const,
    icon: Trophy,
    accentColor: "purple",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-700",
    checkBg: "bg-purple-100",
    checkColor: "text-purple-600",
    blobColor: "bg-purple-100/50",
    circleColor: "bg-purple-200/50",
  },
  {
    subtitleKey: "feature3Subtitle" as const,
    titleKey: "feature3Title" as const,
    descriptionKey: "feature3Description" as const,
    bulletKeys: ["feature3Bullet1", "feature3Bullet2", "feature3Bullet3"] as const,
    image: "/images/conferences/DSC00841.webp",
    imagePosition: "left" as const,
    icon: Rocket,
    accentColor: "emerald",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    checkBg: "bg-emerald-100",
    checkColor: "text-emerald-600",
    blobColor: "bg-emerald-100/50",
    circleColor: "bg-emerald-200/50",
  },
];

export function WhyChooseSection() {
  const t = useTranslations("WhyChooseSection");

  return (
    <Section background="white">
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
      />

      <div className="space-y-12 lg:space-y-14">
        {features.map((feature) => (
          <motion.div
            key={feature.titleKey}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUpLarge}
            className={`flex flex-col gap-8 lg:gap-16 items-center ${
              feature.imagePosition === "right"
                ? "lg:flex-row-reverse"
                : "lg:flex-row"
            }`}
          >
            {/* Image */}
            <motion.div
              className="w-full lg:w-1/2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative group">
                {/* Decorative background blob */}
                <div
                  className={cn(
                    "absolute -z-10 w-full h-full rounded-3xl transition-transform duration-300 group-hover:scale-105",
                    feature.blobColor,
                    feature.imagePosition === "right"
                      ? "-right-4 -bottom-4"
                      : "-left-4 -bottom-4"
                  )}
                />
                {/* Decorative accent circle */}
                <div
                  className={cn(
                    "absolute -z-10 w-24 h-24 rounded-full transition-transform duration-300 group-hover:scale-110",
                    feature.circleColor,
                    feature.imagePosition === "right"
                      ? "-right-6 top-1/4"
                      : "-left-6 top-1/4"
                  )}
                />

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={feature.image}
                    alt={t(feature.titleKey)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Floating icon badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className={cn(
                    "absolute -bottom-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100",
                    feature.imagePosition === "right" ? "-left-4" : "-right-4"
                  )}
                >
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", feature.badgeBg)}>
                    <feature.icon className={cn("w-5 h-5", feature.badgeText)} />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="w-full lg:w-1/2">
              {/* Subtitle badge */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={cn(
                  "inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest rounded-full uppercase",
                  feature.badgeBg,
                  feature.badgeText
                )}
              >
                {t(feature.subtitleKey)}
              </motion.span>

              <h3 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
                {t(feature.titleKey)}
              </h3>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t(feature.descriptionKey)}
              </p>

              {/* Bullet points with varied colors */}
              <ul className="space-y-4">
                {feature.bulletKeys.map((bulletKey, bulletIndex) => (
                  <motion.li
                    key={bulletKey}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + bulletIndex * 0.1 }}
                    className="flex items-center gap-3 text-gray-700 group/item"
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/item:scale-110",
                      feature.checkBg
                    )}>
                      <CheckCircle className={cn("w-4 h-4", feature.checkColor)} />
                    </div>
                    <span className="font-medium">{t(bulletKey)}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
