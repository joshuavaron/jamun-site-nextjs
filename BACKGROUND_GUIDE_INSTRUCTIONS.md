# Background Guide Processing Instructions

## Overview

Background guides are research documents attached to a particular committee. They share the same UI and layout as resources but are not visible on prep/resources pages. Instead, they are accessed via links from their associated committee pages.

## Task Workflow

For each background guide provided:

### 1. Editorial Review

Read through the entire document and make **minor revisions only** for:

- **Clarity**: Simplify confusing sentences or restructure unclear passages
- **Conversational tone**: Replace overly formal, academic, or "stuffy" language with more approachable phrasing
- **Readability**: Break up dense paragraphs, improve flow between sections
- **Consistency**: Ensure consistent formatting and terminology throughout

**DO NOT:**
- Make substantive changes to the content, arguments, or information
- Add or remove significant sections
- Change the factual content or analysis
- Trim sections for length

**Target Audience:** General audience including students, teachers, and parents. The writing should be engaging and clear without being overly simplified.

### 2. Document Issues Requiring Major Revision

If you encounter issues that require more than minor editing (e.g., factually incorrect information, missing critical context, sections that are fundamentally unclear or poorly structured), document these separately and flag them for review rather than making the changes yourself.

**Format for flagging issues:**
```
## Issues Requiring Review

### [Section Name]
- **Issue**: [Brief description of the problem]
- **Recommendation**: [Suggested approach to fix]
```

### 3. MDX Formatting

Convert the revised document to MDX format with the following structure:

#### Frontmatter

```yaml
---
title: "[Background Guide Title]"
author: "JAMUN Staff"
publishedAt: "[YYYY-MM-DD - use today's date]"
canonicalSlug: "[slug-format-title]"
---
```

**Note:** Background guides do NOT include:
- `description`
- `category`
- `difficulty`
- `readTime`
- `tags`
- `format`
- `featured`

#### Content Formatting

Follow the existing resource formatting conventions:

- Use `##` for major sections
- Use `###` for subsections
- Use `**(a)**, **(b)**, **(c)**` etc. for enumerated points within sections
- Use `**bold**` for emphasis and key terms
- Use `-` for bullet lists
- Use `>` for blockquotes or important callouts
- Maintain clear paragraph breaks between ideas

### 4. File Location

Save the completed MDX file to:
```
content/background-guides/en/[committee-slug].mdx
```

The `content/background-guides/` directory should be created if it doesn't exist.

## Example Frontmatter

```yaml
---
title: "DISEC Background Guide: Autonomous Weapons Systems"
author: "JAMUN Staff"
publishedAt: "2026-01-07"
canonicalSlug: "disec-autonomous-weapons"
---
```

## Revision Examples

### Before (Stuffy)
> "It is incumbent upon delegates to thoroughly familiarize themselves with the multifaceted dimensions of this issue prior to engaging in substantive discourse within the committee setting."

### After (Conversational)
> "Before committee begins, take time to understand the different aspects of this issue. The more you know, the more effectively you'll be able to participate in debate."

---

### Before (Confusing)
> "The question of sovereignty as it pertains to the utilization of autonomous systems in extraterritorial contexts remains one which has yet to be definitively resolved by the international community."

### After (Clear)
> "Countries still disagree about whether using autonomous weapons outside their own borders violates other nations' sovereignty. The international community hasn't reached a consensus on this question."

## Checklist

Before finalizing each background guide:

- [ ] Read through entire document
- [ ] Made minor revisions for clarity and tone
- [ ] Documented any issues requiring major revision
- [ ] Formatted frontmatter correctly (title, author, publishedAt, canonicalSlug only)
- [ ] Applied consistent MDX formatting throughout
- [ ] Saved to `content/background-guides/en/[slug].mdx`
