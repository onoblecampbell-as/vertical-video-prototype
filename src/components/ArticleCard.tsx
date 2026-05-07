const CARD_H = 'calc(100dvh - env(safe-area-inset-top) - 94px)'
const CARD_W = 'calc(100% - 16px)'

export interface ArticleCardData {
  heroSrc: string
  kicker: string
  title: string
  description: string
  likeCount: number
}

interface Props {
  data: ArticleCardData
  marginTop?: number
  marginBottom?: number
}

export default function ArticleCard({ data, marginTop = 0, marginBottom = 0 }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        height: CARD_H,
        width: CARD_W,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop,
        marginBottom,
        borderRadius: 24,
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: '0px 1px 5px 1px rgba(0,0,0,0.1), 0px 1px 5px 0px rgba(0,0,0,0.2)',
        background: '#111',
      }}
    >
      {/* Hero image */}
      <img
        src={data.heroSrc}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          display: 'block',
        }}
      />

      {/* Gradient — transparent at top, dark at bottom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 45%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.7) 82%, rgba(0,0,0,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content — pinned to bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0 16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Kicker + Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.1,
              fontFamily: '"Gotham XNarrow", sans-serif',
              textShadow: '0px 2px 3px rgba(0,0,0,0.35)',
              textAlign: 'center',
            }}
          >
            {data.kicker}
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: 46,
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1,
              fontFamily: '"Gotham Condensed", sans-serif',
              textShadow: '0px 2px 3px rgba(0,0,0,0.25)',
              textAlign: 'center',
            }}
          >
            {data.title}
          </h2>
        </div>

        {/* Description */}
        <p
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.35,
            fontFamily: '"Gotham XNarrow", sans-serif',
            textAlign: 'center',
          }}
        >
          {data.description}
        </p>

        {/* Action bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Left: like + share */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <img src="/icons/heart.svg" width={22} height={22} alt="Like" />
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.4px',
                  fontFamily: '"Gotham XNarrow", sans-serif',
                }}
              >
                {data.likeCount}
              </span>
            </div>
            <img src="/icons/share.svg" width={20} height={24} alt="Share" />
          </div>

          {/* Right: CTA */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                fontFamily: '"Gotham XNarrow", sans-serif',
              }}
            >
              Mehr lesen
            </span>
            <span style={{ fontSize: 18, color: '#fff', lineHeight: 1 }}>›</span>
          </button>
        </div>
      </div>
    </div>
  )
}
