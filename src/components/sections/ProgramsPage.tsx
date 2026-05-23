"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Globe,
  Scale,
  Calculator,
  Mic,
  Users,
  BookOpen,
  Target,
  Gavel,
  FileText,
  MessageSquare,
  Brain,
  TrendingUp,
  Award,
  Trophy,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles,
  Heart,
} from "lucide-react";
import {
  Container,
  Heading,
  PillButton,
  IconTile,
  AnimatedNumber,
} from "@/components/ui";
import { fontBody, fontHeading, fontSerif, bodySize } from "@/lib/typography";
import { DiagonalSpread } from "@/components/sections/DiagonalSpread";

// ────────── Conference photos — fresh selections, distinct from LandingPage ──────────
const PHOTOS = {
  heroSpeaker: "/images/conferences/DSCF9387.webp",     // boy speaking with arms wide, expressive
  modelUnCard: "/images/conferences/DSCF9408.webp",     // boy speaking with hand raised
  mockTrialCard: "/images/conferences/DSC02128.webp",   // handshake in courtroom
  mathletesCard: "/images/conferences/DSCF9374.webp",   // three girls collaborating intently
  modelUnSpread: "/images/conferences/DSCF9416.webp",   // three confident delegates at table
  mockTrialSpread: "/images/conferences/DSC01054.webp", // intense conferring moment
  mathletesSpread: "/images/conferences/DSC00969.webp", // focused delegate at table
  awardWinners: "/images/conferences/DSC02053.webp",    // three smiling award winners
} as const;

