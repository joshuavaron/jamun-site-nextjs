"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Globe,
  BookOpen,
  FileText,
  MessageSquare,
  Handshake,
  Lightbulb,
  Users,
  GraduationCap,
  Calendar,
  Clock,
  Trophy,
  Mic,
  Shield,
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
import type { CommitteeMeta } from "@/lib/committees";

interface ModelUNPageProps {
  committees: CommitteeMeta[];
}

// ────────── Photos — unique to this page ──────────
const PHOTOS = {
  hero: "/images/conferences/DSC00848.webp",
  aboutMUN: "/images/conferences/DSC01032.webp",
  blueTestimonial: "/images/conferences/DSCF9392.webp",
  conferenceSpread: "/images/conferences/DSC02021.webp",
  orangeTestimonial: "/images/conferences/DSCF9434.webp",
  finalCta: "/images/conferences/DSCF9453.webp",
} as const;

// ────────── Component ──────────

export function ModelUNPage({ committees }: ModelUNPageProps) {
  const t = useTranslations("ModelUNPage");

  // Level badge colors — must be inside component to access t()
  function levelStyle(level: string) {
    if (level === "Beginner-Friendly")
      return { bg: "#10b9811a", text: "#10b981", label: t("levels.beginner") };
    if (level === "Intermediate")
      return { bg: "#f973161a", text: "#f97316", label: t("levels.intermediate") };
    return { bg: "#ef44441a", text: "#ef4444", label: t("levels.advanced") };
  }

  const sampleCommittees = committees.slice(0, 6);
  const totalDelegates = committees.reduce(
    (sum, c) => sum + c.delegateCount,
    0
  );

  // ────────── What delegates do ──────────
  const DELEGATE_ACTIVITIES = [
    {
      icon: BookOpen,
      title: t("delegateActivities.researchYourCountry.title"),
      description: t("delegateActivities.researchYourCountry.description"),
      color: "#397bce",
    },
    {
      icon: FileText,
      title: t("delegateActivities.writePositionPapers.title"),
      description: t("delegateActivities.writePositionPapers.description"),
      color: "#9333ea",
    },
    {
      icon: Mic,
      title: t("delegateActivities.deliverSpeeches.title"),
      description: t("delegateActivities.deliverSpeeches.description"),
      color: "#10b981",
    },
    {
      icon: Handshake,
      title: t("delegateActivities.buildCoalitions.title"),
      description: t("delegateActivities.buildCoalitions.description"),
      color: "#f97316",
    },
  ];

  // ────────── Conference format (numbered list) ──────────
  const CONFERENCE_FORMAT = [
    {
      icon: GraduationCap,
      title: t("conferenceDay.openingCeremonies.title"),
      body: t("conferenceDay.openingCeremonies.body"),
      color: "#397bce",
    },
    {
      icon: MessageSquare,
      title: t("conferenceDay.committeeSessions.title"),
      body: t("conferenceDay.committeeSessions.body"),
      color: "#9333ea",
    },
    {
      icon: Users,
      title: t("conferenceDay.unmoderatedCaucuses.title"),
      body: t("conferenceDay.unmoderatedCaucuses.body"),
      color: "#10b981",
    },
    {
      icon: Trophy,
      title: t("conferenceDay.votingAndAwards.title"),
      body: t("conferenceDay.votingAndAwards.body"),
      color: "#f97316",
    },
  ];

  // ────────── Skills ──────────
  const SKILLS = [
    {
      icon: Mic,
      title: t("skills.publicSpeaking.title"),
      description: t("skills.publicSpeaking.description"),
      color: "#397bce",
    },
    {
      icon: Lightbulb,
      title: t("skills.criticalThinking.title"),
      description: t("skills.criticalThinking.description"),
      color: "#9333ea",
    },
    {
      icon: Users,
      title: t("skills.collaboration.title"),
      description: t("skills.collaboration.description"),
      color: "#10b981",
    },
    {
      icon: BookOpen,
      title: t("skills.researchAndWriting.title"),
      description: t("skills.researchAndWriting.description"),
      color: "#f97316",
    },
  ];

  // ────────── Resources ──────────
  const RESOURCES = [
    {
      icon: Shield,
      title: t("resources.delegateHandbook.title"),
      description: t("resources.delegateHandbook.description"),
      href: "/modelun/resources/delegate-handbook",
      color: "#397bce",
    },
    {
      icon: Globe,
      title: t("resources.countryResearchGuide.title"),
      description: t("resources.countryResearchGuide.description"),
      href: "/modelun/resources/country-research-guide",
      color: "#9333ea",
    },
    {
      icon: FileText,
      title: t("resources.positionPaperGuide.title"),
      description: t("resources.positionPaperGuide.description"),
      href: "/modelun/resources/writing-position-papers",
      color: "#10b981",
    },
    {
      icon: MessageSquare,
      title: t("resources.publicSpeakingTips.title"),
      description: t("resources.publicSpeakingTips.description"),
      href: "/modelun/resources/public-speaking-tips",
      color: "#f97316",
    },
    {
      icon: BookOpen,
      title: t("resources.rulesOfProcedure.title"),
      description: t("resources.rulesOfProcedure.description"),
      href: "/modelun/resources/rules-of-procedure",
      color: "#0ea5e9",
    },
    {
      icon: GraduationCap,
      title: t("resources.resolutionWritingGuide.title"),
      description: t("resources.resolutionWritingGuide.description"),
      href: "/modelun/resources/resolution-writing-guide",
      color: "#eab308",
    },
  ];

  // ────────── FAQs ──────────
  const FAQS: FaqItem[] = [
    {
      q: t("faq.items.experience.q"),
      a: t("faq.items.experience.a"),
    },
    {
      q: t("faq.items.grades.q"),
      a: t("faq.items.grades.a"),
    },
    {
      q: t("faq.items.time.q"),
      a: t("faq.items.time.a"),
    },
    {
      q: t("faq.items.topics.q"),
      a: t("faq.items.topics.a"),
    },
    {
      q: t("faq.items.cost.q"),
      a: t("faq.items.cost.a"),
    },
    {
      q: t("faq.items.awards.q"),
      a: t("faq.items.awards.a"),
    },
  ];

  const stats = [
    { value: `${totalDelegates}+`, label: t("stats.delegateSpots") },
    { value: "15+", label: t("stats.schoolsParticipating") },
    { value: `${committees.length}`, label: t("stats.committees") },
    { value: "100%", label: t("stats.beginnerFriendly") },
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
          {t("hero.headingPart1")}
          <span className="text-[#397bce]">{t("hero.headingAccent")}</span>
        </Heading>
        <p style={fontBody} className={`mt-6 max-w-md ${bodySize.lead}`}>
          {t("hero.description")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href="/register" withArrow>
            {t("hero.registerNow")}
          </PillButton>
          <PillButton href="/modelun/committees" tone="outline">
            {t("hero.exploreCommittees")}
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

      {/* ───── What is Model UN ───── */}
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
                {t("whatIsMun.heading")}
              </Heading>
              <p style={fontBody} className={`${bodySize.lead} mb-5`}>
                {t("whatIsMun.paragraph1")}
              </p>
              <p style={fontBody} className={`${bodySize.base} mb-8`}>
                {t("whatIsMun.paragraph2")}
              </p>
              <div className="flex flex-wrap gap-3">
                <PillButton href="/register" size="md" withArrow>
                  {t("whatIsMun.getStarted")}
                </PillButton>
                <PillButton href="/modelun/resources" tone="outline" size="md">
                  {t("whatIsMun.browseResources")}
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
                src={PHOTOS.aboutMUN}
                alt={t("aboutMUNPhotoAlt")}
                fill
                className="object-cover"
                sizes="(min-width:1024px) 45vw, 90vw"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ───── Testimonial — blue ───── */}
      <TestimonialSpread
        bg="#397bce"
        photoSide="left"
        photoSrc={PHOTOS.blueTestimonial}
        photoAlt={t("blueTestimonial.photoAlt")}
        heading={t("blueTestimonial.heading")}
        quote={t("blueTestimonial.quote")}
        attribution={t("blueTestimonial.attribution")}
      />

      {/* ───── What delegates do — 4-up cards ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("delegateActivities.heading")}
            subtitle={t("delegateActivities.subtitle")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {DELEGATE_ACTIVITIES.map((activity, i) => (
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
                  {t("delegateActivities.step")} {String(i + 1).padStart(2, "0")}
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

      {/* ───── Conference day — numbered editorial list ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Heading size="section">{t("conferenceDay.heading")}</Heading>
              <p style={fontBody} className={`mt-5 ${bodySize.lead}`}>
                {t("conferenceDay.description")}
              </p>
              <div className="mt-6 flex flex-wrap gap-4" style={fontBody}>
                <span className="inline-flex items-center gap-2 text-sm text-neutral-600">
                  <Calendar className="w-4 h-4" /> {t("conferenceDay.dayEvents")}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-neutral-600">
                  <Clock className="w-4 h-4" /> {t("conferenceDay.hoursPerDay")}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-neutral-600">
                  <Users className="w-4 h-4" /> {t("conferenceDay.delegateCount")}
                </span>
              </div>
            </div>

            <ol className="divide-y divide-black/10 border-t border-black/10">
              {CONFERENCE_FORMAT.map((step, i) => (
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

      {/* ───── Conference spread ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={PHOTOS.conferenceSpread}
        photoAlt={t("conferenceSpreadPhotoAlt")}
        clip="none"
        panelBg="#397bce"
        panelText="#ffffff"
        minHeight="min-h-[55svh]"
        panelClassName="py-14 md:py-16"
      >
        <Heading size="panel" className="text-white mb-6">
          {t("conferenceSpread.heading")}
        </Heading>
        <p style={fontBody} className="text-white/90 text-base md:text-lg leading-relaxed mb-8">
          {t("conferenceSpread.description")}
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton
            href="/register"
            tone="custom"
            color="#ffffff"
            className="!text-[#0a0a0a]"
            withArrow
          >
            {t("conferenceSpread.registerForConference")}
          </PillButton>
          <PillButton
            href="/grants"
            tone="custom"
            color="rgba(255,255,255,0.18)"
            className="!text-white"
          >
            {t("conferenceSpread.learnAboutGrants")}
          </PillButton>
        </div>
      </DiagonalSpread>

      {/* ───── Skills — 2x2 grid ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("skills.heading")}
            subtitle={t("skills.subtitle")}
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
        photoSide="right"
        photoSrc={PHOTOS.orangeTestimonial}
        photoAlt={t("orangeTestimonial.photoAlt")}
        heading={t("orangeTestimonial.heading")}
        quote={t("orangeTestimonial.quote")}
        attribution={t("orangeTestimonial.attribution")}
      />

      {/* ───── Sample committees ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("committees.heading")}
            subtitle={t("committees.subtitle")}
          />

          {sampleCommittees.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {sampleCommittees.map((committee, i) => {
                const lvl = levelStyle(committee.level);
                return (
                  <motion.div
                    key={committee.slug}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: i * 0.08, duration: 0.7 }}
                  >
                    <Link
                      href={`/modelun/committees/${committee.slug}`}
                      className="group block h-full rounded-2xl border border-black/5 p-6 md:p-7 transition-colors hover:border-black/10"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span
                          style={{ ...fontHeading, fontWeight: 600 }}
                          className="text-2xl text-[#0a0a0a]"
                        >
                          {committee.abbreviation}
                        </span>
                        <span
                          style={{
                            ...fontBody,
                            backgroundColor: lvl.bg,
                            color: lvl.text,
                          }}
                          className="rounded-full px-3 py-1 text-xs font-semibold shrink-0"
                        >
                          {lvl.label}
                        </span>
                      </div>

                      <p
                        style={fontBody}
                        className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.18em] mb-4"
                      >
                        {committee.category}
                      </p>

                      <Heading
                        size="micro"
                        className="text-[#397bce] group-hover:text-[#2a5fa3] transition-colors mb-2"
                      >
                        {committee.topic}
                      </Heading>

                      <p style={fontBody} className={`${bodySize.micro} flex-1 mb-6`}>
                        {committee.description}
                      </p>

                      <div
                        style={fontBody}
                        className="pt-4 border-t border-black/5 flex items-center gap-2 text-sm text-neutral-500"
                      >
                        <Users className="w-4 h-4" />
                        <span>{committee.delegateCount} {t("committees.delegates")}</span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p style={fontBody} className="text-neutral-500 text-lg">
                {t("committees.emptyState")}
              </p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mt-10 md:mt-14"
          >
            <PillButton href="/modelun/committees" withArrow>
              {t("committees.viewAllCommittees")}
            </PillButton>
            <p style={fontBody} className="mt-4 text-sm text-neutral-500">
              {t("committees.rotateNotice")}{" "}
              <Link
                href="/register"
                className="font-semibold text-[#397bce] hover:text-[#2a5fa3] transition-colors"
              >
                {t("committees.registerEarly")}
              </Link>{" "}
              {t("committees.securYourSpot")}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ───── FREE resources ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("resources.heading")}
            subtitle={t("resources.subtitle")}
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
                <Link
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
                    className="text-neutral-900 mb-2 group-hover:text-[#397bce] transition-colors"
                  >
                    {resource.title}
                  </Heading>
                  <p style={fontBody} className={bodySize.micro}>
                    {resource.description}
                  </p>
                </Link>
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
            <PillButton href="/modelun/resources" tone="outline" withArrow>
              {t("resources.browseAllResources")}
            </PillButton>
          </motion.div>
        </Container>
      </section>

      {/* ───── FAQ ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("faq.heading")}
            subtitle={t("faq.subtitle")}
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
        photoAlt={t("finalCta.photoAlt")}
        clip="none"
        minHeight="min-h-[70svh]"
        panelClassName="py-16 md:py-10"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          {t("finalCta.headingPart1")}
          <span className="text-[#397bce]">{t("finalCta.headingAccent")}</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9`}>
          {t("finalCta.description")}
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton href="/register" withArrow>
            {t("finalCta.registerNow")}
          </PillButton>
          <PillButton href="/modelun/resources" tone="outline">
            {t("finalCta.exploreResources")}
          </PillButton>
        </div>
        <p style={fontBody} className="mt-8 text-sm text-neutral-600">
          {t("finalCta.questions")}{" "}
          <a
            href="mailto:modelun@jamun.org"
            className="font-semibold text-[#397bce] hover:text-[#2a5fa3] transition-colors"
          >
            modelun@jamun.org
          </a>
        </p>
      </DiagonalSpread>
    </div>
  );
}
