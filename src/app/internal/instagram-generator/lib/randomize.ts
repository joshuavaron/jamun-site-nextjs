// Randomization engine for quick post generation

import type {
  PostConfig,
  TemplateType,
  PostStyle,
} from './types';
import { getRandomPhoto } from './photos';
import { getRandomPreset, getRandomGradient } from './presets';

// Core template types for randomization (excluding specialized ones)
const coreTemplateTypes: TemplateType[] = ['event', 'stats', 'tips', 'quote'];

// Generate a completely random post configuration
export function generateRandomPost(templateType?: TemplateType): PostConfig {
  const type =
    templateType || coreTemplateTypes[Math.floor(Math.random() * coreTemplateTypes.length)];

  const content = getRandomPreset(type);
  const photo = getRandomPhoto(type);
  const usePhoto = Math.random() > 0.4; // 60% chance of photo background

  const style: PostStyle = {
    backgroundStyle: usePhoto ? 'photo' : 'gradient',
    gradientPreset: getRandomGradient(),
    photoPath: photo.path,
    photoOverlayOpacity: usePhoto ? 60 + Math.floor(Math.random() * 25) : 0, // 60-85%
    accentColor: (['blue', 'orange', 'purple', 'green'] as const)[
      Math.floor(Math.random() * 4)
    ],
    programTheme: 'general',
    showLogo: true,
    logoPosition: Math.random() > 0.5 ? 'top' : 'bottom',
    textAlignment: 'center',
  };

  return {
    templateType: type,
    content: {
      headline: '',
      ...content,
    },
    style,
  };
}

// Generate random style only (keep content)
export function randomizeStyle(
  currentConfig: PostConfig,
  keepBackground?: boolean
): PostStyle {
  const photo = getRandomPhoto(currentConfig.templateType);
  const usePhoto = keepBackground
    ? currentConfig.style.backgroundStyle === 'photo'
    : Math.random() > 0.4;

  return {
    backgroundStyle: usePhoto ? 'photo' : 'gradient',
    gradientPreset: getRandomGradient(),
    photoPath: keepBackground ? currentConfig.style.photoPath : photo.path,
    photoOverlayOpacity: usePhoto ? 60 + Math.floor(Math.random() * 25) : 0,
    accentColor: (['blue', 'orange', 'purple', 'green'] as const)[
      Math.floor(Math.random() * 4)
    ],
    programTheme: currentConfig.style.programTheme || 'general',
    showLogo: true,
    logoPosition: Math.random() > 0.5 ? 'top' : 'bottom',
    textAlignment: 'center',
  };
}

// Generate random content only (keep style)
export function randomizeContent(templateType: TemplateType): PostConfig['content'] {
  const preset = getRandomPreset(templateType);
  return {
    headline: '',
    ...preset,
  };
}

// Default configurations for each template type
export function getDefaultConfig(templateType: TemplateType): PostConfig {
  const defaults: Record<TemplateType, PostConfig> = {
    event: {
      templateType: 'event',
      content: {
        headline: 'Spring Conference 2025',
        subheadline: 'Registration Open',
        eventDate: 'March 15, 2025',
        eventLocation: 'San Jose, CA',
        ctaText: 'Register Now',
      },
      style: {
        backgroundStyle: 'gradient',
        gradientPreset: 'mun-classic',
        photoOverlayOpacity: 70,
        accentColor: 'orange',
        programTheme: 'general',
        showLogo: true,
        logoPosition: 'top',
        textAlignment: 'center',
      },
    },
    stats: {
      templateType: 'stats',
      content: {
        headline: '',
        statNumber: '500+',
        statLabel: 'Students Empowered',
        statContext: 'Middle schoolers trained in public speaking and diplomacy',
      },
      style: {
        backgroundStyle: 'gradient',
        gradientPreset: 'blue-purple',
        photoOverlayOpacity: 75,
        accentColor: 'blue',
        programTheme: 'general',
        showLogo: true,
        logoPosition: 'bottom',
        textAlignment: 'center',
      },
    },
    tips: {
      templateType: 'tips',
      content: {
        headline: 'Delegate Tip',
        tipNumber: '01',
        tipTitle: 'Research Your Country',
        tipContent:
          'Understanding your assigned country\'s position is the foundation of effective debate.',
      },
      style: {
        backgroundStyle: 'gradient',
        gradientPreset: 'mun-classic',
        photoOverlayOpacity: 65,
        accentColor: 'blue',
        programTheme: 'modelun',
        showLogo: true,
        logoPosition: 'top',
        textAlignment: 'left',
      },
    },
    quote: {
      templateType: 'quote',
      content: {
        headline: '',
        quote:
          'Model UN taught me that my voice matters, even as a middle schooler.',
        attribution: 'JAMUN Delegate',
        attributionTitle: '7th Grade',
      },
      style: {
        backgroundStyle: 'gradient',
        gradientPreset: 'purple-pink',
        photoOverlayOpacity: 70,
        accentColor: 'purple',
        programTheme: 'general',
        showLogo: true,
        logoPosition: 'bottom',
        textAlignment: 'center',
      },
    },
    photo: {
      templateType: 'photo',
      content: {
        headline: 'JAMUN Conference 2025',
        subheadline: '',
      },
      style: {
        backgroundStyle: 'photo',
        gradientPreset: 'blue-purple',
        photoOverlayOpacity: 40,
        accentColor: 'blue',
        programTheme: 'general',
        showLogo: true,
        logoPosition: 'bottom',
        textAlignment: 'left',
      },
    },
    announcement: {
      templateType: 'announcement',
      content: {
        headline: 'Big News!',
        subheadline: 'Something exciting is coming...',
        ctaText: 'Stay Tuned →',
      },
      style: {
        backgroundStyle: 'gradient',
        gradientPreset: 'purple-pink',
        photoOverlayOpacity: 70,
        accentColor: 'orange',
        programTheme: 'general',
        showLogo: true,
        logoPosition: 'top',
        textAlignment: 'center',
      },
    },
    'carousel-hook': {
      templateType: 'carousel-hook',
      content: {
        headline: 'Stop Scrolling.',
        subheadline: 'This will change how you think about MUN.',
        ctaText: 'Swipe to learn more →',
      },
      style: {
        backgroundStyle: 'gradient',
        gradientPreset: 'blue-purple',
        photoOverlayOpacity: 70,
        accentColor: 'purple',
        programTheme: 'general',
        showLogo: true,
        logoPosition: 'bottom',
        textAlignment: 'center',
      },
    },
  };

  return defaults[templateType];
}
