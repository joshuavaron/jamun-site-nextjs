"use client";

import Script from "next/script";
import { motion } from "framer-motion";
import {
  Heart,
  GraduationCap,
  HandHeart,
  School,
  Check,
  Users,
  Trophy,
} from "lucide-react";
import { useTranslations } from "next-intl";
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
  studentQuote: "/images/conferences/DSCF9423.webp",
  parentQuote: "/images/conferences/DSCF9328.webp",
  finalCta: "/images/conferences/DSCF9356.webp",
} as const;

export function DonatePage() {
  const t = useTranslations("DonatePage");

  // ────────── Hero stats ──────────
  const HERO_STATS = [
    { icon: Users, value: t("hero.stats.studentsValue"), label: t("hero.stats.studentsLabel") },
    { icon: School, value: t("hero.stats.schoolsValue"), label: t("hero.stats.schoolsLabel") },
    { icon: Trophy, value: t("hero.stats.raisedValue"), label: t("hero.stats.raisedLabel") },
  ];

  // ────────── Why give ──────────
  const REASONS = [
    {
      icon: Heart,
      title: t("whyGive.reasons.volunteerRun.title"),
      body: t("whyGive.reasons.volunteerRun.body"),
      color: "#f97316",
    },
    {
      icon: School,
      title: t("whyGive.reasons.underservedSchools.title"),
      body: t("whyGive.reasons.underservedSchools.body"),
      color: "#397bce",
    },
    {
      icon: GraduationCap,
      title: t("whyGive.reasons.futureLeaders.title"),
      body: t("whyGive.reasons.futureLeaders.body"),
      color: "#9333ea",
    },
    {
      icon: HandHeart,
      title: t("whyGive.reasons.grants.title"),
      body: t("whyGive.reasons.grants.body"),
      color: "#10b981",
    },
  ];

  // ────────── Donation impact tiers ──────────
  const IMPACT_TIERS = [
    { amount: t("impactTiers.tiers.tier25.amount"), impact: t("impactTiers.tiers.tier25.impact") },
    { amount: t("impactTiers.tiers.tier50.amount"), impact: t("impactTiers.tiers.tier50.impact") },
    { amount: t("impactTiers.tiers.tier100.amount"), impact: t("impactTiers.tiers.tier100.impact") },
    { amount: t("impactTiers.tiers.tier250.amount"), impact: t("impactTiers.tiers.tier250.impact") },
    { amount: t("impactTiers.tiers.tier500.amount"), impact: t("impactTiers.tiers.tier500.impact") },
    { amount: t("impactTiers.tiers.tier1000.amount"), impact: t("impactTiers.tiers.tier1000.impact") },
  ];

  // ────────── Donate FAQs ──────────
  const FAQS = [
    {
      q: t("faq.items.taxDeductible.q"),
      a: t("faq.items.taxDeductible.a"),
    },
    {
      q: t("faq.items.whereMoneyGoes.q"),
      a: t("faq.items.whereMoneyGoes.a"),
    },
    {
      q: t("faq.items.recurringDonation.q"),
      a: t("faq.items.recurringDonation.a"),
    },
    {
      q: t("faq.items.employerMatch.q"),
      a: t("faq.items.employerMatch.a"),
    },
    {
      q: t("faq.items.specificProgram.q"),
      a: t("faq.items.specificProgram.a"),
    },
  ];

  const scrollToWidget = () => {
    document.getElementById("donate-widget")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="bg-white text-[#0a0a0a]">
      <Script
        src="https://widgets.givebutter.com/latest.umd.cjs?acct=3VthXuG6YBH7y7nq&p=other"
        strategy="lazyOnload"
      />

      {/* ───── Hero — heading + donate widget side by side ───── */}
      <section className="bg-white" id="donate-widget">
        <Container className="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)] flex items-center py-24 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
            {/* Left: heading + copy + stats */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              <Heading size="hero">
                {t("hero.headingBefore")}
                <span className="text-[#f97316]">{t("hero.headingHighlight")}</span>
              </Heading>
              <p style={fontBody} className={`mt-6 max-w-lg ${bodySize.lead}`}>
                {t("hero.description")}
              </p>

              {/* Inline stats */}
              <div className="mt-8 flex flex-wrap gap-6 md:gap-8">
                {HERO_STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                    className="flex items-center gap-2.5"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#397bce1a" }}
                    >
                      <s.icon className="w-[18px] h-[18px] text-[#397bce]" />
                    </div>
                    <div>
                      <div
                        style={{ ...fontHeading, fontWeight: 600 }}
                        className="text-lg leading-none"
                      >
                        {s.value}
                      </div>
                      <div
                        style={fontBody}
                        className="text-xs text-neutral-500 mt-0.5"
                      >
                        {s.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-6 flex flex-wrap gap-x-5 gap-y-1"
              >
                {[t("hero.trustBadges.securePayment"), t("hero.trustBadges.taxDeductible"), t("hero.trustBadges.verifiedNonprofit")].map(
                  (badge) => (
                    <span
                      key={badge}
                      style={fontBody}
                      className="flex items-center gap-1.5 text-[13px] text-neutral-400"
                    >
                      <Check className="w-3.5 h-3.5 text-[#10b981]" />
                      {badge}
                    </span>
                  ),
                )}
              </motion.div>
            </motion.div>

            {/* Right: Givebutter widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="givebutter-widget-container">
                {/* @ts-expect-error - Givebutter custom element */}
                <givebutter-widget id="L4K9wj"></givebutter-widget>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ───── Why Your Gift Matters ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("whyGive.title")}
            subtitle={t("whyGive.subtitle")}
            spacing="loose"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {REASONS.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
              >
                <IconTile icon={r.icon} color={r.color} size="sm" className="mb-5" />
                <Heading size="micro" className="text-neutral-900 mb-2">
                  {r.title}
                </Heading>
                <p style={fontBody} className={bodySize.micro}>
                  {r.body}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Student testimonial (orange) ───── */}
      <TestimonialSpread
        bg="#f97316"
        photoSide="left"
        photoSrc={PHOTOS.studentQuote}
        photoAlt={t("heroPhotoAlt")}
        heading={t("studentTestimonial.heading")}
        quote={t("studentTestimonial.quote")}
        attribution={t("studentTestimonial.attribution")}
      />

      {/* ───── Impact tiers ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("impactTiers.title")}
            subtitle={t("impactTiers.subtitle")}
          />
          <div className="max-w-2xl mx-auto space-y-1">
            {IMPACT_TIERS.map((tier, i) => (
              <motion.div
                key={tier.amount}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                className="flex items-baseline gap-5 py-4 border-b border-black/5 last:border-0"
              >
                <span
                  style={{ ...fontHeading, fontWeight: 600 }}
                  className="shrink-0 text-2xl md:text-3xl text-[#f97316] w-20 md:w-24"
                >
                  {tier.amount}
                </span>
                <p style={fontBody} className="text-base text-neutral-700 leading-relaxed">
                  {tier.impact}
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
            <PillButton onClick={scrollToWidget} tone="accent" withArrow>
              {t("impactTiers.giveToday")}
            </PillButton>
          </motion.div>
        </Container>
      </section>

      {/* ───── Parent quote (blue) ───── */}
      <TestimonialSpread
        bg="#397bce"
        photoSide="right"
        photoSrc={PHOTOS.parentQuote}
        photoAlt={t("testimonialPhotoAlt")}
        heading={t("parentTestimonial.heading")}
        quote={t("parentTestimonial.quote")}
        attribution={t("parentTestimonial.attribution")}
      />

      {/* ───── FAQ ───── */}
      <section className="bg-white">
        <Container className="py-12 md:py-16">
          <SectionIntro
            title={t("faq.title")}
            subtitle={t("faq.subtitle")}
          />

          <div className="max-w-3xl mx-auto">
            <FaqAccordion items={FAQS} />
          </div>

          <div className="text-center mt-12">
            <p style={fontBody} className="text-base text-neutral-700 mb-2">
              {t("faq.haveAnotherQuestion")}
            </p>
            <ArrowLink external="mailto:contact@jamun.org">
              {t("faq.getInTouch")}
            </ArrowLink>
          </div>
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.finalCta}
        photoAlt={t("ctaPhotoAlt")}
        clip="none"
        minHeight="min-h-[70svh]"
        panelClassName="py-16 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          {t("finalCta.headingBefore")}
          <span className="text-[#f97316]">{t("finalCta.headingHighlight")}</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9`}>
          {t("finalCta.description")}
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton onClick={scrollToWidget} tone="accent" withArrow>
            {t("finalCta.donateNow")}
          </PillButton>
          <PillButton href="/grants" tone="outline">
            {t("finalCta.learnAboutGrants")}
          </PillButton>
        </div>
      </DiagonalSpread>
    </div>
  );
}
