import type { TemplateProps } from '../../lib/types';
import { gradientPresets } from '../../lib/presets';

export function StatsTemplate({ config, dimensions }: TemplateProps) {
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
              background: `linear-gradient(180deg,
                rgba(0,0,0,${style.photoOverlayOpacity / 100 + 0.15}) 0%,
                rgba(0,0,0,${style.photoOverlayOpacity / 100 + 0.25}) 100%)`,
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

      {/* Large decorative number in background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: `${s(500)}px`,
          fontWeight: 900,
          opacity: 0.08,
          color: 'white',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {content.statNumber}
      </div>

      {/* Glowing accent circles */}
      <div
        style={{
          position: 'absolute',
          top: `${s(100)}px`,
          right: `${s(-150)}px`,
          width: `${s(400)}px`,
          height: `${s(400)}px`,
          borderRadius: '50%',
          border: `${s(3)}px solid ${accent}`,
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: `${s(100)}px`,
          left: `${s(-100)}px`,
          width: `${s(300)}px`,
          height: `${s(300)}px`,
          borderRadius: '50%',
          border: `${s(3)}px solid ${accent}`,
          opacity: 0.2,
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
        {/* Logo top */}
        {style.showLogo && style.logoPosition === 'top' && (
          <div style={{ flexShrink: 0 }}>
            <img
              src="/images/logos/jamun-white-side-logo.svg"
              alt="JAMUN"
              style={{ height: `${s(48)}px` }}
            />
          </div>
        )}

        {/* Main content */}
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
          {/* MASSIVE stat number */}
          <div
            style={{
              fontSize: `${s(200)}px`,
              fontWeight: 900,
              lineHeight: 0.85,
              marginBottom: `${s(16)}px`,
              backgroundImage: `linear-gradient(135deg, white 0%, ${accent} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: `0 ${s(10)}px ${s(60)}px rgba(0,0,0,0.3)`,
              letterSpacing: '-0.03em',
            }}
          >
            {content.statNumber}
          </div>

          {/* Stat label - bold and clear */}
          <h2
            style={{
              fontSize: `${s(44)}px`,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: `${s(32)}px`,
              margin: 0,
              marginBlockEnd: `${s(32)}px`,
            }}
          >
            {content.statLabel}
          </h2>

          {/* Decorative line */}
          <div
            style={{
              width: `${s(120)}px`,
              height: `${s(6)}px`,
              borderRadius: '9999px',
              marginBottom: `${s(32)}px`,
              background: accent,
              boxShadow: `0 0 ${s(20)}px ${accent}`,
            }}
          />

          {/* Context with glass effect */}
          {content.statContext && (
            <div
              style={{
                padding: `${s(24)}px ${s(40)}px`,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: `${s(20)}px`,
                backdropFilter: 'blur(10px)',
                maxWidth: `${s(600)}px`,
              }}
            >
              <p
                style={{
                  fontSize: `${s(26)}px`,
                  opacity: 0.95,
                  lineHeight: 1.5,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {content.statContext}
              </p>
            </div>
          )}
        </div>

        {/* Bottom section */}
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

          {/* Save prompt */}
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
            <span>Save this</span>
          </div>
        </div>
      </div>
    </div>
  );
}
