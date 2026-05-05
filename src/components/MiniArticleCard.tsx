export interface MiniArticleCardData {
  heroSrc: string
  kicker: string
  title: string
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
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.82) 100%)',
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
          padding: '0 16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.1,
            fontFamily: '"Gotham XNarrow", sans-serif',
            textShadow: '0px 2px 3px rgba(0,0,0,0.25)',
          }}
        >
          {data.kicker}
        </p>
        <h3
          style={{
            margin: 0,
            fontSize: 48,
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1,
            fontFamily: '"Gotham Condensed", sans-serif',
            textShadow: '0px 2px 3px rgba(0,0,0,0.25)',
          }}
        >
          {data.title}
        </h3>
      </div>
    </div>
  )
}
