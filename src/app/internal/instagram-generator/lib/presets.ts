// Content presets for quick randomization

import type { PostContent, TemplateType, GradientPreset } from './types';

// Event presets - with viral-style hooks
export const eventPresets: Partial<PostContent>[] = [
  // Hook-style headlines (stop the scroll)
  {
    headline: 'This Changes Everything',
    subheadline: 'Spring Conference',
    eventDate: 'March 15, 2025',
    eventLocation: 'San Jose, CA',
    ctaText: 'I Want In →',
  },
  {
    headline: 'Ready to Level Up?',
    subheadline: 'MUN Training Camp',
    eventDate: 'June 20-24, 2025',
    eventLocation: 'Stanford University',
    ctaText: 'Apply Now →',
  },
  {
    headline: "Don't Miss This",
    subheadline: 'Limited Spots',
    eventDate: 'November 8, 2025',
    eventLocation: 'San Francisco',
    ctaText: 'Save My Spot →',
  },
  {
    headline: 'Your Voice Matters',
    subheadline: 'Spring Conference',
    eventDate: 'March 15, 2025',
    eventLocation: 'Bay Area',
    ctaText: 'Register Free →',
  },
  // Traditional but impactful
  {
    headline: 'Spring Model UN',
    subheadline: 'Registration Open',
    eventDate: 'March 15, 2025',
    eventLocation: 'San Jose, CA',
    ctaText: 'Register Now →',
  },
  {
    headline: 'Mock Trial Invitational',
    subheadline: 'Compete. Learn. Win.',
    eventDate: 'April 5, 2025',
    eventLocation: 'Bay Area',
    ctaText: 'Sign Up →',
  },
  {
    headline: 'Free Workshop',
    subheadline: 'Every Saturday',
    eventDate: 'Saturdays @ 10am',
    eventLocation: 'Online via Zoom',
    ctaText: 'Join Free →',
  },
  {
    headline: 'Fall Conference',
    subheadline: 'Biggest Event Yet',
    eventDate: 'November 8, 2025',
    eventLocation: 'San Francisco',
    ctaText: 'Register →',
  },
];

// Stats presets - punchy, impactful numbers
export const statsPresets: Partial<PostContent>[] = [
  {
    statNumber: '500+',
    statLabel: 'Students Empowered',
    statContext: 'And counting. Join the movement.',
  },
  {
    statNumber: '30+',
    statLabel: 'Partner Schools',
    statContext: 'Across the Bay Area and growing fast',
  },
  {
    statNumber: '80+',
    statLabel: 'Teen Volunteers',
    statContext: 'Youth leading youth. That\'s the difference.',
  },
  {
    statNumber: '$70K',
    statLabel: 'In Grants',
    statContext: 'Because cost should never be a barrier',
  },
  {
    statNumber: '100%',
    statLabel: 'Youth-Led',
    statContext: 'No adults. Just students making it happen.',
  },
  {
    statNumber: '#1',
    statLabel: 'Middle School MUN',
    statContext: 'The Bay Area\'s premier program',
  },
  {
    statNumber: '2019',
    statLabel: 'Since Day One',
    statContext: 'Started by students. Run by students.',
  },
  {
    statNumber: '15+',
    statLabel: 'Conferences',
    statContext: 'Creating leaders since 2019',
  },
  {
    statNumber: '3',
    statLabel: 'Programs',
    statContext: 'MUN • Mock Trial • Mathletes',
  },
  {
    statNumber: '5-8',
    statLabel: 'Grades',
    statContext: 'Where future leaders begin',
  },
];

