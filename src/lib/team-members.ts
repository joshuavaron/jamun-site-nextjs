import {
  Heart,
  Users,
  BookOpen,
  Calculator,
  DollarSign,
  Receipt,
  Shield,
  TrendingUp,
  PenTool,
  Library,
  Newspaper,
  Sparkles,
  Languages,
  Globe2,
  MessageCircle,
  School,
  Trophy,
  Handshake,
  Building2,
  HeartHandshake,
  Plane,
  MapPin,
  Compass,
  type LucideIcon,
} from "lucide-react";

export type FocusArea = {
  icon: LucideIcon;
  title: string;
  body: string;
  color: string;
};

export type TeamMember = {
  /** URL slug — drives `/about/[slug]`. */
  slug: string;
  /** Key into the AboutPage.team.members translation namespace. */
  messageKey: string;
  /** Fallback initials for the avatar when there's no photo. */
  initials: string;
  /** Brand accent color for headings, links, and the IconTiles on their page. */
  color: string;
  /** Square headshot used on the AboutPage card. */
  photo: string | null;
  /** Hero photo on the personal page — uses headshot or a conference photo as backdrop. */
  heroPhoto: string;
  /** Whether the hero photo IS the team member (true) or a stand-in conference shot (false). */
  heroIsMember: boolean;
  /** Secondary photo used for the testimonial spread on the personal page. */
  testimonialPhoto: string;
  /** Final-CTA photo on the personal page. */
  ctaPhoto: string;
  /** Four areas they spend their time on — used in the IconTile grid. */
  focusAreas: FocusArea[];
  /** Personal-bio paragraphs shown on the page (two paragraphs). */
  paragraphs: [string, string];
  /** A blockquote that captures their angle on the work. */
  quote: string;
  /** Photo alt for the hero. */
  heroPhotoAlt: string;
  /** Direct email — empty string falls back to the shared inbox. */
  email?: string;
  /** Optional "Beyond JAMUN" personal sidebar — school, hobbies, future plans. Two paragraphs. */
  beyondJamun?: {
    heading: string;
    paragraphs: [string, string];
  };
};

const SHARED_PHOTOS = {
  studentsAtTable: "/images/conferences/DSCF9440.webp",
  voting: "/images/conferences/DSCF9356.webp",
  studentsConvo: "/images/conferences/DSCF9445.webp",
  awardWinners: "/images/conferences/DSC02053.webp",
  girlGesturing: "/images/conferences/DSCF9423.webp",
  twoGirlsReading: "/images/conferences/DSCF9435.webp",
  girlsTrio: "/images/conferences/DSCF9328.webp",
  boysCircle: "/images/conferences/DSCF9395.webp",
  candid5: "/images/conferences/DSCF9450.webp",
} as const;

