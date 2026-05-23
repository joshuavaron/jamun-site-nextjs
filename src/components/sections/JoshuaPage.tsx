"use client";

import { motion } from "framer-motion";
import { Heart, Users, BookOpen, Calculator } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import {
  Container,
  Heading,
  PillButton,
  ArrowLink,
  IconTile,
} from "@/components/ui";
import { fontBody, fontHeading, fontSerif, bodySize } from "@/lib/typography";
import { DiagonalSpread } from "@/components/sections/DiagonalSpread";
import { TestimonialSpread } from "@/components/sections/TestimonialSpread";
import { SectionIntro } from "@/components/sections/SectionIntro";

const PHOTOS = {
  hero: "/images/team/joshua_corrected.jpg",
  stats: "/images/team/joshua_square.jpg",
  testimonial: "/images/conferences/DSCF9438.webp",
  finalCta: "/images/conferences/DSC02053.webp",
} as const;

const STATS = [
  { value: "2023", label: "Founded JAMUN" },
  { value: "500+", label: "Students served" },
  { value: "30+", label: "Schools reached" },
  { value: "80+", label: "Volunteers led" },
];

const JOURNEY = [
  {
    year: "2018",
    title: "The first conference.",
    body: "I walked into my first Model UN as a sixth grader. I was terrified, then I was hooked. The room rewarded curiosity and effort in a way few middle-school spaces did, and I never quite left it.",
    color: "#397bce",
  },
  {
    year: "2022",
    title: "A pattern I couldn't ignore.",
    body: "By high school, I was helping run conferences and noticing the same gap every time: hundreds of dollars in registration fees, prep materials locked behind paywalls, and the schools that needed these programs the most never on the roster.",
    color: "#9333ea",
  },
  {
    year: "2023",
    title: "JAMUN, version one.",
    body: "I founded JAMUN with a handful of friends and a stubborn question — what would academic competition look like if it were designed for everyone? Our first conference ran on borrowed chairs and a lot of caffeine.",
    color: "#10b981",
  },
  {
    year: "2025",
    title: "Three programs. Thousands of students.",
    body: "Today JAMUN runs Model UN, Mock Trial, and Mathletes for grades 5–8, with free resources, low-cost conferences, and grants covering up to 100% of costs. We're a long way from those borrowed chairs.",
    color: "#f97316",
  },
];

const FOCUS = [
  {
    icon: Heart,
    title: "Access",
    body: "Removing the price tag from academic competition — through grants, free curriculum, and conferences priced for any family.",
    color: "#397bce",
  },
  {
    icon: Users,
    title: "Building teams",
    body: "Recruiting and mentoring the 80+ student volunteers who make JAMUN run — the program is only as good as the people behind it.",
    color: "#9333ea",
  },
  {
    icon: BookOpen,
    title: "Curriculum",
    body: "Designing the prep materials, training guides, and committee topics that turn a curious middle schooler into a confident competitor.",
    color: "#10b981",
  },
  {
    icon: Calculator,
    title: "Math & systems",
    body: "Studying mathematics and computer science at Duke, where I think a lot about the systems that make a small nonprofit scale.",
    color: "#f97316",
  },
];

