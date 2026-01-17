# Development Notes & AI Optimization Guide

> This file tracks development decisions, known issues, and optimization opportunities.
> For AI instructions, see `CLAUDE.md` and `.claude/rules/`.

## Codebase Health Summary

| Metric | Status | Notes |
|--------|--------|-------|
| Total Lines | ~19,200 | Across 95 files |
| Largest File | MDXComponents.tsx (1,370 lines) | See refactoring notes |
| Code Reuse | Good | UI components well-abstracted |
| Type Safety | Strong | TypeScript throughout |
| i18n | Complete | 3 locales (en, es, zh) |

## Architecture Decisions

### Why Monorepo Works for Us
- AI tools perform better with unified context (can trace data flow end-to-end)
- Small team benefits from shared patterns
- Content + code colocation simplifies MDX workflow

### Component Philosophy
1. **Atomic UI** (`/components/ui/`) - Reusable primitives (Button, Card, Badge)
2. **Sections** (`/components/sections/`) - Page-level building blocks
3. **Domain** (`/components/resources/`, `/components/mdx/`) - Feature-specific

## Known Issues & Tech Debt

### High Priority

#### MDXComponents.tsx Complexity
- **Problem**: 1,370 lines with intertwined systems (subpoints, bookmarks, footnotes)
- **Impact**: Difficult to modify one feature without affecting others
- **Future**: Consider splitting into SubpointSystem, BookmarkSystem, MDXRenderers

#### Animation Variant Duplication
- **Problem**: 9 files redefine `containerVariants`/`itemVariants` locally
- **Solution**: Import from `@/lib/animations.ts` (already has `staggerContainer`, `fadeInUp`)
- **Files affected**: ModelUNPageContent, mathletes/page, mocktrial/page, ResourcesPageContent, + 5 more

### Medium Priority

#### Large Page Files
- ModelUNPageContent.tsx (1,054 lines)
- mathletes/page.tsx (985 lines)
- mocktrial/page.tsx (934 lines)
- **Pattern**: Each has inline section components that could be extracted

#### Filter Logic in Components
- ResourcesPageContent.tsx mixes filtering logic with rendering
- Consider extracting to `useResourceFilters` hook

### Low Priority

#### AnimatedNumber Duplication
- Component exists at `/components/ui/AnimatedNumber.tsx`
- But 3 pages redefine it locally instead of importing
- Quick fix: replace local definitions with imports

## Performance Considerations

### Bundle Optimization
- lucide-react icons are tree-shakeable (verified)
- Consider lazy loading below-fold sections on large pages
- MDX content is statically generated (good)

### Image Handling
- Using Next.js Image component throughout
- Content images in `/public/images/` with proper sizing
- Cover images optimized at build time

## Content Workflow

### Adding New Resources
1. Create MDX file in `content/modelun-resources/`
2. Add frontmatter: title, description, category, difficulty, readTime
3. Resources auto-populate on `/modelun/resources` page

### Adding New Blog Posts
1. Create MDX file in `content/blog/`
2. Add frontmatter: title, excerpt, coverImage, category, author, publishedAt
3. Set `featured: true` for homepage display

### Adding New Committees
1. Create MDX file in `content/committees/`
2. Add frontmatter: name, abbreviation, category, topic, level, delegationSize, executives, countries
3. Committee appears in directory and gets dynamic route

## Testing Checklist

Before deploying changes:
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit` passes
- [ ] Test all 3 locales: `/`, `/es`, `/zh`
- [ ] Check mobile responsiveness
- [ ] Verify new content renders correctly

## Environment Notes

### Local Development
```bash
npm run dev      # Starts at localhost:3000
```

### Build Verification
```bash
npm run build    # Full production build
npm run start    # Serve production build locally
```

## Refactoring Opportunities

### Quick Wins (< 30 min each)
1. Replace local animation variants with imports from `@/lib/animations`
2. Replace local AnimatedNumber with import from `@/components/ui`
3. Add `containerVariants` and `itemVariants` exports to animations.ts if missing

### Medium Effort
1. Extract ResourcesPageContent filter logic to `useResourceFilters` hook
2. Create `AccordionSection` component for FAQ patterns
3. Split ImportExportModal into separate Import/Export modals

### Larger Refactors
1. Split MDXComponents.tsx into focused modules
2. Extract inline sections from large page files
3. Create shared ProgramPage layout component

## File Reference for Common Tasks

| Task | Primary File(s) |
|------|-----------------|
| Add navigation item | `src/config/site.ts` |
| Modify header/footer | `src/components/layout/` |
| Change brand colors | `src/app/globals.css` |
| Add animation variant | `src/lib/animations.ts` |
| Add program color | `src/lib/colors.ts` |
| Add translation | `messages/en.json` (then es.json, zh.json) |
| Modify MDX rendering | `src/components/mdx/MDXComponents.tsx` |
| Add UI component | `src/components/ui/` + update index.ts |

## Recent Changes Log

<!-- Add entries here when making significant changes -->
| Date | Change | Files |
|------|--------|-------|
| 2026-01-12 | Added AI development optimization docs | notes.md, .claude/rules/ |
