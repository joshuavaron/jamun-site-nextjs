# Design System

The visual language this kit reproduces: a **white-canvas, editorial layout**
with a warm serif for display type, full-bleed two-column photo/text "spreads"
that break the white rhythm, and flat brand color (no gradients, no drop
shadows). Use these primitives and patterns so the look stays coherent as the
site grows.

Everything imports from two barrels:

```ts
import { Container, Heading, PillButton, ArrowLink, IconTile, AnimatedNumber } from "@/components/ui";
import { DiagonalSpread, TestimonialSpread, SectionIntro, FaqAccordion } from "@/components/sections";
import { fontSerif, fontHeading, fontBody, headingSize, bodySize } from "@/lib/typography";
import { palette, accentCycle } from "@/lib/colors";
import { cn } from "@/lib/utils";
```

---

## 1. Typography

Three font families, each with one job:

| Family            | Constant      | When to use                                                        |
| ----------------- | ------------- | ------------------------------------------------------------------ |
| Freight Text Pro  | `fontSerif`   | Display headings, section titles, panel headings, editorial quotes |
| Outfit (sans)     | `fontHeading` | Stat numerals, sans-serif card titles                              |
| Inter (sans)      | `fontBody`    | All body copy, UI labels, attributions, captions, micro headings   |

### Heading scale

Use the `Heading` component with a `size` variant. The variant drives size,
leading, tracking, and the default font/weight pairing.

| Variant   | Default tag | Default font      | Scale (clamp / fixed)            | Where it appears                              |
| --------- | ----------- | ----------------- | -------------------------------- | --------------------------------------------- |
| `hero`    | h1          | serif (400)       | `clamp(2.25rem, 5.2vw, 4.75rem)` | The single H1 on a page (hero)                |
| `ctaHero` | h2          | serif (400)       | `clamp(2.5rem, 5vw, 4.5rem)`     | Final-CTA spread heading                      |
| `section` | h2          | serif (400)       | `clamp(2.2rem, 4.2vw, 3.5rem)`   | Every standard section title                  |
| `panel`   | h3          | serif (400)       | `clamp(1.8rem, 3.4vw, 2.75rem)`  | H3 inside a full-bleed colored panel          |
| `cardLg`  | h3          | serif (400)       | `text-2xl md:text-[1.7rem]`      | Headings on the 3-up "who we serve" cards     |
| `card`    | h3          | sans-Outfit (600) | `text-2xl md:text-3xl`           | Photo-card titles (programs grid)             |
| `sub`     | h3          | serif (400)       | `text-xl md:text-2xl`            | Pull-quote sub-section ("Why this matters")   |
| `micro`   | h3          | sans-Inter (600)  | `text-lg`                        | Compact-card titles (skills grid)             |

```tsx
import { Heading } from "@/components/ui";

<Heading size="section">Three paths to academic excellence.</Heading>
<Heading size="card" className="mb-3">{program.name}</Heading>
<Heading size="panel" as="blockquote">{quote}</Heading>
```

Override the tag (`as`), `font`, or `weight` per call when needed.

### Body scale

| Preset    | Tailwind classes                                        | Use                                  |
| --------- | ------------------------------------------------------- | ------------------------------------ |
| `base`    | `text-base text-neutral-700 leading-relaxed`            | Standard body paragraph              |
| `lead`    | `text-base md:text-lg text-neutral-700 leading-relaxed` | Section intro subhead, hero subhead  |
| `quote`   | `text-lg md:text-xl leading-relaxed`                    | Testimonial quotes (color via panel) |
| `compact` | `text-sm md:text-base text-neutral-700 leading-relaxed` | Card body copy                       |
| `micro`   | `text-sm text-neutral-600 leading-relaxed`              | Skill-card body, footnotes           |

```tsx
import { fontBody, bodySize } from "@/lib/typography";
<p style={fontBody} className={bodySize.lead}>...</p>
```

**When to break the system:** the presets cover a landing page. If a section
legitimately needs a one-off scale, override with `className` on `Heading`/`p`
and leave the presets alone — don't add a new variant for a single use.

---

## 2. Color

The design uses **raw hex at the call site** (`text-[#397bce]`,
`panelBg="#f97316"`) rather than Tailwind color utilities, so colors stay
visible where they're used. `src/lib/colors.ts` is the source of truth.

### Brand palette

