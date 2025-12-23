# CLAUDE.md - JAMUN Website Development Guide

This file provides guidance for Claude Code when working on the JAMUN (Junior Assembly of the Model United Nations) website.

## Project Overview

**Organization:** The Junior Assembly of the Model United Nations (JAMUN)
**Type:** 501(c)(3) nonprofit organization
**Mission:** Empowering middle school students (grades 5-8) through competitive academic programs including Model UN, Mock Trial, and Mathletes. Ultimately, our motto is "Make Academics Fun".

**Key Characteristics:**
- 100% youth-led and volunteer-run organization
- Target audience: Teachers, parents, school/district administrators
- Brand tone: Professional, warm, inviting, modern, and agile

## Tech Stack

### Core Framework
- **Next.js 14+** with App Router (`/app` directory)
- **TypeScript** for type safety
- **React 18+** for UI components

### Styling
- **Tailwind CSS** for utility-first styling
- **CSS Modules** for component-specific styles when needed
- **Framer Motion** for animations (subtle, professional animations)

### Development Approach
- **Primary development via Claude Code** (vibe coding)
- Static site initially, but architecture should support future backend integration
- Mobile-first responsive design

## Project Structure

```
jamun-site-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with navigation/footer
│   │   ├── page.tsx            # Homepage
│   │   ├── about/              # About page
│   │   ├── programs/           # Programs overview
│   │   ├── modelun/            # Model UN section
│   │   │   ├── page.tsx        # Model UN overview
│   │   │   ├── committees/     # Committees section
│   │   │   │   ├── page.tsx    # Committees listing
│   │   │   │   └── [slug]/     # Dynamic committee pages
│   │   │   └── resources/      # MUN resources section
│   │   │       ├── page.tsx    # Resources listing
│   │   │       └── [slug]/     # Dynamic resource pages
│   │   ├── mocktrial/          # Mock Trial details
│   │   ├── mathletes/          # Mathletes details
│   │   ├── donate/             # Donation page
│   │   ├── register/           # Registration page
│   │   ├── grants/             # Grants information
│   │   ├── leaderboards/       # Competition leaderboards
│   │   ├── blog/               # Blog section
│   │   │   ├── page.tsx        # Blog listing
│   │   │   └── [slug]/         # Dynamic blog posts
│   │   ├── privacy/            # Privacy policy
│   │   └── terms/              # Terms of service
│   ├── components/             # Reusable React components
│   │   ├── ui/                 # Base UI components (buttons, cards, etc.)
│   │   ├── layout/             # Layout components (header, footer, nav)
│   │   ├── sections/           # Page section components
│   │   └── common/             # Shared components
│   └── lib/                    # Utility functions and helpers
├── public/                     # Static assets
│   ├── images/                 # Conference photos, logos, graphics
│   │   ├── conferences/        # Photos from past conferences
│   │   ├── logos/              # JAMUN logos and branding
│   │   └── icons/              # Custom icons
│   └── fonts/                  # Custom fonts if needed
├── styles/                     # Global styles
│   └── globals.css             # Tailwind imports and global CSS
├── types/                      # TypeScript type definitions
└── config/                     # Site configuration
    └── site.ts                 # Site metadata, navigation, etc.
```

## Design System

### Brand Colors
```css
/* Primary - JAMUN Blue */
--jamun-blue: #397bce;        /* Primary brand color */
--jamun-blue-light: #5a9be0;  /* Lighter variant */
--jamun-blue-dark: #2a5fa3;   /* Darker variant */

/* Accent - Warm Orange (for CTAs that need to pop) */
--jamun-orange: #f97316;      /* Primary accent - buttons like Donate */
--jamun-orange-light: #fb923c; /* Hover state */
--jamun-orange-dark: #ea580c;  /* Active/pressed state */

/* Neutrals */
--warm-white: #fafafa;
--warm-gray: #f5f5f4;

/* Semantic */
--success-green: #22c55e;
--warning-amber: #f59e0b;
--error-red: #ef4444;
```

