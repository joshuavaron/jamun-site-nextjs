"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  BookOpen,
  FileText,
  MessageSquare,
  Gavel,
  Lightbulb,
  Users,
  GraduationCap,
  Calendar,
  Clock,
  Trophy,
  Target,
  Shield,
  AlertTriangle,
} from "lucide-react";
import {
  Container,
  Heading,
  PillButton,
  IconTile,
  AnimatedNumber,
} from "@/components/ui";
import { fontBody, fontSerif, fontHeading, bodySize } from "@/lib/typography";
import { Link } from "@/i18n/navigation";
import { DiagonalSpread } from "@/components/sections/DiagonalSpread";
import { TestimonialSpread } from "@/components/sections/TestimonialSpread";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import type { FaqItem } from "@/components/sections/FaqAccordion";

// ────────── Photos — unique to this page ──────────
const PHOTOS = {
  hero: "/images/conferences/DSC02128.webp",
  aboutMockTrial: "/images/conferences/DSC01054.webp",
  purpleTestimonial: "/images/conferences/DSCF9340.webp",
  caseSpread: "/images/conferences/DSCF9350.webp",
  orangeTestimonial: "/images/conferences/DSCF9363.webp",
  finalCta: "/images/conferences/DSC01722.webp",
} as const;

// ────────── Component ──────────

// Minimal, serializable view of the active case, loaded server-side and passed
// in so this client page can feature it without bundling the fs loader.
export interface MockTrialCaseInfo {
  title: string;
  description: string;
  caseType?: string;
  caseNumber?: string;
  documentCount: number;
}

