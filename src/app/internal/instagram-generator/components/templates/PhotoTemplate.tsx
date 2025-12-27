import type { TemplateProps } from '../../lib/types';

export function PhotoTemplate({ config, dimensions }: TemplateProps) {
  const { content, style } = config;
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
      {/* Photo background - full bleed, minimal overlay */}
      {style.photoPath ? (
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
          {/* Subtle gradient overlay at bottom for text legibility */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '50%',
              background: `linear-gradient(180deg,
                transparent 0%,
                rgba(0,0,0,${style.photoOverlayOpacity / 100 * 0.6}) 60%,
                rgba(0,0,0,${style.photoOverlayOpacity / 100 * 0.9}) 100%)`,
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
            background: '#1f2937',
          }}
        />
      )}

      {/* Content - positioned at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: `${s(48)}px`,
          color: 'white',
          zIndex: 10,
        }}
      >
        {/* Logo at top if selected */}
        {style.showLogo && style.logoPosition === 'top' && (
          <div
            style={{
              position: 'absolute',
              top: `${s(48)}px`,
              left: `${s(48)}px`,
            }}
          >
            <img
              src="/images/logos/jamun-white-side-logo.svg"
              alt="JAMUN"
              style={{ height: `${s(44)}px` }}
            />
          </div>
        )}

        {/* Accent bar */}
        <div
          style={{
            width: `${s(60)}px`,
            height: `${s(5)}px`,
            background: accent,
            borderRadius: '9999px',
            marginBottom: `${s(20)}px`,
            boxShadow: `0 0 ${s(15)}px ${accent}88`,
          }}
        />

        {/* Headline - if present */}
        {content.headline && (
          <h1
            style={{
              fontSize: `${s(56)}px`,
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              marginBottom: content.subheadline ? `${s(12)}px` : 0,
              textShadow: `0 ${s(2)}px ${s(20)}px rgba(0,0,0,0.5)`,
            }}
          >
            {content.headline}
          </h1>
        )}

        {/* Subheadline/hashtag */}
        {content.subheadline && (
          <p
            style={{
              fontSize: `${s(22)}px`,
              fontWeight: 500,
              opacity: 0.9,
              margin: 0,
              letterSpacing: '0.02em',
            }}
          >
            {content.subheadline}
          </p>
        )}

        {/* Logo at bottom */}
        {style.showLogo && style.logoPosition === 'bottom' && (
          <div
            style={{
              marginTop: `${s(24)}px`,
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <img
              src="/images/logos/jamun-white-side-logo.svg"
              alt="JAMUN"
              style={{ height: `${s(40)}px` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
