import type { OverlayAd } from '../types/feed'

interface Props {
  ad: OverlayAd
}

export default function AdOverlay({ ad }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'rgba(12, 12, 12, 0.86)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '10px 12px',
        cursor: 'pointer',
      }}
      onClick={() => {
        // TODO: navigate to ad destination
      }}
    >
      {/* Ad image / emoji thumbnail */}
      {ad.overlayImage ? (
        <img
          src={ad.overlayImage}
          alt=""
          style={{
            width: 64,
            height: 64,
            borderRadius: 8,
            objectFit: 'cover',
            flexShrink: 0,
            display: 'block',
          }}
        />
      ) : (
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.1)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
          }}
        >
          {ad.emoji ?? '🖼️'}
        </div>
      )}

      {/* Ad text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            display: 'block',
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: 3,
          }}
        >
          {ad.label}
        </span>
        <p
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.2,
            marginBottom: 2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {ad.title}
        </p>
        <p
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.3,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {ad.description}
        </p>
      </div>

      {/* CTA */}
      <button
        style={{
          flexShrink: 0,
          padding: '7px 13px',
          background: '#fff',
          color: '#000',
          border: 'none',
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
        }}
        onClick={(e) => {
          e.stopPropagation()
          // TODO: navigate to ad destination
        }}
      >
        {ad.cta}
      </button>
    </div>
  )
}
