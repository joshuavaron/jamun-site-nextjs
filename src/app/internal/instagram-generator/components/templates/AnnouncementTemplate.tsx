import type { TemplateProps } from '../../lib/types';
import { gradientPresets } from '../../lib/presets';

export function AnnouncementTemplate({ config, dimensions }: TemplateProps) {
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

  const accent = accentColors[style.accentColor];

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
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(180deg,
                rgba(0,0,0,${style.photoOverlayOpacity / 100 + 0.3}) 0%,
                rgba(0,0,0,${style.photoOverlayOpacity / 100 + 0.4}) 100%)`,
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

      {/* Attention-grabbing decorative elements */}
      {/* Corner flares */}
      <div
        style={{
          position: 'absolute',
          top: `${s(-150)}px`,
          right: `${s(-150)}px`,
          width: `${s(400)}px`,
          height: `${s(400)}px`,
          borderRadius: '50%',
          background: accent,
          filter: `blur(${s(100)}px)`,
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: `${s(-100)}px`,
          left: `${s(-100)}px`,
          width: `${s(350)}px`,
          height: `${s(350)}px`,
          borderRadius: '50%',
          background: 'white',
          filter: `blur(${s(100)}px)`,
          opacity: 0.15,
        }}
      />

      {/* Burst lines - radiating from center */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${s(800)}px`,
          height: `${s(800)}px`,
          opacity: 0.08,
        }}
      >
        {[0, 45, 90, 135].map((angle) => (
          <div
            key={angle}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${s(600)}px`,
              height: `${s(4)}px`,
              background: 'white',
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
            }}
          />
        ))}
      </div>

      {/* Content */}
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
        {/* Logo top */}
        {style.showLogo && style.logoPosition === 'top' && (
          <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', marginBottom: `${s(24)}px` }}>
            <img
              src="/images/logos/jamun-white-side-logo.svg"
              alt="JAMUN"
              style={{ height: `${s(48)}px` }}
            />
          </div>
        )}

        {/* Main content - centered */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Attention emoji/icon */}
          <div
            style={{
              fontSize: `${s(80)}px`,
              marginBottom: `${s(24)}px`,
              filter: `drop-shadow(0 ${s(4)}px ${s(20)}px rgba(0,0,0,0.3))`,
            }}
          >
            🎉
          </div>

          {/* HUGE headline */}
          <h1
            style={{
              fontSize: `${s(96)}px`,
              fontWeight: 900,
              lineHeight: 0.95,
              margin: 0,
              marginBottom: `${s(24)}px`,
              textShadow: `0 ${s(4)}px ${s(30)}px rgba(0,0,0,0.4)`,
              letterSpacing: '-0.02em',
            }}
          >
            {content.headline}
          </h1>

          {/* Subheadline */}
          {content.subheadline && (
            <p
              style={{
                fontSize: `${s(32)}px`,
                fontWeight: 500,
                opacity: 0.9,
                margin: 0,
                marginBottom: `${s(40)}px`,
                maxWidth: `${s(700)}px`,
              }}
            >
              {content.subheadline}
            </p>
          )}

          {/* CTA Button */}
          {content.ctaText && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: `${s(12)}px`,
                padding: `${s(20)}px ${s(44)}px`,
                borderRadius: `${s(60)}px`,
                fontSize: `${s(24)}px`,
                fontWeight: 700,
                background: 'white',
                color: '#1f2937',
                boxShadow: `0 ${s(8)}px ${s(32)}px rgba(0,0,0,0.25)`,
              }}
            >
              {content.ctaText}
            </div>
          )}
        </div>

        {/* Bottom section */}
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {style.showLogo && style.logoPosition === 'bottom' && (
            <img
              src="/images/logos/jamun-white-side-logo.svg"
              alt="JAMUN"
              style={{ height: `${s(48)}px` }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