| Role                | Hex       | Notes                                          |
| ------------------- | --------- | ---------------------------------------------- |
| Blue (primary)      | `#397bce` | Buttons, links, blue testimonial panel         |
| Blue (hover/dark)   | `#2a5fa3` | Primary-button hover                            |
| Orange (accent)     | `#f97316` | Highlights, orange testimonial panel, Donate   |
| Orange (hover/dark) | `#ea580c` | Accent-button hover                            |
| Purple (theme)      | `#9333ea` | Purple testimonial panel                       |
| Emerald (theme)     | `#10b981` | Emerald testimonial panel                      |
| Ink                 | `#0a0a0a` | Body text on light backgrounds                 |
| Slate (footer/dark) | `#0f172a` | Footer / dark sections                         |

### Per-card accent cycle

Skill / feature grids cycle through `accentCycle` so a long grid stays varied:

```
#397bce  #9333ea  #10b981  #f97316
#0ea5e9  #eab308  #ec4899  #f97316
```

### Surfaces

- **Default page background:** plain `bg-white`. White canvas with full-bleed
  colored panels for accent — no light-gray section alternation.
- **Footer / dark sections:** `bg-[#0f172a]`.
- **Header (if you build one):** `bg-white/85` + `backdrop-blur-xl` +
  `border-b border-black/5`.

### Don't

- No gradient utilities (`from-`/`via-`/`to-`) and no blurred decorative blobs.
  The design is flat color.
- No drop shadows for depth on cards.

---

## 3. Layout

### Container

All content sections wrap their inner block in `<Container>`:

```tsx
<section className="bg-white">
  <Container className="py-14 md:py-20">...</Container>
</section>
```

- Max width `1500px`, gutter `px-6 md:px-16 lg:px-24`.
- `narrow` prop tightens to `max-w-3xl` (FAQ / prose blocks).

Full-bleed spreads (`DiagonalSpread`, `TestimonialSpread`) do **not** wrap in
`Container` — they take the full viewport width. Their text panel uses
asymmetric padding so the panel's **outer** text edge lands on the same rail as
a `<Container>` section at every viewport. Keeping that rail aligned across
spread and Container sections is what makes the page's right edge feel rhythmic.

### Vertical rhythm

| Use case                              | Padding                                       |
| ------------------------------------- | --------------------------------------------- |
| Standard content section              | `py-14 md:py-20`                              |
| Compact content section               | `py-12 md:py-16`                             |
| Spread panel (in-view)                | `py-12 md:py-16` (default in `DiagonalSpread`) |
| Spread panel (full-bleed hero / CTA)  | `py-16 md:py-0` (override via `panelClassName`) |

### Section intro

```tsx
<SectionIntro
  title="Built for students, families, and schools."
  subtitle="A line that introduces the section."
  spacing="loose"   // "tight" | "default" | "loose"
  maxWidth="3xl"    // "2xl" | "3xl" | "4xl"
/>
```

### Two-column spreads — `DiagonalSpread`

The workhorse for hero, stats, quote, and final-CTA. One column is a photo, the
other a text panel.

```tsx
<DiagonalSpread
  photoSide="right"          // "left" | "right"
  photoSrc="/images/hero.jpg"
  photoAlt="..."
  photoPriority              // LCP candidate (hero only)
  clip="diagonal"            // "diagonal" | "none"
  minHeight="min-h-[72svh]"
  panelBg="#f97316"          // optional
  panelText="#ffffff"        // optional
  panelClassName="py-16 md:py-0"
  objectPosition="40% 35%"   // shift crop focus
  animation="entry"          // "entry" (above fold) | "inView"
>
  <Heading size="hero">...</Heading>
</DiagonalSpread>
```

- `clip="diagonal"` cuts the photo on a diagonal so it bleeds into the panel —
  pair with a **white** panel for one continuous canvas.
- `clip="none"` keeps the photo rectangular — use when the panel is a saturated
  brand color and the rectangular divider IS the contrast.
- The diagonal only applies at `md+` (two-column). On mobile the photo stacks
  above the panel as a clean rectangle.

### Themed quote spread — `TestimonialSpread`

Wraps `DiagonalSpread` with a serif H3 + blockquote + attribution against a
brand color. Reach for this whenever you need an editorial pull-quote on color
rather than rebuilding by hand.

```tsx
<TestimonialSpread
  bg="#397bce"
  photoSide="right"
  photoSrc="/images/students.jpg"
  photoAlt="..."
  heading="Educators see the care we put in."
  quote="This was something they were passionate about..."
  attribution="— An educator"
/>
```

### Card grids

| Pattern        | Cols       | Gap                | Composition                                                       |
| -------------- | ---------- | ------------------ | ----------------------------------------------------------------- |
| Photo card     | 3          | `gap-8 md:gap-10`  | Photo (4:3) → `Heading size="card"` → body → `PillButton`         |
| Audience card  | 3          | `gap-10 md:gap-14` | `IconTile size="md"` → `Heading size="cardLg"` → body → `ArrowLink` |
| Skill card     | `2 lg:4`   | `gap-6 md:gap-8`   | `IconTile size="sm"` → `Heading size="micro"` → micro body        |

