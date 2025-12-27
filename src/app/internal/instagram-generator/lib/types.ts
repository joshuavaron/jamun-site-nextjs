// Instagram Post Generator Types

export type TemplateType = 'event' | 'stats' | 'tips' | 'quote' | 'photo' | 'announcement' | 'carousel-hook';

export type BackgroundStyle = 'photo' | 'gradient';

// Program-specific themes matching website colors
export type ProgramTheme = 'general' | 'modelun' | 'mocktrial' | 'mathletes';

export type GradientPreset =
  // JAMUN brand gradients
  | 'blue-purple'
  | 'blue-teal'
  | 'purple-pink'
  | 'ocean'
  // Program-specific gradients
  | 'mun-classic'
  | 'mun-bold'
  | 'mocktrial-classic'
  | 'mocktrial-bold'
  | 'mathletes-classic'
  | 'mathletes-bold';

export interface PostContent {
  // Common fields
  headline: string;
  subheadline?: string;
  bodyText?: string;

  // Event-specific
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  ctaText?: string;

  // Stats-specific
  statNumber?: string;
  statLabel?: string;
  statContext?: string;

  // Quote-specific
  quote?: string;
  attribution?: string;
  attributionTitle?: string;

  // Tips-specific
  tipNumber?: string;
  tipTitle?: string;
  tipContent?: string;
}

export interface PostStyle {
  backgroundStyle: BackgroundStyle;
  gradientPreset: GradientPreset;
  photoPath?: string;
  photoOverlayOpacity: number; // 0-100
  accentColor: 'blue' | 'orange' | 'purple' | 'green';
  programTheme: ProgramTheme;
  showLogo: boolean;
  logoPosition: 'top' | 'bottom';
  textAlignment: 'left' | 'center' | 'right';
}

export interface PostConfig {
  templateType: TemplateType;
  content: PostContent;
  style: PostStyle;
}

// Dimensions passed to templates for responsive sizing
export interface TemplateDimensions {
  width: number;
  height: number;
}

// Props for all template components
export interface TemplateProps {
  config: PostConfig;
  dimensions: TemplateDimensions;
}

// Preset content for randomization
export interface ContentPreset {
  type: TemplateType;
  content: Partial<PostContent>;
}
