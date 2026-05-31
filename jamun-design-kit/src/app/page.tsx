"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
import {
  Container,
  Heading,
  PillButton,
  ArrowLink,
  IconTile,
  AnimatedNumber,
} from "@/components/ui";
import {
  DiagonalSpread,
  TestimonialSpread,
  SectionIntro,
  FaqAccordion,
} from "@/components/sections";
import { fontBody, fontHeading, bodySize } from "@/lib/typography";

// ─────────────────────────────────────────────────────────────
// Example landing page. This is a reference composition that uses
// every primitive in the kit. Swap the copy, photos, and colors for
// your own. Demo photos come from picsum (allowed in next.config.ts).
// ─────────────────────────────────────────────────────────────

const photo = (seed: string) => `https://picsum.photos/seed/${seed}/1200/900`;

const STATS = [
  { value: "500+", label: "Students served" },
  { value: "30+", label: "Partner schools" },
  { value: "80+", label: "Volunteers" },
  { value: "$70K+", label: "Raised" },
];

const PROGRAMS = [
  { name: "Program One", body: "A short description of the first program and who it serves.", color: "#397bce", seed: "prog-a" },
  { name: "Program Two", body: "A short description of the second program and who it serves.", color: "#9333ea", seed: "prog-b" },
  { name: "Program Three", body: "A short description of the third program and who it serves.", color: "#10b981", seed: "prog-c" },
];

const AUDIENCES = [
  { icon: GraduationCap, title: "For Students", body: "What students gain and why they should join.", cta: "Get started", href: "#", color: "#397bce" },
  { icon: Heart, title: "For Families", body: "What families should know about the experience.", cta: "Learn more", href: "#", color: "#f97316" },
  { icon: BookOpen, title: "For Educators", body: "How teachers can bring this to their classroom.", cta: "Explore resources", href: "#", color: "#9333ea" },
];

const SKILLS = [
  { icon: Mic, title: "Public Speaking", body: "Speak with confidence in front of a room.", color: "#397bce" },
  { icon: Brain, title: "Critical Thinking", body: "Weigh evidence and reason it through.", color: "#9333ea" },
  { icon: MessageSquare, title: "Debate", body: "Argue a position and defend it.", color: "#10b981" },
  { icon: BookOpen, title: "Research", body: "Find sources and synthesize them.", color: "#f97316" },
  { icon: Users, title: "Teamwork", body: "Collaborate toward a shared goal.", color: "#0ea5e9" },
  { icon: Lightbulb, title: "Problem Solving", body: "Break hard problems into steps.", color: "#eab308" },
  { icon: Target, title: "Leadership", body: "Take initiative and guide a group.", color: "#ec4899" },
  { icon: Trophy, title: "Competition", body: "Rise to a challenge and grow from it.", color: "#f97316" },
];

const FAQS = [
  { q: "Who is this for?", a: "Describe your audience here — the more specific, the better." },
  { q: "How much does it cost?", a: "State your pricing or the fact that it's free." },
  { q: "How do I get started?", a: "Point people to the registration or contact path." },
  { q: "Where does it take place?", a: "Location and logistics go here." },
  { q: "What if I have more questions?", a: "Invite them to reach out — there's a link below." },
];

