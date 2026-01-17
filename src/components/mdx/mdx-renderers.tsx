"use client";

/**
 * MDX Element Renderers
 *
 * Base MDX component renderers for standard markdown elements.
 * Provides styled versions of headings, paragraphs, links, lists, etc.
 *
 * Elements:
 * - Headings (h1-h4): BookmarkableHeading for h1-h3, styled h4
 * - Paragraph: Auto-detects subpoints, renders SubpointParagraph or standard p
 * - Links: External (new tab) vs internal (locale-aware routing)
 * - Lists: Styled ul/ol/li with footnote support
 * - Code: Inline code and code blocks
 * - Tables: Responsive table styling
 * - Media: Images with captions, blockquotes
 * - Footnotes: Reference links and footnote section
 *
 * Used by: MDXComponents.tsx (main export)
 */

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { MDXComponents as MDXComponentsType } from "mdx/types";
import { getTextContent, getSubPointMarkerType, filterFootnoteBackrefs } from "./subpoint-helpers";
import { SubpointParagraph } from "./SubpointParagraph";
import { BookmarkableHeading } from "./BookmarkableHeading";

// --- Footnote Reference Component ---

interface FootnoteRefProps {
  targetId?: string;
  uniqueId?: string;
  children: React.ReactNode;
}

function FootnoteRef({ targetId, uniqueId, children }: FootnoteRefProps) {
  const footnoteId = targetId || getTextContent(children);
  const elementId = uniqueId || `user-content-fnref-${footnoteId}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const footnoteElement = document.getElementById(`user-content-fn-${footnoteId}`) ||
                           document.getElementById(`fn-${footnoteId}`);
    if (footnoteElement) {
      footnoteElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      footnoteElement.classList.add('footnote-highlight');
      setTimeout(() => footnoteElement.classList.remove('footnote-highlight'), 2000);
    }
  };

  return (
    <a
      href={`#user-content-fn-${footnoteId}`}
      id={elementId}
      onClick={handleClick}
      className="footnote-ref text-jamun-blue hover:text-jamun-blue-dark no-underline font-medium transition-colors"
      aria-describedby={`user-content-fn-${footnoteId}`}
    >
      [{children}]
    </a>
  );
}

// --- MDX Component Renderers ---

