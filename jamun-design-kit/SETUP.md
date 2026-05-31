# Setup — dropping this kit into a new repo

The kit targets **Next.js (App Router) + React 19 + TypeScript + Tailwind CSS v4**.
Two ways to use it:

- **A) Start a fresh app and merge the kit in** (recommended)
- **B) Copy the kit into an existing Next.js + Tailwind v4 app**

---

## A) Fresh app

```bash
# 1. Create the app (App Router, TS, Tailwind, src/ dir, @/* alias)
npx create-next-app@latest my-site \
  --typescript --tailwind --app --src-dir --import-alias "@/*" --eslint

cd my-site

# 2. Install the kit's runtime dependencies
npm install framer-motion lucide-react clsx tailwind-merge

# 3. Copy the kit's source over the generated files
#    (run from the directory that contains this kit folder)
cp -r jamun-design-kit/src/lib       my-site/src/lib
cp -r jamun-design-kit/src/components my-site/src/components
cp    jamun-design-kit/src/app/globals.css my-site/src/app/globals.css
cp    jamun-design-kit/src/app/layout.tsx  my-site/src/app/layout.tsx
cp    jamun-design-kit/src/app/page.tsx    my-site/src/app/page.tsx
cp -r jamun-design-kit/public/fonts   my-site/public/fonts
cp    jamun-design-kit/next.config.ts  my-site/next.config.ts   # demo image host

# 4. Run it
npm run dev
```

Open http://localhost:3000 — you should see the example landing page rendered
in the design system, pulling demo photos from picsum.

> `create-next-app` with `--tailwind` already wires up Tailwind v4 and PostCSS.
> The kit's `globals.css` replaces the generated one (it `@import "tailwindcss"`
> at the top, then adds `@font-face` and theme tokens).

---

## B) Existing app

You need the App Router, the `@/*` → `./src/*` path alias, and Tailwind CSS v4.

1. **Deps:** `npm install framer-motion lucide-react clsx tailwind-merge`
2. **Copy** `src/lib/*` and `src/components/*` into your `src/`.
3. **Fonts:** copy `public/fonts/*` into your `public/`, then merge the
   `@font-face` blocks and `:root` / `@theme inline` tokens from this kit's
   `src/app/globals.css` into yours.
4. **Serif font:** add the Typekit `<link>` from this kit's `src/app/layout.tsx`
   `<head>` (see "Fonts" below).
5. **Path alias:** confirm `tsconfig.json` has:
   ```json
   { "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }
   ```
6. **Images:** the example page uses remote picsum photos — either swap them for
   local images or add the `remotePatterns` entry from this kit's `next.config.ts`.

---

## Dependencies

| Package | Why |
| --- | --- |
| `next`, `react`, `react-dom` | Framework (React 19, Next App Router) |
| `framer-motion` | All entry/scroll animations + the FAQ accordion |
| `lucide-react` | Icons inside `IconTile` (and the FAQ `+`) |
| `clsx` + `tailwind-merge` | The `cn()` class-merge helper |
| `tailwindcss` + `@tailwindcss/postcss` | Tailwind v4 (dev) |
| `typescript`, `@types/*` | Types (dev) |

---

## Fonts — important

The design uses **three** families:

| Family | How it loads | Notes |
| --- | --- | --- |
| **Inter** (body) | self-hosted woff2 in `public/fonts/` | included in the kit |
| **Outfit** (numerals, sans card titles) | self-hosted woff2 in `public/fonts/` | included in the kit |
| **Freight Text Pro** (serif display headings) | Adobe Typekit `<link>` in `layout.tsx` | **see below** |

The serif is what gives the design its editorial feel — it's used for the hero,
every section title, panel headings, and pull-quotes. The kit references the
original Typekit kit URL (`https://use.typekit.net/vxu0ezk.css`). For your own
site, pick **one**:

- **Reuse it** if you control that Adobe Fonts account (and add the new domain
  in the Typekit project's allowed domains).
- **Make your own kit** at fonts.adobe.com with *freight-text-pro*, then replace
  the URL in `src/app/layout.tsx`. (Keep the CSS family name
  `"freight-text-pro"` in `src/lib/typography.ts` so nothing else changes.)
- **Substitute a free serif.** Edit `fontSerif` in `src/lib/typography.ts` to a
  Google serif with similar warmth, e.g. *Fraunces*, *Source Serif 4*, or
  *Newsreader*, and load it in `layout.tsx`. Update the `"Times New Roman"`
  fallback too.

If the serif fails to load you'll see Times New Roman — that's the fallback, and
a signal the Typekit link needs attention.

---

## Verify

```bash
npm run dev          # should render the example page in the design system
npx tsc --noEmit     # types should pass
npm run build        # production build should succeed
```

Then start replacing `src/app/page.tsx` with your own content — see
`DESIGN_SYSTEM.md` for the patterns and `CLAUDE.md` so the assistant follows them.
