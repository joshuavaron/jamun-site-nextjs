// Conference photo gallery for Instagram post backgrounds

import type { TemplateType } from './types';

export interface ConferencePhoto {
  path: string;
  description: string;
  tags: string[];
  recommended: TemplateType[];
}

export const conferencePhotos: ConferencePhoto[] = [
  // High-energy group shots - great for events and stats
  {
    path: '/images/conferences/DSC00054.webp',
    description: 'Large group conference shot',
    tags: ['group', 'conference', 'energy'],
    recommended: ['event', 'stats'],
  },
  {
    path: '/images/conferences/DSC00123.webp',
    description: 'Conference activity',
    tags: ['activity', 'engaged'],
    recommended: ['event', 'tips'],
  },
  {
    path: '/images/conferences/DSC00217.webp',
    description: 'Student engagement moment',
    tags: ['student', 'engagement'],
    recommended: ['quote', 'tips'],
  },
  {
    path: '/images/conferences/DSC00468.webp',
    description: 'Conference session',
    tags: ['session', 'learning'],
    recommended: ['event', 'tips'],
  },
  {
    path: '/images/conferences/DSC00832.webp',
    description: 'Program activity',
    tags: ['program', 'activity'],
    recommended: ['event', 'stats'],
  },
  {
    path: '/images/conferences/DSC00841.webp',
    description: 'Student focused work',
    tags: ['focus', 'work', 'student'],
    recommended: ['tips', 'quote'],
  },
  {
    path: '/images/conferences/DSC00848.webp',
    description: 'Model UN session',
    tags: ['model-un', 'session'],
    recommended: ['event', 'tips'],
  },
  {
    path: '/images/conferences/DSC00969.webp',
    description: 'Conference moment',
    tags: ['conference', 'moment'],
    recommended: ['event', 'stats'],
  },
  {
    path: '/images/conferences/DSC01032.webp',
    description: 'Student presentation',
    tags: ['presentation', 'speaking'],
    recommended: ['tips', 'quote'],
  },
  {
    path: '/images/conferences/DSC01054.webp',
    description: 'Conference activity',
    tags: ['activity', 'engagement'],
    recommended: ['event', 'stats'],
  },
  {
    path: '/images/conferences/DSC01301.webp',
    description: 'Large conference shot',
    tags: ['large', 'conference', 'group'],
    recommended: ['event', 'stats'],
  },
  {
    path: '/images/conferences/DSC01362.webp',
    description: 'Conference engagement',
    tags: ['engagement', 'active'],
    recommended: ['event', 'tips'],
  },
  {
    path: '/images/conferences/DSC01363.webp',
    description: 'Student activity',
    tags: ['student', 'activity'],
    recommended: ['tips', 'quote'],
  },
  {
    path: '/images/conferences/DSC01364.webp',
    description: 'Conference participation',
    tags: ['participation', 'active'],
    recommended: ['event', 'stats'],
  },
  {
    path: '/images/conferences/DSC01567.webp',
    description: 'Focused session',
    tags: ['focus', 'session'],
    recommended: ['tips', 'quote'],
  },
  {
    path: '/images/conferences/DSC01601.webp',
    description: 'Conference learning',
    tags: ['learning', 'educational'],
    recommended: ['tips', 'event'],
  },
  {
    path: '/images/conferences/DSC01684.webp',
    description: 'Hero conference shot',
    tags: ['hero', 'conference', 'impactful'],
    recommended: ['event', 'stats'],
  },
  {
    path: '/images/conferences/DSC01722.webp',
    description: 'Main hero image',
    tags: ['hero', 'main', 'highlight'],
    recommended: ['event', 'stats'],
  },
  {
    path: '/images/conferences/DSC01723.webp',
    description: 'Conference moment',
    tags: ['moment', 'conference'],
    recommended: ['quote', 'tips'],
  },
  {
    path: '/images/conferences/DSC01724.webp',
    description: 'Student interaction',
    tags: ['interaction', 'students'],
    recommended: ['quote', 'event'],
  },
  {
    path: '/images/conferences/DSC01852.webp',
    description: 'Feature moment',
    tags: ['feature', 'highlight'],
    recommended: ['tips', 'quote'],
  },
  {
    path: '/images/conferences/DSC02012.webp',
    description: 'Student success',
    tags: ['success', 'achievement'],
    recommended: ['stats', 'quote'],
  },
  {
    path: '/images/conferences/DSC02015.webp',
    description: 'Conference activity',
    tags: ['activity', 'engaged'],
    recommended: ['event', 'tips'],
  },
  {
    path: '/images/conferences/DSC02021.webp',
    description: 'Learning moment',
    tags: ['learning', 'education'],
    recommended: ['tips', 'event'],
  },
  {
    path: '/images/conferences/DSC02030.webp',
    description: 'Student engagement',
    tags: ['engagement', 'students'],
    recommended: ['quote', 'stats'],
  },
  {
    path: '/images/conferences/DSC02050.webp',
    description: 'Conference participation',
    tags: ['participation', 'active'],
    recommended: ['event', 'stats'],
  },
  {
    path: '/images/conferences/DSC02053.webp',
    description: 'Parent observation',
    tags: ['parents', 'community'],
    recommended: ['quote', 'stats'],
  },
  {
    path: '/images/conferences/DSC02088.webp',
    description: 'Active session',
    tags: ['active', 'session'],
    recommended: ['event', 'tips'],
  },
  {
    path: '/images/conferences/DSC02089.webp',
    description: 'Conference energy',
    tags: ['energy', 'conference'],
    recommended: ['event', 'stats'],
  },
  {
    path: '/images/conferences/DSC02128.webp',
    description: 'Mock Trial activity',
    tags: ['mock-trial', 'activity'],
    recommended: ['event', 'tips'],
  },
  {
    path: '/images/conferences/DSC02135.webp',
    description: 'Educator section',
    tags: ['educator', 'teaching'],
    recommended: ['tips', 'quote'],
  },
  // Gallery images
  {
    path: '/images/conferences/gallery-1.webp',
    description: 'Gallery highlight 1',
    tags: ['gallery', 'highlight'],
    recommended: ['event', 'stats'],
  },
  {
    path: '/images/conferences/gallery-2.webp',
    description: 'Gallery highlight 2',
    tags: ['gallery', 'highlight'],
    recommended: ['quote', 'tips'],
  },
  {
    path: '/images/conferences/gallery-3.webp',
    description: 'Gallery highlight 3',
    tags: ['gallery', 'highlight'],
    recommended: ['event', 'stats'],
  },
  {
    path: '/images/conferences/gallery-4.webp',
    description: 'Gallery highlight 4',
    tags: ['gallery', 'highlight'],
    recommended: ['tips', 'quote'],
  },
  {
    path: '/images/conferences/gallery-5.webp',
    description: 'Gallery highlight 5',
    tags: ['gallery', 'highlight'],
    recommended: ['event', 'stats'],
  },
  {
    path: '/images/conferences/gallery-6.webp',
    description: 'Gallery highlight 6',
    tags: ['gallery', 'highlight'],
    recommended: ['tips', 'event'],
  },
  {
    path: '/images/conferences/gallery-7.webp',
    description: 'Gallery highlight 7',
    tags: ['gallery', 'highlight'],
    recommended: ['quote', 'stats'],
  },
  // Hero images
  {
    path: '/images/conferences/hero-main.webp',
    description: 'Main hero conference',
    tags: ['hero', 'main', 'impactful'],
    recommended: ['event', 'stats'],
  },
  {
    path: '/images/conferences/hero-secondary.webp',
    description: 'Secondary hero',
    tags: ['hero', 'secondary'],
    recommended: ['tips', 'quote'],
  },
  // Background images
  {
    path: '/images/conferences/homebackground.webp',
    description: 'Home background',
    tags: ['background', 'subtle'],
    recommended: ['tips', 'quote'],
  },
  {
    path: '/images/conferences/homebackground2.webp',
    description: 'Mathletes background',
    tags: ['background', 'mathletes'],
    recommended: ['event', 'stats'],
  },
  // Feature images
  {
    path: '/images/conferences/engaging-content.webp',
    description: 'Engaging content showcase',
    tags: ['engaging', 'content', 'feature'],
    recommended: ['tips', 'event'],
  },
  {
    path: '/images/conferences/leaderboards.webp',
    description: 'Leaderboards display',
    tags: ['leaderboards', 'competition', 'awards'],
    recommended: ['stats', 'event'],
  },
  {
    path: '/images/conferences/mathletes.webp',
    description: 'Mathletes program',
    tags: ['mathletes', 'program', 'math'],
    recommended: ['event', 'stats'],
  },
  {
    path: '/images/conferences/mock-trial.webp',
    description: 'Mock Trial program',
    tags: ['mock-trial', 'program', 'legal'],
    recommended: ['event', 'tips'],
  },
  {
    path: '/images/conferences/model-un.webp',
    description: 'Model UN program',
    tags: ['model-un', 'program', 'diplomacy'],
    recommended: ['event', 'tips'],
  },
  {
    path: '/images/conferences/no-experience.webp',
    description: 'No experience needed',
    tags: ['beginner', 'welcome', 'inclusive'],
    recommended: ['event', 'quote'],
  },
  {
    path: '/images/conferences/shape_tomorrow.webp',
    description: 'Shape tomorrow leaders',
    tags: ['leadership', 'future', 'inspirational'],
    recommended: ['quote', 'stats'],
  },
  {
    path: '/images/conferences/testimonial.webp',
    description: 'Student testimonial',
    tags: ['testimonial', 'student', 'story'],
    recommended: ['quote', 'tips'],
  },
];

// Get random photo, optionally filtered by template type
export function getRandomPhoto(templateType?: TemplateType): ConferencePhoto {
  let filtered = conferencePhotos;

  if (templateType) {
    // Map new template types to similar existing ones for photo selection
    const mappedType = templateType === 'photo' || templateType === 'announcement' || templateType === 'carousel-hook'
      ? 'event' // These all work well with event-style photos
      : templateType;

    filtered = conferencePhotos.filter((p) =>
      p.recommended.includes(mappedType)
    );
  }

  // Fallback to all photos if filtered is empty
  if (filtered.length === 0) {
    filtered = conferencePhotos;
  }

  return filtered[Math.floor(Math.random() * filtered.length)];
}

// Get multiple random photos (non-repeating)
export function getRandomPhotos(
  count: number,
  templateType?: TemplateType
): ConferencePhoto[] {
  let filtered = [...conferencePhotos];

  if (templateType) {
    filtered = conferencePhotos.filter((p) =>
      p.recommended.includes(templateType)
    );
  }

  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
