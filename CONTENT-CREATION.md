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
