"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader, Button } from "@/components/ui";
import { Heart, Handshake, ArrowRight, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/animations";
import { useTranslations } from "next-intl";

export default function SupportersPage() {
  const t = useTranslations("SupportersPage");

  const partners = [
    { name: t("partner1Name") },
  ];

  const boardMembers = [
    {
      name: t("boardMember1Name"),
      title: t("boardMember1Title"),
      bio: t("boardMember1Bio"),
      initials: "JP",
      bgColor: "from-jamun-blue to-purple-600",
      ringColor: "ring-jamun-blue/30",
    },
    {
      name: t("boardMember2Name"),
      title: t("boardMember2Title"),
      bio: t("boardMember2Bio"),
      initials: "HT",
      bgColor: "from-purple-500 to-rose-500",
      ringColor: "ring-purple-300",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50 py-24 md:py-32 lg:py-36">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-rose-400/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-jamun-blue bg-jamun-blue/10 rounded-full border border-jamun-blue/20">
              <Heart className="w-4 h-4" />
              {t("heroBadge")}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
              {t("heroHeadline")}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            >
              {t("heroDescription")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Community Partners Section */}
      <Section background="gray">
        <SectionHeader
          eyebrow={t("partnersEyebrow")}
          title={t("partnersTitle")}
          subtitle={t("partnersSubtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="flex justify-center"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 text-center max-w-xs"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br from-jamun-blue/10 to-purple-100 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-jamun-blue/60" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 leading-tight">
                {partner.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Advisory Board Section */}
      <Section background="gray">
        <SectionHeader
          eyebrow={t("boardEyebrow")}
          title={t("boardTitle")}
          subtitle={t("boardSubtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto"
        >
          {boardMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="group text-center"
            >
              {/* Circular avatar */}
              <div className="relative mx-auto mb-5 w-32 h-32">
                <div
                  className={cn(
                    "absolute inset-0 rounded-full ring-4 transition-all duration-300 group-hover:ring-8",
                    member.ringColor
                  )}
                />
                <div className={cn(
                  "relative w-full h-full rounded-full overflow-hidden shadow-lg bg-gradient-to-br flex items-center justify-center",
                  member.bgColor
                )}>
                  <span className="text-3xl font-bold text-white">
                    {member.initials}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {member.name}
              </h3>
              <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-jamun-blue/10 text-jamun-blue">
                {member.title}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* CTA Section */}
      <Section background="white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-jamun-blue/10 rounded-full">
            <Handshake className="w-4 h-4 text-jamun-blue" />
            <span className="text-sm font-medium text-jamun-blue">
              {t("heroBadge")}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            {t("ctaTitle")}
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {t("ctaDescription")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="mailto:contact@jamun.org" size="lg" className="group">
                {t("ctaPartnerButton")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/donate" variant="accent" size="lg">
                {t("ctaDonateButton")}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Section>
    </main>
  );
}
