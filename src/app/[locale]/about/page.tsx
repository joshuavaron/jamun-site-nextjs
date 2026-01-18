"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section, SectionHeader, Button, TypewriterText } from "@/components/ui";
import {
  Heart,
  Users,
  Lightbulb,
  Target,
  BookOpen,
  ArrowRight,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  // Team member data with translations
  const teamMembers = [
    {
      name: t("teamMember1Name"),
      role: t("teamMember1Role"),
      image: null,
      description: t("teamMember1Description"),
      bgColor: "bg-rose-100",
      textColor: "text-rose-600",
      ringColor: "ring-rose-300",
    },
    {
      name: t("teamMember2Name"),
      role: t("teamMember2Role"),
      image: "/images/team/charlie.webp",
      description: t("teamMember2Description"),
      bgColor: "bg-jamun-blue/10",
      textColor: "text-jamun-blue",
      ringColor: "ring-jamun-blue/30",
    },
    {
      name: t("teamMember3Name"),
      role: t("teamMember3Role"),
      image: "/images/team/dustin.webp",
      description: t("teamMember3Description"),
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      ringColor: "ring-purple-300",
    },
    {
      name: t("teamMember4Name"),
      role: t("teamMember4Role"),
      image: "/images/team/will.webp",
      description: t("teamMember4Description"),
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
      ringColor: "ring-emerald-300",
      href: "/will",
    },
  ];

  // Core values with translations
  const values = [
    {
      icon: Heart,
      title: t("valuePassionTitle"),
      description: t("valuePassionDescription"),
      color: "bg-rose-100",
      iconColor: "text-rose-600",
    },
    {
      icon: Users,
      title: t("valueCommunityTitle"),
      description: t("valueCommunityDescription"),
      color: "bg-jamun-blue/10",
      iconColor: "text-jamun-blue",
    },
    {
      icon: Lightbulb,
      title: t("valueInnovationTitle"),
      description: t("valueInnovationDescription"),
      color: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      icon: Target,
      title: t("valueExcellenceTitle"),
      description: t("valueExcellenceDescription"),
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  // Timeline milestones with translations
  const timeline = [
    {
      year: t("timeline2023Year"),
      title: t("timeline2023Title"),
      description: t("timeline2023Description"),
    },
    {
      year: t("timeline2024Year"),
      title: t("timeline2024Title"),
      description: t("timeline2024Description"),
    },
    {
      year: t("timeline2025Year"),
      title: t("timeline2025Title"),
      description: t("timeline2025Description"),
    },
    {
      year: t("timelineTodayYear"),
      title: t("timelineTodayTitle"),
      description: t("timelineTodayDescription"),
    },
  ];

  // Impact stats with translations
  const impactStats = [
    { value: t("impactStat1Value"), label: t("impactStat1Label") },
    { value: t("impactStat2Value"), label: t("impactStat2Label") },
    { value: t("impactStat3Value"), label: t("impactStat3Label") },
    { value: t("impactStat4Value"), label: t("impactStat4Label") },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-jamun-orange/10 to-pink-400/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-jamun-blue bg-jamun-blue/10 rounded-full border border-jamun-blue/20"
              >
                <BookOpen className="w-4 h-4" />
                {t("heroBadge")}
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
                <TypewriterText text={t("heroHeadline1")} delay={0.3} />
                <TypewriterText
                  text={t("heroHeadline2")}
                  delay={0.3 + 19 * 0.03}
                  className="bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent"
                />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                {t("heroDescription")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button href="/programs" size="lg" className="group">
                  {t("heroPrimaryCTA")}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button href="/donate" variant="outline" size="lg">
                  {t("heroSecondaryCTA")}
                </Button>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/conferences/DSC01054.webp"
                  alt={t("heroImageAlt")}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>

              {/* Decorative blobs */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-jamun-orange/30 to-pink-400/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-br from-jamun-blue/30 to-purple-400/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <Section background="white" className="py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-jamun-blue font-semibold text-sm tracking-widest uppercase mb-4 block">
              {t("missionEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
              {t("missionTitle")}{" "}
              <span className="text-jamun-blue">{t("missionTitleHighlight")}</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {t("missionParagraph1")}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t("missionParagraph2")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-jamun-blue/10 via-purple-100/50 to-emerald-100/30 rounded-3xl p-8 md:p-10">
              <Quote className="w-12 h-12 text-jamun-blue/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-6 leading-relaxed">
                &ldquo;{t("missionQuote")}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-jamun-blue/20 flex items-center justify-center">
                  <span className="text-jamun-blue font-bold">JV</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t("missionQuoteAuthor")}</p>
                  <p className="text-sm text-gray-600">{t("missionQuoteRole")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Our Story / Timeline Section */}
      <Section background="gray" className="py-16 md:py-20">
        <SectionHeader
          eyebrow={t("timelineEyebrow")}
          title={t("timelineTitle")}
          subtitle={t("timelineSubtitle")}
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-jamun-blue via-purple-500 to-emerald-500 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col md:flex-row gap-8 md:gap-16",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Year marker */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-white border-4 border-jamun-blue rounded-full transform -translate-x-1/2 flex items-center justify-center z-10">
                  <div className="w-2 h-2 bg-jamun-blue rounded-full" />
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "ml-16 md:ml-0 md:w-1/2",
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  )}
                >
                  <span className="inline-block px-4 py-1.5 mb-3 text-sm font-bold text-jamun-blue bg-jamun-blue/10 rounded-full">
                    {milestone.year}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section background="white" className="py-16 md:py-20">
        <SectionHeader
          eyebrow={t("valuesEyebrow")}
          title={t("valuesTitle")}
          subtitle={t("valuesSubtitle")}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                  value.color
                )}
              >
                <value.icon className={cn("w-7 h-7", value.iconColor)} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Leadership Team Section */}
      <Section background="gray" className="py-16 md:py-20">
        <SectionHeader
          eyebrow={t("teamEyebrow")}
          title={t("teamTitle")}
          subtitle={t("teamSubtitle")}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member) => {
            const content = (
              <>
                {/* Circular headshot */}
                <div className="relative mx-auto mb-5 w-40 h-40">
                  {/* Decorative ring */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full ring-4 transition-all duration-300 group-hover:ring-8",
                      member.ringColor
                    )}
                  />
                  {/* Image container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">JV</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className={cn(
                    "text-xl font-semibold text-gray-900 mb-1",
                    member.href && "group-hover:text-emerald-600 transition-colors"
                  )}>
                    {member.name}
                  </h3>
                  <span
                    className={cn(
                      "inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full",
                      member.bgColor,
                      member.textColor
                    )}
                  >
                    {member.role}
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                    {member.description}
                  </p>
                </div>
              </>
            );

            return (
              <motion.div
                key={member.name}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group text-center"
              >
                {member.href ? (
                  <Link href={member.href} className="block cursor-pointer">
                    {content}
                  </Link>
                ) : (
                  <div>{content}</div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("teamSupportText")}{" "}
            <span className="font-semibold text-jamun-blue">{t("teamVolunteersHighlight")}</span>{" "}
            {t("teamSupportTextEnd")}
          </p>
        </motion.div>
      </Section>

      {/* Impact Stats - Similar to homepage StatsSection */}
      <section className="bg-[#0f172a] py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-jamun-blue/10 via-transparent to-purple-900/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-jamun-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t("impactTitle")}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t("impactSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className="relative bg-[#1e293b]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 hover:border-jamun-blue/50 transition-all duration-300 text-center h-full">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-jamun-blue/0 to-purple-600/0 group-hover:from-jamun-blue/5 group-hover:to-purple-600/5 transition-all duration-300" />
                  <div className="relative z-10">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-jamun-blue-light to-purple-400 bg-clip-text text-transparent mb-3">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <Section background="white" className="py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-jamun-blue/10 rounded-full">
            <Heart className="w-4 h-4 text-jamun-blue" />
            <span className="text-sm font-medium text-jamun-blue">
              {t("ctaBadge")}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            {t("ctaTitle")}{" "}
            <span className="bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent">
              {t("ctaTitleHighlight")}
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {t("ctaDescription")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/register" size="lg" className="group">
                {t("ctaPrimaryCTA")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/donate" variant="accent" size="lg">
                {t("ctaSecondaryCTA")}
              </Button>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm text-gray-500"
          >
            {t("ctaContactText")}{" "}
            <a
              href="mailto:contact@jamun.org"
              className="text-jamun-blue hover:text-jamun-blue-dark transition-colors font-medium"
            >
              contact@jamun.org
            </a>
          </motion.p>
        </motion.div>
      </Section>
    </main>
  );
}