export function ProgramsPage() {
  const t = useTranslations("ProgramsPage");

  const stats = [
    { value: "3", label: t("statPrograms") },
    { value: "500+", label: t("statStudents") },
    { value: "100%", label: t("statBeginner") },
    { value: "$0", label: t("statCost") },
  ];

  const programOverview = [
    {
      id: "model-un",
      icon: Globe,
      name: t("modelUNTitle"),
      tagline: t("modelUNTagline"),
      photo: PHOTOS.modelUnCard,
      alt: t("modelUNCardAlt"),
      color: "#397bce",
      anchor: "#model-un",
    },
    {
      id: "mock-trial",
      icon: Scale,
      name: t("mockTrialTitle"),
      tagline: t("mockTrialTagline"),
      photo: PHOTOS.mockTrialCard,
      alt: t("mockTrialCardAlt"),
      color: "#9333ea",
      anchor: "#mock-trial",
    },
    {
      id: "mathletes",
      icon: Calculator,
      name: t("mathletesTitle"),
      tagline: t("mathletesTagline"),
      photo: PHOTOS.mathletesCard,
      alt: t("mathletesCardAlt"),
      color: "#10b981",
      anchor: "#mathletes",
    },
  ];

  // Note: photoSides are inverted vs the landing page's testimonial-spread cadence
  // (landing goes right/left/right for blue/purple/emerald). This page goes
  // left/right/left to keep the visual rhythm distinct when users toggle pages.
  const programs = [
    {
      id: "model-un",
      anchorId: "model-un",
      tagline: t("modelUNTagline"),
      title: t("modelUNTitle"),
      longDescription: t("modelUNLongDescription"),
      icon: Globe,
      color: "#397bce",
      photo: PHOTOS.modelUnSpread,
      photoAlt: t("modelUNSpreadAlt"),
      photoSide: "left" as const,
      href: "/modelun",
      schedule: {
        practice: t("modelUNSchedulePractice"),
        competitions: t("modelUNScheduleCompetitions"),
        commitment: t("modelUNScheduleCommitment"),
      },
      features: [
        { icon: Mic, title: t("modelUNFeature1Title"), description: t("modelUNFeature1Description") },
        { icon: Users, title: t("modelUNFeature2Title"), description: t("modelUNFeature2Description") },
        { icon: BookOpen, title: t("modelUNFeature3Title"), description: t("modelUNFeature3Description") },
        { icon: Target, title: t("modelUNFeature4Title"), description: t("modelUNFeature4Description") },
      ],
      whatYouLearn: [
        t("modelUNLearn1"), t("modelUNLearn2"), t("modelUNLearn3"),
        t("modelUNLearn4"), t("modelUNLearn5"), t("modelUNLearn6"),
      ],
      testimonial: {
        quote: t("modelUNTestimonialQuote"),
        author: t("modelUNTestimonialAuthor"),
      },
    },
    {
      id: "mock-trial",
      anchorId: "mock-trial",
      tagline: t("mockTrialTagline"),
      title: t("mockTrialTitle"),
      longDescription: t("mockTrialLongDescription"),
      icon: Scale,
      color: "#9333ea",
      photo: PHOTOS.mockTrialSpread,
      photoAlt: t("mockTrialSpreadAlt"),
      photoSide: "right" as const,
      href: "/mocktrial",
      schedule: {
        practice: t("mockTrialSchedulePractice"),
        competitions: t("mockTrialScheduleCompetitions"),
        commitment: t("mockTrialScheduleCommitment"),
      },
      features: [
        { icon: Gavel, title: t("mockTrialFeature1Title"), description: t("mockTrialFeature1Description") },
        { icon: FileText, title: t("mockTrialFeature2Title"), description: t("mockTrialFeature2Description") },
        { icon: MessageSquare, title: t("mockTrialFeature3Title"), description: t("mockTrialFeature3Description") },
        { icon: Trophy, title: t("mockTrialFeature4Title"), description: t("mockTrialFeature4Description") },
      ],
      whatYouLearn: [
        t("mockTrialLearn1"), t("mockTrialLearn2"), t("mockTrialLearn3"),
        t("mockTrialLearn4"), t("mockTrialLearn5"), t("mockTrialLearn6"),
      ],
      testimonial: {
        quote: t("mockTrialTestimonialQuote"),
        author: t("mockTrialTestimonialAuthor"),
      },
    },
    {
      id: "mathletes",
      anchorId: "mathletes",
      tagline: t("mathletesTagline"),
      title: t("mathletesTitle"),
      longDescription: t("mathletesLongDescription"),
      icon: Calculator,
      color: "#10b981",
      photo: PHOTOS.mathletesSpread,
      photoAlt: t("mathletesSpreadAlt"),
      photoSide: "left" as const,
      href: "/mathletes",
      schedule: {
        practice: t("mathletesSchedulePractice"),
        competitions: t("mathletesScheduleCompetitions"),
        commitment: t("mathletesScheduleCommitment"),
      },
      features: [
        { icon: Brain, title: t("mathletesFeature1Title"), description: t("mathletesFeature1Description") },
        { icon: TrendingUp, title: t("mathletesFeature2Title"), description: t("mathletesFeature2Description") },
        { icon: Users, title: t("mathletesFeature3Title"), description: t("mathletesFeature3Description") },
        { icon: Award, title: t("mathletesFeature4Title"), description: t("mathletesFeature4Description") },
      ],
      whatYouLearn: [
        t("mathletesLearn1"), t("mathletesLearn2"), t("mathletesLearn3"),
        t("mathletesLearn4"), t("mathletesLearn5"), t("mathletesLearn6"),
      ],
      testimonial: {
        quote: t("mathletesTestimonialQuote"),
        author: t("mathletesTestimonialAuthor"),
      },
    },
  ];

  const whyChoose = [
    {
      icon: Heart,
      title: t("whyChooseBeginner"),
      body: t("whyChooseBeginnerDescription"),
      color: "#397bce",
    },
    {
      icon: Trophy,
      title: t("whyChooseCompetitions"),
      body: t("whyChooseCompetitionsDescription"),
      color: "#9333ea",
    },
    {
      icon: BookOpen,
      title: t("whyChooseResources"),
      body: t("whyChooseResourcesDescription"),
      color: "#10b981",
    },
    {
      icon: Sparkles,
      title: t("whyChooseSkills"),
      body: t("whyChooseSkillsDescription"),
      color: "#f97316",
    },
  ];

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero — photo LEFT (landing's hero is photo RIGHT) ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={PHOTOS.heroSpeaker}
        photoAlt={t("heroPhotoAlt")}
        photoPriority
        photoClassName="min-h-[60svh]"
        minHeight="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        <Heading size="hero">
          {t("heroTitle")}
          <span className="text-[#f97316]">{t("heroTitleHighlight")}</span>
        </Heading>
        <p style={fontBody} className={`mt-6 ${bodySize.lead}`}>
          {t("heroSubtitle")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href="/register" withArrow>
            {t("heroPrimaryCTA")}
          </PillButton>
          <PillButton href="mailto:contact@jamun.org" tone="outline">
            {t("heroSecondaryCTA")}
          </PillButton>
        </div>
      </DiagonalSpread>

      {/* ───── Stats strip — flat horizontal row (no photo) ───── */}
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

      {/* ───── Programs triptych — full-bleed 3-up photo strip with overlays.
              A page-specific pattern: not used on the landing page. ───── */}
      <section className="bg-white">
        <Container className="pt-14 md:pt-20 text-center">
          <Heading size="section">{t("pickYourPathHeading")}</Heading>
          <p style={fontBody} className={`mt-5 max-w-2xl mx-auto ${bodySize.lead}`}>
            {t("pickYourPathDescription")}
          </p>
        </Container>

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3">
          {programOverview.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.anchor}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="relative block aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] overflow-hidden group"
            >
              <Image
                src={p.photo}
                alt={p.alt}
                fill
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                sizes="(min-width:768px) 33vw, 100vw"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0) 65%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1.5"
                style={{ backgroundColor: p.color }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-white">
                <span
                  style={fontBody}
                  className="inline-block text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.22em] text-white/85 mb-3"
                >
                  {p.tagline}
                </span>
                <Heading
                  size="card"
                  className="text-white mb-4"
                  font="serif"
                  weight={400}
                >
                  {p.name}
                </Heading>
                <span
                  style={fontBody}
                  className="inline-flex items-center gap-2 text-[15px] font-semibold group-hover:gap-3 transition-all"
                >
                  {t("exploreLabel")} <span aria-hidden>→</span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ───── Program deep dives ───── */}
      {programs.map((program) => (
        <div key={program.id} id={program.anchorId} className="scroll-mt-20">
          <DiagonalSpread
            photoSide={program.photoSide}
            photoSrc={program.photo}
            photoAlt={program.photoAlt}
            clip="none"
            panelBg={program.color}
            panelText="#ffffff"
            minHeight="md:min-h-[78svh]"
            panelClassName="py-14 md:py-20"
          >
            <Heading size="section" className="text-white mb-6">
              {program.title}
            </Heading>
            <p
              style={fontBody}
              className={`${bodySize.lead} text-white/90 mb-8`}
            >
              {program.longDescription}
            </p>

            <div className="flex flex-wrap gap-2.5 mb-9">
              {[
                { Icon: Clock, label: program.schedule.commitment },
                { Icon: Calendar, label: program.schedule.practice },
                { Icon: Trophy, label: program.schedule.competitions },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  style={{ ...fontBody, backgroundColor: "rgba(255,255,255,0.18)" }}
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] text-white"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </span>
              ))}
            </div>

            <PillButton
              href={program.href}
              tone="custom"
              color="#ffffff"
              className="!text-[#0a0a0a]"
              withArrow
            >
              {t("learnMoreAbout", { program: program.title })}
            </PillButton>
          </DiagonalSpread>

          <section className="bg-white">
            <Container className="py-14 md:py-20">
              <div className="mb-16 md:mb-20">
                <Heading size="sub" className="mb-8 md:mb-10 text-neutral-900">
                  {t("skillsYouBuildIn", { program: program.title })}
                </Heading>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {program.features.map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ delay: (i % 4) * 0.06, duration: 0.6 }}
                    >
                      <IconTile
                        icon={feature.icon}
                        color={program.color}
                        size="sm"
                        className="mb-5"
                      />
                      <Heading size="micro" className="text-neutral-900 mb-2">
                        {feature.title}
                      </Heading>
                      <p style={fontBody} className={bodySize.micro}>
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="lg:col-span-3"
                >
                  <Heading size="sub" className="mb-6 text-neutral-900">
                    {t("whatYouLearn")}
                  </Heading>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {program.whatYouLearn.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2
                          className="w-5 h-5 mt-0.5 shrink-0"
                          style={{ color: program.color }}
                        />
                        <span style={fontBody} className={bodySize.base}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.figure
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="lg:col-span-2 border-l-2 pl-6 md:pl-8 py-2"
                  style={{ borderColor: program.color }}
                >
                  <blockquote
                    style={fontSerif}
                    className="text-xl md:text-2xl leading-relaxed text-neutral-900"
                  >
                    <span aria-hidden style={{ color: program.color }} className="select-none mr-1">
                      &ldquo;
                    </span>
                    {program.testimonial.quote}
                    <span aria-hidden style={{ color: program.color }} className="select-none ml-0.5">
                      &rdquo;
                    </span>
                  </blockquote>
                  <figcaption
                    style={{ ...fontBody, color: program.color }}
                    className="mt-5 text-sm font-semibold"
                  >
                    — {program.testimonial.author}
                  </figcaption>
                </motion.figure>
              </div>
            </Container>
          </section>
        </div>
      ))}

      {/* ───── Why families choose JAMUN — numbered editorial list
              (landing uses an IconTile 4-up skills grid; this page uses
              a 2-col list with large serif numerals to feel different). ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Heading size="section">{t("whyChooseTitle")}</Heading>
              <p style={fontBody} className={`mt-5 ${bodySize.lead}`}>
                {t("whyChooseSubtitle")}
              </p>
            </div>

            <ol className="divide-y divide-black/10 border-t border-black/10">
              {whyChoose.map((w, i) => (
                <motion.li
                  key={w.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.08, duration: 0.7 }}
                  className="flex gap-6 md:gap-8 py-8 md:py-10"
                >
                  <span
                    aria-hidden
                    style={{ ...fontSerif, color: w.color }}
                    className="text-4xl md:text-5xl leading-none shrink-0 w-14 md:w-16 tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <w.icon
                        className="w-5 h-5"
                        style={{ color: w.color }}
                        aria-hidden
                      />
                      <Heading size="cardLg" as="h3">
                        {w.title}
                      </Heading>
                    </div>
                    <p style={fontBody} className={bodySize.base}>
                      {w.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ───── Final CTA — photo LEFT (landing's final CTA is photo RIGHT)
              and clip="diagonal" (landing uses clip="none"). ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={PHOTOS.awardWinners}
        photoAlt={t("ctaPhotoAlt")}
        clip="diagonal"
        minHeight="md:min-h-[70svh]"
        panelClassName="py-12 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          {t("ctaTitle")}{" "}
          <span className="text-[#f97316]">{t("ctaTitleHighlight")}.</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9`}>
          {t("ctaSubtitle")}
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton href="/register" withArrow>
            {t("ctaPrimaryCTA")}
          </PillButton>
          <PillButton href="/modelun/resources" tone="outline">
            {t("ctaSecondaryCTA")}
          </PillButton>
        </div>
        <p style={fontBody} className="mt-8 text-sm text-neutral-600">
          {t("ctaContactText")}{" "}
          <a
            href="mailto:contact@jamun.org"
            className="font-semibold text-[#397bce] hover:text-[#2a5fa3] transition-colors"
          >
            contact@jamun.org
          </a>
        </p>
      </DiagonalSpread>
    </div>
  );
}