export default function Home() {
  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={photo("hero")}
        photoAlt="Hero photo"
        photoPriority
        photoClassName="min-h-[60svh]"
        minHeight="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        <Heading size="hero">
          A headline that earns the{" "}
          <span className="text-[#f97316]">first scroll.</span>
        </Heading>
        <p style={fontBody} className={`mt-6 max-w-md ${bodySize.lead}`}>
          One or two sentences that say what you do and who it&apos;s for. Keep
          it concrete and warm.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href="#" withArrow>
            Get started
          </PillButton>
          <PillButton href="#" tone="outline">
            See programs
          </PillButton>
        </div>
      </DiagonalSpread>

      {/* ───── Stats ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={photo("stats")}
        photoAlt="Stats photo"
        minHeight="md:min-h-[72svh]"
        panelClassName="py-10 md:py-12"
      >
        <Heading size="section" className="mb-10">
          The numbers behind the work.
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
          A sentence that frames what these numbers mean for the people you serve.
        </p>
      </DiagonalSpread>

      {/* ───── Programs (photo-card grid) ───── */}
      <section className="bg-white">
        <Container className="pt-10 md:pt-14 text-center">
          <Heading size="section">Three paths to choose from.</Heading>
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
                    src={photo(p.seed)}
                    alt={p.name}
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
                  href="#"
                  size="md"
                  tone="custom"
                  color={p.color}
                  withArrow
                  className="mt-auto self-start"
                >
                  Learn more
                </PillButton>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── Who we serve (audience grid) ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title="Built for everyone involved."
            subtitle="A line that introduces the three groups below and why each one matters."
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

      {/* ───── Orange pull-quote spread ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={photo("quote")}
        photoAlt="Quote photo"
        clip="none"
        panelBg="#f97316"
        panelText="#ffffff"
      >
        <Heading size="section" as="blockquote">
          <span className="opacity-70">&ldquo;</span>A single, punchy line of
          social proof that fills the panel.<span className="opacity-70">&rdquo;</span>
        </Heading>
        <div style={fontBody} className="mt-8 text-base md:text-lg text-white/90">
          — Someone whose opinion your audience trusts
        </div>
      </DiagonalSpread>

      {/* ───── Themed proof spreads ───── */}
      <section className="bg-white">
        <Container className="py-10 md:py-14 text-center">
          <Heading size="section">What people say.</Heading>
          <p style={fontBody} className={`mt-5 max-w-2xl mx-auto ${bodySize.lead}`}>
            A short framing line for the testimonials below.
          </p>
        </Container>

        <TestimonialSpread
          bg="#397bce"
          photoSide="right"
          photoSrc={photo("t-blue")}
          photoAlt="Testimonial photo"
          heading="A serif lead-in to the quote."
          quote="A longer testimonial that runs two or three lines and feels genuine and specific."
          attribution="— A participant"
        />
        <TestimonialSpread
          bg="#9333ea"
          photoSide="left"
          photoSrc={photo("t-purple")}
          photoAlt="Testimonial photo"
          heading="Another angle, another voice."
          quote="A second testimonial from a different perspective — a parent, a teacher, a partner."
          attribution="— A family member"
        />
        <TestimonialSpread
          bg="#10b981"
          photoSide="right"
          photoSrc={photo("t-green")}
          photoAlt="Testimonial photo"
          heading="And one more for rhythm."
          quote="A third quote rounds out the trio and reinforces the throughline of the page."
          attribution="— An educator"
        />
      </section>

      {/* ───── Skills (4-up grid) + pull-quote ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title="What participants take away."
            subtitle="A line introducing the skills or outcomes below."
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
                Why this matters.
              </Heading>
              <p style={fontBody} className={`${bodySize.base} mb-4`}>
                A paragraph that explains the deeper rationale — the &ldquo;why&rdquo;
                behind the work, beyond the feature list above.
              </p>
              <p style={fontBody} className={bodySize.base}>
                A second paragraph that brings it home with a concrete example or
                a forward-looking statement.
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ───── FAQ ───── */}
      <section className="bg-white">
        <Container className="py-12 md:py-16">
          <SectionIntro title="Questions, answered." subtitle="The things people ask most." />
          <div className="max-w-3xl mx-auto">
            <FaqAccordion items={FAQS} />
          </div>
          <div className="text-center mt-12">
            <p style={fontBody} className="text-base text-neutral-700 mb-2">
              Still have questions?
            </p>
            <ArrowLink external="mailto:hello@example.org">Get in touch</ArrowLink>
          </div>
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={photo("cta")}
        photoAlt="Final CTA photo"
        clip="none"
        minHeight="md:min-h-[70svh]"
        panelClassName="py-12 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          A closing line that asks for{" "}
          <span className="text-[#f97316]">the click.</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9`}>
          One last sentence that lowers the barrier to acting.
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton href="#" withArrow>
            Get started
          </PillButton>
          <PillButton href="#" tone="outline">
            Support us
          </PillButton>
        </div>
      </DiagonalSpread>
    </div>
  );
}
