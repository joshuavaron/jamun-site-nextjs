"use client";

import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-10 mb-6 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-10 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-gray-700 leading-relaxed mb-6">{children}</p>
  ),
  a: ({ href, children }) => {
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
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-jamun-blue/30 pl-6 pr-4 py-4 my-6 bg-jamun-blue/5 rounded-r-lg text-gray-700 italic [&_p]:mb-0">
      {children}
    </blockquote>
  ),
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
  hr: () => <hr className="border-gray-200 my-10" />,
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
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
};

// Custom components for blog posts
export const Callout = ({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "success" | "tip";
  children: React.ReactNode;
}) => {
  const styles = {
    info: "bg-jamun-blue/10 border-jamun-blue/30 text-jamun-blue",
    warning: "bg-amber-50 border-amber-300 text-amber-800",
    success: "bg-emerald-50 border-emerald-300 text-emerald-800",
    tip: "bg-purple-50 border-purple-300 text-purple-800",
  };

  const icons = {
    info: "💡",
    warning: "⚠️",
    success: "✅",
    tip: "💫",
  };

  return (
    <div
      className={`border-l-4 p-4 rounded-r-lg my-6 ${styles[type]}`}
    >
      <div className="flex gap-3">
        <span className="text-lg">{icons[type]}</span>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

export const ImageGallery = ({
  images,
}: {
  images: { src: string; alt: string }[];
}) => (
  <div className="grid grid-cols-2 gap-4 my-8">
    {images.map((image, index) => (
      <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
        <Image src={image.src} alt={image.alt} fill className="object-cover" />
      </div>
    ))}
  </div>
);

export default components;
