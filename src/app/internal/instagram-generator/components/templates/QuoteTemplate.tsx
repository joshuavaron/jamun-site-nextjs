import type { TemplateProps } from '../../lib/types';
import { gradientPresets } from '../../lib/presets';

export function QuoteTemplate({ config, dimensions }: TemplateProps) {
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
                rgba(0,0,0,${style.photoOverlayOpacity / 100 + 0.2}) 0%,
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

      {/* Giant quotation marks - dramatic background element */}
      <div
        style={{
          position: 'absolute',
          top: `${s(60)}px`,
          left: `${s(40)}px`,
          fontFamily: 'Georgia, serif',
          fontSize: `${s(400)}px`,
          lineHeight: 0.8,
          opacity: 0.08,
          color: 'white',
        }}
      >
        "
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: `${s(60)}px`,
          right: `${s(40)}px`,
          fontFamily: 'Georgia, serif',
          fontSize: `${s(400)}px`,
          lineHeight: 0.8,
          opacity: 0.08,
          color: 'white',
          transform: 'rotate(180deg)',
        }}
      >
        "
      </div>

      {/* Decorative glowing orbs */}
      <div
        style={{
          position: 'absolute',
          top: `${s(-100)}px`,
          left: `${s(-100)}px`,
          width: `${s(350)}px`,
          height: `${s(350)}px`,
          borderRadius: '50%',
          background: accent,
          filter: `blur(${s(120)}px)`,
          opacity: 0.35,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: `${s(-80)}px`,
          right: `${s(-80)}px`,
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

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: `0 ${s(20)}px`,
          }}
        >
          {/* Opening quote mark accent */}
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: `${s(120)}px`,
              lineHeight: 0.6,
              color: accent,
              marginBottom: `${s(16)}px`,
              textShadow: `0 0 ${s(40)}px ${accent}66`,
            }}
          >
            "
          </div>

          {/* Quote - BIGGER and bolder */}
          <blockquote
            style={{
              fontSize: `${s(52)}px`,
              fontWeight: 600,
              lineHeight: 1.3,
              margin: 0,
              marginBottom: `${s(40)}px`,
              textShadow: `0 ${s(4)}px ${s(20)}px rgba(0,0,0,0.3)`,
              letterSpacing: '-0.01em',
            }}
          >
            {content.quote}
          </blockquote>

          {/* Attribution with glass effect */}
          {content.attribution && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: `${s(20)}px ${s(36)}px`,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: `${s(60)}px`,
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Decorative line */}
              <div
                style={{
                  width: `${s(60)}px`,
                  height: `${s(4)}px`,
                  borderRadius: '9999px',
                  marginBottom: `${s(14)}px`,
                  background: accent,
                  boxShadow: `0 0 ${s(12)}px ${accent}`,
                }}
              />
              <p
                style={{
                  fontSize: `${s(26)}px`,
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                {content.attribution}
              </p>
              {content.attributionTitle && (
                <p
                  style={{
                    fontSize: `${s(18)}px`,
                    opacity: 0.8,
                    margin: 0,
                    marginTop: `${s(6)}px`,
                    fontWeight: 500,
                  }}
                >
                  {content.attributionTitle}
                </p>
              )}
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

          {/* Engagement prompt */}
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
            <span>💭</span>
            <span>Share your thoughts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