All cards animate in on scroll with an index-based stagger (see §5).

---

## 4. Primitives

| Component       | Import            | Purpose                                                       |
| --------------- | ----------------- | ------------------------------------------------------------- |
| `Container`     | `@/components/ui` | 1500px width cap + responsive gutter                          |
| `Heading`       | `@/components/ui` | Typography component with `size` variants                     |
| `PillButton`    | `@/components/ui` | Rounded-full CTA. Tones: `primary`/`outline`/`accent`/`custom` |
| `ArrowLink`     | `@/components/ui` | Inline text link with a `→` that slides on hover              |
| `IconTile`      | `@/components/ui` | Tinted rounded square with a colored Lucide icon             |
| `AnimatedNumber`| `@/components/ui` | Counts up to a value when scrolled into view (stats)          |

### PillButton

```tsx
<PillButton href="/register" withArrow>Register Now</PillButton>
<PillButton href="/programs" tone="outline">See Programs</PillButton>
<PillButton href="/donate" tone="accent">Donate</PillButton>
<PillButton href="/programs" tone="custom" color="#9333ea" size="md" withArrow>Learn More</PillButton>
```

| Size | Padding / type            | Use                                 |
| ---- | ------------------------- | ----------------------------------- |
| `sm` | `px-4 py-1.5 text-[13px]` | Header nav pills                    |
| `md` | `px-6 py-3 text-[14px]`   | In-card CTAs ("Learn More")         |
| `lg` | `px-7 py-3.5 text-[17px]` | Hero / final-CTA / standalone (default) |

Renders a `next/link` when given `href`, or a `<button>` when given `onClick`.

### ArrowLink

```tsx
<ArrowLink href="/resources" color="#397bce">Get free resources</ArrowLink>
<ArrowLink external="mailto:hello@example.org">Get in touch</ArrowLink>
```

The arrow's gap expands `gap-2 → gap-3` on hover — a subtle shift, not a translate.

### IconTile

```tsx
<IconTile icon={GraduationCap} color="#397bce" size="md" />  {/* 56px, icon 28 */}
<IconTile icon={Mic} color="#397bce" size="sm" />            {/* 48px, icon 24 */}
```

Background is the `color` at 10% opacity (`#${hex}1a`); the icon takes full color.

---

## 5. Animation

All reusable variants live in `src/lib/animations.ts`. Sections are often
choreographed with inline motion props (varying delays, stagger by index), but
**never define local variants** — if a pattern repeats, add it to `animations.ts`.

**Card grid (staggered):**
```tsx
initial={{ opacity: 0, y: 18 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ delay: i * 0.08, duration: 0.7 }}
```

**Stats / dense list (tighter):**
```tsx
transition={{ delay: i * 0.08, duration: 0.6 }}
```

**Hero text panel (above the fold — `animate`, not `whileInView`):**
```tsx
initial={{ opacity: 0, x: -16 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.9 }}
```

`DiagonalSpread` picks the hero-vs-in-view animation via its `animation` prop.

**Hover/micro:** arrow links shift their gap; pill buttons shift background
color only. No card hover-lifts — the design relies on motion-on-entry, not depth.

---

## 6. Page composition recipe

1. **Hero** — `<DiagonalSpread animation="entry">` with `Heading size="hero"`, a
   lead paragraph, and two `PillButton`s.
2. **Content sections**, each:
   `<section className="bg-white"><Container className="py-14 md:py-20"><SectionIntro/> …grid… </Container></section>`
3. **An interleaved full-bleed spread** (`DiagonalSpread` or `TestimonialSpread`)
   every 2–3 sections to break the white rhythm.
4. **FAQ** — `<FaqAccordion items={FAQS} />` inside a `<Container narrow>`.
5. **Final CTA** — `<DiagonalSpread clip="none">` with `Heading size="ctaHero"`.

`src/app/page.tsx` is a complete, working reference of this recipe — read it
alongside this doc.

---

## 7. Don'ts

- Don't introduce a new font family. Change weight or size, not family.
- Don't use Tailwind gradient utilities — the design is flat color.
- Don't define inline animation variants for patterns that belong in `animations.ts`.
- Don't wrap a `DiagonalSpread` / `TestimonialSpread` in `<Container>` — they're full-bleed by design.
- Don't add per-card hover lifts (`hover:-translate-y-1`).
- Don't reach for pure-white-vs-gray section alternation — accent comes from the colored spreads.