export const mdxRenderers: MDXComponentsType = {
  // Footnote section container
  section: ({ children, ...props }) => {
    const dataFootnotes = (props as { 'data-footnotes'?: boolean })['data-footnotes'];
    if (dataFootnotes) {
      return (
        <section className="footnotes-section mt-12 pt-8 border-t border-gray-200" {...props}>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">References</h2>
          {children}
        </section>
      );
    }
    return <section {...props}>{children}</section>;
  },

  // Superscript passthrough
  sup: ({ children, ...props }) => {
    return <sup {...props}>{children}</sup>;
  },

  // Headings with bookmark functionality
  h1: ({ children }) => (
    <BookmarkableHeading level={1} className="text-3xl md:text-4xl font-semibold text-gray-900 mt-10 mb-6 first:mt-0">
      {children}
    </BookmarkableHeading>
  ),
  h2: ({ children }) => (
    <BookmarkableHeading level={2} className="text-2xl md:text-3xl font-semibold text-gray-900 mt-10 mb-4">
      {children}
    </BookmarkableHeading>
  ),
  h3: ({ children }) => (
    <BookmarkableHeading level={3} className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 mb-3">
      {children}
    </BookmarkableHeading>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
      {children}
    </h4>
  ),

  // Paragraph - auto-detects subpoints
  p: ({ children }) => {
    const textContent = getTextContent(children);
    const markerType = getSubPointMarkerType(textContent);

    if (markerType) {
      return <SubpointParagraph markerType={markerType}>{children}</SubpointParagraph>;
    }

    return (
      <p className="text-gray-700 leading-relaxed mb-6">{children}</p>
    );
  },

  // Links - external vs internal
  a: ({ href, children, id, ...props }) => {
    // Check for footnote reference
    if ((props as { 'data-footnote-ref'?: boolean })['data-footnote-ref']) {
      const footnoteId = href?.replace('#user-content-fn-', '') || getTextContent(children);
      const originalId = (id as string) || `user-content-fnref-${footnoteId}`;
      const displayNumber = getTextContent(children);
      return <FootnoteRef targetId={footnoteId} uniqueId={originalId}>{displayNumber}</FootnoteRef>;
    }

    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-jamun-blue hover:text-jamun-blue-dark underline decoration-jamun-blue/30 hover:decoration-jamun-blue transition-colors"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || "#"}
        className="text-jamun-blue hover:text-jamun-blue-dark underline decoration-jamun-blue/30 hover:decoration-jamun-blue transition-colors"
      >
        {children}
      </Link>
    );
  },

  // Lists
  ul: ({ children }) => (
    <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-gray-700">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-gray-700">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => {
    // Check for footnote item
    const id = (props as { id?: string }).id;
    if (id && id.startsWith('user-content-fn-')) {
      const footnoteId = id.replace('user-content-fn-', '');
      const filteredChildren = filterFootnoteBackrefs(children);

      const backrefLink = (
        <a
          key="backref"
          href={`#user-content-fnref-${footnoteId}`}
          onClick={(e) => {
            e.preventDefault();
            const refElement = document.getElementById(`user-content-fnref-${footnoteId}`);
            if (refElement) {
              refElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
          className="footnote-backref text-jamun-blue hover:text-jamun-blue-dark no-underline ml-1"
          aria-label="Back to content"
        >
          ↩
        </a>
      );

      // Append backref to last paragraph
      const appendBackrefToChildren = (node: React.ReactNode): React.ReactNode => {
        if (!React.isValidElement(node)) return node;
        const element = node as React.ReactElement<{ children?: React.ReactNode }>;
        const childArray = React.Children.toArray(element.props.children);
        if (element.type === 'p' || (typeof element.type === 'function' && (element.type as { name?: string }).name === 'p')) {
          return React.cloneElement(element, {}, ...childArray, backrefLink);
        }
        if (childArray.length > 0) {
          const lastIndex = childArray.length - 1;
          const lastChild = childArray[lastIndex];
          if (React.isValidElement(lastChild)) {
            const updatedLast = appendBackrefToChildren(lastChild);
            return React.cloneElement(element, {}, ...childArray.slice(0, lastIndex), updatedLast);
          }
        }
        return node;
      };

      let contentWithBackref: React.ReactNode;
      const childArray = React.Children.toArray(filteredChildren);
      if (childArray.length > 0) {
        const lastIndex = childArray.length - 1;
        const lastChild = childArray[lastIndex];
        if (React.isValidElement(lastChild)) {
          const updatedLast = appendBackrefToChildren(lastChild);
          contentWithBackref = [...childArray.slice(0, lastIndex), updatedLast];
        } else {
          contentWithBackref = <>{filteredChildren}{backrefLink}</>;
        }
      } else {
        contentWithBackref = <>{filteredChildren}{backrefLink}</>;
      }

      return (
        <li
          id={id}
          className="leading-relaxed footnote-item text-sm text-gray-600 py-2 px-3 rounded-lg transition-colors"
        >
          {contentWithBackref}
        </li>
      );
    }
    return <li className="leading-relaxed">{children}</li>;
  },

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-jamun-blue/30 pl-6 pr-4 py-4 my-6 bg-jamun-blue/5 rounded-r-lg text-gray-700 italic [&_p]:mb-0">
      {children}
    </blockquote>
  ),

  // Code
  code: ({ children }) => (
    <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto mb-6 text-sm">
      {children}
    </pre>
  ),

  // Horizontal rule
  hr: () => <hr className="border-gray-200 my-10" />,

  // Tables
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="bg-gray-50 border border-gray-200 px-4 py-2 text-left font-semibold text-gray-900">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-200 px-4 py-2 text-gray-700">
      {children}
    </td>
  ),

  // Images
  img: ({ src, alt }) => (
    <figure className="my-8">
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <Image
          src={src || ""}
          alt={alt || ""}
          fill
          className="object-cover"
        />
      </div>
      {alt && (
        <figcaption className="text-center text-sm text-gray-500 mt-3">
          {alt}
        </figcaption>
      )}
    </figure>
  ),

  // Text formatting
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
};