export function MockTrialPage({ caseInfo }: { caseInfo?: MockTrialCaseInfo | null }) {
  const t = useTranslations("MockTrialPage");

  // ────────── Stats ──────────
  const stats = [
    { value: t("stats.stat1Value"), label: t("stats.stat1Label") },
    { value: t("stats.stat2Value"), label: t("stats.stat2Label") },
    { value: t("stats.stat3Value"), label: t("stats.stat3Label") },
    { value: t("stats.stat4Value"), label: t("stats.stat4Label") },
  ];

  // ────────── Courtroom activities ──────────
  const COURTROOM_ACTIVITIES = [
    {
      icon: BookOpen,
      title: t("courtroomActivities.activity1Title"),
      description: t("courtroomActivities.activity1Description"),
      color: "#9333ea",
    },
    {
      icon: FileText,
      title: t("courtroomActivities.activity2Title"),
      description: t("courtroomActivities.activity2Description"),
      color: "#397bce",
    },
    {
      icon: MessageSquare,
      title: t("courtroomActivities.activity3Title"),
      description: t("courtroomActivities.activity3Description"),
      color: "#10b981",
    },
    {
      icon: Gavel,
      title: t("courtroomActivities.activity4Title"),
      description: t("courtroomActivities.activity4Description"),
      color: "#f97316",
    },
  ];

  // ────────── Trial format (numbered list) ──────────
  const TRIAL_FORMAT = [
    {
      icon: GraduationCap,
      title: t("trialFormat.step1Title"),
      body: t("trialFormat.step1Body"),
      color: "#9333ea",
    },
    {
      icon: MessageSquare,
      title: t("trialFormat.step2Title"),
      body: t("trialFormat.step2Body"),
      color: "#397bce",
    },
    {
      icon: AlertTriangle,
      title: t("trialFormat.step3Title"),
      body: t("trialFormat.step3Body"),
      color: "#10b981",
    },
    {
      icon: Trophy,
      title: t("trialFormat.step4Title"),
      body: t("trialFormat.step4Body"),
      color: "#f97316",
    },
  ];

  // ────────── Skills ──────────
  const SKILLS = [
    {
      icon: MessageSquare,
      title: t("skills.skill1Title"),
      description: t("skills.skill1Description"),
      color: "#9333ea",
    },
    {
      icon: Lightbulb,
      title: t("skills.skill2Title"),
      description: t("skills.skill2Description"),
      color: "#397bce",
    },
    {
      icon: Users,
      title: t("skills.skill3Title"),
      description: t("skills.skill3Description"),
      color: "#10b981",
    },
    {
      icon: Target,
      title: t("skills.skill4Title"),
      description: t("skills.skill4Description"),
      color: "#f97316",
    },
  ];

  // ────────── Resources ──────────
  const RESOURCES = [
    {
      icon: Shield,
      title: t("resources.resource1Title"),
      description: t("resources.resource1Description"),
      href: "/mocktrial/resources",
      color: "#9333ea",
    },
    {
      icon: Gavel,
      title: t("resources.resource2Title"),
      description: t("resources.resource2Description"),
      href: "/mocktrial/resources",
      color: "#397bce",
    },
    {
      icon: FileText,
      title: t("resources.resource3Title"),
      description: t("resources.resource3Description"),
      href: "/mocktrial/resources",
      color: "#10b981",
    },
    {
      icon: MessageSquare,
      title: t("resources.resource4Title"),
      description: t("resources.resource4Description"),
      href: "/mocktrial/resources",
      color: "#f97316",
    },
    {
      icon: BookOpen,
      title: t("resources.resource5Title"),
      description: t("resources.resource5Description"),
      href: "/mocktrial/resources/federal-rules-of-evidence",
      color: "#0ea5e9",
    },
    {
      icon: GraduationCap,
      title: t("resources.resource6Title"),
      description: t("resources.resource6Description"),
      href: "/mocktrial/resources",
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

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={PHOTOS.hero}
        photoAlt={t("heroPhotoAlt")}
        photoPriority
        minHeight="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        <Heading size="hero">
          {t("hero.headingStart")}{" "}
          <span className="text-[#9333ea]">{t("hero.headingAccent")}</span>
        </Heading>
        <p style={fontBody} className={`mt-6 max-w-md ${bodySize.lead}`}>
          {t("hero.description")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href="/register" tone="custom" color="#9333ea" withArrow>
            {t("hero.registerNow")}
          </PillButton>
          <PillButton href="/mocktrial/case" tone="outline">
            {t("hero.readTheCase")}
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
                className="px-3 sm:px-4 py-6 md:py-2 md:px-8 text-center"
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

      {/* ───── What is Mock Trial ───── */}
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
                <PillButton href="/register" size="md" tone="custom" color="#9333ea" withArrow>
                  {t("whatIs.getStarted")}
                </PillButton>
                <PillButton href="/mocktrial/resources" tone="outline" size="md">
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
                src={PHOTOS.aboutMockTrial}
                alt={t("aboutPhotoAlt")}
                fill
                className="object-cover"
                sizes="(min-width:1024px) 45vw, 90vw"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ───── The current case — State v. Reed ───── */}
      {caseInfo && (
        <DiagonalSpread
          photoSide="right"
          photoSrc={PHOTOS.caseSpread}
          photoAlt={t("theCase.photoAlt")}
          clip="diagonal"
          animation="inView"
        >
          <p
            style={fontBody}
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9333ea] mb-4"
          >
            {t("theCase.label")}
          </p>
          <Heading size="section" className="text-[#0a0a0a]">
            {caseInfo.title}
          </Heading>
          {(caseInfo.caseNumber || caseInfo.caseType) && (
            <div
              style={fontBody}
              className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500"
            >
              {caseInfo.caseNumber && (
                <span className="tabular-nums">{caseInfo.caseNumber}</span>
              )}
              {caseInfo.caseNumber && caseInfo.caseType && (
                <span className="text-neutral-300">•</span>
              )}
              {caseInfo.caseType && (
                <span className="uppercase tracking-[0.14em]">{caseInfo.caseType}</span>
              )}
            </div>
          )}
          <p style={fontBody} className={`mt-6 max-w-xl ${bodySize.base}`}>
            {caseInfo.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <PillButton href="/mocktrial/case" tone="custom" color="#9333ea" withArrow>
              {t("theCase.openCase")}
            </PillButton>
            <Link
              href="/mocktrial/case/full"
              style={fontBody}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#9333ea] hover:opacity-80 transition-opacity"
            >
              <FileText className="w-4 h-4" />
              {t("theCase.readFull")}
            </Link>
          </div>
        </DiagonalSpread>
      )}

      {/* ───── Testimonial — purple ───── */}
      <TestimonialSpread
        bg="#9333ea"
        photoSide="right"
        photoSrc={PHOTOS.purpleTestimonial}
        photoAlt={t("blueTestimonialPhotoAlt")}
        heading={t("purpleTestimonial.heading")}
        quote={t("purpleTestimonial.quote")}
        attribution={t("purpleTestimonial.attribution")}
      />

      {/* ───── Courtroom experience — 4-up cards ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("courtroomActivities.sectionTitle")}
            subtitle={t("courtroomActivities.sectionSubtitle")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {COURTROOM_ACTIVITIES.map((activity, i) => (
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
                  {t("courtroomActivities.stepLabel")} {String(i + 1).padStart(2, "0")}
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

      {/* ───── Trial format — numbered editorial list ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Heading size="section">{t("trialFormat.heading")}</Heading>
              <p style={fontBody} className={`mt-5 ${bodySize.lead}`}>
                {t("trialFormat.description")}
              </p>
              <div className="mt-6 flex flex-wrap gap-4" style={fontBody}>
                <span className="inline-flex items-center gap-2 text-sm text-neutral-600">
                  <Calendar className="w-4 h-4" /> {t("trialFormat.badge1FullDay")}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-neutral-600">
                  <Clock className="w-4 h-4" /> {t("trialFormat.badge2Rounds")}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-neutral-600">
                  <Users className="w-4 h-4" /> {t("trialFormat.badge3TeamMembers")}
                </span>
              </div>
            </div>

            <ol className="divide-y divide-black/10 border-t border-black/10">
              {TRIAL_FORMAT.map((step, i) => (
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

      {/* ───── Compete spread — register / grants CTA ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.caseSpread}
        photoAlt={t("conferenceSpreadPhotoAlt")}
        clip="none"
        panelBg="#9333ea"
        panelText="#ffffff"
        minHeight="md:min-h-[55svh]"
        panelClassName="py-12 md:py-16"
      >
        <Heading size="panel" className="text-white mb-6">
          {t("competeSpread.heading")}
        </Heading>
        <p style={fontBody} className="text-white/90 text-base md:text-lg leading-relaxed mb-8">
          {t("competeSpread.description")}
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton
            href="/register"
            tone="custom"
            color="#ffffff"
            className="!text-[#0a0a0a]"
            withArrow
          >
            {t("competeSpread.registerNow")}
          </PillButton>
          <PillButton
            href="/grants"
            tone="custom"
            color="rgba(255,255,255,0.18)"
            className="!text-white"
          >
            {t("competeSpread.learnAboutGrants")}
          </PillButton>
        </div>
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
                    className="text-neutral-900 mb-2 group-hover:text-[#9333ea] transition-colors"
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
            <PillButton href="/mocktrial/resources" tone="outline" withArrow>
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
        photoSide="right"
        photoSrc={PHOTOS.finalCta}
        photoAlt={t("finalCtaPhotoAlt")}
        clip="none"
        minHeight="md:min-h-[70svh]"
        panelClassName="py-12 md:py-10"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          {t("finalCta.headingStart")}{" "}
          <span className="text-[#9333ea]">{t("finalCta.headingAccent")}</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9`}>
          {t("finalCta.description")}
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton href="/register" tone="custom" color="#9333ea" withArrow>
            {t("finalCta.registerNow")}
          </PillButton>
          <PillButton href="/mocktrial/resources" tone="outline">
            {t("finalCta.exploreResources")}
          </PillButton>
        </div>
        <p style={fontBody} className="mt-8 text-sm text-neutral-600">
          {t("finalCta.questions")}{" "}
          <a
            href="mailto:mocktrial@jamun.org"
            className="font-semibold text-[#9333ea] hover:text-[#7e22ce] transition-colors"
          >
            {t("finalCta.email")}
          </a>
        </p>
      </DiagonalSpread>
    </div>
  );
}
