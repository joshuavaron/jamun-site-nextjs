import type { TemplateProps } from '../../lib/types';
import { gradientPresets } from '../../lib/presets';

export function TipsTemplate({ config, dimensions }: TemplateProps) {
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
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg,
                rgba(0,0,0,${style.photoOverlayOpacity / 100 + 0.2}) 0%,
                rgba(0,0,0,${style.photoOverlayOpacity / 100 + 0.15}) 100%)`,
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

      {/* Giant tip number watermark */}
      <div
        style={{
          position: 'absolute',
          top: `${s(-80)}px`,
          right: `${s(-60)}px`,
          fontSize: `${s(450)}px`,
          fontWeight: 900,
          opacity: 0.06,
          color: 'white',
          lineHeight: 1,
        }}
      >
        {content.tipNumber}
      </div>

      {/* Decorative glow */}
      <div
        style={{
          position: 'absolute',
          top: `${s(50)}px`,
          left: `${s(-100)}px`,
          width: `${s(300)}px`,
          height: `${s(300)}px`,
          borderRadius: '50%',
          background: accent,
          filter: `blur(${s(100)}px)`,
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
        {/* Top bar with logo and series badge */}
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: `${s(32)}px` }}>
          {style.showLogo && style.logoPosition === 'top' && (
            <img
              src="/images/logos/jamun-white-side-logo.svg"
              alt="JAMUN"
              style={{ height: `${s(44)}px` }}
            />
          )}

          {/* Series badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: `${s(8)}px`,
              padding: `${s(10)}px ${s(20)}px`,
              borderRadius: `${s(50)}px`,
              fontSize: `${s(16)}px`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span>💡</span>
            <span>MUN Tips</span>
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Tip number badge - prominent */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: `${s(100)}px`,
              height: `${s(100)}px`,
              borderRadius: `${s(24)}px`,
              fontSize: `${s(48)}px`,
              fontWeight: 900,
              background: accent,
              boxShadow: `0 ${s(8)}px ${s(32)}px ${accent}66`,
              marginBottom: `${s(32)}px`,
            }}
          >
            {content.tipNumber}
          </div>

          {/* Tip title - HUGE */}
          <h1
            style={{
              fontSize: `${s(72)}px`,
              fontWeight: 900,
              lineHeight: 1.0,
              marginBottom: `${s(32)}px`,
              margin: 0,
              marginBlockEnd: `${s(32)}px`,
              letterSpacing: '-0.02em',
            }}
          >
            {content.tipTitle}
          </h1>

          {/* Tip content - clear and readable */}
          {content.tipContent && (
            <div
              style={{
                padding: `${s(28)}px ${s(32)}px`,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: `${s(20)}px`,
                backdropFilter: 'blur(10px)',
                borderLeft: `${s(5)}px solid ${accent}`,
                maxWidth: `${s(700)}px`,
              }}
            >
              <p
                style={{
                  fontSize: `${s(26)}px`,
                  lineHeight: 1.5,
                  opacity: 0.95,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {content.tipContent}
              </p>
            </div>
          )}
        </div>

        {/* Bottom: Logo and swipe/save indicator */}
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

          {/* Engagement prompts */}
          <div style={{ display: 'flex', gap: `${s(24)}px` }}>
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
              <span>💾</span>
              <span>Save</span>
            </div>
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
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
