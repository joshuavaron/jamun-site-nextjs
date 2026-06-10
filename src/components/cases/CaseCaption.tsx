"use client";

/**
 * CaseCaption — the formal court caption block that heads a case packet.
 * Renders in the serif display face, centered, like a real pleading header.
 */

import type { CaseCaption as CaseCaptionType } from "@/lib/case-types";
import { fontSerif, fontBody } from "@/lib/typography";

interface CaseCaptionProps {
  caption?: CaseCaptionType;
  caseType?: string;
  className?: string;
}

export function CaseCaption({ caption, caseType, className }: CaseCaptionProps) {
  if (!caption) return null;
  const { court, county, caseNumber, parties } = caption;

  return (
    <div
      className={`case-caption rounded-2xl border border-black/10 bg-neutral-50/60 px-6 py-7 md:px-10 md:py-9 text-center ${className ?? ""}`}
    >
      {court && (
        <p
          style={fontSerif}
          className="text-sm md:text-base font-medium uppercase tracking-[0.15em] text-[#0a0a0a]"
        >
          {court}
        </p>
      )}
      {county && (
        <p
          style={fontBody}
          className="mt-1 text-xs md:text-sm uppercase tracking-[0.18em] text-neutral-500"
        >
          {county}
        </p>
      )}

      {parties && (
        <p
          style={fontSerif}
          className="mx-auto mt-5 max-w-2xl text-lg md:text-2xl leading-snug text-[#0a0a0a]"
        >
          {parties}
        </p>
      )}

      {(caseNumber || caseType) && (
        <div
          style={fontBody}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs md:text-sm text-neutral-500"
        >
          {caseNumber && <span className="tabular-nums">{caseNumber}</span>}
          {caseNumber && caseType && <span className="text-neutral-300">•</span>}
          {caseType && <span className="uppercase tracking-[0.14em]">{caseType}</span>}
        </div>
      )}
    </div>
  );
}
