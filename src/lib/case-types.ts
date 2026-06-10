/**
 * Mock Trial case types — pure (no `fs`), safe to import from client components.
 *
 * A "case" is a packet: one charging document plus statement of facts, witness
 * affidavits, exhibits, stipulations, applicable law, and jury instructions.
 * Each piece is a "component". The case manifest (`_case.mdx`) declares the
 * ordered `components` array — the single source of truth for ordering, the
 * table of contents, prev/next nav, and the concatenated full-case view.
 */

// Which side a document/character belongs to (affidavits are sided; shared docs
// are neutral; "uncallable" marks a case witness neither side may call).
export type CaseSide = "prosecution" | "defense" | "neutral" | "uncallable";

// Document kind — drives icon, accent color, and type-aware framing.
export type CaseComponentType =
  | "special" // special instructions / competition rules (meta, fourth-wall)
  | "indictment" // charging document
  | "facts" // statement of facts / case summary
  | "affidavit" // sworn witness statement
  | "exhibit" // document, photo, diagram, chart
  | "stipulations" // agreed facts both sides accept
  | "law" // applicable statutes / rules of evidence
  | "instructions" // jury instructions
  | "other";

export interface CaseCharge {
  count?: string; // e.g. "Count I"
  title: string; // e.g. "Burglary in the First Degree"
  statute?: string; // e.g. "JPC § 140.30"
}

export interface CastMember {
  name: string;
  role: string; // e.g. "Defendant", "Eyewitness"
  side?: CaseSide;
}

export interface CaseCaption {
  court?: string; // "IN THE SUPERIOR COURT OF THE STATE OF JAMUN"
  county?: string; // "COUNTY OF MARSHALL"
  caseNumber?: string; // "No. CR-2026-0417"
  parties?: string; // "THE STATE OF HIGHFIELD, Plaintiff, v. PEYTON REED, Defendant."
}

// A component as declared in the manifest's `components` array.
export interface CaseComponentRef {
  slug: string;
  title: string;
  type: CaseComponentType;
  side?: CaseSide;
  description?: string;
}

// Case-level metadata parsed from `_case.mdx` frontmatter.
export interface CaseMeta {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  caseType?: string; // "Criminal" | "Civil"
  caption?: CaseCaption;
  charges?: CaseCharge[];
  cast?: CastMember[];
  components: CaseComponentRef[];
  downloadUrl?: string; // optional pre-built canonical packet PDF in /public
  image?: string;
  publishedAt?: string;
  canonicalSlug?: string;
  locale: string;
}

// Full manifest: metadata plus the MDX body of `_case.mdx` (case intro/overview).
export interface CaseManifest extends CaseMeta {
  intro: string;
}

// A single rendered component: manifest ref merged with the component file.
export interface CaseComponent {
  caseSlug: string;
  slug: string;
  title: string;
  type: CaseComponentType;
  side?: CaseSide;
  description?: string;
  content: string; // MDX body
  locale: string;
}

// Manifest + every component resolved in manifest order (for the full-case view).
export interface FullCase {
  manifest: CaseManifest;
  components: CaseComponent[];
}
