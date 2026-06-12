"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Heart,
  Users,
  Lightbulb,
  Target,
} from "lucide-react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { RAISED_AMOUNT } from "@/config/site";
import {
  Container,
  Heading,
  PillButton,
  ArrowLink,
  IconTile,
} from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { fontBody, fontHeading, fontSerif, bodySize } from "@/lib/typography";
import { DiagonalSpread } from "@/components/sections/DiagonalSpread";
import { TestimonialSpread } from "@/components/sections/TestimonialSpread";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { TEAM_MEMBERS } from "@/lib/team-members";

// ────────── Conference photos — distinct from LandingPage and ProgramsPage ──────────
const PHOTOS = {
  hero: "/images/conferences/DSCF9442.webp",
  stats: "/images/conferences/DSCF9438.webp",
  testimonial: "/images/conferences/DSCF9446.webp",
  finalCta: "/images/conferences/DSCF9381.webp",
} as const;

// ────────── Timeline ──────────
// Static 4-column layout on desktop with a connector line across the top.
// On viewport entry, each card slides in from off-screen left (x: -100vw)
// to its natural column position, staggered left-to-right so dots appear
// to travel along the connector line. Mobile is a simple vertical stack.
// Gradient stops aligned to approximate dot positions in a 4-col grid (~4%, ~30%, ~55%, ~81%)
// so each dot sits on its matching color rather than a mid-transition.
const TIMELINE_GRADIENT =
  "linear-gradient(to right, #397bce 4%, #9333ea 30%, #10b981 55%, #f97316 81%)";

