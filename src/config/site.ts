export const siteConfig = {
  name: "JAMUN",
  fullName: "The Junior Assembly of the Model United Nations",
  description:
    "Academic competition programs for grades 5-8. Build public speaking, critical thinking, and leadership skills through Model UN, Mock Trial, and Mathletes.",
  motto: "Make Academics Fun",
  url: "https://jamun.org",
  email: "contact@jamun.org",

  links: {
    donate: "/donate",
    register: "/register",
    grants: "/grants",
  },

  nav: {
    main: [
      { label: "Programs", href: "/programs" },
      { label: "About", href: "/about" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
    cta: [
      { label: "Grants", href: "/grants", variant: "ghost" as const },
      { label: "Donate", href: "/donate", variant: "accent" as const },
      { label: "Register", href: "/register", variant: "primary" as const },
    ],
  },

  footer: {
    programs: [
      { label: "Model UN", href: "/programs/model-un" },
      { label: "Mock Trial", href: "/programs/mock-trial" },
      { label: "Mathletes", href: "/programs/mathletes" },
      { label: "Leaderboards", href: "/leaderboards" },
    ],
    organization: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    resources: [
      { label: "Blog", href: "/blog" },
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
