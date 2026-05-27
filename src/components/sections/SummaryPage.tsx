"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  Sparkles,
  HandCoins,
  Award,
  Globe,
  Download,
  ArrowRight,
} from "lucide-react";
import { IconTile } from "@/components/ui";
import { fontBody, fontHeading, fontSerif } from "@/lib/typography";

// A web rendering of /public/JAMUN-Overview.pdf. Same content, same order,
// same visual rhythm — but laid out for the browser. The download button
// hands users the canonical PDF, and Ctrl/Cmd-P opens that PDF instead of
// printing this page so the printed artifact always matches the design.

const PHOTOS = {
  hero: "/images/conferences/DSCF9417.webp",
  modelUn: "/images/conferences/DSCF9356.webp",
  mockTrial: "/images/conferences/DSCF9445.webp",
  mathletes: "/images/conferences/DSCF9395.webp",
  quote: "/images/conferences/DSCF9328.webp",
};

const STATS = [
  { value: "500+", label: "Participants" },
  { value: "30+", label: "Schools Reached" },
  { value: "80+", label: "Volunteers" },
  { value: "$70K+", label: "Raised" },
];

const PROGRAMS = [
  {
    name: "Model UN",
    color: "#397bce",
    photo: PHOTOS.modelUn,
    body:
      "Step into the shoes of UN delegates. Debate global crises, draft resolutions, negotiate across nations.",
  },
  {
    name: "Mock Trial",
    color: "#9333ea",
    photo: PHOTOS.mockTrial,
    body:
      "Take the courtroom. Cross-examine witnesses, build cases, argue with conviction in a legal simulation.",
  },
  {
    name: "Mathletes",
    color: "#10b981",
    photo: PHOTOS.mathletes,
    body:
      "Train with peers, solve the toughest problems, and build skills for MATHCOUNTS and AMC 8.",
  },
];

const PILLARS = [
  {
    icon: HandCoins,
    color: "#f97316",
    title: "Low-cost by design",
    body: "Priced so cost never blocks a student.",
  },
  {
    icon: Sparkles,
    color: "#397bce",
    title: "Beginner-friendly",
    body: "No experience required — first-timers welcomed.",
  },
  {
    icon: Award,
    color: "#10b981",
    title: "Grants up to 100%",
    body: "Need-based grants cover full registration costs.",
  },
  {
    icon: Globe,
    color: "#9333ea",
    title: "ESL committee",
    body: "Quality programming for non-English-speaking students.",
  },
];

const PDF_HREF = "/JAMUN-Overview.pdf";

