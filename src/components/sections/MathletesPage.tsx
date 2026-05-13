"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Calculator,
  BookOpen,
  FileText,
  Brain,
  Users,
  GraduationCap,
  Calendar,
  Clock,
  Trophy,
  Target,
  Zap,
  Puzzle,
  Hash,
  Shapes,
  Sigma,
  Percent,
} from "lucide-react";
import {
  Container,
  Heading,
  PillButton,
  IconTile,
  AnimatedNumber,
} from "@/components/ui";
import { fontBody, fontSerif, fontHeading, bodySize } from "@/lib/typography";
import { DiagonalSpread } from "@/components/sections/DiagonalSpread";
import { TestimonialSpread } from "@/components/sections/TestimonialSpread";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import type { FaqItem } from "@/components/sections/FaqAccordion";

// ────────── Photos — unique to this page ──────────
const PHOTOS = {
  hero: "/images/conferences/DSC00832.webp",
  aboutMathletes: "/images/conferences/DSCF9375.webp",
  emeraldTestimonial: "/images/conferences/DSCF9319.webp",
  topicsSpread: "/images/conferences/DSCF9345.webp",
  orangeTestimonial: "/images/conferences/DSCF9381.webp",
  finalCta: "/images/conferences/DSCF9413.webp",
} as const;

// ────────── Component ──────────