// Tips presets - short, punchy, actionable
export const tipsPresets: Partial<PostContent>[] = [
  {
    tipNumber: '1',
    tipTitle: 'Know Your Country',
    tipContent: 'Research before you speak. Understand your position inside and out.',
  },
  {
    tipNumber: '2',
    tipTitle: 'Speak Boldly',
    tipContent: 'Project. Make eye contact. Own the room. Confidence is contagious.',
  },
  {
    tipNumber: '3',
    tipTitle: 'Build Your Bloc',
    tipContent: 'Find allies early. Resolutions pass with coalitions, not solo acts.',
  },
  {
    tipNumber: '4',
    tipTitle: 'Take Notes',
    tipContent: 'Track positions. Spot allies. Good notes = better speeches.',
  },
  {
    tipNumber: '5',
    tipTitle: 'Listen First',
    tipContent: 'The best delegates respond to others. Don\'t just wait to talk.',
  },
  {
    tipNumber: '6',
    tipTitle: 'Dress Sharp',
    tipContent: 'Look professional. Feel professional. Western business attire.',
  },
  {
    tipNumber: '7',
    tipTitle: 'Know the Rules',
    tipContent: 'Motions. Points. Procedures. Master them. Use them.',
  },
  {
    tipNumber: '8',
    tipTitle: 'Stay in Character',
    tipContent: 'Represent your country, not yourself. That\'s the challenge.',
  },
  {
    tipNumber: '9',
    tipTitle: 'Ask Questions',
    tipContent: 'Confused? Ask a chair. Curious? Ask a delegate. Learn everything.',
  },
  {
    tipNumber: '10',
    tipTitle: 'Have Fun',
    tipContent: 'MUN is intense but also a blast. Make friends. Make memories.',
  },
];

// Quote presets - impactful, shareable
export const quotePresets: Partial<PostContent>[] = [
  // Student testimonials (relatable, emotional)
  {
    quote: 'I used to be terrified of public speaking. Now I crave it.',
    attribution: 'JAMUN Delegate',
    attributionTitle: '7th Grade',
  },
  {
    quote: 'MUN taught me my voice matters. Even at 12.',
    attribution: 'JAMUN Delegate',
    attributionTitle: '6th Grade',
  },
  {
    quote: 'The confidence I built here changed everything.',
    attribution: 'JAMUN Alumni',
    attributionTitle: 'Now in High School',
  },
  {
    quote: 'I found my people here. My future here.',
    attribution: 'First-Time Delegate',
    attributionTitle: '5th Grade',
  },
  // Famous quotes (authority, shareability)
  {
    quote: 'Education is the most powerful weapon to change the world.',
    attribution: 'Nelson Mandela',
    attributionTitle: '',
  },
  {
    quote: 'Never doubt that a small group of thoughtful, committed citizens can change the world.',
    attribution: 'Margaret Mead',
    attributionTitle: '',
  },
  {
    quote: 'The youth of today are the leaders of tomorrow.',
    attribution: 'JAMUN',
    attributionTitle: '',
  },
  // Brand messages (short, punchy)
  {
    quote: 'Make Academics Fun',
    attribution: 'JAMUN',
    attributionTitle: 'Our Motto',
  },
  {
    quote: 'By students. For students. Always.',
    attribution: 'JAMUN',
    attributionTitle: '100% Youth-Led',
  },
  {
    quote: 'Where middle schoolers become world leaders.',
    attribution: 'JAMUN',
    attributionTitle: 'Since 2019',
  },
];

// Photo presets - minimal text, photo-focused
export const photoPresets: Partial<PostContent>[] = [
  {
    headline: 'Moments That Matter',
    subheadline: '#JAMUNConference',
  },
  {
    headline: 'Making History',
    subheadline: '@jamunorg',
  },
  {
    headline: 'Future Leaders',
    subheadline: '#ModelUN',
  },
  {
    headline: '',
    subheadline: '@jamunorg • #MakeAcademicsFun',
  },
];

