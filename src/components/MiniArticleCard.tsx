export interface MiniArticleCardData {
  heroSrc: string
  kicker: string
  title: string
  likeCount?: number
}

interface Props {
  data: MiniArticleCardData
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

        {/* Action bar — identical to ArticleCard */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 16, paddingRight: 16, marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <img src="/icons/heart.svg" width={22} height={22} alt="Like" />
              {data.likeCount !== undefined && (
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
              )}
            </div>
            <img src="/icons/share.svg" width={20} height={24} alt="Share" />
          </div>
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
