import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  generateProgramSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  jsonLdScript,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Mathletes Competition Program | Middle School Math Excellence",
  description:
    "Join JAMUN's Mathletes program for grades 5-8. Prepare for MATHCOUNTS, AMC 8, and Math League competitions. Develop problem-solving skills, number theory, algebra, and geometry through team-based competitive math.",
  keywords: [
    "Mathletes middle school",
    "MATHCOUNTS preparation",
    "AMC 8 practice",
    "middle school math competitions",
    "competitive math program",
    "math team grades 5-8",
    "problem solving math",
    "number theory students",
    "Math League preparation",
    "math olympiad training",
    "algebra competition",
    "geometry problem solving",
  ],
  openGraph: {
    title: "Mathletes - Competitive Math for Middle School - JAMUN",
    description:
      "Challenge yourself with competitive mathematics! Build analytical thinking, speed, and accuracy through engaging math competitions. Prepare for MATHCOUNTS and AMC 8.",
    url: `${siteConfig.url}/mathletes`,
    type: "website",
    images: [
      {
        url: "/images/conferences/homebackground2.webp",
        width: 1200,
        height: 630,
        alt: "JAMUN Mathletes Competition",
      },
    ],
  },
  alternates: {
    canonical: `${siteConfig.url}/mathletes`,
  },
};

// Structured data for Mathletes program
const mathletesSchema = generateProgramSchema({
  name: "Mathletes Competition Program",
  description:
    "Prepare for MATHCOUNTS, AMC 8, and Math League competitions through team-based competitive math training designed for middle school students in grades 5-8.",
  url: "/mathletes",
  image: "/images/conferences/homebackground2.webp",
  educationalLevel: "Middle School (Grades 5-8)",
  skills: [
    "Problem Solving",
    "Number Theory",
    "Algebra",
    "Geometry",
    "Mental Math",
    "Logical Reasoning",
    "Pattern Recognition",
    "Mathematical Communication",
  ],
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Programs", url: "/programs" },
  { name: "Mathletes", url: "/mathletes" },
]);

// FAQs for structured data
const mathletesFaqs = [
  {
    question: "Do I need to be a math genius to join Mathletes?",
    answer:
      "Not at all! Mathletes is for students who enjoy math and want to challenge themselves. We welcome all skill levels and provide training that helps everyone improve. Some of our best competitors started with no competition experience.",
  },
  {
    question: "What grades can participate?",
    answer:
      "JAMUN Mathletes is designed for middle school students in grades 5-8. We create age-appropriate practice materials and competition divisions so students compete with peers at similar levels.",
  },
  {
    question: "When does Mathletes start?",
    answer:
      "Mathletes begins in Fall 2026! We're currently building our curriculum and partnerships. Join our mailing list to be the first to know when registration opens.",
  },
  {
    question: "How much time does Mathletes require?",
    answer:
      "Mathletes involves about 4 hours per week with meetings every two weeks and 4 tournaments per year. Students are encouraged to do additional individual practice, but the time commitment is flexible based on your goals.",
  },
  {
    question: "What math level do I need?",
    answer:
      "If you're comfortable with pre-algebra concepts, you're ready to start! Our training covers topics from basic arithmetic through introductory algebra and geometry.",
  },
  {
    question: "Is there a cost to participate?",
    answer:
      "We work hard to keep costs minimal. Many of our resources are free, and we offer financial assistance for competition registration fees. No student should be unable to participate due to cost.",
  },
];

const faqSchema = generateFAQSchema(mathletesFaqs);

export default function MathletesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([mathletesSchema, breadcrumbSchema, faqSchema]),
        }}
      />
      {children}
    </>
  );
}
