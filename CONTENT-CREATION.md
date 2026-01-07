# JAMUN Content Creation Guide

Instructions for creating SEO-optimized prep materials for Model UN, Mock Trial, and Mathletes programs.

## Purpose

Create educational content that captures long-tail SEO traffic while providing genuine value. Content should be clear, approachable, and accessible to a general audience (students, parents, teachers).

## Content Locations

| Program | Folder | Example Path |
|---------|--------|--------------|
| Model UN | `content/modelun-resources/` | `content/modelun-resources/en/topic-name.mdx` |
| Mock Trial | `content/mocktrial-resources/` | `content/mocktrial-resources/en/topic-name.mdx` |
| Mathletes | `content/mathletes-resources/` | `content/mathletes-resources/en/topic-name.mdx` |

Each folder contains locale subfolders: `en/`, `es/`, `zh/`

## Frontmatter Template

```yaml
---
title: "Your Title Here"
description: "Compelling meta description for search results (150-160 chars). Include primary keyword naturally."
category: "Skills" # See categories below
format: "Article"
author: "JAMUN Staff"
featured: false
tags: ["keyword1", "keyword2", "keyword3", "keyword4"]
publishedAt: "YYYY-MM-DD"
canonicalSlug: "same-as-filename" # Links translations together
---
```

### Topic-Based Categories

| Category | Use For |
|----------|---------|
| Skills | How-to guides, techniques, strategies |
| Background | Context, history, foundational knowledge |
| Rules | Procedures, regulations, guidelines |
| Reference | Quick lookups, glossaries, cheat sheets |
| Examples | Sample documents, templates, worked examples |
| Strategy | Advanced tactics, competition preparation |

## SEO Requirements

### Keyword Strategy

When keywords are provided, use them. When not provided, research using:

1. **Web search analysis** - Search "[topic] + middle school" or "[topic] + how to" to see what people search
2. **Question-based research** - Find "People also ask" questions on Google
3. **Competitor content gaps** - What topics exist that we haven't covered?
4. **Long-tail variations** - Combine terms: "model un + [specific topic]", "mock trial + [role]"

### On-Page SEO Checklist

