// Design System for Instagram Post Generator
// Based on viral content research and Gen Z design preferences

// ============================================
// COLOR SYSTEM
// ============================================

export const colors = {
  // Brand colors
  jamunBlue: '#397bce',
  jamunOrange: '#f97316',
  purple: '#9333ea',

  // Extended palette for variety
  electricBlue: '#3b82f6',
  neonPink: '#ec4899',
  vibrantTeal: '#14b8a6',
  sunsetOrange: '#f59e0b',
  deepPurple: '#7c3aed',
  hotPink: '#db2777',
  lime: '#84cc16',
  cyan: '#06b6d4',

  // Neutrals
  white: '#ffffff',
  warmWhite: '#fafafa',
  lightGray: '#f3f4f6',
  darkGray: '#1f2937',
  black: '#000000',
};

// High-impact gradient combinations (research-backed)
export const gradients = {
  // Bold, attention-grabbing
  electricSunset: {
    name: 'Electric Sunset',
    colors: ['#f97316', '#ec4899', '#8b5cf6'],
    angle: 135,
    category: 'bold',
  },
  neonNight: {
    name: 'Neon Night',
    colors: ['#0f172a', '#7c3aed', '#ec4899'],
    angle: 135,
    category: 'bold',
  },
  cyberPunk: {
    name: 'Cyber Punk',
    colors: ['#06b6d4', '#8b5cf6', '#ec4899'],
    angle: 135,
    category: 'bold',
  },
  fireStorm: {
    name: 'Fire Storm',
    colors: ['#dc2626', '#f97316', '#fbbf24'],
    angle: 135,
    category: 'bold',
  },

  // Professional, trustworthy
  oceanDeep: {
    name: 'Ocean Deep',
    colors: ['#0c4a6e', '#0369a1', '#0ea5e9'],
    angle: 135,
    category: 'professional',
  },
  jamunClassic: {
    name: 'JAMUN Classic',
    colors: ['#1e3a5f', '#397bce', '#60a5fa'],
    angle: 135,
    category: 'professional',
  },
  midnightPurple: {
    name: 'Midnight Purple',
    colors: ['#1e1b4b', '#5b21b6', '#8b5cf6'],
    angle: 135,
    category: 'professional',
  },

  // Warm, approachable
  goldenHour: {
    name: 'Golden Hour',
    colors: ['#dc2626', '#f97316', '#fcd34d'],
    angle: 180,
    category: 'warm',
  },
  peachy: {
    name: 'Peachy',
    colors: ['#fb7185', '#fdba74', '#fef08a'],
    angle: 135,
    category: 'warm',
  },

  // Dark/dramatic
  darkMode: {
    name: 'Dark Mode',
    colors: ['#000000', '#1f2937', '#374151'],
    angle: 180,
    category: 'dark',
  },
  cosmicDark: {
    name: 'Cosmic Dark',
    colors: ['#0f0f23', '#1a1a3e', '#2d2d5a'],
    angle: 135,
    category: 'dark',
  },
};

export type GradientKey = keyof typeof gradients;

// ============================================
// TYPOGRAPHY SYSTEM
// ============================================

export const typography = {
  // Impact headlines - stop the scroll
  impactHeadline: {
    fontSize: 96, // Will be scaled
    fontWeight: 900,
    lineHeight: 0.95,
    letterSpacing: '-0.02em',
  },

  // Bold headlines
  boldHeadline: {
    fontSize: 72,
    fontWeight: 800,
    lineHeight: 1.0,
    letterSpacing: '-0.01em',
  },

  // Regular headlines
  headline: {
    fontSize: 56,
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '0',
  },

  // Subheadlines
  subheadline: {
    fontSize: 32,
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '0.01em',
  },

  // Body text
  body: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0',
  },

  // Large stats/numbers
  statNumber: {
    fontSize: 180,
    fontWeight: 900,
    lineHeight: 0.9,
    letterSpacing: '-0.03em',
  },

  // Badges/labels
  badge: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
  },

  // Small text
  caption: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: '0.02em',
  },
};

// ============================================
// VISUAL ELEMENTS
// ============================================

