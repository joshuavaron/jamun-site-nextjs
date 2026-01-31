"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { defaultViewport } from "@/lib/animations";
import { CornerAccent, TestimonialCard } from "@/components/ui";

const sections = [
  {
    id: "parents",
    labelKey: "parentsLabel" as const,
    titleKey: "parentsTitle" as const,
    descriptionKey: "parentsDescription" as const,
    image: "/images/conferences/DSC02053.webp",
    imagePosition: "right" as const,
    statValueKey: "parentsStatValue" as const,
    statLabelKey: "parentsStatLabel" as const,
    benefits: [
      { number: "01", titleKey: "parentsBenefit1Title" as const, descriptionKey: "parentsBenefit1Description" as const },
      { number: "02", titleKey: "parentsBenefit2Title" as const, descriptionKey: "parentsBenefit2Description" as const },
      { number: "03", titleKey: "parentsBenefit3Title" as const, descriptionKey: "parentsBenefit3Description" as const },
      { number: "04", titleKey: "parentsBenefit4Title" as const, descriptionKey: "parentsBenefit4Description" as const },
      { number: "05", titleKey: "parentsBenefit5Title" as const, descriptionKey: "parentsBenefit5Description" as const },
      { number: "06", titleKey: "parentsBenefit6Title" as const, descriptionKey: "parentsBenefit6Description" as const },
    ],
    testimonialQuoteKey: "parentsTestimonialQuote" as const,
    testimonialAuthorKey: "parentsTestimonialAuthor" as const,
    accentColor: "purple",
    labelColor: "text-purple-600",
    borderColor: "border-l-purple-600",
    numberColor: "text-purple-600",
    cornerColor: "#9333ea",
    cornerPosition: "top-right" as const,
  },
  {
    id: "educators",
    labelKey: "educatorsLabel" as const,
    titleKey: "educatorsTitle" as const,
    descriptionKey: "educatorsDescription" as const,
    image: "/images/conferences/DSC02135.webp",
    imagePosition: "left" as const,
    statValueKey: "educatorsStatValue" as const,
    statLabelKey: "educatorsStatLabel" as const,
    benefits: [
      { number: "01", titleKey: "educatorsBenefit1Title" as const, descriptionKey: "educatorsBenefit1Description" as const },
      { number: "02", titleKey: "educatorsBenefit2Title" as const, descriptionKey: "educatorsBenefit2Description" as const },
      { number: "03", titleKey: "educatorsBenefit3Title" as const, descriptionKey: "educatorsBenefit3Description" as const },
      { number: "04", titleKey: "educatorsBenefit4Title" as const, descriptionKey: "educatorsBenefit4Description" as const },
    ],
    testimonialQuoteKey: "educatorsTestimonialQuote" as const,
    testimonialAuthorKey: "educatorsTestimonialAuthor" as const,
    accentColor: "emerald",
    labelColor: "text-emerald-600",
    borderColor: "border-l-emerald-600",
    numberColor: "text-emerald-600",
    cornerColor: "#059669",
    cornerPosition: "top-left" as const,
  },
];

export function GallerySection() {
  const t = useTranslations("GallerySection");

  return (
    <section className="bg-white">
      {sections.map((section, sectionIndex) => (
        <div key={section.id} className={sectionIndex > 0 ? "mt-0" : ""}>
          <div className="grid lg:grid-cols-2">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: section.imagePosition === "right" ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6 }}
              className={cn(
                "relative min-h-[400px] lg:min-h-[600px] overflow-hidden group",
                section.imagePosition === "right" ? "lg:order-1" : "lg:order-2"
              )}
            >
              <Image
                src={section.image}
                alt={t(section.titleKey)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Stat overlay with text shadow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-8 left-8 text-white"
              >
                <div
                  className="text-5xl md:text-6xl font-bold mb-2 text-white"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
                >
                  {t(section.statValueKey)}
                </div>
                <div className="text-sm md:text-base text-white/90 max-w-[200px]">
                  {t(section.statLabelKey)}
                </div>
              </motion.div>

              {/* Decorative corner accent */}
              <CornerAccent
                position={section.cornerPosition}
                color={section.cornerColor}
              />
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: section.imagePosition === "right" ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn(
                "bg-cream p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative",
                section.imagePosition === "right" ? "lg:order-2" : "lg:order-1"
              )}
            >
              {/* Label */}
              <span className={cn(
                "font-semibold text-base tracking-widest uppercase mb-4",
                section.labelColor
              )}>
                {t(section.labelKey)}
              </span>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-6">
                {t(section.titleKey)}
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8">
                {t(section.descriptionKey)}
              </p>

              {/* Benefits Grid */}
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {section.benefits.slice(0, 6).map((benefit, index) => (
                  <motion.div
                    key={benefit.number}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex gap-4 group/benefit"
                  >
                    <span className={cn(
                      "font-bold text-sm transition-transform group-hover/benefit:scale-110",
                      section.numberColor
                    )}>
                      {benefit.number}
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {t(benefit.titleKey)}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {t(benefit.descriptionKey)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Testimonial */}
              <TestimonialCard
                quote={t(section.testimonialQuoteKey)}
                author={t(section.testimonialAuthorKey)}
                accentColor={section.borderColor}
              />
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
}
