"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, BookOpen, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, SectionHeader } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const audiences = [
  {
    icon: GraduationCap,
    titleKey: "studentsTitle" as const,
    descriptionKey: "studentsDescription" as const,
    ctaKey: "studentsCta" as const,
    href: "/register",
    iconBg: "bg-jamun-blue",
    accentColor: "text-jamun-blue",
    hoverGlow: "group-hover:shadow-jamun-blue/20",
  },
  {
    icon: Users,
    titleKey: "parentsTitle" as const,
    descriptionKey: "parentsDescription" as const,
    ctaKey: "parentsCta" as const,
    href: "/programs",
    iconBg: "bg-purple-600",
    accentColor: "text-purple-600",
    hoverGlow: "group-hover:shadow-purple-500/20",
  },
  {
    icon: BookOpen,
    titleKey: "teachersTitle" as const,
    descriptionKey: "teachersDescription" as const,
    ctaKey: "teachersCta" as const,
    href: "/modelun/resources",
    iconBg: "bg-emerald-600",
    accentColor: "text-emerald-600",
    hoverGlow: "group-hover:shadow-emerald-500/20",
  },
];

export function WhoWeServeSection() {
  const t = useTranslations("WhoWeServeSection");

  return (
    <Section background="white">
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-3 gap-6 lg:gap-8"
      >
        {audiences.map((audience) => (
          <motion.div
            key={audience.titleKey}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group"
          >
            <div className={cn(
              "h-full flex flex-col bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100",
              "transition-all duration-300",
              "hover:shadow-xl",
              audience.hoverGlow
            )}>
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
                "transition-transform duration-300 group-hover:scale-110",
                audience.iconBg
              )}>
                <audience.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t(audience.titleKey)}
              </h3>
              <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                {t(audience.descriptionKey)}
              </p>
              <Link
                href={audience.href}
                className={cn(
                  "inline-flex items-center font-semibold transition-all duration-200",
                  audience.accentColor,
                  "group/link"
                )}
              >
                {t(audience.ctaKey)}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