export function JoshuaPage() {
  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.hero}
        photoAlt="Joshua Varon, founder and president of JAMUN"
        photoPriority
        photoClassName="min-h-[60svh]"
        minHeight="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        <span
          style={fontBody}
          className="block text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.22em] text-[#397bce] mb-5"
        >
          President & Founder
        </span>
        <Heading size="hero">
          Hi, I&rsquo;m <span className="text-[#f97316]">Joshua.</span>
        </Heading>
        <p style={fontBody} className={`mt-6 max-w-xl ${bodySize.lead}`}>
          Mathematics and computer science student at Duke. I founded JAMUN
          because the middle schooler I once was deserved a shot at academic
          competition — and so does every kid like him.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href="mailto:joshua@jamun.org" withArrow>
            Get in touch
          </PillButton>
          <PillButton href="/about" tone="outline">
            Meet the team
          </PillButton>
        </div>
      </DiagonalSpread>

      {/* ───── Why I built JAMUN ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={
              <>
                Why I built <span className="text-[#397bce]">JAMUN.</span>
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
                When I was eleven, a Model UN conference cracked open a part of
                my brain I didn&rsquo;t know existed. Suddenly research felt
                like a contact sport, public speaking felt like a tool, and a
                room full of strangers felt like a team I&rsquo;d been waiting
                to join.
              </p>
              <p style={fontBody} className={bodySize.base}>
                But I noticed quickly: the conferences I attended cost
                hundreds of dollars, the prep materials lived behind
                subscriptions, and most kids in my city were never going to
                see the inside of those rooms. JAMUN started as a refusal to
                accept that — and grew, conference by conference, into the
                program I wished had existed when I was eleven.
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
                <span aria-hidden className="text-[#397bce] mr-1 select-none">
                  &ldquo;
                </span>
                Smart isn&rsquo;t a club. It&rsquo;s a habit. Every middle
                schooler deserves a room where that habit gets celebrated.
                <span aria-hidden className="text-[#397bce] ml-0.5 select-none">
                  &rdquo;
                </span>
              </blockquote>
              <figcaption
                style={fontBody}
                className="mt-5 text-sm font-semibold text-[#397bce]"
              >
                — Joshua Varon
              </figcaption>
            </motion.figure>
          </div>
        </Container>
      </section>

      {/* ───── Stats spread ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={PHOTOS.stats}
        photoAlt="Joshua Varon"
        minHeight="md:min-h-[72svh]"
        panelClassName="py-12 md:py-16"
      >
        <Heading size="section" className="mb-3">
          A few numbers.
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-10 max-w-md`}>
          The shape of the last few years, in figures I&rsquo;m proud of and a
          little stunned by.
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

      {/* ───── Journey — numbered editorial list (ProgramsPage-style) ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Heading size="section">
                How I got <span className="text-[#397bce]">here.</span>
              </Heading>
              <p style={fontBody} className={`mt-5 ${bodySize.lead}`}>
                Four moments that turned a middle schooler with a question into
                a nonprofit with three programs.
              </p>
            </div>

            <ol className="divide-y divide-black/10 border-t border-black/10">
              {JOURNEY.map((j, i) => (
                <motion.li
                  key={j.year}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.08, duration: 0.7 }}
                  className="flex gap-6 md:gap-8 py-8 md:py-10"
                >
                  <span
                    aria-hidden
                    style={{ ...fontSerif, color: j.color }}
                    className="text-4xl md:text-5xl leading-none shrink-0 w-20 md:w-24 tabular-nums"
                  >
                    {j.year}
                  </span>
                  <div className="flex-1">
                    <Heading size="cardLg" as="h3" className="mb-3">
                      {j.title}
                    </Heading>
                    <p style={fontBody} className={bodySize.base}>
                      {j.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ───── Themed quote spread (blue) ───── */}
      <TestimonialSpread
        bg="#397bce"
        photoSide="right"
        photoSrc={PHOTOS.testimonial}
        photoAlt="JAMUN students at a conference"
        heading="Building the version that should have existed."
        quote="I built JAMUN for the kid I was at eleven — curious, restless, and locked out of the rooms where academic competition happened. The programs I run now are the programs I needed then."
        attribution="— Joshua, on starting JAMUN"
      />

      {/* ───── What I focus on ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title="What I spend my time on."
            subtitle="The work behind the conferences. Four areas where I put most of my hours, in roughly the order I think about them."
            spacing="loose"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {FOCUS.map((f, i) => (
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

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 md:mt-20 max-w-4xl mx-auto"
          >
            <div className="border-l-2 border-[#397bce] pl-6 md:pl-8 py-2">
              <Heading size="sub" className="mb-4 text-neutral-900">
                Beyond JAMUN.
              </Heading>
              <p style={fontBody} className={`${bodySize.base} mb-4`}>
                When I&rsquo;m not running JAMUN, I&rsquo;m at Duke studying
                mathematics and computer science — two fields that, oddly,
                turn out to be excellent training for running a youth-led
                nonprofit. Both reward the patience to keep asking why
                something works until you actually understand it.
              </p>
              <p style={fontBody} className={bodySize.base}>
                I read too much, write a little, and am probably most useful
                in a room where someone is trying to scope a problem that
                feels too big to start.
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.finalCta}
        photoAlt="JAMUN students celebrating at a conference"
        clip="none"
        minHeight="md:min-h-[70svh]"
        panelClassName="py-12 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          Want to{" "}
          <span className="text-[#f97316]">talk?</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9 max-w-md`}>
          Whether you&rsquo;re a student curious about a program, a parent with
          a question, an educator looking to bring JAMUN to your school, or a
          volunteer hoping to help — drop me a line. I read every message.
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton href="mailto:joshua@jamun.org" withArrow>
            Email Joshua
          </PillButton>
          <PillButton href="/donate" tone="outline">
            Support JAMUN
          </PillButton>
        </div>
        <p style={fontBody} className="mt-8 text-sm text-neutral-600">
          Or reach the wider team at{" "}
          <a
            href="mailto:contact@jamun.org"
            className="font-semibold text-[#397bce] hover:text-[#2a5fa3] transition-colors"
          >
            contact@jamun.org
          </a>
          .
        </p>
        <div className="mt-6">
          <ArrowLink href="/about" color="#397bce">
            Meet the rest of the team
          </ArrowLink>
        </div>
      </DiagonalSpread>
    </div>
  );
}