export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: "joshua",
    messageKey: "joshuaVaron",
    initials: "JV",
    color: "#397bce",
    photo: "/images/team/joshua_square.jpg",
    heroPhoto: "/images/team/joshua_corrected.jpg",
    heroIsMember: true,
    testimonialPhoto: "/images/conferences/DSCF9438.webp",
    ctaPhoto: SHARED_PHOTOS.awardWinners,
    heroPhotoAlt: "Joshua Varon, founder and president of JAMUN",
    email: "joshua@jamun.org",
    paragraphs: [
      "When I was eleven, a Model UN conference cracked open a part of my brain I didn't know existed. Suddenly research felt like a contact sport and a room full of strangers felt like a team I'd been waiting to join.",
      "JAMUN started as a refusal to accept that those rooms were paywalled — and grew, conference by conference, into the program I wished had existed when I was eleven.",
    ],
    quote:
      "Smart isn't a club. It's a habit. Every middle schooler deserves a room where that habit gets celebrated.",
    focusAreas: [
      { icon: Heart, title: "Access", body: "Removing the price tag from academic competition.", color: "#397bce" },
      { icon: Users, title: "Building teams", body: "Recruiting and mentoring the 80+ student volunteers.", color: "#9333ea" },
      { icon: BookOpen, title: "Curriculum", body: "Designing the prep materials that turn curiosity into skill.", color: "#10b981" },
      { icon: Calculator, title: "Math & systems", body: "Studying mathematics and computer science at Duke.", color: "#f97316" },
    ],
  },
  {
    slug: "dustin",
    messageKey: "dustinSimon",
    initials: "DS",
    color: "#10b981",
    photo: "/images/team/dustin.webp",
    heroPhoto: "/images/team/dustin.webp",
    heroIsMember: true,
    testimonialPhoto: SHARED_PHOTOS.studentsAtTable,
    ctaPhoto: SHARED_PHOTOS.voting,
    heroPhotoAlt: "Dustin Simon, Treasurer of JAMUN",
    paragraphs: [
      "Every grant we award, every conference we run, every translator we pay — it all passes through a spreadsheet I'm somewhere inside. As treasurer, my job is to make sure JAMUN's money does exactly what we told donors it would, and that nothing gets in the way of a student walking through a conference door.",
      "Outside of JAMUN I'm a mathematics student, and the two roles overlap more than you'd think — both are about making sure the numbers actually add up to what people expect them to.",
    ],
    quote:
      "A nonprofit's books should tell the same story its mission does. My job is keeping those two in sync.",
    focusAreas: [
      { icon: DollarSign, title: "Stewardship", body: "Every dollar tracked to the program and student it serves.", color: "#10b981" },
      { icon: Receipt, title: "Grant fund", body: "Operating the grant program that covers up to 100% of conference costs.", color: "#397bce" },
      { icon: Shield, title: "Compliance", body: "Keeping JAMUN's 501(c)(3) standing and donor reporting airtight.", color: "#9333ea" },
      { icon: TrendingUp, title: "Sustainability", body: "Building reserves so programs survive a slow fundraising year.", color: "#f97316" },
    ],
  },
  {
    slug: "charlie",
    messageKey: "charlieFumerton",
    initials: "CF",
    color: "#f97316",
    photo: "/images/team/charlie.webp",
    heroPhoto: "/images/team/charlie.webp",
    heroIsMember: true,
    testimonialPhoto: SHARED_PHOTOS.studentsConvo,
    ctaPhoto: SHARED_PHOTOS.twoGirlsReading,
    heroPhotoAlt: "Charlie Fumerton, Director of Content at JAMUN",
    paragraphs: [
      "Most middle schoolers walk into their first Model UN, Mock Trial, or math meet with nothing but nerves and a Google Doc. I run the team that fixes that — building the curriculum, blog, and free resource library that turn a blank page into a real preparation plan.",
      "I'm a volleyball player with a stubborn interest in politics and international relations, which means I tend to read about a topic for three hours before writing a single sentence about it. JAMUN's resource library is the better-organized version of my browser history.",
    ],
    quote:
      "Free resources only matter if they're good enough to compete with the paid ones. That's the bar.",
    focusAreas: [
      { icon: Library, title: "Resource library", body: "Background guides, training docs, and prep packets — all free.", color: "#f97316" },
      { icon: PenTool, title: "Curriculum", body: "Designing what students actually do at conferences and practices.", color: "#397bce" },
      { icon: Newspaper, title: "Blog", body: "Writing about strategy, current events, and the craft of competing.", color: "#9333ea" },
      { icon: Sparkles, title: "Editorial polish", body: "Keeping the JAMUN voice clear, warm, and never condescending.", color: "#10b981" },
    ],
  },
  {
    slug: "dany",
    messageKey: "danyEsparza",
    initials: "DE",
    color: "#9333ea",
    photo: null,
    heroPhoto: SHARED_PHOTOS.girlsTrio,
    heroIsMember: false,
    testimonialPhoto: SHARED_PHOTOS.girlGesturing,
    ctaPhoto: SHARED_PHOTOS.candid5,
    heroPhotoAlt: "JAMUN students in committee — a stand-in for Dany's work",
    paragraphs: [
      "I co-lead JAMUN's multilingual programming with Bella. Together we make sure that a student whose first language is Spanish never has to choose between competing well and feeling at home in the room. That means translated curriculum, bilingual coaches, and conferences where parents can ask real questions in the language they live in.",
      "Multilingual programming isn't a checkbox — it's a promise that the door is actually open. My job is making sure that promise holds at every step, from the first email home to the closing-ceremony gavel.",
    ],
    quote:
      "Translation is the easy part. Belonging is the work.",
    focusAreas: [
      { icon: Languages, title: "Spanish curriculum", body: "Translating and adapting every training doc, packet, and rubric.", color: "#9333ea" },
      { icon: MessageCircle, title: "Family outreach", body: "Communicating with parents in their first language, not ours.", color: "#397bce" },
      { icon: School, title: "Partner schools", body: "Building relationships with Spanish-speaking schools and educators.", color: "#10b981" },
      { icon: Globe2, title: "Multilingual events", body: "Running bilingual practices and committees that feel native, not translated.", color: "#f97316" },
    ],
  },
  {
    slug: "bella",
    messageKey: "bellaEsparza",
    initials: "BE",
    color: "#9333ea",
    photo: "/images/team/bella_square.webp",
    heroPhoto: "/images/team/bella.webp",
    heroIsMember: true,
    testimonialPhoto: SHARED_PHOTOS.girlsTrio,
    ctaPhoto: SHARED_PHOTOS.studentsAtTable,
    heroPhotoAlt: "Bella Esparza, Co-Director of Multilingual Programming at JAMUN",
    paragraphs: [
      "I'm a high schooler at Deerfield High School, an immigrant from Mexico, and bilingual in Spanish and English — which means a lot of the kids JAMUN exists to reach grew up in a version of the room I once sat in. I know what it feels like to translate yourself before you speak, and I know what it feels like when someone builds a space where you don't have to.",
      "That experience shapes how I work. Cofounding girls' varsity wrestling at my school, leading our band as president, mentoring younger students — I've spent the last few years learning what it actually takes to build a room where everyone feels welcome to participate, not just invited to. Co-leading multilingual programming at JAMUN with Dany is the same job in a bigger setting: making sure language background never decides who gets to fully show up.",
    ],
    quote:
      "Translation gets you the words. Inclusion gets you the student.",
    focusAreas: [
      { icon: Heart, title: "Inclusive spaces", body: "Building the in-room culture that makes a delegate from any background feel ready to participate, not just invited.", color: "#9333ea" },
      { icon: Users, title: "Bilingual coaching", body: "Coaching delegates in both English and Spanish so confidence never hinges on which language a student thinks in.", color: "#397bce" },
      { icon: Globe2, title: "Cross-cultural collaboration", body: "Connecting delegates across countries, cultures, and perspectives — and making the resulting committees productive.", color: "#10b981" },
      { icon: HeartHandshake, title: "Mentorship", body: "Pairing newer bilingual delegates with returning ones so the welcome compounds year over year.", color: "#f97316" },
    ],
    beyondJamun: {
      heading: "Beyond JAMUN.",
      paragraphs: [
        "Outside JAMUN, I'm a high schooler at Deerfield High School with my sights on a career in medicine. The non-school version of my time goes mostly to hiking, cooking and baking, and community service projects in my area.",
        "The school version has filled up with leadership — cofounding and captaining girls' varsity wrestling, leading our band as president, and stepping into senior advisor and senior-leader roles for younger students. Different rooms, same idea: make sure everyone in them knows they belong there.",
      ],
    },
  },
  {
    slug: "jiahan",
    messageKey: "jiahanLyu",
    initials: "JL",
    color: "#ec4899",
    photo: "/images/team/jiahan_square.webp",
    heroPhoto: "/images/team/jiahan.webp",
    heroIsMember: true,
    testimonialPhoto: SHARED_PHOTOS.studentsAtTable,
    ctaPhoto: SHARED_PHOTOS.voting,
    heroPhotoAlt: "Jiahan Lyu, Director of International Programming at JAMUN",
    paragraphs: [
      "I grew up in Nanjing, China, and now study Economics and Public Policy at Duke — a route that gave me an opinion or two about what it actually takes to move ideas across borders. JAMUN started in one U.S. city, and my job is to figure out what it looks like in dozens more, across countries and education systems that each have their own rhythm.",
      "International programming isn't a translation project. It's a question of which parts of JAMUN are universal — the academic challenge, the welcome, the rigor — and which parts need to flex to fit local schools, families, and competitive cultures. The work is being honest about both, and then doing the slow groundwork of building partnerships that hold.",
    ],
    quote:
      "You don't grow a program internationally by copying it. You grow it by understanding why it works at home first.",
    focusAreas: [
      { icon: Globe2, title: "International chapters", body: "Helping partner organizations launch JAMUN programs outside the U.S.", color: "#ec4899" },
      { icon: Plane, title: "Cross-border events", body: "Coordinating conferences that draw delegates from multiple countries.", color: "#397bce" },
      { icon: MapPin, title: "Local adaptation", body: "Tailoring curriculum and timing to different academic calendars and cultures.", color: "#10b981" },
      { icon: Compass, title: "Strategy", body: "Picking the right markets to grow into — and the right pace to grow at.", color: "#f97316" },
    ],
    beyondJamun: {
      heading: "Beyond JAMUN.",
      paragraphs: [
        "Outside JAMUN, I'm a student at Duke University studying Economics and Public Policy — two fields that spend most of their time on the question of how programs actually work in practice, across populations and political contexts. They turn out to be useful training for running a nonprofit that wants to mean the same thing in seven countries.",
        "Before Duke, home was Nanjing. The hardest and most useful part of straddling those two places hasn't been the language or the time difference — it's the constant negotiation between two different defaults for how a room runs and what counts as polite. Most of JAMUN's international work is just an academic version of that negotiation, scaled up.",
      ],
    },
  },
  {
    slug: "will",
    messageKey: "willBallis",
    initials: "WB",
    color: "#0ea5e9",
    photo: "/images/team/will.webp",
    heroPhoto: "/images/team/will.webp",
    heroIsMember: true,
    testimonialPhoto: SHARED_PHOTOS.candid5,
    ctaPhoto: SHARED_PHOTOS.awardWinners,
    heroPhotoAlt: "Will Ballis, Director of Partnerships at JAMUN",
    paragraphs: [
      "I'm a former Mathletes champion who studied advanced mathematics, which is a roundabout way of saying I spent a chunk of my life inside the kind of program JAMUN now runs. I lead our partnerships work — connecting JAMUN with the schools, donors, and program sponsors that fund the grants and keep the lights on.",
      "Partnerships aren't a separate thing from the mission. They are the mission, in the form of the relationships that make access possible. My job is to find the people and institutions whose goals line up with ours, and to build the kind of trust that makes a long-term commitment make sense.",
    ],
    quote:
      "Every grant we hand out started as a conversation. The conversations are the work.",
    focusAreas: [
      { icon: School, title: "School partnerships", body: "Bringing JAMUN's programs to the schools that need them most.", color: "#0ea5e9" },
      { icon: Handshake, title: "Donor relationships", body: "Stewarding the supporters whose gifts fund every grant.", color: "#10b981" },
      { icon: Trophy, title: "Mathletes network", body: "Tapping the alumni community of academic competitors as mentors and donors.", color: "#f97316" },
      { icon: Building2, title: "Institutional grants", body: "Pursuing the foundation and corporate funding that scales access.", color: "#9333ea" },
    ],
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.slug === slug);
}