export function MathletesPage() {
  const t = useTranslations("MathletesPage");

  // ────────── The Mathletes experience ──────────
  const MATHLETES_ACTIVITIES = [
    {
      icon: BookOpen,
      title: t("mathletesActivities.activity1Title"),
      description: t("mathletesActivities.activity1Description"),
      color: "#10b981",
    },
    {
      icon: Brain,
      title: t("mathletesActivities.activity2Title"),
      description: t("mathletesActivities.activity2Description"),
      color: "#9333ea",
    },
    {
      icon: Puzzle,
      title: t("mathletesActivities.activity3Title"),
      description: t("mathletesActivities.activity3Description"),
      color: "#397bce",
    },
    {
      icon: Trophy,
      title: t("mathletesActivities.activity4Title"),
      description: t("mathletesActivities.activity4Description"),
      color: "#f97316",
    },
  ];

  // ────────── Competition format (numbered list) ──────────
  const COMPETITION_FORMAT = [
    {
      icon: Zap,
      title: t("competitionFormat.step1Title"),
      body: t("competitionFormat.step1Body"),
      color: "#10b981",
    },
    {
      icon: Target,
      title: t("competitionFormat.step2Title"),
      body: t("competitionFormat.step2Body"),
      color: "#9333ea",
    },
    {
      icon: Users,
      title: t("competitionFormat.step3Title"),
      body: t("competitionFormat.step3Body"),
      color: "#397bce",
    },
    {
      icon: Trophy,
      title: t("competitionFormat.step4Title"),
      body: t("competitionFormat.step4Body"),
      color: "#f97316",
    },
  ];

  // ────────── Topics ──────────
  const TOPICS = [
    {
      icon: Hash,
      title: t("topicsSpread.topic1Title"),
      topics: t("topicsSpread.topic1Topics"),
      level: t("topicsSpread.topic1Level"),
      color: "#10b981",
    },
    {
      icon: Sigma,
      title: t("topicsSpread.topic2Title"),
      topics: t("topicsSpread.topic2Topics"),
      level: t("topicsSpread.topic2Level"),
      color: "#9333ea",
    },
    {
      icon: Shapes,
      title: t("topicsSpread.topic3Title"),
      topics: t("topicsSpread.topic3Topics"),
      level: t("topicsSpread.topic3Level"),
      color: "#397bce",
    },
    {
      icon: Percent,
      title: t("topicsSpread.topic4Title"),
      topics: t("topicsSpread.topic4Topics"),
      level: t("topicsSpread.topic4Level"),
      color: "#f97316",
    },
  ];

  // ────────── Skills ──────────
  const SKILLS = [
    {
      icon: Brain,
      title: t("skills.skill1Title"),
      description: t("skills.skill1Description"),
      color: "#10b981",
    },
    {
      icon: Zap,
      title: t("skills.skill2Title"),
      description: t("skills.skill2Description"),
      color: "#9333ea",
    },
    {
      icon: Target,
      title: t("skills.skill3Title"),
      description: t("skills.skill3Description"),
      color: "#397bce",
    },
    {
      icon: Users,
      title: t("skills.skill4Title"),
      description: t("skills.skill4Description"),
      color: "#f97316",
    },
  ];

  // ────────── Resources ──────────
  const RESOURCES = [
    {
      icon: BookOpen,
      title: t("resources.resource1Title"),
      description: t("resources.resource1Description"),
      href: "/mathletes/resources",
      color: "#10b981",
    },
    {
      icon: FileText,
      title: t("resources.resource2Title"),
      description: t("resources.resource2Description"),
      href: "/mathletes/resources",
      color: "#9333ea",
    },
    {
      icon: Calculator,
      title: t("resources.resource3Title"),
      description: t("resources.resource3Description"),
      href: "/mathletes/resources",
      color: "#397bce",
    },
    {
      icon: Zap,
      title: t("resources.resource4Title"),
      description: t("resources.resource4Description"),
      href: "/mathletes/resources",
      color: "#f97316",
    },
    {
      icon: Brain,
      title: t("resources.resource5Title"),
      description: t("resources.resource5Description"),
      href: "/mathletes/resources",
      color: "#0ea5e9",
    },
    {
      icon: GraduationCap,
      title: t("resources.resource6Title"),
      description: t("resources.resource6Description"),
      href: "/mathletes/resources",
      color: "#eab308",
    },
  ];

  // ────────── FAQs ──────────
  const FAQS: FaqItem[] = [
    {
      q: t("faq.q1"),
      a: t("faq.a1"),
    },
    {
      q: t("faq.q2"),
      a: t("faq.a2"),
    },
    {
      q: t("faq.q3"),
      a: t("faq.a3"),
    },
    {
      q: t("faq.q4"),
      a: t("faq.a4"),
    },
    {
      q: t("faq.q5"),
      a: t("faq.a5"),
    },
    {
      q: t("faq.q6"),
      a: t("faq.a6"),
    },
  ];

  const stats = [
    { value: t("stats.stat1Value"), label: t("stats.stat1Label") },
    { value: t("stats.stat2Value"), label: t("stats.stat2Label") },
    { value: t("stats.stat3Value"), label: t("stats.stat3Label") },
    { value: t("stats.stat4Value"), label: t("stats.stat4Label") },
  ];

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.hero}
        photoAlt={t("heroPhotoAlt")}
        photoPriority
        minHeight="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        <Heading size="hero">
          {t("hero.headingStart")}{" "}
          <span className="text-[#10b981]">{t("hero.headingAccent")}</span>
        </Heading>
        <p style={fontBody} className={`mt-6 max-w-md ${bodySize.lead}`}>
          {t("hero.description")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href="mailto:contact@jamun.org" tone="custom" color="#10b981" withArrow>
            {t("hero.joinInterestList")}
          </PillButton>
          <PillButton href="/programs" tone="outline">
            {t("hero.exploreAllPrograms")}
          </PillButton>
        </div>
      </DiagonalSpread>

      {/* ───── Stats strip ───── */}
      <section className="bg-white border-y border-black/5">
        <Container className="py-12 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black/5">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="px-4 py-5 md:py-2 md:px-8 text-center"
              >
                <div
                  style={{ ...fontHeading, fontWeight: 600 }}
                  className="text-4xl md:text-5xl leading-none tracking-tight"
                >
                  <AnimatedNumber value={s.value} />
                </div>
                <div
                  style={fontBody}
                  className="mt-2 text-sm md:text-base text-neutral-600"
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── What is Mathletes ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <Heading size="section" className="mb-6">
                {t("whatIs.heading")}
              </Heading>
              <p style={fontBody} className={`${bodySize.lead} mb-5`}>
                {t("whatIs.paragraph1")}
              </p>
              <p style={fontBody} className={`${bodySize.base} mb-8`}>
                {t("whatIs.paragraph2")}
              </p>
              <div className="flex flex-wrap gap-3">
                <PillButton href="mailto:contact@jamun.org" size="md" tone="custom" color="#10b981" withArrow>
                  {t("whatIs.getNotifiedAtLaunch")}
                </PillButton>
                <PillButton href="/mathletes/resources" tone="outline" size="md">
                  {t("whatIs.viewResources")}
                </PillButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative aspect-square rounded-2xl overflow-hidden"
            >
              <Image
                src={PHOTOS.aboutMathletes}
                alt={t("aboutPhotoAlt")}
                fill
                className="object-cover"
                sizes="(min-width:1024px) 45vw, 90vw"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ───── Testimonial — emerald ───── */}
      <TestimonialSpread
        bg="#10b981"
        photoSide="left"
        photoSrc={PHOTOS.emeraldTestimonial}
        photoAlt={t("blueTestimonialPhotoAlt")}
        heading={t("emeraldTestimonial.heading")}
        quote={t("emeraldTestimonial.quote")}
        attribution={t("emeraldTestimonial.attribution")}
      />

      {/* ───── The Mathletes experience — 4-up cards ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("mathletesActivities.sectionTitle")}
            subtitle={t("mathletesActivities.sectionSubtitle")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {MATHLETES_ACTIVITIES.map((activity, i) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
              >
                <IconTile
                  icon={activity.icon}
                  color={activity.color}
                  size="md"
                  className="mb-5"
                />
                <span
                  style={fontBody}
                  className="inline-block text-[11px] font-semibold uppercase tracking-[0.22em] mb-3"
                  aria-hidden
                >
                  {t("mathletesActivities.stepLabel")} {String(i + 1).padStart(2, "0")}
                </span>
                <Heading size="cardLg" className="mb-2">
                  {activity.title}
                </Heading>
                <p style={fontBody} className={bodySize.compact}>
                  {activity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Competition format — numbered editorial list ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Heading size="section">{t("competitionFormat.heading")}</Heading>
              <p style={fontBody} className={`mt-5 ${bodySize.lead}`}>
                {t("competitionFormat.description")}
              </p>
              <div className="mt-6 flex flex-wrap gap-4" style={fontBody}>
                <span className="inline-flex items-center gap-2 text-sm text-neutral-600">
                  <Calendar className="w-4 h-4" /> {t("competitionFormat.badgeHalfToFullDay")}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-neutral-600">
                  <Clock className="w-4 h-4" /> {t("competitionFormat.badge4Rounds")}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-neutral-600">
                  <Users className="w-4 h-4" /> {t("competitionFormat.badgeTeamOf4")}
                </span>
              </div>
            </div>

            <ol className="divide-y divide-black/10 border-t border-black/10">
              {COMPETITION_FORMAT.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.08, duration: 0.7 }}
                  className="flex gap-6 md:gap-8 py-8 md:py-10"
                >
                  <span
                    aria-hidden
                    style={{ ...fontSerif, color: step.color }}
                    className="text-4xl md:text-5xl leading-none shrink-0 w-14 md:w-16 tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <step.icon
                        className="w-5 h-5"
                        style={{ color: step.color }}
                        aria-hidden
                      />
                      <Heading size="cardLg" as="h3">
                        {step.title}
                      </Heading>
                    </div>
                    <p style={fontBody} className={bodySize.base}>
                      {step.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ───── Topics spread ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.topicsSpread}
        photoAlt={t("conferenceSpreadPhotoAlt")}
        clip="none"
        panelBg="#10b981"
        panelText="#ffffff"
        minHeight="min-h-[60svh]"
        panelClassName="py-14 md:py-16"
      >
        <Heading size="panel" className="text-white mb-8">
          {t("topicsSpread.heading")}
        </Heading>
        <div className="grid grid-cols-2 gap-5">
          {TOPICS.map((topic) => (
            <div key={topic.title} className="rounded-xl bg-white/15 p-4">
              <div className="flex items-center gap-2 mb-2">
                <topic.icon className="w-4 h-4 text-white/80" />
                <span style={{ ...fontBody, fontWeight: 600 }} className="text-white text-sm">
                  {topic.title}
                </span>
              </div>
              <p style={fontBody} className="text-white/80 text-xs leading-relaxed">
                {topic.topics}
              </p>
              <span
                style={fontBody}
                className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wider text-white/60"
              >
                {topic.level}
              </span>
            </div>
          ))}
        </div>
        <p style={fontBody} className="mt-6 text-white/70 text-sm">
          {t("topicsSpread.footerText")}
        </p>
      </DiagonalSpread>

      {/* ───── Skills — 4-up grid ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("skills.sectionTitle")}
            subtitle={t("skills.sectionSubtitle")}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
              >
                <IconTile
                  icon={skill.icon}
                  color={skill.color}
                  size="sm"
                  className="mb-5"
                />
                <Heading size="micro" className="text-neutral-900 mb-2">
                  {skill.title}
                </Heading>
                <p style={fontBody} className={bodySize.micro}>
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Testimonial — orange ───── */}
      <TestimonialSpread
        bg="#f97316"
        photoSide="left"
        photoSrc={PHOTOS.orangeTestimonial}
        photoAlt={t("orangeTestimonialPhotoAlt")}
        heading={t("orangeTestimonial.heading")}
        quote={t("orangeTestimonial.quote")}
        attribution={t("orangeTestimonial.attribution")}
      />

      {/* ───── FREE resources ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("resources.sectionTitle")}
            subtitle={t("resources.sectionSubtitle")}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {RESOURCES.map((resource, i) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
              >
                <a
                  href={resource.href}
                  className="group block h-full rounded-2xl border border-black/5 p-6 md:p-7 transition-colors hover:border-black/10"
                >
                  <IconTile
                    icon={resource.icon}
                    color={resource.color}
                    size="sm"
                    className="mb-5"
                  />
                  <Heading
                    size="micro"
                    className="text-neutral-900 mb-2 group-hover:text-[#10b981] transition-colors"
                  >
                    {resource.title}
                  </Heading>
                  <p style={fontBody} className={bodySize.micro}>
                    {resource.description}
                  </p>
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mt-10 md:mt-14"
          >
            <PillButton href="/mathletes/resources" tone="outline" withArrow>
              {t("resources.browseAllResources")}
            </PillButton>
          </motion.div>
        </Container>
      </section>

      {/* ───── FAQ ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("faq.sectionTitle")}
            subtitle={t("faq.sectionSubtitle")}
            maxWidth="2xl"
          />
          <Container narrow className="!px-0">
            <FaqAccordion items={FAQS} />
          </Container>
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={PHOTOS.finalCta}
        photoAlt={t("finalCtaPhotoAlt")}
        clip="diagonal"
        minHeight="min-h-[70svh]"
        panelClassName="py-16 md:py-10"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          {t("finalCta.headingStart")}{" "}
          <span className="text-[#10b981]">{t("finalCta.headingAccent")}</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9`}>
          {t("finalCta.description")}
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton href="mailto:contact@jamun.org" tone="custom" color="#10b981" withArrow>
            {t("finalCta.joinInterestList")}
          </PillButton>
          <PillButton href="/programs" tone="outline">
            {t("finalCta.exploreOtherPrograms")}
          </PillButton>
        </div>
        <p style={fontBody} className="mt-8 text-sm text-neutral-600">
          {t("finalCta.questions")}{" "}
          <a
            href="mailto:mathletes@jamun.org"
            className="font-semibold text-[#10b981] hover:text-[#059669] transition-colors"
          >
            {t("finalCta.email")}
          </a>
        </p>
      </DiagonalSpread>
    </div>
  );
}
