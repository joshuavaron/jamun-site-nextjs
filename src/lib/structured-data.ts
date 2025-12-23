import { siteConfig } from "@/config/site";

// Organization Schema for JAMUN
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logos/jamun-logo.svg`,
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
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${siteConfig.url}${article.url}`,
    image: article.image ? `${siteConfig.url}${article.image}` : undefined,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
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
        url: `${siteConfig.url}/images/logos/jamun-logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}${article.url}`,
    },
    articleSection: article.category,
    inLanguage: "en-US",
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

// Breadcrumb Schema
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

// Event Schema for conferences
export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  url: string;
  image?: string;
  organizer?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: event.location
      ? {
          "@type": "Place",
          name: event.location,
        }
      : undefined,
    url: `${siteConfig.url}${event.url}`,
    image: event.image ? `${siteConfig.url}${event.image}` : undefined,
    organizer: {
      "@type": "EducationalOrganization",
      name: event.organizer || siteConfig.fullName,
      url: siteConfig.url,
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  };
}

// Donation/NonprofitDonation Schema
export function generateDonationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    recipient: {
      "@type": "EducationalOrganization",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
    description:
      "Support JAMUN's mission to make academic competitions accessible to all middle school students through Model UN, Mock Trial, and Mathletes programs.",
    url: `${siteConfig.url}/donate`,
  };
}

// Helper to create JSON-LD script content
export function jsonLdScript(schema: object | object[]): string {
  return JSON.stringify(Array.isArray(schema) ? schema : schema);
}
