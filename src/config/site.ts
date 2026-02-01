export const siteConfig = {
  name: "JAMUN",
  fullName: "The Junior Assembly of the Model United Nations",
  description:
    "Affordable academic competition programs for middle school students (grades 5-8). Build public speaking, critical thinking, debate, and leadership skills through Model UN, Mock Trial, and Mathletes competitions. Grants available.",
  motto: "Make Academics Fun",
  url: "https://jamun.org",
  email: "contact@jamun.org",

  // SEO Configuration
  seo: {
    titleTemplate: "%s | JAMUN",
    defaultTitle: "Model UN & Academic Competitions for Grades 5-8 | JAMUN",
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "JAMUN - Junior Assembly of Model United Nations",
    },
    twitter: {
      cardType: "summary_large_image",
      // Add handle when available: handle: "@JAMUNorg",
    },
    // Primary keywords for search intent
    keywords: {
      primary: [
        "Model UN middle school",
        "Mock Trial for kids",
        "middle school math competitions",
        "academic competitions grades 5-8",
        "youth debate programs",
        "public speaking for students",
      ],
      secondary: [
        "Model United Nations",
        "MUN for beginners",
        "mock trial competition",
        "mathletes program",
        "leadership skills middle school",
        "critical thinking activities",
        "affordable extracurricular activities",
        "college prep middle school",
        "academic enrichment programs",
        "youth nonprofit organization",
      ],
      longTail: [
        "how to start a Model UN club",
        "Model UN position paper guide",
        "mock trial cross examination tips",
        "MATHCOUNTS preparation",
        "AMC 8 practice problems",
        "extracurriculars for college admissions",
        "magnet school preparation",
        "debate skills for middle schoolers",
        "affordable academic programs for students",
        "nonprofit grants for students",
      ],
    },
  },

  links: {
    donate: "/donate",
    register: "/register",
    grants: "/grants",
  },

  nav: {
    main: [
      { label: "Programs", href: "/programs" },
      { label: "About", href: "/about" },
      { label: "Supporters", href: "/supporters" },
      { label: "Blog", href: "/blog" },
      { label: "Resources", href: "/modelun/resources" },
      { label: "Contact", href: "mailto:contact@jamun.org" },
    ],
    cta: [
      { label: "Grants", href: "/grants", variant: "ghost" as const },
      { label: "Donate", href: "/donate", variant: "accent" as const },
      { label: "Register", href: "/register", variant: "primary" as const },
    ],
  },

  footer: {
    programs: [
      { label: "Model UN", href: "/modelun" },
      { label: "Mock Trial", href: "/mocktrial" },
      { label: "Mathletes", href: "/mathletes" },
      { label: "Leaderboards", href: "/leaderboards" },
    ],
    organization: [
      { label: "About Us", href: "/about" },
      { label: "Supporters", href: "/supporters" },
      { label: "Contact", href: "mailto:contact@jamun.org" },
    ],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "School Referral", href: "/referral" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },

  stats: [
    { value: "500+", label: "Students Impacted" },
    { value: "30+", label: "Schools Reached" },
    { value: "80+", label: "Volunteers" },
    { value: "$70K+", label: "Raised for Programs" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

// Default OpenGraph image for all pages — import in layouts to avoid
// child openGraph objects overriding the parent's image config.
export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "JAMUN - Affordable Academic Competitions for Middle School",
};
