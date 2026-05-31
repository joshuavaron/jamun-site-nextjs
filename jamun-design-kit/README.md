# Design Kit

A drop-in design system extracted from the JAMUN website — copy this folder into
a new repo and an assistant (or you) can build a site that looks like jamun.org
out of the box. White-canvas editorial layout, warm serif display type,
full-bleed photo/text spreads, flat brand color.

## What's inside

```
jamun-design-kit/
├── README.md            ← you are here
├── SETUP.md             ← how to wire it into a fresh or existing Next.js repo
├── DESIGN_SYSTEM.md     ← the full design language (typography, color, layout, primitives)
├── CLAUDE.md            ← drop-in guide so Claude Code follows the system in the new repo
├── next.config.ts       ← allows demo (picsum) images for the example page
├── public/
│   └── fonts/           ← self-hosted Inter + Outfit woff2 (ready to use)
└── src/
    ├── app/
    │   ├── globals.css  ← Tailwind v4 import + @font-face + brand tokens
    │   ├── layout.tsx   ← example root layout (font preloads + Typekit serif)
    │   └── page.tsx     ← WORKING example landing page using every primitive
    ├── lib/
    │   ├── typography.ts ← font families + heading/body scales
    │   ├── colors.ts     ← brand palette + accent cycle (raw hex)
    │   ├── animations.ts ← shared Framer Motion variants
    │   └── utils.ts      ← cn() class-merge helper
    └── components/
        ├── ui/           ← Container, Heading, PillButton, ArrowLink, IconTile, AnimatedNumber
        └── sections/     ← DiagonalSpread, TestimonialSpread, SectionIntro, FaqAccordion
```

## 30-second start

```bash
npx create-next-app@latest my-site --typescript --tailwind --app --src-dir --import-alias "@/*"
cd my-site
npm install framer-motion lucide-react clsx tailwind-merge
# copy this kit's src/, public/fonts/, globals.css, layout.tsx, page.tsx, next.config.ts over
npm run dev
```

Full steps (including the one font you must configure — the Typekit serif) are in
**`SETUP.md`**. The design language is documented in **`DESIGN_SYSTEM.md`**.

## Notes

- Components use `next/link` (no i18n coupling) so the kit works in any Next.js
  App Router project.
- The example `page.tsx` pulls demo photos from picsum so it renders immediately;
  swap in your own images and remove the `remotePatterns` entry in `next.config.ts`.
- Two fonts (Inter, Outfit) are self-hosted and included. The third (Freight Text
  Pro, the serif) loads via Adobe Typekit — you'll need your own kit or a
  substitute. See `SETUP.md → Fonts`.
