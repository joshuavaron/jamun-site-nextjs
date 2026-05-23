"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  DollarSign,
  Rocket,
  Users,
  CheckCircle,
  GraduationCap,
  MapPin,
  BookOpen,
  Target,
  Package,
  Lightbulb,
} from "lucide-react";
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

// ────────── Photos ──────────
const PHOTOS = {
  hero: "/images/conferences/DSC02030.webp",
  parentQuote: "/images/conferences/DSCF9370.webp",
  studentQuote: "/images/conferences/DSCF9412.webp",
  cta: "/images/conferences/DSC02050.webp",
} as const;

const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSebFceytbjpIIyWJebROTfUDUrsF1JRHagu5i-WHg9zV5T74Q/viewform?usp=sharing&ouid=103922860105045263948";

export function GrantsPage() {
  const t = useTranslations("GrantsPage");

  // ────────── Why Grants Matter ──────────
  const BENEFITS = [
    {
      icon: DollarSign,
      color: "#10b981",
      title: t("benefits.items.removeBarriers.title"),
      body: t("benefits.items.removeBarriers.body"),
      cta: t("benefits.items.removeBarriers.cta"),
      href: "#what-we-cover",
    },
    {
      icon: Rocket,
      color: "#9333ea",
      title: t("benefits.items.accelerateGrowth.title"),
      body: t("benefits.items.accelerateGrowth.body"),
      cta: t("benefits.items.accelerateGrowth.cta"),
      href: "/programs",
    },
    {
      icon: Users,
      color: "#397bce",
      title: t("benefits.items.buildCommunity.title"),
      body: t("benefits.items.buildCommunity.body"),
      cta: t("benefits.items.buildCommunity.cta"),
      href: "/about",
    },
  ];

  // ────────── How It Works ──────────
  const STEPS = [
    {
      num: t("howItWorks.steps.step01.num"),
      title: t("howItWorks.steps.step01.title"),
      body: t("howItWorks.steps.step01.body"),
      color: "#10b981",
    },
    {
      num: t("howItWorks.steps.step02.num"),
      title: t("howItWorks.steps.step02.title"),
      body: t("howItWorks.steps.step02.body"),
      color: "#397bce",
    },
    {
      num: t("howItWorks.steps.step03.num"),
      title: t("howItWorks.steps.step03.title"),
      body: t("howItWorks.steps.step03.body"),
      color: "#9333ea",
    },
    {
      num: t("howItWorks.steps.step04.num"),
      title: t("howItWorks.steps.step04.title"),
      body: t("howItWorks.steps.step04.body"),
      color: "#f97316",
    },
  ];

  // ────────── What Grants Cover ──────────
  const COVERS = [
    { icon: GraduationCap, label: t("whatGrantsCover.items.registrationFees"), color: "#397bce" },
    { icon: MapPin, label: t("whatGrantsCover.items.travel"), color: "#9333ea" },
    { icon: BookOpen, label: t("whatGrantsCover.items.materials"), color: "#10b981" },
    { icon: Target, label: t("whatGrantsCover.items.training"), color: "#f97316" },
    { icon: Package, label: t("whatGrantsCover.items.uniforms"), color: "#0ea5e9" },
    { icon: Lightbulb, label: t("whatGrantsCover.items.coaching"), color: "#eab308" },
  ];

  // ────────── FAQ ──────────
  const FAQS = [
    {
      q: t("faq.items.eligibility.q"),
      a: t("faq.items.eligibility.a"),
    },
    {
      q: t("faq.items.expenses.q"),
      a: t("faq.items.expenses.a"),
    },
    {
      q: t("faq.items.timeline.q"),
      a: t("faq.items.timeline.a"),
    },
    {
      q: t("faq.items.distribution.q"),
      a: t("faq.items.distribution.a"),
    },
    {
      q: t("faq.items.multiplePrograms.q"),
      a: t("faq.items.multiplePrograms.a"),
    },
  ];

  // ────────── Trust indicators ──────────
  const TRUST_INDICATORS = [
    t("hero.trustIndicators.noApplicationFee"),
    t("hero.trustIndicators.responseTime"),
    t("hero.trustIndicators.simpleProcess"),
  ];

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.hero}
        photoAlt={t("heroPhotoAlt")}
        photoPriority
        clip="diagonal"
        minHeight="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)]"
        animation="entry"
      >
        <Heading size="hero">
          {t("hero.heading")}
        </Heading>

        <p style={fontBody} className={`mt-6 max-w-lg ${bodySize.lead}`}>
          {t("hero.description")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href={APPLY_URL} withArrow>
            {t("hero.applyForGrant")}
          </PillButton>
          <PillButton href="#how-it-works" tone="outline">
            {t("hero.learnHowItWorks")}
          </PillButton>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          {TRUST_INDICATORS.map(
            (label) => (
              <span
                key={label}
                style={fontBody}
                className="flex items-center gap-2 text-sm text-neutral-500"
              >
                <CheckCircle size={16} className="text-[#10b981]" />
                {label}
              </span>
            ),
          )}
        </div>
      </DiagonalSpread>

      {/* ───── Why Grants Matter ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("benefits.title")}
            subtitle={t("benefits.subtitle")}
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
              >
                <IconTile icon={b.icon} color={b.color} size="md" />
                <Heading size="cardLg" className="mt-5 mb-3">
                  {b.title}
                </Heading>
                <p style={fontBody} className={bodySize.base}>
                  {b.body}
                </p>
                <div className="mt-4">
                  <ArrowLink href={b.href} color={b.color}>
                    {b.cta}
                  </ArrowLink>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Parent testimonial (emerald) ───── */}
      <TestimonialSpread
        bg="#10b981"
        photoSide="left"
        photoSrc={PHOTOS.parentQuote}
        photoAlt={t("testimonialPhotoAlt")}
        heading={t("parentTestimonial.heading")}
        quote={t("parentTestimonial.quote")}
        attribution={t("parentTestimonial.attribution")}
      />

      {/* ───── How It Works ───── */}
      <section id="how-it-works" className="bg-white scroll-mt-20">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("howItWorks.title")}
            subtitle={t("howItWorks.subtitle")}
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
              >
                <span
                  style={fontHeading}
                  className="text-5xl font-bold"
                  aria-hidden="true"
                >
                  <span style={{ color: s.color }}>{s.num}</span>
                </span>
                <Heading size="micro" className="mt-4 mb-2">
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
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-center mt-12"
          >
            <PillButton href={APPLY_URL} withArrow>
              {t("howItWorks.startYourApplication")}
            </PillButton>
          </motion.div>
        </Container>
      </section>

      {/* ───── What Grants Cover ───── */}
      <section id="what-we-cover" className="bg-white scroll-mt-20">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("whatGrantsCover.title")}
            subtitle={t("whatGrantsCover.subtitle")}
          />

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {COVERS.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className="flex items-start gap-4"
              >
                <IconTile icon={c.icon} color={c.color} size="sm" />
                <Heading size="micro" className="mt-3">
                  {c.label}
                </Heading>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Student testimonial (blue) ───── */}
      <TestimonialSpread
        bg="#397bce"
        photoSide="right"
        photoSrc={PHOTOS.studentQuote}
        photoAlt={t("stepsPhotoAlt")}
        heading={t("studentTestimonial.heading")}
        quote={t("studentTestimonial.quote")}
        attribution={t("studentTestimonial.attribution")}
      />

      {/* ───── FAQ ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("faq.title")}
            subtitle={t("faq.subtitle")}
          />

          <div className="mx-auto max-w-3xl mt-10">
            <FaqAccordion items={FAQS} />
          </div>

          <div className="text-center mt-10">
            <p style={fontBody} className="text-base text-neutral-700 mb-2">
              {t("faq.haveAnotherQuestion")}
            </p>
            <ArrowLink external="mailto:grants@jamun.org">
              {t("faq.emailGrantsTeam")}
            </ArrowLink>
          </div>
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.cta}
        photoAlt={t("ctaPhotoAlt")}
        clip="none"
        minHeight="md:min-h-[70svh]"
        panelClassName="py-12 md:py-0"
        animation="inView"
      >
        <Heading size="ctaHero">
          {t("finalCta.headingBefore")}
          <span className="text-[#10b981]">{t("finalCta.headingHighlight")}</span>
        </Heading>

        <p style={fontBody} className={`mt-6 max-w-md ${bodySize.lead}`}>
          {t("finalCta.description")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href={APPLY_URL} withArrow>
            {t("finalCta.openApplicationForm")}
          </PillButton>
          <PillButton href="mailto:grants@jamun.org" tone="outline">
            {t("finalCta.contactGrantsTeam")}
          </PillButton>
        </div>

        <p style={fontBody} className="mt-6 text-sm text-neutral-500">
          {t("finalCta.questionsEmailUs")}{" "}
          <a
            href="mailto:grants@jamun.org"
            className="text-[#397bce] underline underline-offset-2 hover:text-[#2a5fa3] transition-colors"
          >
            {t("finalCta.grantsEmail")}
          </a>
        </p>
      </DiagonalSpread>
    </div>
  );
}