const TIMELINE_CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, x: "-100vw" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ────────── Team avatar ──────────
function TeamAvatar({
  photo,
  initials,
  color,
  name,
}: {
  photo: string | null;
  initials: string;
  color: string;
  name: string;
}) {
  if (photo) {
    return (
      <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden">
        <Image src={photo} alt={name} fill className="object-cover" sizes="144px" />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className="relative w-32 h-32 md:w-36 md:h-36 rounded-full flex items-center justify-center"
      style={{ backgroundColor: `${color}1a` }}
    >
      <span
        style={{ ...fontSerif, color }}
        className="text-3xl md:text-4xl tracking-tight"
      >
        {initials}
      </span>
    </div>
  );
}

// ────────── Timeline grid (receives translated items) ──────────
function TimelineGrid({ items }: { items: { year: string; title: string; body: string; color: string }[] }) {
  return (
    <div className="relative">
      {/* Continuous connector line — desktop only. Spans the full
          container width; dots sit centered in their columns on top. */}
      <div
        aria-hidden
        className="hidden lg:block absolute top-[5px] left-0 right-0 h-[2px]"
        style={{
          background: TIMELINE_GRADIENT,
          opacity: 0.4,
        }}
      />

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        transition={{ staggerChildren: 0.18 }}
      >
        {items.map((m) => (
          <motion.div key={m.year} variants={TIMELINE_CARD_VARIANTS}>
            {/* Wrapper shrinks to year-text width via inline-block;
                the dot is absolutely centered above it, pinned to the
                timeline line (top-0 of the grid cell). pt-8 reserves
                space for the dot + gap (12px dot + 20px gap = 32px). */}
            <div className="lg:relative lg:inline-block lg:pt-8">
              <span
                aria-hidden
                className="hidden lg:block lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2 w-3 h-3 rounded-full ring-4 ring-white"
                style={{ backgroundColor: m.color }}
              />
              <div
                style={{ ...fontSerif, color: m.color }}
                className="text-4xl md:text-5xl leading-none tabular-nums"
              >
                {m.year}
              </div>
            </div>
            <Heading size="cardLg" className="mt-4 mb-3">
              {m.title}
            </Heading>
            <p style={fontBody} className={bodySize.base}>
              {m.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function AboutPage() {
  const t = useTranslations("AboutPage");

  // ────────── Stats ──────────
  const STATS = [
    { value: "500+", label: t("stats.studentsImpacted") },
    { value: "30+", label: t("stats.schoolsReached") },
    { value: "80+", label: t("stats.studentVolunteers") },
    { value: RAISED_AMOUNT, label: t("stats.raisedForPrograms") },
  ];

  // ────────── Timeline ──────────
  const TIMELINE = [
    {
      year: t("journey.timeline.entry1.year"),
      title: t("journey.timeline.entry1.title"),
      body: t("journey.timeline.entry1.body"),
      color: "#397bce",
    },
    {
      year: t("journey.timeline.entry2.year"),
      title: t("journey.timeline.entry2.title"),
      body: t("journey.timeline.entry2.body"),
      color: "#9333ea",
    },
    {
      year: t("journey.timeline.entry3.year"),
      title: t("journey.timeline.entry3.title"),
      body: t("journey.timeline.entry3.body"),
      color: "#10b981",
    },
    {
      year: t("journey.timeline.entry4.year"),
      title: t("journey.timeline.entry4.title"),
      body: t("journey.timeline.entry4.body"),
      color: "#f97316",
    },
  ];

  // ────────── Values ──────────
  const VALUES = [
    {
      icon: Heart,
      title: t("values.passionDriven.title"),
      body: t("values.passionDriven.body"),
      color: "#ec4899",
    },
    {
      icon: Users,
      title: t("values.communityFirst.title"),
      body: t("values.communityFirst.body"),
      color: "#397bce",
    },
    {
      icon: Lightbulb,
      title: t("values.innovation.title"),
      body: t("values.innovation.body"),
      color: "#eab308",
    },
    {
      icon: Target,
      title: t("values.excellence.title"),
      body: t("values.excellence.body"),
      color: "#9333ea",
    },
  ];

  // ────────── Team — derived from TEAM_MEMBERS (translations pulled per-member) ──────────
  const TEAM = TEAM_MEMBERS.map((m) => ({
    slug: m.slug,
    name: t(`team.members.${m.messageKey}.name`),
    role: t(`team.members.${m.messageKey}.role`),
    photo: m.photo,
    initials: m.initials,
    color: m.color,
    bio: t(`team.members.${m.messageKey}.bio`),
  }));

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.hero}
        photoAlt={t("heroPhotoAlt")}
        photoPriority
        photoClassName="min-h-[60svh]"
        minHeight="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        <Heading size="hero">
          {t("hero.headingPart1")}<span className="text-[#f97316]">{t("hero.headingAccent")}</span>
        </Heading>
        <p style={fontBody} className={`mt-6 max-w-xl ${bodySize.lead}`}>
          {t("hero.description", { fun: t("hero.funHighlight") }).split(t("hero.funHighlight"))[0]}
          <span className="text-[#397bce] font-semibold">{t("hero.funHighlight")}</span>
          {t("hero.description", { fun: t("hero.funHighlight") }).split(t("hero.funHighlight"))[1]}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href="/programs" withArrow>
            {t("hero.explorePrograms")}
          </PillButton>
          <PillButton href="/donate" tone="outline">
            {t("hero.supportMission")}
          </PillButton>
        </div>
      </DiagonalSpread>

      {/* ───── Mission — "Make Academics Fun" ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={
              <>
                {t("mission.headingPart1")}
                <span className="text-[#f97316]">{t("mission.headingAccent")}</span>
              </>
            }
            spacing="default"
          />

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3"
            >
              <p style={fontBody} className={`${bodySize.lead} mb-6`}>
                {t("mission.paragraph1")}
              </p>
              <p style={fontBody} className={bodySize.base}>
                {t("mission.paragraph2")}
              </p>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-2 border-l-2 border-[#397bce] pl-6 md:pl-8 py-2"
            >
              <blockquote
                style={fontSerif}
                className="text-xl md:text-2xl leading-relaxed text-neutral-900"
              >
                <span aria-hidden className="text-[#397bce] mr-1 select-none">&ldquo;</span>
                {t("mission.blockquote")}
                <span aria-hidden className="text-[#397bce] ml-0.5 select-none">&rdquo;</span>
              </blockquote>
              <figcaption
                style={fontBody}
                className="mt-5 text-sm font-semibold text-[#397bce]"
              >
                {t("mission.attribution")}
              </figcaption>
            </motion.figure>
          </div>
        </Container>
      </section>

      {/* ───── Our journey — "We started with a question" + timeline.
              `overflow-x-clip` keeps the off-screen-left cards from
              creating a horizontal scrollbar during the slide-in. ───── */}
      <section className="bg-white border-t border-black/5 overflow-x-clip">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={
              <>
                {t("journey.headingPart1")}
                <em style={fontSerif} className="not-italic text-[#397bce]">
                  {t("journey.headingAccent")}
                </em>
              </>
            }
            subtitle={t("journey.subtitle")}
            maxWidth="4xl"
            spacing="loose"
          />

          <TimelineGrid items={TIMELINE} />
        </Container>
      </section>

      {/* ───── Impact stats spread ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={PHOTOS.stats}
        photoAlt={t("testimonialPhotoAlt")}
        minHeight="md:min-h-[72svh]"
        panelClassName="py-10 md:py-16"
      >
        <Heading size="section" className="mb-3">
          {t("stats.heading")}
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-10 max-w-md`}>
          {t("stats.subtitle")}
        </p>
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
              <div
                style={fontBody}
                className="mt-2 text-base md:text-lg text-neutral-600"
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </DiagonalSpread>

      {/* ───── Values ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("values.heading")}
            subtitle={t("values.subtitle")}
            spacing="loose"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-5xl mx-auto">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className="flex gap-6"
              >
                <IconTile icon={v.icon} color={v.color} size="md" />
                <div className="flex-1">
                  <Heading size="cardLg" className="mb-3">
                    {v.title}
                  </Heading>
                  <p style={fontBody} className={bodySize.base}>
                    {v.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Themed quote spread ───── */}
      <TestimonialSpread
        bg="#397bce"
        photoSide="right"
        photoSrc={PHOTOS.testimonial}
        photoAlt={t("teamPhotoAlt")}
        heading={t("testimonial.heading")}
        quote={t("testimonial.quote")}
        attribution={t("testimonial.attribution")}
      />

      {/* ───── Leadership / team ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("team.heading")}
            subtitle={t("team.subtitle")}
            spacing="loose"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: (i % 4) * 0.08, duration: 0.7 }}
                className="text-center"
              >
                <Link
                  href={`/about/${m.slug}`}
                  className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-offset-4 transition-colors"
                  style={{ ["--tw-ring-color" as string]: m.color }}
                  aria-label={`Read about ${m.name}`}
                >
                  <div className="mx-auto mb-5 inline-block transition-transform duration-300 group-hover:scale-[1.04]">
                    <TeamAvatar
                      photo={m.photo}
                      initials={m.initials}
                      color={m.color}
                      name={m.name}
                    />
                  </div>
                  <span
                    style={{ ...fontBody, color: m.color }}
                    className="block text-[11px] font-semibold uppercase tracking-[0.22em] mb-2"
                  >
                    {m.role}
                  </span>
                  <Heading
                    size="micro"
                    className="text-neutral-900 mb-3 transition-colors"
                  >
                    <span
                      className="bg-[length:0%_1px] bg-no-repeat bg-[position:0_100%] group-hover:bg-[length:100%_1px] transition-[background-size] duration-300"
                      style={{ backgroundImage: `linear-gradient(${m.color}, ${m.color})` }}
                    >
                      {m.name}
                    </span>
                  </Heading>
                  <p style={fontBody} className={`${bodySize.micro} max-w-[18rem] mx-auto`}>
                    {m.bio}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 md:mt-20 max-w-3xl mx-auto text-center"
          >
            <p style={fontBody} className={bodySize.base}>
              {t("team.volunteersParagraph", { volunteerCount: t("team.volunteerCount") }).split(t("team.volunteerCount"))[0]}
              <span className="font-semibold text-[#397bce]">{t("team.volunteerCount")}</span>
              {t("team.volunteersParagraph", { volunteerCount: t("team.volunteerCount") }).split(t("team.volunteerCount"))[1]}
            </p>
            <div className="mt-6">
              <ArrowLink external="mailto:contact@jamun.org">
                {t("team.joinTheTeam")}
              </ArrowLink>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.finalCta}
        photoAlt={t("ctaPhotoAlt")}
        clip="none"
        minHeight="md:min-h-[70svh]"
        panelClassName="py-12 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          {t("finalCta.headingPart1")}
          <span className="text-[#f97316]">{t("finalCta.headingAccent")}</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9 max-w-md`}>
          {t("finalCta.description")}
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton href="/register" withArrow>
            {t("finalCta.getInvolved")}
          </PillButton>
          <PillButton href="/donate" tone="outline">
            {t("finalCta.supportMission")}
          </PillButton>
        </div>
        <p style={fontBody} className="mt-8 text-sm text-neutral-600">
          {t("finalCta.questionsReachOut")}{" "}
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
