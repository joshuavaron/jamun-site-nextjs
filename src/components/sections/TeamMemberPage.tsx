"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Container,
  Heading,
  PillButton,
  ArrowLink,
  IconTile,
} from "@/components/ui";
import { fontBody, fontSerif, bodySize } from "@/lib/typography";
import { DiagonalSpread } from "@/components/sections/DiagonalSpread";
import { TestimonialSpread } from "@/components/sections/TestimonialSpread";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { getTeamMember } from "@/lib/team-members";
import { notFound } from "next/navigation";

type Props = { slug: string };

export function TeamMemberPage({ slug }: Props) {
  const member = getTeamMember(slug);
  if (!member) notFound();
  const t = useTranslations(`AboutPage.team.members.${member.messageKey}`);
  const name = t("name");
  const role = t("role");
  const bio = t("bio");
  const firstName = name.split(" ")[0];

  const email = member.email ?? "contact@jamun.org";

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={member.heroPhoto}
        photoAlt={member.heroPhotoAlt}
        photoPriority
        photoClassName="min-h-[60svh]"
        minHeight="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        <span
          style={{ ...fontBody, color: member.color }}
          className="block text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.22em] mb-5"
        >
          {role}
        </span>
        <Heading size="hero">
          Meet{" "}
          <span style={{ color: member.color }}>{firstName}.</span>
        </Heading>
        <p style={fontBody} className={`mt-6 max-w-xl ${bodySize.lead}`}>
          {bio}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href={`mailto:${email}`} withArrow>
            Get in touch
          </PillButton>
          <PillButton href="/about" tone="outline">
            Meet the team
          </PillButton>
        </div>
      </DiagonalSpread>

      {/* ───── What I do — paragraphs + blockquote ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={
              <>
                What {firstName} does at{" "}
                <span style={{ color: member.color }}>JAMUN.</span>
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
                {member.paragraphs[0]}
              </p>
              <p style={fontBody} className={bodySize.base}>
                {member.paragraphs[1]}
              </p>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-2 border-l-2 pl-6 md:pl-8 py-2"
              style={{ borderColor: member.color }}
            >
              <blockquote
                style={fontSerif}
                className="text-xl md:text-2xl leading-relaxed text-neutral-900"
              >
                <span
                  aria-hidden
                  style={{ color: member.color }}
                  className="mr-1 select-none"
                >
                  &ldquo;
                </span>
                {member.quote}
                <span
                  aria-hidden
                  style={{ color: member.color }}
                  className="ml-0.5 select-none"
                >
                  &rdquo;
                </span>
              </blockquote>
              <figcaption
                style={{ ...fontBody, color: member.color }}
                className="mt-5 text-sm font-semibold"
              >
                — {name}
              </figcaption>
            </motion.figure>
          </div>
        </Container>
      </section>

      {/* ───── Themed testimonial spread ───── */}
      <TestimonialSpread
        bg={member.color}
        photoSide="left"
        photoSrc={member.testimonialPhoto}
        photoAlt="JAMUN students at a conference"
        heading={`${role}.`}
        quote={member.quote}
        attribution={`— ${name}`}
      />

      {/* ───── Focus areas ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={
              <>
                What {firstName} spends time on.
              </>
            }
            subtitle="The work behind the role. Four areas where most of the hours go."
            spacing="loose"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {member.focusAreas.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (i % 4) * 0.06, duration: 0.6 }}
              >
                <IconTile icon={f.icon} color={f.color} size="sm" className="mb-5" />
                <Heading size="micro" className="text-neutral-900 mb-2">
                  {f.title}
                </Heading>
                <p style={fontBody} className={bodySize.micro}>
                  {f.body}
                </p>
              </motion.div>
            ))}
          </div>

          {member.beyondJamun && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-16 md:mt-20 max-w-4xl mx-auto"
            >
              <div
                className="border-l-2 pl-6 md:pl-8 py-2"
                style={{ borderColor: member.color }}
              >
                <Heading size="sub" className="mb-4 text-neutral-900">
                  {member.beyondJamun.heading}
                </Heading>
                <p
                  style={fontBody}
                  className="text-base md:text-[1.05rem] text-neutral-700 leading-relaxed mb-4"
                >
                  {member.beyondJamun.paragraphs[0]}
                </p>
                <p
                  style={fontBody}
                  className="text-base md:text-[1.05rem] text-neutral-700 leading-relaxed"
                >
                  {member.beyondJamun.paragraphs[1]}
                </p>
              </div>
            </motion.div>
          )}
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={member.ctaPhoto}
        photoAlt="JAMUN students at a conference"
        clip="none"
        minHeight="min-h-[70svh]"
        panelClassName="py-16 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          Want to reach{" "}
          <span style={{ color: member.color }}>{firstName}?</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9 max-w-md`}>
          Questions about {role.toLowerCase()}, or just want to chat about the
          work? Drop a line — every message gets read.
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton href={`mailto:${email}`} withArrow>
            Email {firstName}
          </PillButton>
          <PillButton href="/donate" tone="outline">
            Support JAMUN
          </PillButton>
        </div>
        <p style={fontBody} className="mt-8 text-sm text-neutral-600">
          Prefer the wider team?{" "}
          <a
            href="mailto:contact@jamun.org"
            className="font-semibold text-[#397bce] hover:text-[#2a5fa3] transition-colors"
          >
            contact@jamun.org
          </a>
        </p>
        <div className="mt-6">
          <ArrowLink href="/about" color={member.color}>
            Meet the rest of the team
          </ArrowLink>
        </div>
      </DiagonalSpread>
    </div>
  );
}
