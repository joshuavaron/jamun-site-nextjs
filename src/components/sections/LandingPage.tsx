"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  GraduationCap,
  Heart,
  BookOpen,
  Mic,
  Brain,
  MessageSquare,
  Users,
  Lightbulb,
  Target,
  Trophy,
} from "lucide-react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import {
  Container,
  Heading,
  PillButton,
  ArrowLink,
  IconTile,
} from "@/components/ui";
import { fontBody, fontHeading, bodySize } from "@/lib/typography";
import { DiagonalSpread } from "@/components/sections/DiagonalSpread";
import { TestimonialSpread } from "@/components/sections/TestimonialSpread";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { FaqAccordion } from "@/components/sections/FaqAccordion";

// ────────── Conference photos ──────────
const PHOTOS = {
  threeBoys: "/images/conferences/DSCF9417.webp",
  boysCircle: "/images/conferences/DSCF9395.webp",
  voting: "/images/conferences/DSCF9356.webp",
  studentsConvo: "/images/conferences/DSCF9445.webp",
  candid5: "/images/conferences/DSCF9450.webp",
  girlGesturing: "/images/conferences/DSCF9423.webp",
  studentsAtTable: "/images/conferences/DSCF9440.webp",
  girlsTrio: "/images/conferences/DSCF9328.webp",
  twoGirlsReading: "/images/conferences/DSCF9435.webp",
} as const;