// Announcement presets - bold, attention-grabbing
export const announcementPresets: Partial<PostContent>[] = [
  {
    headline: 'Big News!',
    subheadline: 'Something exciting is coming...',
    ctaText: 'Stay Tuned →',
  },
  {
    headline: 'Mark Your Calendars',
    subheadline: 'Announcement dropping soon',
    ctaText: 'Follow for updates',
  },
  {
    headline: 'You Asked. We Listened.',
    subheadline: 'A new program is here.',
    ctaText: 'Learn More →',
  },
  {
    headline: 'Registration Open!',
    subheadline: 'Limited spots available',
    ctaText: 'Sign Up Now →',
  },
];

// Carousel hook presets - stop the scroll
export const carouselHookPresets: Partial<PostContent>[] = [
  {
    headline: 'Stop Scrolling.',
    subheadline: 'This will change everything.',
    ctaText: 'Swipe →',
  },
  {
    headline: 'Nobody talks about this.',
    subheadline: 'But it\'s the key to winning Best Delegate.',
    ctaText: 'Swipe to learn →',
  },
  {
    headline: '5 Mistakes',
    subheadline: 'That cost delegates awards',
    ctaText: 'Are you making them? →',
  },
  {
    headline: 'The Secret',
    subheadline: 'To confident public speaking',
    ctaText: 'Swipe for tips →',
  },
  {
    headline: 'What I Wish I Knew',
    subheadline: 'Before my first conference',
    ctaText: 'Read this →',
  },
];

// Get random preset by type
export function getRandomPreset(type: TemplateType): Partial<PostContent> {
  const presets: Record<TemplateType, Partial<PostContent>[]> = {
    event: eventPresets,
    stats: statsPresets,
    tips: tipsPresets,
    quote: quotePresets,
    photo: photoPresets,
    announcement: announcementPresets,
    'carousel-hook': carouselHookPresets,
  };

  const typePresets = presets[type];
  return typePresets[Math.floor(Math.random() * typePresets.length)];
}

// Gradient presets - JAMUN brand colors only
export const gradientPresets: Record<
  GradientPreset,
  { from: string; via?: string; to: string; name: string; category: 'brand' | 'program' }
> = {
  // JAMUN Brand gradients
  'blue-purple': {
    from: '#1e3a5f',
    via: '#397bce',
    to: '#7c3aed',
    name: 'JAMUN Classic',
    category: 'brand',
  },
  'blue-teal': {
    from: '#0c4a6e',
    via: '#0d9488',
    to: '#14b8a6',
    name: 'Ocean Breeze',
    category: 'brand',
  },
  'purple-pink': {
    from: '#5b21b6',
    via: '#c026d3',
    to: '#ec4899',
    name: 'Purple Dream',
    category: 'brand',
  },
  ocean: {
    from: '#0ea5e9',
    via: '#397bce',
    to: '#1e40af',
    name: 'Deep Ocean',
    category: 'brand',
  },
  // Program-specific gradients matching website
  'mun-classic': {
    from: '#1e3a5f',
    via: '#397bce',
    to: '#0ea5e9',
    name: 'Model UN',
    category: 'program',
  },
  'mun-bold': {
    from: '#0c4a6e',
    via: '#0284c7',
    to: '#38bdf8',
    name: 'MUN Bold',
    category: 'program',
  },
  'mocktrial-classic': {
    from: '#4c1d95',
    via: '#7c3aed',
    to: '#a78bfa',
    name: 'Mock Trial',
    category: 'program',
  },
  'mocktrial-bold': {
    from: '#5b21b6',
    via: '#8b5cf6',
    to: '#c4b5fd',
    name: 'MT Bold',
    category: 'program',
  },
  'mathletes-classic': {
    from: '#064e3b',
    via: '#059669',
    to: '#10b981',
    name: 'Mathletes',
    category: 'program',
  },
  'mathletes-bold': {
    from: '#065f46',
    via: '#10b981',
    to: '#6ee7b7',
    name: 'Math Bold',
    category: 'program',
  },
};

// Get random gradient
export function getRandomGradient(): GradientPreset {
  const gradients = Object.keys(gradientPresets) as GradientPreset[];
  return gradients[Math.floor(Math.random() * gradients.length)];
}