- [ ] **Title tag**: Include primary keyword, keep under 60 characters
- [ ] **Meta description**: 150-160 characters, include primary keyword, compelling call to read
- [ ] **H1**: One H1 per page (the title), includes primary keyword
- [ ] **H2/H3 structure**: Use descriptive headings that include related keywords
- [ ] **Keyword placement**: Primary keyword in first 100 words
- [ ] **Keyword density**: Natural usage, approximately 1-2% (don't force it)
- [ ] **URL slug**: Lowercase, hyphenated, keyword-rich, no stop words
- [ ] **Tags**: 3-6 relevant tags for internal categorization

### Heading Structure

```markdown
# Title (H1) - Contains primary keyword

Introduction paragraph with primary keyword in first 100 words.

## Major Section (H2) - Descriptive, keyword-relevant

Content...

### Subsection (H3) - More specific

Content...
```

### Internal Linking Strategy

Link to related JAMUN content wherever natural:

- Link 2-4 related resources per article
- Use descriptive anchor text (not "click here")
- Link to both same-program and cross-program content when relevant
- Prioritize linking to cornerstone/pillar content

Example:
```markdown
Before writing your speech, review our [public speaking fundamentals](/modelun/resources/public-speaking-tips).
```

## Structured Data / Schema

Content can leverage these schema types (handled by site infrastructure):

| Schema Type | When to Use |
|-------------|-------------|
| Article | All prep materials (default) |
| FAQPage | Content with Q&A sections |
| HowTo | Step-by-step guides |
| Course | Comprehensive learning modules |

To trigger FAQ schema, structure Q&A content as:

```markdown
## Frequently Asked Questions

### Question one goes here?

Answer paragraph.

### Question two goes here?

Answer paragraph.
```

## Content Guidelines

### Voice and Tone

- **Style**: Khan Academy-inspired - clear, approachable, educational
- **Person**: Mixed (use "you" for instructions, third person for general info)
- **Level**: General audience - accessible to students but useful for parents/teachers
- **Length**: Varies by content type (see below)

### Content Length by Type

| Type | Word Count | Notes |
|------|------------|-------|
| Quick reference | 500-800 | Glossaries, cheat sheets |
| Standard guide | 1000-2000 | How-to articles, explanations |
| Comprehensive | 2500-4000 | Pillar content, complete guides |

### Formatting Best Practices

- Use tables for structured comparisons
- Use bullet points for lists of 3+ items
- Keep paragraphs short (3-4 sentences max)
- Include subheadings every 200-300 words
- Bold key terms on first use

### Content Restrictions

**Avoid:**
- Controversial political stances on current divisive issues
- Mentioning competitor organizations by name
- Promotional language or heavy CTAs
- Difficulty level labels (Beginner/Intermediate/Advanced)
- Images (text-only for now)
- Citations or formal sourcing

## Program-Specific Guidelines

### Model UN

- Reference JAMUN's committees when relevant
- Cover: committee guides, parliamentary procedure, research skills, position papers, resolution writing, public speaking, negotiation
- Use proper MUN terminology consistently

### Mock Trial

- Base content on **Federal Rules of Evidence**
- Cover: trial procedure, witness examination, objections, opening/closing statements, evidence rules, courtroom etiquette
- Use proper legal terminology with clear definitions

### Mathletes

- Align with JAMUN's program format (details TBD - check with team before creating content)
- Cover: problem-solving strategies, mathematical concepts, competition preparation
- Show worked examples where appropriate

## Translation Requirements

**Every piece of content must be translated to all three languages:**

1. Create English version in `en/` folder
2. Create Spanish version in `es/` folder
3. Create Chinese version in `zh/` folder

All translations must:
- Use the same `canonicalSlug` value
- Maintain the same structure and headings
- Be culturally appropriate (not just literal translations)
- Keep the same filename across locales

## Content Batching

When creating content, consider topic clusters:

1. **Pillar content**: Comprehensive guide on a broad topic (e.g., "Complete Guide to Model UN Research")
2. **Cluster content**: Specific articles linking back to pillar (e.g., "How to Research Country Positions", "Finding Primary Sources for MUN")

Plan batches of 3-5 related articles to build topical authority.

### Example Topic Cluster

**Pillar**: "Model UN Position Papers: The Complete Guide"

**Cluster articles**:
- "Position Paper Format and Structure"
- "How to Write a Policy Recommendation"
- "Common Position Paper Mistakes"
- "Position Paper Examples by Committee Type"

## Example Prompts

### Basic Content Request

> Create an article about how to make objections in mock trial. Target keyword: "mock trial objections"

### Research-Required Request

> Create a comprehensive guide to Model UN research. I don't have specific keywords - research long-tail opportunities and suggest the best angle.

### Batch Request

> Create a topic cluster around parliamentary procedure in Model UN. Start with a pillar article and plan 3-4 supporting articles.

### Translation Request

> Translate the public speaking guide to Spanish and Chinese. Maintain the same structure and canonicalSlug.

## Quick Reference: File Creation

1. Create file: `content/[program]-resources/en/[slug].mdx`
2. Add frontmatter with all required fields
3. Write content following guidelines
4. Create `es/` and `zh/` translations with same filename
5. Ensure `canonicalSlug` matches across all three files

## MDX Components Available

```markdown
<Callout type="info">
Helpful tips or important notes
</Callout>

<Callout type="warning">
Cautions or things to avoid
</Callout>

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data | Data | Data |
```

## Navigation Sidebar System

Resource pages include an interactive navigation sidebar that allows users to:

1. **Navigate by heading** - Click any heading to jump to that section
2. **Bookmark headings** - Save headings for quick reference
3. **Select subpoints** - Click individual subpoints to highlight them
4. **Filter to saved items** - View only bookmarked/selected content
5. **Share selections** - Export/import selections via shareable codes

### How It Works

The navigation system automatically detects:
- **Headings**: All H1, H2, and H3 elements with IDs
- **Subpoints**: Paragraphs that start with legal-style markers like `(a)`, `(1)`, `(A)`, `(i)`, etc.

### Structuring Content for Navigation

To maximize the navigation system's effectiveness:

#### Heading Hierarchy

Use a consistent heading structure:

```markdown
# Document Title (H1)

## Article I. Major Section (H2)

### Rule 101. Subsection (H3)

Content paragraphs here...

### Rule 102. Another Subsection (H3)

More content...

## Article II. Next Major Section (H2)
```

- **H1**: Document title (one per page)
- **H2**: Major sections/articles
- **H3**: Individual rules, subsections, or topics

All headings automatically get IDs derived from their text (slugified), enabling:
- Direct linking via URL hash (e.g., `/resources/page#rule-101`)
- Bookmarking in the navigation sidebar
- Scroll tracking for progress indicator

#### Subpoint Formatting

For selectable subpoints (legal rules, numbered lists, etc.), use this pattern:

```markdown
**(a)** First point text here.

**(b)** Second point text here.

**(1)** Numbered point.

**(2)** Another numbered point.

**(A)** Uppercase letter point.

**(i)** Roman numeral point.
```

**Key requirements for subpoints:**
- Start paragraph with marker in bold: `**(a)**`, `**(1)**`, `**(A)**`, `**(i)**`, etc.
- Follow marker with a space, then the content
- Each subpoint should be its own paragraph (blank line before and after)
- Supported marker types:
  - Lowercase letters: `(a)`, `(b)`, `(c)`...
  - Numbers: `(1)`, `(2)`, `(3)`...
  - Uppercase letters: `(A)`, `(B)`, `(C)`...
  - Roman numerals: `(i)`, `(ii)`, `(iii)`, `(iv)`...

#### Nested Subpoints

For hierarchical content (like legal rules), nest subpoints by indentation level:

```markdown
**(a) Main Point.** Description of the main point.

**(1)** First sub-point under (a).

**(A)** Sub-sub-point under (1).

**(B)** Another sub-sub-point.

**(2)** Second sub-point under (a).

**(b) Second Main Point.** Description continues...
```

The system automatically:
- Detects nesting levels based on marker type
- Draws connecting lines showing hierarchy
- Propagates selections (selecting a child selects its parents)
- Propagates deselections (deselecting a parent deselects its children)

### Selection Behavior

**Backward propagation (selecting):**
- Selecting a subpoint automatically bookmarks all parent headings
- Selecting a child heading automatically bookmarks parent headings

**Forward propagation (deselecting):**
- Unbookmarking a heading deselects all subpoints under it
- Unbookmarking a heading unbookmarks all child headings

### Share/Import Feature

Users can share their selections using alphanumeric codes:
- Codes encode which headings are bookmarked and which subpoints are selected
- Codes are page-specific (same code works on the same page across devices)
- Useful for teachers sharing study guides or students comparing notes

### Example: Federal Rules of Evidence Structure

```markdown
# Federal Rules of Evidence

## Article I. General Provisions

### Rule 101. Scope; Definitions

**(a) Scope.** These rules apply to proceedings in United States courts.

**(b) Definitions.** In these rules:

**(1)** "civil case" means a civil action or proceeding;

**(2)** "criminal case" includes a criminal proceeding;

**(3)** "public office" includes a public agency;

### Rule 102. Purpose

These rules should be construed so as to administer every proceeding fairly...

## Article II. Judicial Notice

### Rule 201. Judicial Notice of Adjudicative Facts

**(a) Scope.** This rule governs judicial notice...
```

This structure provides:
- Clear navigation hierarchy in the sidebar
- Selectable individual rules and sub-rules
- Shareable study selections
- Progress tracking as users scroll
