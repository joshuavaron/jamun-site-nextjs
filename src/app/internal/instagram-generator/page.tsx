'use client';

import { useState, useRef, useCallback } from 'react';
import type { PostConfig, TemplateType, GradientPreset, ProgramTheme } from './lib/types';
import { generateRandomPost, getDefaultConfig, randomizeStyle, randomizeContent } from './lib/randomize';
import { gradientPresets } from './lib/presets';
import { conferencePhotos } from './lib/photos';
import {
  EventTemplate,
  StatsTemplate,
  TipsTemplate,
  QuoteTemplate,
  PhotoTemplate,
  AnnouncementTemplate,
  CarouselHookTemplate,
} from './components/templates';

const templateTypes: { id: TemplateType; label: string; icon: string; category: 'core' | 'special' }[] = [
  // Core templates
  { id: 'event', label: 'Event', icon: '📅', category: 'core' },
  { id: 'stats', label: 'Stats', icon: '📊', category: 'core' },
  { id: 'tips', label: 'Tips', icon: '💡', category: 'core' },
  { id: 'quote', label: 'Quote', icon: '💬', category: 'core' },
  // Special templates
  { id: 'photo', label: 'Photo', icon: '📸', category: 'special' },
  { id: 'announcement', label: 'Announce', icon: '🎉', category: 'special' },
  { id: 'carousel-hook', label: 'Hook', icon: '🎣', category: 'special' },
];

const programThemes: { id: ProgramTheme; label: string; color: string }[] = [
  { id: 'general', label: 'General', color: '#397bce' },
  { id: 'modelun', label: 'Model UN', color: '#0ea5e9' },
  { id: 'mocktrial', label: 'Mock Trial', color: '#8b5cf6' },
  { id: 'mathletes', label: 'Mathletes', color: '#10b981' },
];