export function SummaryPage() {
  // Hijack Ctrl/Cmd+P and any direct window.print() call so the print path
  // hands users the canonical PDF instead of the browser's print dialog on
  // this responsive layout. (The browser's File > Print menu can't be
  // intercepted — that path is rare enough to accept.)
  useEffect(() => {
    const openPdf = () => {
      window.open(PDF_HREF, "_blank", "noopener,noreferrer");
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        e.stopPropagation();
        openPdf();
      }
    };

    const originalPrint = window.print;
    window.print = openPdf;
    window.addEventListener("keydown", onKeyDown, { capture: true });

    return () => {
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      window.print = originalPrint;
    };
  }, []);

  return (
    <div className="bg-white text-[#0a0a0a]">
      <article
        className="mx-auto w-full max-w-[1100px] px-5 sm:px-8 md:px-12 lg:px-16 py-10 md:py-14"
        style={fontBody}
      >
        {/* ───── Header strip ───── */}
        <header className="flex items-center justify-between gap-4 pb-5 border-b border-neutral-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logos/jamun-blue-side-logo.svg"
            alt="JAMUN"
            className="h-8 md:h-10 w-auto"
          />
          <div className="flex items-center gap-4 md:gap-6">
            <div className="text-right hidden sm:block">
              <div
                style={{ ...fontSerif, fontStyle: "italic" }}
                className="text-base md:text-lg text-neutral-700 leading-none"
              >
                Make Academics Fun.
              </div>
              <div className="mt-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-neutral-500">
                Est. 2023 · 501(c)(3) Nonprofit · jamun.org
              </div>
            </div>
            <a
              href={PDF_HREF}
              download
              className="inline-flex items-center gap-2 rounded-full bg-[#397bce] text-white px-4 py-2 text-sm font-medium hover:bg-[#2a5fa3] transition-colors whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </a>
          </div>
        </header>

        {/* ───── Hero ───── */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 pt-8 md:pt-10">
          <div className="md:col-span-7 flex flex-col justify-center order-2 md:order-1">
            <h1
              style={{ ...fontSerif, fontWeight: 400 }}
              className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.04] tracking-[-0.02em]"
            >
              Where future leaders{" "}
              <span className="text-[#f97316]">begin.</span>
            </h1>
            <div className="mt-5 md:mt-6 space-y-3 md:space-y-4 max-w-xl">
              <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                JAMUN — the Junior Assembly of the Model United Nations —
                creates accessible, high-impact academic competitions for
                students in grades 5–8.
              </p>
              <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                Through Model UN, Mock Trial, and Mathletes, students sharpen
                the communication, analytical thinking, and leadership skills
                that prepare them for success in school, college, and beyond.
              </p>
              <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                We are a{" "}
                <strong className="font-semibold text-neutral-900">
                  fully volunteer-run nonprofit
                </strong>
                , and every contribution directly funds student programs,
                educator support, and opportunities for young delegates to
                thrive.
              </p>
            </div>
          </div>
          <div className="md:col-span-5 order-1 md:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={PHOTOS.hero}
                alt="JAMUN delegates at a conference"
                fill
                className="object-cover"
                style={{ objectPosition: "40% 35%" }}
                sizes="(min-width: 768px) 40vw, 100vw"
                priority
              />
            </div>
          </div>
        </section>

        {/* ───── Stat band ───── */}
        <section className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 py-6 md:py-7 border-y border-neutral-200">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div
                style={{ ...fontHeading, fontWeight: 600 }}
                className="text-[2.25rem] md:text-[2.75rem] leading-none tracking-tight text-[#0a0a0a]"
              >
                {s.value}
              </div>
              <div className="mt-2 text-[10px] md:text-[11px] uppercase tracking-[0.13em] text-neutral-600">
                {s.label}
              </div>
            </div>
          ))}
        </section>

        {/* ───── Programs ───── */}
        <section className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
          {PROGRAMS.map((p) => (
            <div key={p.name} className="flex flex-col">
              <div
                style={{ ...fontHeading, fontWeight: 600, color: p.color }}
                className="text-lg md:text-xl leading-tight tracking-tight mb-2"
              >
                {p.name}
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden mb-3">
                <Image
                  src={p.photo}
                  alt={`${p.name} program`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 30vw, 100vw"
                />
              </div>
              <p className="text-sm md:text-[15px] text-neutral-700 leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </section>

        {/* ───── Pillars: built for every student ───── */}
        <section className="mt-10 md:mt-14">
          <h2
            style={{ ...fontSerif, fontWeight: 400 }}
            className="text-2xl md:text-3xl lg:text-[2.25rem] leading-tight tracking-tight mb-6 md:mb-8"
          >
            Built for every student.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-7">
            {PILLARS.map((p) => (
              <div key={p.title} className="flex flex-col">
                <IconTile
                  icon={p.icon}
                  color={p.color}
                  size="sm"
                  className="mb-3"
                />
                <div
                  style={{ fontWeight: 600 }}
                  className="text-[15px] md:text-base leading-snug text-neutral-900 mb-1"
                >
                  {p.title}
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ───── Pipeline panel ───── */}
        <section className="mt-10 md:mt-14 bg-[#397bce] text-white px-6 md:px-10 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8">
          <div className="flex items-center gap-4 flex-shrink-0">
            <div
              style={{ ...fontSerif, fontWeight: 400 }}
              className="text-2xl md:text-[1.85rem] leading-[1.15] max-w-[12rem]"
            >
              From delegate to{" "}
              <span className="text-[#ffd9a8]">leader.</span>
            </div>
            <ArrowRight
              className="hidden md:block w-6 h-6 text-[#ffd9a8] shrink-0"
              aria-hidden
            />
          </div>
          <p className="text-sm md:text-[15px] leading-relaxed text-white/95 flex-1">
            After graduating middle school, many JAMUN delegates return as{" "}
            <strong className="font-semibold text-white">
              volunteer staff
            </strong>{" "}
            — running conferences, mentoring younger students, and leading
            committees. Our alumni go on to{" "}
            <strong className="font-semibold text-white">
              top colleges and careers across the country
            </strong>
            , building on a head start that began in middle school.
          </p>
        </section>

        {/* ───── Quote ───── */}
        <section className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-7 items-center">
          <div className="sm:col-span-3 md:col-span-2">
            <div className="relative aspect-square w-24 sm:w-full overflow-hidden">
              <Image
                src={PHOTOS.quote}
                alt=""
                fill
                className="object-cover"
                sizes="20vw"
              />
            </div>
          </div>
          <div className="sm:col-span-9 md:col-span-10">
            <blockquote
              style={{ ...fontSerif, fontWeight: 400 }}
              className="text-lg md:text-2xl leading-[1.32] text-[#0a0a0a]"
            >
              <span className="text-[#9333ea] opacity-70">&ldquo;</span>
              Our kids have never been exposed to anything like this — and now,
              thanks to you, they can see themselves as quite literally having
              a seat at the table. For them, it is life-changing.
              <span className="text-[#9333ea] opacity-70">&rdquo;</span>
            </blockquote>
            <div className="mt-3 text-[11px] md:text-xs uppercase tracking-[0.14em] text-neutral-500">
              Blake MacDonald · Middle School ESL Teacher
            </div>
          </div>
        </section>

        {/* ───── Trust footer ───── */}
        <footer className="mt-10 md:mt-14 pt-5 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="text-[10px] md:text-[11px] uppercase tracking-[0.13em] text-neutral-600">
            100% Volunteer-Run · Tax-Deductible · EIN on Request
          </div>
          <div className="text-[10px] md:text-[11px] uppercase tracking-[0.13em] text-neutral-600">
            jamun.org · contact@jamun.org
          </div>
        </footer>
      </article>
    </div>
  );
}
