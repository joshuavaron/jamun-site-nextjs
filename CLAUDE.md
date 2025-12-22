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
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with navigation/footer
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── programs/          # Programs section
│   │   ├── page.tsx       # Programs overview
│   │   ├── model-un/      # Model UN details
│   │   ├── mock-trial/    # Mock Trial details
│   │   └── mathletes/     # Mathletes details
│   ├── resources/         # Free resources for educators
│   ├── contact/           # Contact page
│   ├── donate/            # Donation page
│   ├── register/          # Registration page
│   └── grants/            # Grants information
├── components/            # Reusable React components
│   ├── ui/               # Base UI components (buttons, cards, etc.)
│   ├── layout/           # Layout components (header, footer, nav)
│   ├── sections/         # Page section components
│   └── common/           # Shared components
├── lib/                  # Utility functions and helpers
├── public/               # Static assets
│   ├── images/          # Conference photos, logos, graphics
│   │   ├── conferences/ # Photos from past conferences
│   │   ├── logos/       # JAMUN logos and branding
│   │   └── icons/       # Custom icons
│   └── fonts/           # Custom fonts if needed
├── styles/              # Global styles
│   └── globals.css      # Tailwind imports and global CSS
├── types/               # TypeScript type definitions
└── config/              # Site configuration
    └── site.ts          # Site metadata, navigation, etc.
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

### Typography
- **Headings:** Bold, clean sans-serif (Inter or similar)
- **Body:** Readable, professional (Inter or system fonts)
- **Hierarchy:** Clear visual hierarchy with consistent sizing

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

### UI Components
- `Button` - Multiple variants (primary, secondary, outline, ghost)
- `Card` - For programs, features, testimonials
- `Badge` - For tags and labels
- `StatCard` - For impact numbers
- `TestimonialCard` - For quotes
- `ImageGallery` - For conference photos
- `Accordion` - For FAQs

### Section Components
- `HeroSection` - Reusable hero with variants
- `StatsSection` - Impact numbers display
- `ProgramsSection` - Program cards grid
- `TestimonialsSection` - Rotating testimonials
- `CTASection` - Call-to-action banners
- `FAQSection` - Frequently asked questions

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
3. Free and low-cost programs
4. Builds real-world skills (public speaking, critical thinking, leadership)
5. Supportive community for beginners

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
| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Main landing page |
| About | `/about` | Organization info |
| Programs | `/programs` | Programs overview |
| Model UN | `/programs/model-un` | Model UN details |
| Mock Trial | `/programs/mock-trial` | Mock Trial details |
| Mathletes | `/programs/mathletes` | Mathletes details |
| Resources | `/resources` | Free educator resources |
| Contact | `/contact` | Contact form |
| Donate | `/donate` | Donation page |
| Register | `/register` | Event registration |
| Grants | `/grants` | Grant information |

### Impact Stats (Update as needed)
- 500+ Students Impacted
- 30+ Schools Reached
- 80+ Volunteers
- $70K+ Raised for Programs
