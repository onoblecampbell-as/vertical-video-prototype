import { HeartIcon, ShareIcon } from './icons'

export interface MiniArticleCardData {
  heroSrc: string
  kicker: string
  title: string
  likeCount?: number
}

interface Props {
  data: MiniArticleCardData
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export default function MiniArticleCard({ data }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        flex: 1,
        borderRadius: 24,
        overflow: 'hidden',
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
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(102,102,102,0) 19%, rgba(0,0,0,0.7) 100%)',
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
          padding: '96px 0 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {/* Kicker */}
        <p
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.1,
            fontFamily: '"Gotham XNarrow", sans-serif',
            textShadow: '0px 2px 3px rgba(0,0,0,0.25)',
            textAlign: 'center',
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {data.kicker}
        </p>

        {/* Title */}
        <h3
          style={{
            margin: 0,
            fontSize: 48,
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1,
            fontFamily: '"Gotham Condensed", sans-serif',
            textShadow: '0px 2px 3px rgba(0,0,0,0.25)',
            textAlign: 'center',
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {data.title}
        </h3>

        {/* Action row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 24,
            paddingRight: 16,
          }}
        >
          {/* Left: heart + count + share */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <HeartIcon />
              {data.likeCount !== undefined && (
                <span
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: '#fff',
                    fontFamily: '"Gotham XNarrow", sans-serif',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  {data.likeCount}
                </span>
              )}
            </div>
            <ShareIcon />
          </div>

          {/* Right: Mehr lesen */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                fontSize: 17,
                fontWeight: 700,
                fontFamily: '"Gotham XNarrow", sans-serif',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                color: '#fff',
              }}
            >
              Mehr lesen
            </span>
            <ChevronRightIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
