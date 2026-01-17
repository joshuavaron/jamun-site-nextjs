# JAMUN Website Development Guide

**JAMUN** (Junior Assembly of the Model United Nations) | 501(c)(3) nonprofit | https://jamun.org

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build (run before PRs) |
| `npm run lint` | Lint check |
| `npx tsc --noEmit` | Type check |

## Tech Stack
Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + next-intl + Framer Motion + MDX

## Project Structure
```
src/app/[locale]/     # Pages (i18n routes)
src/components/       # ui/, sections/, layout/, mdx/, resources/
src/lib/              # Utilities: animations.ts, colors.ts, blog.ts, etc.
src/config/site.ts    # Navigation, metadata, SEO
content/              # MDX: blog/, committees/, modelun-resources/
messages/             # i18n: en.json, es.json, zh.json
```

## Essential Patterns

### Imports
```typescript
import { Button, Section, Card, Badge } from '@/components/ui';
import { fadeInUp, staggerContainer, defaultViewport } from '@/lib/animations';
import { programColors, getCategoryColors } from '@/lib/colors';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
```

### Animations (ALWAYS use shared variants)
```typescript
<motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUp}>
```

### Translations
```typescript
// Server: const t = await getTranslations('Namespace');
// Client: const t = useTranslations('Namespace');
```

## Brand Guidelines
- Colors: `jamun-blue` (#397bce), `jamun-orange` (#f97316), `purple-600`
- Backgrounds: `warm-white`, `warm-gray` (avoid pure white)
- Corners: `rounded-xl`, `rounded-2xl`
- Spacing: `py-16 md:py-20` for sections

## Messaging
- Resources: "FREE"
- Conferences: "low-cost" or "affordable"
- Grants: "up to 100% of conference costs"

## Domain-Specific Rules
See `.claude/rules/` for detailed guidance:
- `components.md` - Component patterns, animation usage
- `pages.md` - Page structure, metadata, hero patterns
- `content.md` - MDX frontmatter, translations
- `utilities.md` - lib/ and config/ conventions
- `mdx.md` - MDXComponents.tsx architecture
- `testing.md` - Verification checklist

## Development Notes
See `notes.md` for:
- Known issues and tech debt
- Refactoring opportunities
- Architecture decisions
- Recent changes log

## Stats
500+ Students | 30+ Schools | 80+ Volunteers | $70K+ Raised
