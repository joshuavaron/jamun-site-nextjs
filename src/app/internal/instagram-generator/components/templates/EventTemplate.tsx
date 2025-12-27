import type { TemplateProps } from '../../lib/types';
import { gradientPresets } from '../../lib/presets';

export function EventTemplate({ config, dimensions }: TemplateProps) {
  const { content, style } = config;
  const gradient = gradientPresets[style.gradientPreset];
  const { width, height } = dimensions;

  const scale = width / 1080;
  const s = (px: number) => px * scale;

  const accentColors = {
    blue: '#397bce',
    orange: '#f97316',
    purple: '#9333ea',
    green: '#10b981',
  };

  const accent = accentColors[style.accentColor] || accentColors.blue;

  return (
    <div
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Background */}
      {style.backgroundStyle === 'photo' && style.photoPath ? (
        <>
          <img
            src={style.photoPath}
            alt=""
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Stronger overlay for better text readability */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(180deg,
                rgba(0,0,0,${style.photoOverlayOpacity / 100 + 0.1}) 0%,
                rgba(0,0,0,${style.photoOverlayOpacity / 100 + 0.2}) 50%,
                rgba(0,0,0,${style.photoOverlayOpacity / 100 + 0.3}) 100%)`,
            }}
          />
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: gradient.via
              ? `linear-gradient(135deg, ${gradient.from}, ${gradient.via}, ${gradient.to})`
              : `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
          }}
        />
      )}

      {/* Decorative glowing orbs */}
      <div
        style={{
          position: 'absolute',
          top: `${s(-100)}px`,
          right: `${s(-100)}px`,
          width: `${s(400)}px`,
          height: `${s(400)}px`,
          borderRadius: '50%',
          background: accent,
          filter: `blur(${s(120)}px)`,
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: `${s(-50)}px`,
          left: `${s(-50)}px`,
          width: `${s(300)}px`,
          height: `${s(300)}px`,
          borderRadius: '50%',
          background: accent,
          filter: `blur(${s(100)}px)`,
          opacity: 0.3,
        }}
      />

      {/* Content container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: `${s(56)}px`,
          color: 'white',
          boxSizing: 'border-box',
        }}
      >
        {/* Top section: Logo */}
        {style.showLogo && style.logoPosition === 'top' && (
          <div style={{ flexShrink: 0, marginBottom: `${s(32)}px` }}>
            <img
              src="/images/logos/jamun-white-side-logo.svg"
              alt="JAMUN"
              style={{ height: `${s(52)}px` }}
            />
          </div>
        )}

        {/* Badge/Tag - eye-catching label */}
        {content.subheadline && (
          <div
            style={{
              alignSelf: style.textAlignment === 'center' ? 'center' : 'flex-start',
              display: 'inline-flex',
              alignItems: 'center',
              gap: `${s(8)}px`,
              padding: `${s(12)}px ${s(24)}px`,
              borderRadius: `${s(50)}px`,
              fontSize: `${s(18)}px`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              background: accent,
              boxShadow: `0 ${s(4)}px ${s(20)}px ${accent}66`,
              marginBottom: `${s(24)}px`,
            }}
          >
            <span style={{ fontSize: `${s(14)}px` }}>🎯</span>
            {content.subheadline}
          </div>
        )}

        {/* Main content - centered */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: style.textAlignment === 'center' ? 'center' : 'flex-start',
            textAlign: style.textAlignment as 'left' | 'center' | 'right',
          }}
        >
          {/* IMPACT HEADLINE - much bigger */}
          <h1
            style={{
              fontSize: `${s(88)}px`,
              fontWeight: 900,
              lineHeight: 0.95,
              margin: 0,
              marginBottom: `${s(32)}px`,
              textShadow: `0 ${s(4)}px ${s(30)}px rgba(0,0,0,0.4)`,
              letterSpacing: '-0.02em',
            }}
          >
            {content.headline}
          </h1>

          {/* Event details with icons - more prominent */}
          {(content.eventDate || content.eventLocation) && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: `${s(16)}px`,
                marginBottom: `${s(40)}px`,
                padding: `${s(24)}px ${s(32)}px`,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: `${s(20)}px`,
                backdropFilter: 'blur(10px)',
              }}
            >
              {content.eventDate && (
                <div style={{ display: 'flex', alignItems: 'center', gap: `${s(14)}px`, fontSize: `${s(26)}px`, fontWeight: 600 }}>
                  <span style={{ fontSize: `${s(28)}px` }}>📅</span>
                  <span>{content.eventDate}</span>
                </div>
              )}
              {content.eventLocation && (
                <div style={{ display: 'flex', alignItems: 'center', gap: `${s(14)}px`, fontSize: `${s(26)}px`, fontWeight: 600 }}>
                  <span style={{ fontSize: `${s(28)}px` }}>📍</span>
                  <span>{content.eventLocation}</span>
                </div>
              )}
            </div>
          )}

          {/* CTA Button - bigger and bolder */}
          {content.ctaText && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: `${s(12)}px`,
                padding: `${s(22)}px ${s(48)}px`,
                borderRadius: `${s(60)}px`,
                fontSize: `${s(26)}px`,
                fontWeight: 800,
                background: 'white',
                color: '#1f2937',
                boxShadow: `0 ${s(8)}px ${s(32)}px rgba(0,0,0,0.3)`,
                cursor: 'pointer',
              }}
            >
              {content.ctaText}
              <span style={{ fontSize: `${s(24)}px` }}>→</span>
            </div>
          )}
        </div>

        {/* Bottom: Logo or swipe indicator */}
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {style.showLogo && style.logoPosition === 'bottom' ? (
            <img
              src="/images/logos/jamun-white-side-logo.svg"
              alt="JAMUN"
              style={{ height: `${s(48)}px` }}
            />
          ) : (
            <div />
          )}

          {/* Swipe indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: `${s(8)}px`,
              fontSize: `${s(18)}px`,
              fontWeight: 600,
              opacity: 0.8,
            }}
          >
            <span>Swipe</span>
            <span style={{ fontSize: `${s(20)}px` }}>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
