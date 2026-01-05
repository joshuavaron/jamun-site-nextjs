# JAMUN Website Development Guide

**JAMUN** (Junior Assembly of the Model United Nations) | 501(c)(3) nonprofit | https://jamun.org
**Mission:** Empowering middle school students (grades 5-8) through Model UN, Mock Trial, and Mathletes.
**Brand:** Professional, warm, inviting. 100% youth-led. Motto: "Make Academics Fun"

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first config in `globals.css`, no tailwind.config)
- **next-intl** for i18n (`en` default, `es` at `/es`, `zh` at `/zh`)
- **Framer Motion** for animations
- **MDX** with gray-matter frontmatter for content
- **lucide-react** for icons

## Project Structure

```
src/
├── app/
│   ├── globals.css              # Tailwind theme, brand colors
│   ├── [locale]/                # All routes (en default, /es for Spanish)
│   │   ├── layout.tsx           # Header, Footer wrapper
│   │   ├── page.tsx             # Homepage
│   │   ├── error.tsx            # Error boundary
│   │   ├── modelun/committees/[slug]/  # Dynamic committee pages
│   │   ├── modelun/resources/[slug]/   # Dynamic resource pages
│   │   └── blog/[slug]/         # Dynamic blog posts
├── components/
│   ├── ui/                      # Button, Card, Section, Badge, BlogCard, AnimatedNumber, SearchDropdown
│   ├── sections/                # HeroSection, StatsSection, FAQSection, etc.
│   ├── layout/                  # Header, Footer, LayoutWrapper
│   └── mdx/                     # MDXComponents (Callout, ImageGallery)
├── i18n/                        # routing.ts, request.ts, navigation.ts
├── lib/                         # blog.ts, committees.ts, resources.ts, structured-data.ts, utils.ts, animations.ts, colors.ts
└── config/site.ts               # Site metadata, navigation, SEO keywords
content/                         # MDX files: blog/, committees/, modelun-resources/
messages/                        # en.json, es.json, zh.json translations
```

## Key Patterns

### Imports
```typescript
import { Button, Section, SectionHeader, Card, Badge } from '@/components/ui';
import { HeroSection, StatsSection } from '@/components/sections';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';  // Use for locale-aware links
import { useTranslations } from 'next-intl';  // Client components
import { getTranslations } from 'next-intl/server';  // Server components
```

### Translations
```typescript
// Server: const t = await getTranslations('Namespace');
// Client: const t = useTranslations('Namespace');
t('key')  // Simple
t('key', { name: 'value' })  // With variables
```

### Animation (Framer Motion)
Use shared animations from `@/lib/animations` for consistency:
```typescript
import { fadeInUp, fadeInUpLarge, staggerContainer, defaultViewport, hoverLift, hoverScale } from '@/lib/animations';

// Entry animation (preferred)
<motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUp}>

// Staggered children
<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={defaultViewport}>
  {items.map(item => <motion.div key={item.id} variants={fadeInUp} />)}
</motion.div>

// Hover (use shared constants)
whileHover={hoverLift}   // { y: -4 } for cards
whileHover={hoverScale}  // { scale: 1.02 } for images
```

### Content Loading
```typescript
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { getAllCommittees, getCommitteeBySlug } from '@/lib/committees';
import { getAllResources, getResourceBySlug } from '@/lib/resources';

// Static generation
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}
```

## Brand Colors (defined in globals.css)

| Tailwind Class | Hex | Usage |
|----------------|-----|-------|
| `jamun-blue` | #397bce | Primary brand, links, buttons |
| `jamun-orange` | #f97316 | CTAs (Donate), accents |
| `purple-600` | - | Secondary accent, gradients |
| `warm-white` / `warm-gray` | #fafafa / #f5f5f4 | Backgrounds (avoid pure white) |

### Shared Color Utilities
Use `@/lib/colors` for consistent program and category colors:
```typescript
import { programColors, getCategoryColors, audienceColors } from '@/lib/colors';

// Program colors (Model UN, Mock Trial, Mathletes)
programColors.modelUN.accent     // "bg-jamun-blue"
programColors.modelUN.text       // "text-jamun-blue"
programColors.mockTrial.accent   // "bg-purple-600"
programColors.mathletes.accent   // "bg-emerald-600"

// Blog/content category colors
const { bg, text } = getCategoryColors("Tips & Tricks");  // Returns { bg, text } with fallback

// Audience colors (students, parents, teachers)
audienceColors.students.accent   // "bg-jamun-blue"
```

## Design Principles

**DO:** Rounded corners (`rounded-xl`, `rounded-2xl`), generous padding (`py-16 md:py-20`), gradient blobs for warmth, real student photos, gentle fade-in animations

**DON'T:** Pure white backgrounds, sharp corners, cramped spacing, heavy shadows, fast animations

### Hero Pattern (subpages)
```typescript
<section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50 min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20">
  {/* Decorative blobs */}
  <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
```

### Dark Section (stats)
```typescript
<section className="bg-[#0f172a] py-16 md:py-20 relative overflow-hidden">
```

## Content Frontmatter

**Blog:** `title`, `excerpt`, `coverImage`, `category`, `author: {name}`, `publishedAt`, `featured`
**Committee:** `name`, `abbreviation`, `category`, `topic`, `level`, `delegationSize`, `executives`, `countries`
**Resource:** `title`, `description`, `category`, `difficulty`, `readTime`

## Messaging

- **Resources/guides:** FREE
- **Conferences:** "low-cost" or "affordable" (not free)
- **Grants:** "up to 100% of conference costs"
- **Overall:** "Free resources and low-cost conferences with grants available"

## Commands

```bash
npm run dev      # Development
npm run build    # Production build
npm run lint     # Lint
npx tsc --noEmit # Type check
```

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/config/site.ts` | Site metadata, nav, SEO |
| `src/app/globals.css` | Tailwind theme, colors |
| `src/i18n/routing.ts` | Locale config |
| `src/lib/animations.ts` | Shared Framer Motion variants |
| `src/lib/colors.ts` | Shared color schemes for programs/categories |
| `src/lib/structured-data.ts` | JSON-LD schemas |
| `messages/en.json` | English translations |

## Stats (update as needed)

500+ Students | 30+ Schools | 80+ Volunteers | $70K+ Raised
