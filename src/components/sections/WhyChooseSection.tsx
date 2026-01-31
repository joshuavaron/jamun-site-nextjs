"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle, BookOpen, Trophy, Rocket } from "lucide-react";
import { Section, SectionHeader, ImageContentBlock, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

const features = [
  {
    subtitleKey: "feature1Subtitle" as const,
    titleKey: "feature1Title" as const,
    descriptionKey: "feature1Description" as const,
    bulletKeys: ["feature1Bullet1", "feature1Bullet2", "feature1Bullet3"] as const,
    image: "/images/conferences/DSC01852.webp",
    imagePosition: "left" as const,
    icon: BookOpen,
    accentColor: "#397bce",
    badgeVariant: "primary" as const,
    checkColor: "text-jamun-blue",
  },
  {
    subtitleKey: "feature2Subtitle" as const,
    titleKey: "feature2Title" as const,
    descriptionKey: "feature2Description" as const,
    bulletKeys: ["feature2Bullet1", "feature2Bullet2", "feature2Bullet3"] as const,
    image: "/images/conferences/DSC02012.webp",
    imagePosition: "right" as const,
    icon: Trophy,
    accentColor: "#9333ea",
    badgeVariant: "purple" as const,
    checkColor: "text-purple-600",
  },
  {
    subtitleKey: "feature3Subtitle" as const,
    titleKey: "feature3Title" as const,
    descriptionKey: "feature3Description" as const,
    bulletKeys: ["feature3Bullet1", "feature3Bullet2", "feature3Bullet3"] as const,
    image: "/images/conferences/DSC00841.webp",
    imagePosition: "left" as const,
    icon: Rocket,
    accentColor: "#059669",
    badgeVariant: "emerald" as const,
    checkColor: "text-emerald-600",
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
          <ImageContentBlock
            key={feature.titleKey}
            image={feature.image}
            imageAlt={t(feature.titleKey)}
            imageSide={feature.imagePosition}
            decoration="dots"
            accentColor={feature.accentColor}
          >
            {/* Floating icon badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              <Badge variant={feature.badgeVariant} size="lg" icon={feature.icon}>
                {t(feature.subtitleKey)}
              </Badge>
            </motion.div>

            <h3 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
              {t(feature.titleKey)}
            </h3>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t(feature.descriptionKey)}
            </p>

            {/* Bullet points */}
            <ul className="space-y-4">
              {feature.bulletKeys.map((bulletKey, bulletIndex) => (
                <motion.li
                  key={bulletKey}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + bulletIndex * 0.1 }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <CheckCircle className={cn("w-5 h-5 shrink-0", feature.checkColor)} />
                  <span className="font-medium">{t(bulletKey)}</span>
                </motion.li>
              ))}
            </ul>
          </ImageContentBlock>
        ))}
      </div>
    </Section>
  );
}
