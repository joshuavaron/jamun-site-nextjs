import { siteConfig } from "@/config/site";
import { localizedUrl } from "@/lib/seo";

/**
 * Normalize a human/display date (e.g. "Aug 4, 2025") to an ISO-8601 date
 * (YYYY-MM-DD). Schema.org / Google Rich Results require ISO dates; a display
 * string is an invalid Date value and fails Article validation. Falls back to
 * the original string if it can't be parsed (so we never crash a build).
 */
function toISODate(input: string): string {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  // Date-only form avoids timezone shifting the calendar day.
  return d.toISOString().slice(0, 10);
}

// Organization Schema for JAMUN
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logos/jamun-logo-512.png`,
    description: siteConfig.description,
    email: siteConfig.email,
    foundingDate: "2023",
    sameAs: [
      "https://www.instagram.com/jamun_usa",
      "https://www.linkedin.com/company/jamun-org",
    ],
    nonprofit: {
      "@type": "NonprofitType",
      name: "501(c)(3)",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "Middle School Students (Grades 5-8)",
    },
    keywords: [
      "Model UN",
      "Mock Trial",
      "Mathletes",
      "middle school academics",
      "youth debate",
      "public speaking",
      "leadership development",
    ],
    slogan: siteConfig.motto,
  };
}

// Website Schema
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// Course/Program Schema for educational programs
export function generateProgramSchema(program: {
  name: string;
  description: string;
  url: string;
  image?: string;
  provider?: string;
  educationalLevel?: string;
  skills?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.name,
    description: program.description,
    url: `${siteConfig.url}${program.url}`,
    image: program.image ? `${siteConfig.url}${program.image}` : undefined,
    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
    educationalLevel: program.educationalLevel || "Middle School (Grades 5-8)",
    isAccessibleForFree: true,
    teaches: program.skills || [],
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
  };
}

// Article/Blog Post Schema
export function generateArticleSchema(article: {
  title: string;
  description: string;
  /** Absolute, locale-aware URL of the article (use the page's canonical). */
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  category?: string;
  /** BCP-47 tag matching the page locale (e.g. "es-ES"). Defaults to en-US. */
  inLanguage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image ? `${siteConfig.url}${article.image}` : undefined,
    datePublished: toISODate(article.datePublished),
    dateModified: toISODate(article.dateModified || article.datePublished),
    author: {
      "@type": "Person",
      name: article.author.name,
      url: article.author.url,
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: siteConfig.fullName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logos/jamun-logo-512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    articleSection: article.category,
    inLanguage: article.inLanguage ?? "en-US",
  };
}

// Learning resource schema for free educational guides (Model UN / Mock Trial).
export function generateLearningResourceSchema(resource: {
  title: string;
  description: string;
  /** Absolute, locale-aware URL (use the page's canonical). */
  url: string;
  inLanguage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: resource.title,
    description: resource.description,
    url: resource.url,
    isAccessibleForFree: true,
    learningResourceType: "Guide",
    educationalLevel: "Middle School (Grades 5-8)",
    inLanguage: resource.inLanguage ?? "en-US",
    provider: {
      "@type": "EducationalOrganization",
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

// ItemList schema (e.g. the programs index listing the 3 program offerings).
export function generateItemListSchema(
  locale: string,
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: localizedUrl(locale, item.url),
    })),
  };
}

// FAQ Schema for FAQ sections
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Breadcrumb Schema. `locale` makes the item URLs locale-aware so a breadcrumb
// on /es/modelun points at /es/... (matching the page's canonical), not the
// English URL. Pass item.url as the un-prefixed English path ("/", "/programs").
export function generateBreadcrumbSchema(
  locale: string,
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      // Treat "/" as the home root so it doesn't pick up a trailing slash.
      item: localizedUrl(locale, item.url === "/" ? "" : item.url),
    })),
  };
}

// Helper to create JSON-LD script content
export function jsonLdScript(schema: object | object[]): string {
  return JSON.stringify(Array.isArray(schema) ? schema : schema);
}
