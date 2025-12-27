import type { TemplateProps } from '../../lib/types';
import { gradientPresets } from '../../lib/presets';

export function CarouselHookTemplate({ config, dimensions }: TemplateProps) {
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
                rgba(0,0,0,${style.photoOverlayOpacity / 100 + 0.35}) 0%,
                rgba(0,0,0,${style.photoOverlayOpacity / 100 + 0.45}) 100%)`,
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

      {/* Dynamic pattern elements for visual interest */}
      {/* Diagonal stripes */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.05,
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent ${s(20)}px,
            white ${s(20)}px,
            white ${s(22)}px
          )`,
        }}
      />

      {/* Glowing orbs */}
      <div
        style={{
          position: 'absolute',
          top: `${s(100)}px`,
          right: `${s(-80)}px`,
          width: `${s(300)}px`,
          height: `${s(300)}px`,
          borderRadius: '50%',
          background: accent,
          filter: `blur(${s(80)}px)`,
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: `${s(200)}px`,
          left: `${s(-60)}px`,
          width: `${s(250)}px`,
          height: `${s(250)}px`,
          borderRadius: '50%',
          background: accent,
          filter: `blur(${s(70)}px)`,
          opacity: 0.3,
        }}
      />

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
        {/* Top: Logo and "1/X" indicator */}
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: `${s(24)}px` }}>
          {style.showLogo && style.logoPosition === 'top' && (
            <img
              src="/images/logos/jamun-white-side-logo.svg"
              alt="JAMUN"
              style={{ height: `${s(44)}px` }}
            />
          )}
          {/* Carousel indicator */}
          <div
            style={{
              padding: `${s(8)}px ${s(16)}px`,
              background: 'rgba(255,255,255,0.15)',
              borderRadius: `${s(20)}px`,
              fontSize: `${s(14)}px`,
              fontWeight: 600,
              backdropFilter: 'blur(10px)',
            }}
          >
            1/5
          </div>
        </div>

        {/* Main content - centered with maximum impact */}
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
          {/* Hook headline - MAXIMUM size */}
          <h1
            style={{
              fontSize: `${s(100)}px`,
              fontWeight: 900,
              lineHeight: 0.9,
              margin: 0,
              marginBottom: `${s(32)}px`,
              textShadow: `0 ${s(6)}px ${s(40)}px rgba(0,0,0,0.5)`,
              letterSpacing: '-0.03em',
            }}
          >
            {content.headline}
          </h1>

          {/* Subheadline - curiosity driver */}
          {content.subheadline && (
            <p
              style={{
                fontSize: `${s(34)}px`,
                fontWeight: 500,
                opacity: 0.9,
                margin: 0,
                marginBottom: `${s(48)}px`,
                maxWidth: `${s(750)}px`,
                lineHeight: 1.3,
              }}
            >
              {content.subheadline}
            </p>
          )}

          {/* Swipe indicator - prominent */}
          {content.ctaText && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: `${s(16)}px`,
                padding: `${s(18)}px ${s(36)}px`,
                borderRadius: `${s(50)}px`,
                fontSize: `${s(22)}px`,
                fontWeight: 700,
                background: accent,
                boxShadow: `0 ${s(8)}px ${s(30)}px ${accent}66`,
              }}
            >
              {content.ctaText}
            </div>
          )}
        </div>

        {/* Bottom: Swipe animation hint */}
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {style.showLogo && style.logoPosition === 'bottom' ? (
            <img
              src="/images/logos/jamun-white-side-logo.svg"
              alt="JAMUN"
              style={{ height: `${s(44)}px` }}
            />
          ) : (
            <div />
          )}

          {/* Swipe dots */}
          <div style={{ display: 'flex', gap: `${s(8)}px`, alignItems: 'center' }}>
            <div
              style={{
                width: `${s(24)}px`,
                height: `${s(8)}px`,
                borderRadius: '9999px',
                background: 'white',
              }}
            />
            <div
              style={{
                width: `${s(8)}px`,
                height: `${s(8)}px`,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.4)',
              }}
            />
            <div
              style={{
                width: `${s(8)}px`,
                height: `${s(8)}px`,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.4)',
              }}
            />
            <div
              style={{
                width: `${s(8)}px`,
                height: `${s(8)}px`,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.4)',
              }}
            />
            <div
              style={{
                width: `${s(8)}px`,
                height: `${s(8)}px`,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.4)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