### Color Usage Guidelines
- **JAMUN Blue (#397bce):** Primary brand color for headers, links, primary buttons, and brand elements
- **Warm Orange (#f97316):** High-visibility CTAs (Donate button, urgent actions), accent highlights
- **Blue + Orange combo:** Creates strong visual contrast; use orange sparingly for maximum impact

### Extended Color Palette (for variety across sections)
Use these colors to create visual distinction between sections while maintaining warmth:
- **Purple (#7c3aed / purple-600):** Secondary accent for variety, gradients, and alternating section themes
- **Emerald (#10b981 / emerald-500):** Third accent color for success states, positive messaging, and variety
- **Amber (#f59e0b):** Warm accent for highlights and decorative elements

**Color Theming Pattern:** Sections can use different accent colors (blue, purple, emerald) while maintaining the warm, inviting feel. See WhyChooseSection and GallerySection for examples of color variety.

### Typography
- **Headings:** Semibold, clean sans-serif (Inter font via Google Fonts) - prefer `font-semibold` over `font-bold` for a softer feel
- **Body:** Readable, professional (Inter or system fonts)
- **Hierarchy:** Clear visual hierarchy with consistent sizing

### Typography Patterns
- **Gradient text for emphasis:** Use `bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent` for key words
- **Eyebrow text:** Uppercase, tracking-widest, small text in brand blue above section titles
- **Section titles:** text-3xl md:text-4xl lg:text-5xl font-semibold
- **Subtitles:** text-lg text-gray-600, max-w-2xl for readability

### Component Guidelines

#### Buttons
- Primary: Filled with brand color, rounded corners
- Secondary: Outlined variant
- All buttons should have hover/focus states with subtle animations

#### Cards
- Rounded corners (lg or xl)
- Subtle shadows
- Hover effects for interactive cards

#### Images
- **Priority:** Images are crucial for building trust and excitement
- Use Next.js `<Image>` component for optimization
- Include placeholder/blur effects during loading
- Alt text required for accessibility
- Prominent image galleries for conference photos

### Animation Guidelines
- **Subtle and professional** - never distracting
- Use Framer Motion for:
  - Fade-in on scroll
  - Gentle hover effects
  - Page transitions
  - Staggered list animations
- Respect `prefers-reduced-motion`

### Subpage Hero Pattern
For subpages (About, Programs, etc.), use this full-viewport hero pattern:
```tsx
<section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24">
  {/* Decorative gradient blobs */}
  <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
  <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-jamun-orange/10 to-pink-400/10 rounded-full blur-3xl -z-10" />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Text Content */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Badge */}
        <motion.span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-jamun-blue bg-jamun-blue/10 rounded-full border border-jamun-blue/20">
          <Sparkles className="w-4 h-4" />
          Page Category
        </motion.span>

        {/* Heading with gradient */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
          Main Headline{" "}
          <span className="bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent">
            Highlighted Text
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
          Subtitle description goes here.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/path" size="lg" className="group">
            Primary Action
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button href="/other" variant="outline" size="lg">
            Secondary Action
          </Button>
        </div>
      </motion.div>

      {/* Image/Visual Side */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
        {/* Content varies: image, card grid, etc. */}
      </motion.div>
    </div>
  </div>
</section>
```

### Animation Patterns

#### Standard Entry Animation
Use this pattern for most elements that should animate in on scroll:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
```

#### Staggered List Animation
For grids and lists of cards/items:
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

#### Hover Effects
- **Cards:** `whileHover={{ y: -4 }}` or `whileHover={{ scale: 1.02 }}` with shadow increase
- **Images:** `whileHover={{ scale: 1.05 }}` for subtle zoom
- **Buttons:** Built into Button component, adds translateX for arrow icons
- **Interactive elements:** 0.3s transition duration for responsiveness

#### Number Counter Animation
For stats/impact numbers, animate from 0 to target value over 1.4-2.6s with easeOutQuart easing.

### Dark Stats Section Pattern
For impact statistics with animated counters, use this dark section pattern:
```tsx
<section className="bg-[#0f172a] py-16 md:py-20 relative overflow-hidden">
  {/* Gradient overlays for depth */}
  <div className="absolute inset-0 bg-gradient-to-br from-jamun-blue/10 via-transparent to-purple-900/10" />
  <div className="absolute top-0 left-1/4 w-96 h-96 bg-jamun-blue/5 rounded-full blur-3xl" />
  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Section header */}
    <motion.div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Section Title</h2>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">Supporting description.</p>
    </motion.div>

    {/* Stats grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          whileHover={{ scale: 1.02 }}
          className="relative bg-[#1e293b]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 hover:border-jamun-blue/50 transition-all duration-300 text-center"
        >
          {/* Hover glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-jamun-blue/0 to-purple-600/0 group-hover:from-jamun-blue/5 group-hover:to-purple-600/5 transition-all duration-300" />
          <div className="relative z-10">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-jamun-blue-light to-purple-400 bg-clip-text text-transparent mb-3">
              {stat.value}
            </div>
            <div className="text-sm md:text-base text-gray-400 font-medium">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

## Responsive Design

### Breakpoints (Tailwind defaults)
- `sm`: 640px (large phones)
- `md`: 768px (tablets)
- `lg`: 1024px (laptops)
- `xl`: 1280px (desktops)
- `2xl`: 1536px (large screens)

### Mobile-First Approach
- Design for mobile first, then enhance for larger screens
- Touch-friendly tap targets (min 44px)
- Hamburger menu for mobile navigation
- Stack layouts on small screens
- Test on real devices when possible

## Page Templates

### Landing Pages
Each landing page should include:
1. **Hero Section** - Strong headline, subheadline, CTA, and imagery
2. **Social Proof** - Stats, testimonials, partner logos
3. **Value Proposition** - Clear benefits/features
4. **Call to Action** - Clear next steps

### Homepage Section Flow (Reference)
The homepage demonstrates an ideal warm, inviting page structure:
1. **HeroSection** - Bold entry with gradient background, decorative blobs, two CTAs
2. **StatsSection** - Dark background with animated counters for social proof
3. **WhoWeServeSection** - Three audience cards with colored icon badges
4. **ProgramsSection** - Full-image cards with overlay text and hover effects
5. **WhyChooseSection** - Alternating image/text layout with bullet points
6. **GallerySection** - Deep-dive content with testimonials and numbered benefits
7. **TestimonialSection** - Featured quote with image and star rating
8. **FAQSection** - Accordion with gradient answers and contact CTA
9. **CTASection** - Final conversion push with feature highlights

### Content Pages
- Consistent header/footer
- Breadcrumb navigation where appropriate
- Related content suggestions
- Clear typography hierarchy

## Common Components to Build

### Layout
- `Header` - Logo, navigation, CTA buttons (Register, Donate)
- `Footer` - Links, social media, legal info
- `MobileNav` - Responsive mobile navigation

### UI Components (in `components/ui/`)
- `Button` - Polymorphic (works as button or Link), variants: primary, accent, outline, ghost; sizes: sm, md, lg
- `Card` - With subcomponents: Card, CardHeader, CardContent, CardFooter, CardImage; supports hover lift effect
- `Badge` - Variants: default, primary, accent, success, outline
- `Section` - Wrapper with consistent padding, max-width container, background options (white, gray, blue)
- `SectionHeader` - Eyebrow + title + subtitle pattern, centered by default

### Section Components (in `components/sections/`)
- `HeroSection` - Two-column with gradient background, decorative blobs, badge, CTAs
- `StatsSection` - Dark background with animated number counters
- `WhoWeServeSection` - Three audience cards with colored icon badges
- `ProgramsSection` - Full-image cards with overlay text and accent bars
- `WhyChooseSection` - Alternating image/text layout with bullet points and decorative elements
- `GallerySection` - Deep-dive sections with numbered benefits and testimonial blocks
- `TestimonialSection` - Featured quote card with image and star rating
- `FAQSection` - Accordion with gradient answers and contact CTA
- `CTASection` - Final conversion section with feature highlights

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## Content Guidelines

### Tone of Voice
- **Professional** but approachable
- **Warm** and encouraging
- **Clear** and jargon-free
- **Empowering** - focus on student growth and potential

### Key Messages
1. Academic competitions made accessible
2. 100% volunteer-run, youth-led
3. Free resources and guides; low-cost conferences with grants available for those who need them
4. Builds real-world skills (public speaking, critical thinking, leadership)
5. Supportive community for beginners

### Messaging Guidelines for Pricing
- **Resources/guides/materials**: These ARE free - use "free" when referring to curriculum guides, training materials, practice problems, etc.
- **Conferences/competitions**: These are NOT free - use "low-cost" or "affordable" when referring to registration fees
- **Grants**: Available to subsidize up to 100% of conference costs for students who need financial assistance
- **Overall positioning**: "Free resources and low-cost conferences with grants available" is the accurate messaging
- **Avoid**: Saying programs are "free" in general - be specific about what is free (resources) vs. low-cost (conferences)

### SEO Considerations
- Descriptive page titles
- Meta descriptions for each page
- Semantic HTML structure
- Image alt text
- Structured data where appropriate

## Accessibility (a11y)

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance (WCAG 2.1 AA)
- Focus indicators
- Screen reader testing

## Warmth & Visual Design Principles

Inspired by Khan Academy's approachable, inviting aesthetic. These principles create a friendly, trustworthy feel.

### Core Warmth Principles

1. **Soft, Not Stark**
   - Use warm whites (#fafafa) and warm grays (#f5f5f4) instead of pure white/black
   - Avoid harsh contrasts; prefer gentle transitions
   - Dark sections use blue-gray (#0f172a) not pure black

2. **Generous Breathing Room**
   - Large padding between sections (py-16 md:py-20 lg:py-24)
   - Comfortable gaps in grids (gap-6 md:gap-8)
   - Don't crowd content; let it breathe

3. **Rounded Everything**
   - Buttons: `rounded-full`
   - Cards: `rounded-2xl` or `rounded-xl`
   - Images: `rounded-xl` or `rounded-2xl`
   - Badges: `rounded-full`
   - Sharp corners feel cold; rounded corners feel friendly

4. **Human-Centered Imagery**
   - Feature real photos of students and events prominently
   - Images build trust and emotional connection
   - Always show people engaged and happy
   - Use gradient overlays for text readability while preserving warmth

5. **Decorative Elements**
   - Use soft gradient blobs behind images for organic feel
   - Colored accent bars that animate on hover
   - Subtle background gradients (blue to purple to white)
   - These create visual interest without distraction

6. **Gentle Animations**
   - Fade-in on scroll (not slide or bounce)
   - Subtle lifts on hover (y: -4, not y: -20)
   - Slow, graceful transitions (0.3-0.6s)
   - Never jarring or attention-grabbing

### Visual Patterns to Reuse

#### Decorative Gradient Blobs
Add behind images for warmth:
```tsx
<div className="absolute -top-4 -right-4 w-72 h-72 bg-jamun-blue/20 rounded-full blur-3xl" />
<div className="absolute -bottom-4 -left-4 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl" />
```

#### Colored Icon Badges
For categorization and visual interest:
```tsx
<div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
  <Icon className="w-6 h-6 text-jamun-blue" />
</div>
```

#### Card Hover Effects
Warm, inviting interaction:
```tsx
className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
// Or with Framer Motion:
whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
```

#### Gradient Text
For emphasis on key words:
```tsx
<span className="bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent">
  highlighted text
</span>
```

#### Section Headers with Eyebrow
Consistent section introductions:
```tsx
<p className="text-sm font-semibold text-jamun-blue uppercase tracking-widest mb-4">
  Eyebrow Text
</p>
<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
  Section Title
</h2>
<p className="text-lg text-gray-600 max-w-2xl mx-auto">
  Supporting subtitle text
</p>
```

#### Alternating Content Layouts
For variety while maintaining rhythm:
- Odd sections: Image left, content right
- Even sections: Content left, image right
- Use `lg:flex-row-reverse` for alternating

### Backgrounds That Feel Warm

1. **Gradient hero backgrounds:**
   ```tsx
   className="bg-gradient-to-br from-blue-50 via-purple-50 to-white"
   ```

2. **Subtle gray sections:**
   ```tsx
   className="bg-gray-50" // Use sparingly between white sections
   ```

3. **Dark sections for contrast:**
   ```tsx
   className="bg-slate-900" // Use for stats or emphasis, not too frequently
   ```

4. **Gradient overlays on images:**
   ```tsx
   className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
   ```

### Things to Avoid (Feel Cold/Corporate)

- Pure white (#ffffff) backgrounds everywhere
- Sharp 90-degree corners
- Small, cramped spacing
- Stock photos that feel generic
- Abrupt, fast animations
- Too much text without visual breaks
- Monochromatic color schemes
- Heavy drop shadows

## Future Considerations

### Potential Backend Integration
- Structure code to easily add API routes
- Keep data fetching logic abstracted
- Consider headless CMS integration (Sanity, Contentful, Strapi)
- User authentication for registration system
- Database for leaderboards and progress tracking

### Features to Consider
- Event calendar integration
- Registration/payment processing
- Member portal
- Blog/news section
- Resource downloads

## Working with Claude Code

### Best Practices
1. **Be specific** about design intentions
2. **Reference existing components** when asking for new features
3. **Provide content** when asking for new pages
4. **Review generated code** for quality and consistency
5. **Iterate** - start simple, enhance incrementally

### Building New Pages
When creating new pages, follow this pattern for consistency:

```tsx
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Section, SectionHeader, Button } from '@/components/ui';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NewPage() {
  return (
    <main>
      {/* Full-viewport hero section - see "Subpage Hero Pattern" */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24">
        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-jamun-orange/10 to-pink-400/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content with staggered animations */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-jamun-blue bg-jamun-blue/10 rounded-full border border-jamun-blue/20">
                <Sparkles className="w-4 h-4" />
                Page Category
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
                Main Headline{" "}
                <span className="bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent">
                  Gradient Text
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Supporting text that explains the page purpose.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/action" size="lg" className="group">
                  Primary CTA
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button href="/secondary" variant="outline" size="lg">
                  Secondary CTA
                </Button>
              </div>
            </motion.div>

            {/* Image/visual side */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
              {/* Hero image or visual element */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content sections - alternate backgrounds */}
      <Section background="white" className="py-16 md:py-20">
        <SectionHeader
          eyebrow="Section Category"
          title="Section Title"
          subtitle="Supporting subtitle text"
        />
        {/* Section content with animations */}
      </Section>

      <Section background="gray" className="py-16 md:py-20">
        {/* Alternating background */}
      </Section>
    </main>
  );
}
```

### Key Imports for Consistency
```tsx
// UI Components - use barrel exports
import { Button, Section, SectionHeader, Card, CardContent, CardImage, Badge } from '@/components/ui';

// Section Components - use barrel exports
import { HeroSection, StatsSection, FAQSection } from '@/components/sections';

// Animation
import { motion, useInView } from 'framer-motion';

// Icons (Lucide React)
import { ArrowRight, Check, Star, Heart, Sparkles, Users, Trophy } from 'lucide-react';

// Utilities
import { cn } from '@/lib/utils';

// Next.js
import Image from 'next/image';
import Link from 'next/link';
```

### Common Requests Format
- "Create a new [component] that [description] similar to [existing reference]"
- "Update [page] to include [feature] with [specific requirements]"
- "Add animation to [element] that [behavior description]"

### Image Handling
When adding images:
1. Place source images in `/public/images/[appropriate-folder]/`
2. Use descriptive filenames (e.g., `2024-spring-conference-delegates.jpg`)
3. Optimize images before adding when possible
4. Always provide alt text

## Quick Reference

### Key Pages

#### Main Pages
| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Main landing page |
| About | `/about` | Organization info |
| Programs | `/programs` | Programs overview |
| Donate | `/donate` | Donation page |
| Register | `/register` | Event registration |
| Grants | `/grants` | Grant information |
| Leaderboards | `/leaderboards` | Competition leaderboards |
| Not Found | `404` | Custom 404 error page |

#### Program Pages - Model UN
| Page | Route | Purpose |
|------|-------|---------|
| Model UN | `/modelun` | Model UN overview |
| Model UN Committees | `/modelun/committees` | Committees listing |
| Committee Detail | `/modelun/committees/[slug]` | Individual committee (dynamic) |
| Model UN Resources | `/modelun/resources` | MUN resources listing |
| Resource Detail | `/modelun/resources/[slug]` | Individual resource (dynamic) |

#### Program Pages - Mock Trial
| Page | Route | Purpose |
|------|-------|---------|
| Mock Trial | `/mocktrial` | Mock Trial overview |
| Mock Trial Resources | `/mocktrial/resources` | Mock Trial resources listing |

#### Program Pages - Mathletes
| Page | Route | Purpose |
|------|-------|---------|
| Mathletes | `/mathletes` | Mathletes overview |
| Mathletes Resources | `/mathletes/resources` | Mathletes resources listing |

#### Blog
| Page | Route | Purpose |
|------|-------|---------|
| Blog | `/blog` | Blog listing page |
| Blog Post | `/blog/[slug]` | Individual blog post (dynamic) |

#### Legal Pages
| Page | Route | Purpose |
|------|-------|---------|
| Privacy Policy | `/privacy` | Privacy policy |
| Terms of Service | `/terms` | Terms of service |

### Impact Stats (Update as needed)
- 500+ Students Impacted
- 30+ Schools Reached
- 80+ Volunteers
- $70K+ Raised for Programs
