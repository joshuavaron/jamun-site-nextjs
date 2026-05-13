// Typography system for the JAMUN site.
//
// Three font families are used across the design:
//   - serif:    Freight Text Pro    (display headings, section titles, quotes)
//   - heading:  Outfit               (sans-serif numerals, sans-serif card titles)
//   - body:     Inter                (paragraphs, UI labels, captions)
//
// Use the style objects below with React `style={...}` when you need a single
// inline override, or the class-string presets when applying via `className`.

import type { CSSProperties } from "react";

// ──────── Font family style objects (use with style={...}) ────────

export const fontSerif: CSSProperties = {
  fontFamily: '"freight-text-pro", "Times New Roman", serif',
};

export const fontHeading: CSSProperties = {
  fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif",
};

export const fontBody: CSSProperties = {
  fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
};

// ──────── Heading size presets ────────
// Tailwind class strings that produce the responsive type scale.
// Pair with one of the font style objects above (default is serif for
// display/section/panel, sans for program/skill — see Heading.tsx).

export const headingSize = {
  /** Hero H1 — biggest. Used once per page at the top. */
  hero: "text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[1.05] tracking-[-0.02em]",
  /** Final-CTA H2 — slightly tighter leading than hero. */
  ctaHero: "text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-tight",
  /** Section H2 — the workhorse section title. */
  section: "text-[clamp(2.2rem,4.2vw,3.5rem)] leading-[1.1] tracking-tight",
  /** Colored-panel H3 — text inside a full-bleed colored panel. */
  panel: "text-[clamp(1.8rem,3.4vw,2.75rem)] leading-[1.15] tracking-tight",
  /** Card title H3 — large cards (audience / who-we-serve). */
  cardLg: "text-2xl md:text-[1.7rem] tracking-tight leading-[1.2]",
  /** Card title H3 — standard photo cards (program). Uses sans (Outfit). */
  card: "text-2xl md:text-3xl tracking-tight leading-[1.15]",
  /** Small heading H3 — pull-quote sub-section. */
  sub: "text-xl md:text-2xl tracking-tight leading-[1.25]",
  /** Compact card title — skills grid, dense cards. Uses sans (Inter). */
  micro: "text-lg leading-snug",
} as const;

export type HeadingSize = keyof typeof headingSize;

// ──────── Body text presets ────────

export const bodySize = {
  /** Default body paragraph. */
  base: "text-base text-neutral-700 leading-relaxed",
  /** Larger lead paragraph — section intros, hero subheads. */
  lead: "text-base md:text-lg text-neutral-700 leading-relaxed",
  /** Slightly larger still — for quote panels with white text. */
  quote: "text-lg md:text-xl leading-relaxed",
  /** Compact body — small cards, captions. */
  compact: "text-sm md:text-base text-neutral-700 leading-relaxed",
  /** Tiny body — skill descriptions, footnotes. */
  micro: "text-sm text-neutral-600 leading-relaxed",
} as const;

export type BodySize = keyof typeof bodySize;
