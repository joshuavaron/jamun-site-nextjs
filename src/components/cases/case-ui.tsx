/**
 * Client-safe presentation config for case documents.
 *
 * Maps component types → icon/accent and sides → label-key/accent. Kept
 * separate from `@/lib/cases` (which imports `fs`) so client components can
 * import it without bundling Node APIs. Human-readable labels are resolved via
 * translations in the components; the `labelKey` here points at the i18n key.
 */

import {
  Gavel,
  FileText,
  FileSignature,
  Image as ImageIcon,
  ClipboardList,
  Scale,
  BookOpen,
  ScrollText,
  Info,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CaseComponentType, CaseSide } from "@/lib/case-types";
import { cn } from "@/lib/utils";

export const COMPONENT_TYPE: Record<
  CaseComponentType,
  { icon: LucideIcon; color: string; labelKey: string }
> = {
  special: { icon: Info, color: "#6366f1", labelKey: "typeSpecial" },
  indictment: { icon: Gavel, color: "#b91c1c", labelKey: "typeIndictment" },
  facts: { icon: FileText, color: "#397bce", labelKey: "typeFacts" },
  affidavit: { icon: FileSignature, color: "#9333ea", labelKey: "typeAffidavit" },
  exhibit: { icon: ImageIcon, color: "#0ea5e9", labelKey: "typeExhibit" },
  stipulations: { icon: ClipboardList, color: "#10b981", labelKey: "typeStipulations" },
  law: { icon: Scale, color: "#f97316", labelKey: "typeLaw" },
  instructions: { icon: BookOpen, color: "#eab308", labelKey: "typeInstructions" },
  other: { icon: ScrollText, color: "#64748b", labelKey: "typeOther" },
};

export function componentTypeConfig(type: CaseComponentType) {
  return COMPONENT_TYPE[type] || COMPONENT_TYPE.other;
}

export const SIDE_CONFIG: Record<CaseSide, { color: string; labelKey: string }> = {
  prosecution: { color: "#b91c1c", labelKey: "prosecution" },
  defense: { color: "#397bce", labelKey: "defense" },
  neutral: { color: "#64748b", labelKey: "neutral" },
  uncallable: { color: "#a16207", labelKey: "uncallable" },
};

// Program accent for Mock Trial (matches ResourcePageContent).
export const MOCKTRIAL_ACCENT = "#9333ea";

// Shared prose classes for rendered legal documents — mirrors the resource
// page's prose styling so case documents read consistently with resources.
export const caseProseClass = cn(
  "prose prose-lg max-w-none",
  "prose-headings:text-[#0a0a0a]",
  // Legal-document scale: modest, understated headers (no web-style underline).
  "prose-h1:text-2xl prose-h1:md:text-3xl prose-h1:mb-5 prose-h1:mt-10",
  "prose-h2:text-lg prose-h2:md:text-xl prose-h2:font-semibold prose-h2:mb-3 prose-h2:mt-8",
  "prose-h3:text-base prose-h3:md:text-lg prose-h3:font-semibold prose-h3:mb-2 prose-h3:mt-7",
  "prose-h4:text-sm prose-h4:md:text-base prose-h4:font-semibold prose-h4:mb-2 prose-h4:mt-6",
  "prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:mb-4",
  "prose-strong:text-[#0a0a0a] prose-strong:font-semibold",
  "prose-ul:text-neutral-700 prose-ul:my-4",
  "prose-ol:text-neutral-700 prose-ol:my-4",
  "prose-li:text-neutral-700 prose-li:my-1",
  "prose-blockquote:border-l-2 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-neutral-700 prose-blockquote:not-italic",
  "prose-a:no-underline hover:prose-a:underline",
  "prose-hr:my-8 prose-hr:border-black/5",
  "prose-table:w-full prose-table:border-collapse",
  "prose-th:bg-neutral-50 prose-th:border prose-th:border-black/10 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold",
  "prose-td:border prose-td:border-black/10 prose-td:px-4 prose-td:py-2",
);
