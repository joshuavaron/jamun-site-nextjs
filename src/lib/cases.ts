import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { routing } from "@/i18n/routing";
import type {
  CaseManifest,
  CaseComponent,
  CaseComponentRef,
  FullCase,
} from "./case-types";

/**
 * Mock Trial case loader (server-only — uses `fs`).
 *
 * Content layout:
 *   content/mocktrial-cases/<locale>/<case-slug>/
 *     _case.mdx                  ← manifest (frontmatter) + intro body
 *     <component-slug>.mdx        ← one document per file
 *
 * The manifest's `components` array is authoritative for ordering, the TOC,
 * prev/next, and the full-case concatenation. Individual component files carry
 * light frontmatter (title/type/side) used when a component is read on its own;
 * the manifest ref fills any gaps. Missing locales fall back to `en`.
 */

const CONTENT_DIR = "content/mocktrial-cases";
const MANIFEST_FILE = "_case.mdx";
const defaultLocale = "en";

/**
 * The single active case. JAMUN runs one Mock Trial case at a time, so the
 * `/cases` routes render exactly this slug (the folder under
 * content/mocktrial-cases/<locale>/). Swap this to roll the site to a new case.
 */
export const ACTIVE_CASE_SLUG = "state-v-reed";

function rootDir(): string {
  return path.join(process.cwd(), CONTENT_DIR);
}

function localeDir(locale: string): string {
  return path.join(rootDir(), locale);
}

function caseDir(locale: string, caseSlug: string): string {
  return path.join(localeDir(locale), caseSlug);
}

// Resolve a case directory, falling back to the default locale if needed.
function resolveCaseDir(
  caseSlug: string,
  locale: string,
): { dir: string; locale: string } | null {
  const primary = caseDir(locale, caseSlug);
  if (fs.existsSync(path.join(primary, MANIFEST_FILE))) {
    return { dir: primary, locale };
  }
  if (locale !== defaultLocale) {
    const fallback = caseDir(defaultLocale, caseSlug);
    if (fs.existsSync(path.join(fallback, MANIFEST_FILE))) {
      return { dir: fallback, locale: defaultLocale };
    }
  }
  return null;
}

function parseManifest(dir: string, slug: string, locale: string): CaseManifest {
  const raw = fs.readFileSync(path.join(dir, MANIFEST_FILE), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || "Untitled Case",
    shortTitle: data.shortTitle,
    description: data.description || "",
    caseType: data.caseType,
    caption: data.caption,
    charges: data.charges || [],
    cast: data.cast || [],
    components: (data.components || []) as CaseComponentRef[],
    downloadUrl: data.downloadUrl,
    image: data.image,
    publishedAt: data.publishedAt,
    canonicalSlug: data.canonicalSlug,
    locale,
    intro: content,
  };
}

// A single case manifest (metadata + intro body).
export function getCaseBySlug(
  caseSlug: string,
  locale: string = defaultLocale,
): CaseManifest | null {
  const resolved = resolveCaseDir(caseSlug, locale);
  if (!resolved) return null;
  return parseManifest(resolved.dir, caseSlug, resolved.locale);
}

// A single component, merging the component file with its manifest ref.
export function getCaseComponent(
  caseSlug: string,
  componentSlug: string,
  locale: string = defaultLocale,
): CaseComponent | null {
  const resolved = resolveCaseDir(caseSlug, locale);
  if (!resolved) return null;

  const filePath = path.join(resolved.dir, `${componentSlug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const manifest = parseManifest(resolved.dir, caseSlug, resolved.locale);
  const ref = manifest.components.find((c) => c.slug === componentSlug);
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));

  return {
    caseSlug,
    slug: componentSlug,
    title: data.title || ref?.title || componentSlug,
    type: data.type || ref?.type || "other",
    side: data.side || ref?.side,
    description: data.description || ref?.description,
    content,
    locale: resolved.locale,
  };
}

// Manifest plus every component resolved in manifest order (full-case view).
export function getFullCase(
  caseSlug: string,
  locale: string = defaultLocale,
): FullCase | null {
  const manifest = getCaseBySlug(caseSlug, locale);
  if (!manifest) return null;

  const components = manifest.components
    .map((ref) => getCaseComponent(caseSlug, ref.slug, locale))
    .filter((c): c is CaseComponent => c !== null);

  return { manifest, components };
}

// Sibling components for prev/next navigation, in manifest order.
export function getCaseNeighbors(
  caseSlug: string,
  componentSlug: string,
  locale: string = defaultLocale,
): { prev: CaseComponentRef | null; next: CaseComponentRef | null; index: number; total: number } {
  const manifest = getCaseBySlug(caseSlug, locale);
  const components = manifest?.components ?? [];
  const index = components.findIndex((c) => c.slug === componentSlug);

  return {
    prev: index > 0 ? components[index - 1] : null,
    next: index >= 0 && index < components.length - 1 ? components[index + 1] : null,
    index,
    total: components.length,
  };
}

// ────────── Active-case singletons ──────────
// Thin wrappers binding the slug-based loaders to ACTIVE_CASE_SLUG. The `/cases`
// routes use these so the single active case is the only thing they can render.

export function getActiveCase(locale: string = defaultLocale): CaseManifest | null {
  return getCaseBySlug(ACTIVE_CASE_SLUG, locale);
}

export function getActiveCaseComponent(
  componentSlug: string,
  locale: string = defaultLocale,
): CaseComponent | null {
  return getCaseComponent(ACTIVE_CASE_SLUG, componentSlug, locale);
}

export function getActiveFullCase(locale: string = defaultLocale): FullCase | null {
  return getFullCase(ACTIVE_CASE_SLUG, locale);
}

export function getActiveCaseNeighbors(
  componentSlug: string,
  locale: string = defaultLocale,
) {
  return getCaseNeighbors(ACTIVE_CASE_SLUG, componentSlug, locale);
}

// Content locale directories that actually exist.
function contentLocaleDirs(): string[] {
  const root = rootDir();
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root).filter((d) => fs.statSync(path.join(root, d)).isDirectory());
}

// Component params for the active case's single-component route. Derived from
// actual files so any document is reachable; "full" is reserved for the sibling
// full-case route. Emitted across every supported locale (English fallback).
export function getActiveCaseComponentParams(): { component: string; locale: string }[] {
  const components = new Set<string>();
  for (const contentLocale of contentLocaleDirs()) {
    const cd = caseDir(contentLocale, ACTIVE_CASE_SLUG);
    if (!fs.existsSync(path.join(cd, MANIFEST_FILE))) continue;
    for (const file of fs.readdirSync(cd)) {
      if (!file.endsWith(".mdx") || file === MANIFEST_FILE) continue;
      const component = file.replace(/\.mdx$/, "");
      if (component === "full") continue; // reserved route segment
      components.add(component);
    }
  }

  const result: { component: string; locale: string }[] = [];
  for (const locale of routing.locales) {
    for (const component of components) {
      result.push({ component, locale });
    }
  }
  return result;
}
