"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { Container, Heading, PillButton } from "@/components/ui";
import { fontBody, bodySize } from "@/lib/typography";
import { DiagonalSpread } from "@/components/sections/DiagonalSpread";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { useTranslations } from "next-intl";

const PHOTOS = {
  hero: "/images/conferences/DSC01362.webp",
  finalCta: "/images/conferences/DSC01601.webp",
} as const;

const BOARD_MEMBERS = [
  {
    nameKey: "boardMember1Name",
    titleKey: "boardMember1Title",
    bioKey: "boardMember1Bio",
    linkedin: "https://www.linkedin.com/in/jenifer-page-68944a3/",
    initials: "JP",
    color: "#397bce",
  },
  {
    nameKey: "boardMember2Name",
    titleKey: "boardMember2Title",
    bioKey: "boardMember2Bio",
    linkedin: "https://www.linkedin.com/in/howard-task-7502a23/",
    initials: "HT",
    color: "#9333ea",
  },
] as const;

export function SupportersPage() {
  const t = useTranslations("SupportersPage");

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
          {t("heroHeadline")}
        </Heading>

        <p style={fontBody} className={`mt-6 max-w-lg ${bodySize.lead}`}>
          {t("heroDescription")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href="mailto:contact@jamun.org" withArrow>
            {t("ctaPartnerButton")}
          </PillButton>
          <PillButton href="/donate" tone="accent">
            {t("ctaDonateButton")}
          </PillButton>
        </div>
      </DiagonalSpread>

      {/* ───── Community Partners ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("partnersTitle")}
            subtitle={t("partnersSubtitle")}
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <a
              href="https://www.communitiesinschools.org"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-black/5 p-8 md:p-10 text-center max-w-sm transition-colors hover:border-black/10"
            >
              <div className="relative w-full h-16 mb-5">
                <Image
                  src="/images/partners/communities-in-schools.png"
                  alt={t("partner1Name")}
                  fill
                  className="object-contain"
                />
              </div>
              <Heading size="micro" className="mb-2 group-hover:text-[#397bce] transition-colors">
                {t("partner1Name")}
              </Heading>
              <p style={fontBody} className={bodySize.micro}>
                {t("partner1Description")}
              </p>
            </a>
          </motion.div>
        </Container>
      </section>

      {/* ───── Advisory Board ───── */}
      <section className="bg-white border-t border-black/5">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("boardTitle")}
            subtitle={t("boardSubtitle")}
          />

          <div className="grid md:grid-cols-2 gap-10 md:gap-14 max-w-2xl mx-auto">
            {BOARD_MEMBERS.map((member, i) => (
              <motion.div
                key={member.nameKey}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className="text-center"
              >
                {/* Avatar */}
                <div
                  className="mx-auto mb-5 w-28 h-28 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${member.color}1a` }}
                >
                  <span
                    className="text-2xl font-semibold"
                    style={{ color: member.color }}
                  >
                    {member.initials}
                  </span>
                </div>

                <Heading size="micro" className="mb-1">
                  {t(member.nameKey)}
                </Heading>

                <span
                  style={{
                    ...fontBody,
                    backgroundColor: `${member.color}1a`,
                    color: member.color,
                  }}
                  className="inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full"
                >
                  {t(member.titleKey)}
                </span>

                <p style={fontBody} className={`${bodySize.micro} max-w-xs mx-auto mb-3`}>
                  {t(member.bioKey)}
                </p>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={fontBody}
                  className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-[#397bce] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  {t("linkedIn")}
                </a>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={PHOTOS.finalCta}
        photoAlt={t("ctaPhotoAlt")}
        clip="none"
        minHeight="md:min-h-[70svh]"
        panelClassName="py-12 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          {t("ctaTitle")}
        </Heading>

        <p style={fontBody} className={`${bodySize.lead} mb-9`}>
          {t("ctaDescription")}
        </p>

        <div className="flex flex-wrap gap-3">
          <PillButton href="mailto:contact@jamun.org" withArrow>
            {t("ctaPartnerButton")}
          </PillButton>
          <PillButton href="/donate" tone="accent">
            {t("ctaDonateButton")}
          </PillButton>
        </div>
      </DiagonalSpread>
    </div>
  );
}