export const badges = {
  pill: {
    borderRadius: 9999,
    paddingX: 24,
    paddingY: 12,
  },
  rounded: {
    borderRadius: 16,
    paddingX: 20,
    paddingY: 10,
  },
  sharp: {
    borderRadius: 4,
    paddingX: 16,
    paddingY: 8,
  },
};

export const decorativeElements = {
  // Blob shapes for backgrounds
  blob: {
    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
  },

  // Glow effects
  glow: {
    small: '0 0 20px',
    medium: '0 0 40px',
    large: '0 0 80px',
  },

  // Border styles
  borders: {
    thick: 4,
    medium: 2,
    thin: 1,
  },
};

// ============================================
// HOOK/HEADLINE TEMPLATES
// ============================================

export const hookTemplates = {
  curiosity: [
    'The Secret to...',
    'Why Nobody Talks About...',
    'What They Don\'t Tell You About...',
    'The Truth About...',
    'Stop Making This Mistake',
    'You\'re Doing It Wrong',
  ],

  listicle: [
    '{number} Ways to...',
    '{number} Tips for...',
    '{number} Secrets of...',
    '{number} Things You Need to Know',
    '{number} Mistakes to Avoid',
    'The Top {number}...',
  ],

  howTo: [
    'How to...',
    'The Ultimate Guide to...',
    'Master the Art of...',
    'A Step-by-Step Guide to...',
    'Everything You Need to Know About...',
  ],

  emotional: [
    'This Changed Everything',
    'I Wish I Knew This Sooner',
    'Game Changer:',
    'Finally:',
    'The Moment That Changed...',
  ],

  question: [
    'Are You Ready for...?',
    'What Would You Do If...?',
    'Can You Handle...?',
    'Want to Know...?',
    'Ready to Level Up?',
  ],

  urgency: [
    'Don\'t Miss This',
    'Last Chance:',
    'Registration Closing Soon',
    'Limited Spots Available',
    'Act Now:',
  ],
};

// ============================================
// LAYOUT COMPOSITIONS
// ============================================

export const layouts = {
  // Centered impact - big text in center
  centeredImpact: {
    contentAlign: 'center',
    textAlign: 'center',
    verticalPosition: 'center',
  },

  // Top-heavy - content at top, space at bottom
  topHeavy: {
    contentAlign: 'center',
    textAlign: 'center',
    verticalPosition: 'top',
  },

  // Bottom-heavy - content at bottom, image space at top
  bottomHeavy: {
    contentAlign: 'center',
    textAlign: 'center',
    verticalPosition: 'bottom',
  },

  // Left-aligned editorial
  editorial: {
    contentAlign: 'flex-start',
    textAlign: 'left',
    verticalPosition: 'center',
  },

  // Split - text on one side, visual on other
  split: {
    contentAlign: 'flex-start',
    textAlign: 'left',
    verticalPosition: 'center',
  },
};

// ============================================
// SWIPE/CTA ELEMENTS
// ============================================

export const ctaElements = {
  swipeIndicators: [
    '→ Swipe',
    'Swipe →',
    '← Swipe for more',
    'Keep swiping →',
  ],

  engagementCTAs: [
    '💾 Save this for later',
    '🔖 Bookmark this',
    '📤 Share with a friend',
    '💬 Comment below',
    '👇 Tag someone who needs this',
    '❤️ Double tap if you agree',
  ],

  actionCTAs: [
    'Register Now →',
    'Learn More →',
    'Join Us →',
    'Sign Up Today',
    'Get Started →',
    'Link in Bio',
  ],
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function buildGradient(gradientKey: GradientKey): string {
  const g = gradients[gradientKey];
  if (g.colors.length === 2) {
    return `linear-gradient(${g.angle}deg, ${g.colors[0]}, ${g.colors[1]})`;
  }
  return `linear-gradient(${g.angle}deg, ${g.colors[0]}, ${g.colors[1]}, ${g.colors[2]})`;
}

export function getRandomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateHook(template: string, number?: number): string {
  return template.replace('{number}', String(number || Math.floor(Math.random() * 5) + 3));
}