export default function InstagramGeneratorPage() {
  const [config, setConfig] = useState<PostConfig>(() => getDefaultConfig('event'));
  const [format, setFormat] = useState<'portrait' | 'square'>('portrait');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  const dimensions = format === 'portrait' ? { width: 1080, height: 1350 } : { width: 1080, height: 1080 };

  // Template component selector
  const TemplateComponent = {
    event: EventTemplate,
    stats: StatsTemplate,
    tips: TipsTemplate,
    quote: QuoteTemplate,
    photo: PhotoTemplate,
    announcement: AnnouncementTemplate,
    'carousel-hook': CarouselHookTemplate,
  }[config.templateType];

  // Handlers
  const handleRandomize = useCallback(() => {
    setConfig(generateRandomPost(config.templateType));
  }, [config.templateType]);

  const handleRandomizeAll = useCallback(() => {
    setConfig(generateRandomPost());
  }, []);

  const handleRandomizeStyle = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      style: randomizeStyle(prev),
    }));
  }, []);

  const handleRandomizeContent = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      content: randomizeContent(prev.templateType),
    }));
  }, []);

  const handleTemplateChange = useCallback((type: TemplateType) => {
    setConfig(getDefaultConfig(type));
  }, []);

  const handleDownload = useCallback(async () => {
    if (!exportRef.current) return;

    setIsExporting(true);
    try {
      // Dynamic import of html-to-image
      const { toPng } = await import('html-to-image');

      // Wait for fonts to load
      await document.fonts.ready;

      const dataUrl = await toPng(exportRef.current, {
        width: dimensions.width,
        height: dimensions.height,
        pixelRatio: 1,
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = `jamun-${config.templateType}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [config.templateType, dimensions]);

  // Content update helper
  const updateContent = useCallback((key: string, value: string) => {
    setConfig((prev) => ({
      ...prev,
      content: { ...prev.content, [key]: value },
    }));
  }, []);

  // Style update helper
  const updateStyle = useCallback(<K extends keyof PostConfig['style']>(key: K, value: PostConfig['style'][K]) => {
    setConfig((prev) => ({
      ...prev,
      style: { ...prev.style, [key]: value },
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-jamun-blue to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Instagram Post Generator</h1>
                <p className="text-sm text-gray-500">JAMUN Internal Tool</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRandomizeAll}
                className="px-4 py-2 bg-gradient-to-r from-jamun-blue to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <span>🎲</span> Random Post
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Template Selection */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Template</h2>
                <button
                  onClick={handleRandomize}
                  className="text-sm text-jamun-blue hover:underline flex items-center gap-1"
                >
                  🎲 Randomize
                </button>
              </div>
              {/* Core templates */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {templateTypes.filter(t => t.category === 'core').map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTemplateChange(t.id)}
                    className={`px-2 py-3 rounded-xl text-xs font-medium transition-all flex flex-col items-center gap-1.5 ${
                      config.templateType === t.id
                        ? 'bg-jamun-blue text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-lg">{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
              {/* Special templates */}
              <p className="text-xs text-gray-500 mb-2">Special</p>
              <div className="grid grid-cols-3 gap-2">
                {templateTypes.filter(t => t.category === 'special').map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTemplateChange(t.id)}
                    className={`px-2 py-3 rounded-xl text-xs font-medium transition-all flex flex-col items-center gap-1.5 ${
                      config.templateType === t.id
                        ? 'bg-jamun-blue text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-lg">{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Fields - Dynamic based on template type */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Content</h2>
                <button
                  onClick={handleRandomizeContent}
                  className="text-sm text-jamun-blue hover:underline flex items-center gap-1"
                >
                  🎲 Randomize
                </button>
              </div>

              <div className="space-y-4">
                {/* Event fields */}
                {config.templateType === 'event' && (
                  <>
                    <InputField
                      label="Headline"
                      value={config.content.headline || ''}
                      onChange={(v) => updateContent('headline', v)}
                      placeholder="Spring Conference 2025"
                    />
                    <InputField
                      label="Subheadline"
                      value={config.content.subheadline || ''}
                      onChange={(v) => updateContent('subheadline', v)}
                      placeholder="Registration Open"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Date"
                        value={config.content.eventDate || ''}
                        onChange={(v) => updateContent('eventDate', v)}
                        placeholder="March 15, 2025"
                      />
                      <InputField
                        label="Location"
                        value={config.content.eventLocation || ''}
                        onChange={(v) => updateContent('eventLocation', v)}
                        placeholder="San Jose, CA"
                      />
                    </div>
                    <InputField
                      label="CTA Button"
                      value={config.content.ctaText || ''}
                      onChange={(v) => updateContent('ctaText', v)}
                      placeholder="Register Now"
                    />
                  </>
                )}

                {/* Stats fields */}
                {config.templateType === 'stats' && (
                  <>
                    <InputField
                      label="Number"
                      value={config.content.statNumber || ''}
                      onChange={(v) => updateContent('statNumber', v)}
                      placeholder="500+"
                    />
                    <InputField
                      label="Label"
                      value={config.content.statLabel || ''}
                      onChange={(v) => updateContent('statLabel', v)}
                      placeholder="Students Empowered"
                    />
                    <TextAreaField
                      label="Context"
                      value={config.content.statContext || ''}
                      onChange={(v) => updateContent('statContext', v)}
                      placeholder="Middle schoolers trained in public speaking..."
                    />
                  </>
                )}

                {/* Tips fields */}
                {config.templateType === 'tips' && (
                  <>
                    <div className="grid grid-cols-4 gap-4">
                      <InputField
                        label="Tip #"
                        value={config.content.tipNumber || ''}
                        onChange={(v) => updateContent('tipNumber', v)}
                        placeholder="01"
                      />
                      <div className="col-span-3">
                        <InputField
                          label="Title"
                          value={config.content.tipTitle || ''}
                          onChange={(v) => updateContent('tipTitle', v)}
                          placeholder="Research Your Country"
                        />
                      </div>
                    </div>
                    <TextAreaField
                      label="Tip Content"
                      value={config.content.tipContent || ''}
                      onChange={(v) => updateContent('tipContent', v)}
                      placeholder="Understanding your assigned country's position..."
                      rows={4}
                    />
                  </>
                )}

                {/* Quote fields */}
                {config.templateType === 'quote' && (
                  <>
                    <TextAreaField
                      label="Quote"
                      value={config.content.quote || ''}
                      onChange={(v) => updateContent('quote', v)}
                      placeholder="Model UN taught me that my voice matters..."
                      rows={4}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Attribution"
                        value={config.content.attribution || ''}
                        onChange={(v) => updateContent('attribution', v)}
                        placeholder="JAMUN Delegate"
                      />
                      <InputField
                        label="Title"
                        value={config.content.attributionTitle || ''}
                        onChange={(v) => updateContent('attributionTitle', v)}
                        placeholder="7th Grade"
                      />
                    </div>
                  </>
                )}

                {/* Photo fields */}
                {config.templateType === 'photo' && (
                  <>
                    <InputField
                      label="Caption (optional)"
                      value={config.content.headline || ''}
                      onChange={(v) => updateContent('headline', v)}
                      placeholder="Moments That Matter"
                    />
                    <InputField
                      label="Hashtag/Handle"
                      value={config.content.subheadline || ''}
                      onChange={(v) => updateContent('subheadline', v)}
                      placeholder="@jamunorg • #MakeAcademicsFun"
                    />
                  </>
                )}

                {/* Announcement fields */}
                {config.templateType === 'announcement' && (
                  <>
                    <InputField
                      label="Headline"
                      value={config.content.headline || ''}
                      onChange={(v) => updateContent('headline', v)}
                      placeholder="Big News!"
                    />
                    <InputField
                      label="Subheadline"
                      value={config.content.subheadline || ''}
                      onChange={(v) => updateContent('subheadline', v)}
                      placeholder="Something exciting is coming..."
                    />
                    <InputField
                      label="CTA"
                      value={config.content.ctaText || ''}
                      onChange={(v) => updateContent('ctaText', v)}
                      placeholder="Stay Tuned →"
                    />
                  </>
                )}

                {/* Carousel hook fields */}
                {config.templateType === 'carousel-hook' && (
                  <>
                    <InputField
                      label="Hook Headline"
                      value={config.content.headline || ''}
                      onChange={(v) => updateContent('headline', v)}
                      placeholder="Stop Scrolling."
                    />
                    <TextAreaField
                      label="Curiosity Driver"
                      value={config.content.subheadline || ''}
                      onChange={(v) => updateContent('subheadline', v)}
                      placeholder="This will change everything..."
                      rows={2}
                    />
                    <InputField
                      label="Swipe CTA"
                      value={config.content.ctaText || ''}
                      onChange={(v) => updateContent('ctaText', v)}
                      placeholder="Swipe to learn more →"
                    />
                  </>
                )}
              </div>
            </div>

            {/* Style Options */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Style</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRandomizeStyle}
                    className="text-sm text-jamun-blue hover:underline flex items-center gap-1"
                  >
                    🎲 Randomize
                  </button>
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showAdvanced ? 'Simple' : 'Advanced'}
                  </button>
                </div>
              </div>

              {/* Background type toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => updateStyle('backgroundStyle', 'gradient')}
                  className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    config.style.backgroundStyle === 'gradient'
                      ? 'bg-jamun-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Gradient
                </button>
                <button
                  onClick={() => updateStyle('backgroundStyle', 'photo')}
                  className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    config.style.backgroundStyle === 'photo'
                      ? 'bg-jamun-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Photo
                </button>
              </div>

              {/* Gradient presets - grouped by category */}
              {config.style.backgroundStyle === 'gradient' && (
                <div className="space-y-3 mb-4">
                  {/* JAMUN Brand gradients */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2 font-medium">✨ JAMUN Brand</p>
                    <div className="grid grid-cols-4 gap-2">
                      {(Object.keys(gradientPresets) as GradientPreset[])
                        .filter((key) => gradientPresets[key].category === 'brand')
                        .map((key) => {
                          const g = gradientPresets[key];
                          return (
                            <button
                              key={key}
                              onClick={() => updateStyle('gradientPreset', key)}
                              className={`p-2 rounded-lg text-[10px] font-medium transition-all h-12 ${
                                config.style.gradientPreset === key
                                  ? 'ring-2 ring-jamun-blue ring-offset-1'
                                  : 'hover:scale-105'
                              }`}
                              style={{
                                background: g.via
                                  ? `linear-gradient(135deg, ${g.from}, ${g.via}, ${g.to})`
                                  : `linear-gradient(135deg, ${g.from}, ${g.to})`,
                                color: 'white',
                                textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                              }}
                            >
                              {g.name}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                  {/* Program-specific gradients */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2 font-medium">🎓 Programs</p>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.keys(gradientPresets) as GradientPreset[])
                        .filter((key) => gradientPresets[key].category === 'program')
                        .map((key) => {
                          const g = gradientPresets[key];
                          return (
                            <button
                              key={key}
                              onClick={() => updateStyle('gradientPreset', key)}
                              className={`p-2 rounded-lg text-[10px] font-medium transition-all h-12 ${
                                config.style.gradientPreset === key
                                  ? 'ring-2 ring-jamun-blue ring-offset-1'
                                  : 'hover:scale-105'
                              }`}
                              style={{
                                background: g.via
                                  ? `linear-gradient(135deg, ${g.from}, ${g.via}, ${g.to})`
                                  : `linear-gradient(135deg, ${g.from}, ${g.to})`,
                                color: 'white',
                                textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                              }}
                            >
                              {g.name}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}

              {/* Photo selector */}
              {config.style.backgroundStyle === 'photo' && (
                <div className="space-y-3 mb-4">
                  <p className="text-xs text-gray-500 font-medium">{conferencePhotos.length} photos available</p>
                  <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                    {conferencePhotos.map((photo) => (
                      <button
                        key={photo.path}
                        onClick={() => updateStyle('photoPath', photo.path)}
                        className={`aspect-square rounded-lg overflow-hidden transition-all ${
                          config.style.photoPath === photo.path
                            ? 'ring-2 ring-jamun-blue ring-offset-2'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={photo.path}
                          alt={photo.description}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Overlay Opacity: {config.style.photoOverlayOpacity}%
                    </label>
                    <input
                      type="range"
                      min="30"
                      max="90"
                      value={config.style.photoOverlayOpacity}
                      onChange={(e) => updateStyle('photoOverlayOpacity', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {/* Advanced options */}
              {showAdvanced && (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  {/* Accent color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Accent Color
                    </label>
                    <div className="flex gap-2">
                      {(['blue', 'orange', 'purple', 'green'] as const).map((color) => (
                        <button
                          key={color}
                          onClick={() => updateStyle('accentColor', color)}
                          className={`w-10 h-10 rounded-full transition-all ${
                            config.style.accentColor === color
                              ? 'ring-2 ring-offset-2 ring-gray-400'
                              : ''
                          }`}
                          style={{
                            background:
                              color === 'blue'
                                ? '#397bce'
                                : color === 'orange'
                                  ? '#f97316'
                                  : color === 'purple'
                                    ? '#9333ea'
                                    : '#10b981',
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Blue = MUN, Purple = Mock Trial, Green = Mathletes</p>
                  </div>

                  {/* Logo options */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Show Logo</label>
                    <button
                      onClick={() => updateStyle('showLogo', !config.style.showLogo)}
                      className={`w-12 h-6 rounded-full transition-all ${
                        config.style.showLogo ? 'bg-jamun-blue' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          config.style.showLogo ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {config.style.showLogo && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Logo Position
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStyle('logoPosition', 'top')}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                            config.style.logoPosition === 'top'
                              ? 'bg-jamun-blue text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          Top
                        </button>
                        <button
                          onClick={() => updateStyle('logoPosition', 'bottom')}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                            config.style.logoPosition === 'bottom'
                              ? 'bg-jamun-blue text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          Bottom
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Export</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFormat('portrait')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      format === 'portrait'
                        ? 'bg-jamun-blue text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    4:5
                  </button>
                  <button
                    onClick={() => setFormat('square')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      format === 'square'
                        ? 'bg-jamun-blue text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    1:1
                  </button>
                </div>
              </div>
              <button
                onClick={handleDownload}
                disabled={isExporting}
                className="w-full px-4 py-3 bg-gradient-to-r from-jamun-blue to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isExporting ? (
                  <>
                    <span className="animate-spin">⏳</span> Exporting...
                  </>
                ) : (
                  <>
                    <span>📥</span> Download PNG
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-8 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              {/* Visual preview - scaled down from full size */}
              <div
                className="relative mx-auto rounded-xl overflow-hidden shadow-lg"
                style={{
                  width: format === 'portrait' ? '360px' : '400px',
                  height: format === 'portrait' ? '450px' : '400px',
                }}
              >
                <div
                  style={{
                    transform: `scale(${format === 'portrait' ? 360 / dimensions.width : 400 / dimensions.width})`,
                    transformOrigin: 'top left',
                  }}
                >
                  <TemplateComponent config={config} dimensions={dimensions} />
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                {dimensions.width} × {dimensions.height} px ({format === 'portrait' ? '4:5' : '1:1'})
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden export container - renders at actual export size */}
      <div
        ref={exportRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
        }}
      >
        <TemplateComponent config={config} dimensions={dimensions} />
      </div>
    </div>
  );
}

// Helper components
function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-jamun-blue focus:border-transparent"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-jamun-blue focus:border-transparent resize-none"
      />
    </div>
  );
}
