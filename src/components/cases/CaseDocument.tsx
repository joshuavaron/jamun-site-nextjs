"use client";

/**
 * CaseDocument — renders a single case component's MDX with type-aware framing.
 *
 * Serializes MDX in the browser (same pattern as ResourcePageContent) and wraps
 * it in a `.case-component` article so the legal print stylesheet can page-break
 * between documents in the full-case view. Used by both the single-component
 * page and the concatenated full-case page.
 */

import { useEffect, useState } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { useTranslations } from "next-intl";
import MDXComponents from "@/components/mdx/MDXComponents";
import { Heading } from "@/components/ui";
import { fontBody } from "@/lib/typography";
import type { CaseComponent } from "@/lib/case-types";
import { componentTypeConfig, SIDE_CONFIG, MOCKTRIAL_ACCENT, caseProseClass } from "./case-ui";

interface CaseDocumentProps {
  component: CaseComponent;
  /** Render the type badge + title header above the body (default true). */
  showHeader?: boolean;
}

export function CaseDocument({ component, showHeader = true }: CaseDocumentProps) {
  const t = useTranslations("MockTrialCases");
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  const cfg = componentTypeConfig(component.type);
  const side = component.side ?? "neutral";
  const sideCfg = SIDE_CONFIG[side];

  useEffect(() => {
    let active = true;
    serialize(component.content, {
      mdxOptions: { remarkPlugins: [remarkGfm] },
    }).then((source) => {
      if (active) setMdxSource(source);
    });
    return () => {
      active = false;
    };
  }, [component.content]);

  return (
    <article
      className="case-component legal-document scroll-mt-24"
      id={component.slug}
      data-component-type={component.type}
    >
      {showHeader && (
        <header className="mb-8 pb-6 border-b border-black/5">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              style={{ ...fontBody, backgroundColor: `${cfg.color}1a`, color: cfg.color }}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full"
            >
              <cfg.icon className="w-3.5 h-3.5" />
              {t(cfg.labelKey)}
            </span>
            {side !== "neutral" && (
              <span
                style={{ ...fontBody, backgroundColor: `${sideCfg.color}1a`, color: sideCfg.color }}
                className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full"
              >
                {t(sideCfg.labelKey)}
              </span>
            )}
          </div>
          <Heading size="panel" as="h2" className="text-[#0a0a0a]">
            {component.title}
          </Heading>
          {component.description && (
            <p style={fontBody} className="mt-3 max-w-2xl text-neutral-600 leading-relaxed">
              {component.description}
            </p>
          )}
        </header>
      )}

      <div
        className={caseProseClass}
        style={
          {
            "--tw-prose-links": MOCKTRIAL_ACCENT,
            "--tw-prose-quotes": cfg.color,
            "--tw-prose-quote-borders": cfg.color,
          } as React.CSSProperties
        }
      >
        {mdxSource ? (
          <MDXRemote {...mdxSource} components={MDXComponents} />
        ) : (
          <div className="space-y-4 animate-pulse" aria-hidden>
            <div className="h-4 bg-neutral-200 rounded w-full" />
            <div className="h-4 bg-neutral-200 rounded w-5/6" />
            <div className="h-4 bg-neutral-200 rounded w-4/6" />
            <div className="h-6" />
            <div className="h-4 bg-neutral-200 rounded w-full" />
            <div className="h-4 bg-neutral-200 rounded w-3/4" />
          </div>
        )}
      </div>
    </article>
  );
}