export function LandingPage() {
  const t = useTranslations("LandingPage");

  // ────────── Stats ──────────
  const STATS = [
    { value: "500+", label: t("statsDelegates") },
    { value: "30+", label: t("statsSchools") },
    { value: "80+", label: t("statsVolunteers") },
    { value: "$70K+", label: t("statsRaised") },
  ];

  // ────────── Programs ──────────
  const PROGRAMS = [
    {
      name: t("programModelUNName"),
      body: t("programModelUNBody"),
      color: "#397bce",
      photo: PHOTOS.voting,
      alt: t("programModelUNAlt"),
    },
    {
      name: t("programMockTrialName"),
      body: t("programMockTrialBody"),
      color: "#9333ea",
      photo: PHOTOS.studentsConvo,
      alt: t("programMockTrialAlt"),
    },
    {
      name: t("programMathletesName"),
      body: t("programMathletesBody"),
      color: "#10b981",
      photo: PHOTOS.candid5,
      alt: t("programMathletesAlt"),
    },
  ];

  // ────────── Audience targeting ──────────
  const AUDIENCES = [
    {
      icon: GraduationCap,
      title: t("audienceStudentsTitle"),
      body: t("audienceStudentsBody"),
      cta: t("audienceStudentsCta"),
      href: "/register",
      color: "#397bce",
    },
    {
      icon: Heart,
      title: t("audienceParentsTitle"),
      body: t("audienceParentsBody"),
      cta: t("audienceParentsCta"),
      href: "/programs",
      color: "#f97316",
    },
    {
      icon: BookOpen,
      title: t("audienceTeachersTitle"),
      body: t("audienceTeachersBody"),
      cta: t("audienceTeachersCta"),
      href: "/modelun/resources",
      color: "#9333ea",
    },
  ];

  // ────────── Skills built ──────────
  const SKILLS = [
    { icon: Mic, title: t("skillPublicSpeaking"), body: t("skillPublicSpeakingBody"), color: "#397bce" },
    { icon: Brain, title: t("skillCriticalThinking"), body: t("skillCriticalThinkingBody"), color: "#9333ea" },
    { icon: MessageSquare, title: t("skillDebate"), body: t("skillDebateBody"), color: "#10b981" },
    { icon: BookOpen, title: t("skillResearch"), body: t("skillResearchBody"), color: "#f97316" },
    { icon: Users, title: t("skillTeamwork"), body: t("skillTeamworkBody"), color: "#0ea5e9" },
    { icon: Lightbulb, title: t("skillProblemSolving"), body: t("skillProblemSolvingBody"), color: "#eab308" },
    { icon: Target, title: t("skillLeadership"), body: t("skillLeadershipBody"), color: "#ec4899" },
    { icon: Trophy, title: t("skillCompetitive"), body: t("skillCompetitiveBody"), color: "#f97316" },
  ];

  // ────────── FAQs ──────────
  const FAQS = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
    { q: t("faq5Q"), a: t("faq5A") },
    { q: t("faq6Q"), a: t("faq6A") },
    { q: t("faq7Q"), a: t("faq7A") },
  ];

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Spread 1 — Hero ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.threeBoys}
        photoAlt={t("heroPhotoAlt")}
        photoPriority
        photoClassName="min-h-[60svh]"
        minHeight="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        objectPosition="40% 35%"
        animation="entry"
      >
        <Heading size="hero">
          {t("heroTitle1")}<span className="text-[#f97316]">{t("heroTitleHighlight")}</span>
        </Heading>
        <p style={fontBody} className={`mt-6 ${bodySize.lead}`}>
          {t("heroDescription")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href="/register" withArrow>
            {t("registerNow")}
          </PillButton>
          <PillButton href="/programs" tone="outline">
            {t("seePrograms")}
          </PillButton>
        </div>
      </DiagonalSpread>

      {/* ───── Spread 2 — Stats ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={PHOTOS.boysCircle}
        photoAlt={t("statsPhotoAlt")}
        minHeight="md:min-h-[72svh]"
        panelClassName="py-10 md:py-12"
      >
        <Heading size="section" className="mb-10">
          {t("statsTitle")}
        </Heading>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <div
                style={{ ...fontHeading, fontWeight: 600 }}
                className="text-4xl md:text-5xl leading-none tracking-tight"
              >
                <AnimatedNumber value={s.value} />
              </div>
              <div style={fontBody} className="mt-2 text-base md:text-lg text-neutral-600">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
        <p style={fontBody} className={`mt-10 ${bodySize.lead}`}>
          {t("statsDescription")}
        </p>
      </DiagonalSpread>

      {/* ───── Programs ───── */}
      <section className="bg-white">
        <Container className="pt-10 md:pt-14 text-center">
          <Heading size="section">{t("programsTitle")}</Heading>
        </Container>
        <Container className="pt-8 md:pt-12 pb-14 md:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {PROGRAMS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className="h-full flex flex-col"
              >
                <div className="relative aspect-[4/3] mb-5 overflow-hidden">
                  <Image
                    src={p.photo}
                    alt={p.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width:768px) 33vw, 100vw"
                  />
                </div>
                <Heading size="card" className="mb-3">
                  {p.name}
                </Heading>
                <p style={fontBody} className={`${bodySize.compact} mb-5`}>
                  {p.body}
                </p>
                <PillButton
                  href="/programs"
                  size="md"
                  tone="custom"
                  color={p.color}
                  withArrow
                  className="mt-auto self-start"
                >
                  {t("learnMore")}
                </PillButton>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Who we serve ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("whoWeServeTitle")}
            subtitle={t("whoWeServeSubtitle")}
            spacing="loose"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            {AUDIENCES.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className="h-full flex flex-col"
              >
                <IconTile icon={a.icon} color={a.color} className="mb-6" />
                <Heading size="cardLg" className="mb-4">
                  {a.title}
                </Heading>
                <p style={fontBody} className={`${bodySize.base} mb-6`}>
                  {a.body}
                </p>
                <ArrowLink href={a.href} color={a.color} className="mt-auto self-start">
                  {a.cta}
                </ArrowLink>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Spread 3 — Orange parent quote ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={PHOTOS.girlGesturing}
        photoAlt={t("audiencePhotoAlt")}
        clip="none"
        panelBg="#f97316"
        panelText="#ffffff"
      >
        <Heading size="section" as="blockquote">
          <span className="opacity-70">&ldquo;</span>{t("orangeQuote")}<span className="opacity-70">&rdquo;</span>
        </Heading>
        <div style={fontBody} className="mt-8 text-base md:text-lg text-white/90">
          {t("orangeQuoteAttribution")}
        </div>
      </DiagonalSpread>

      {/* ───── Themed proof spreads ───── */}
      <section className="bg-white">
        <Container className="py-10 md:py-14 text-center">
          <Heading size="section">{t("testimonialsTitle")}</Heading>
          <p style={fontBody} className={`mt-5 max-w-2xl mx-auto ${bodySize.lead}`}>
            {t("testimonialsSubtitle")}
          </p>
        </Container>

        <TestimonialSpread
          bg="#397bce"
          photoSide="right"
          photoSrc={PHOTOS.studentsAtTable}
          photoAlt={t("testimonialBluePhotoAlt")}
          heading={t("blueTestimonialHeading")}
          quote={t("blueTestimonialQuote")}
          attribution={t("blueTestimonialAttribution")}
        />

        <TestimonialSpread
          bg="#9333ea"
          photoSide="left"
          photoSrc={PHOTOS.girlsTrio}
          photoAlt={t("testimonialPurplePhotoAlt")}
          heading={t("purpleTestimonialHeading")}
          quote={t("purpleTestimonialQuote")}
          attribution={t("purpleTestimonialAttribution")}
        />

        <TestimonialSpread
          bg="#10b981"
          photoSide="right"
          photoSrc={PHOTOS.twoGirlsReading}
          photoAlt={t("testimonialEmeraldPhotoAlt")}
          heading={t("greenTestimonialHeading")}
          quote={t("greenTestimonialQuote")}
          attribution={t("greenTestimonialAttribution")}
        />
      </section>

      {/* ───── Skills built ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("skillsTitle")}
            subtitle={t("skillsSubtitle")}
            spacing="loose"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {SKILLS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (i % 4) * 0.06, duration: 0.6 }}
              >
                <IconTile icon={s.icon} color={s.color} size="sm" className="mb-5" />
                <Heading size="micro" className="text-neutral-900 mb-2">
                  {s.title}
                </Heading>
                <p style={fontBody} className={bodySize.micro}>
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 md:mt-20 max-w-4xl mx-auto"
          >
            <div className="border-l-2 border-[#397bce] pl-6 md:pl-8 py-2">
              <Heading size="sub" className="mb-4 text-neutral-900">
                {t("whyCompetitionsTitle")}
              </Heading>
              <p style={fontBody} className={`${bodySize.base} mb-4`}>
                {t("whyCompetitionsBody1")}
              </p>
              <p style={fontBody} className={bodySize.base}>
                {t("whyCompetitionsBody2")}
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ───── FAQ ───── */}
      <section className="bg-white">
        <Container className="py-12 md:py-16">
          <SectionIntro
            title={t("faqTitle")}
            subtitle={t("faqSubtitle")}
          />

          <div className="max-w-3xl mx-auto">
            <FaqAccordion items={FAQS} />
          </div>

          <div className="text-center mt-12">
            <p style={fontBody} className="text-base text-neutral-700 mb-2">
              {t("faqStillHaveQuestions")}
            </p>
            <ArrowLink external="mailto:contact@jamun.org">{t("faqGetInTouch")}</ArrowLink>
          </div>
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.voting}
        photoAlt={t("ctaPhotoAlt")}
        clip="none"
        minHeight="md:min-h-[70svh]"
        panelClassName="py-12 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          {t("ctaTitle1")}{" "}
          <span className="text-[#f97316]">{t("ctaTitleHighlight")}</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9`}>
          {t("ctaDescription")}
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton href="/register" withArrow>
            {t("ctaRegister")}
          </PillButton>
          <PillButton href="/donate" tone="outline">
            {t("ctaSupport")}
          </PillButton>
        </div>
      </DiagonalSpread>
    </div>
  );
}
