function SmallPlayIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
      <path d="M1 1L13 8L1 15V1Z" fill="#212529" />
    </svg>
  )
}

const STRIPES = [
  { left: 169, top: 17 },
  { left: 243, top: 17 },
  { left: 84, top: 0 },
  { left: 110, top: 92 },
  { left: 0, top: 45 },
  { left: 233, top: 149 },
]

export default function MiniPodcastCard() {
  return (
    <div
      style={{
        position: 'relative',
        flex: 1,
        borderRadius: 24,
        overflow: 'hidden',
        background: 'linear-gradient(-27.84deg, rgb(29, 189, 189) 29.15%, rgb(71, 201, 28) 163.12%)',
      }}
    >
      {/* Diagonal stripe pattern */}
      <div
        style={{
          position: 'absolute',
          top: -26,
          left: 84,
          width: 392,
          height: 299,
          mixBlendMode: 'luminosity',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      >
        {STRIPES.map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: pos.left,
              top: pos.top,
              width: 149,
              height: 149,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 24,
                height: 187,
                background: 'rgba(184,221,92,0.4)',
                transform: 'rotate(-45deg)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Play button — top centre */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 20,
        }}
      >
        <button
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#fff',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" style={{ marginLeft: 3 }}>
            <path d="M1 1L17 11L1 21V1Z" fill="#DD0000" />
          </svg>
        </button>
      </div>

      {/* Tilted headline */}
      <div
        style={{
          position: 'absolute',
          left: 11,
          top: 118,
          transform: 'rotate(-10deg)',
          transformOrigin: 'left center',
        }}
      >
        <div
          style={{
            background: '#212529',
            padding: '5px 20px 5px 48px',
            marginBottom: 4,
            display: 'inline-block',
          }}
        >
          <span
            style={{
              fontFamily: '"Gotham", sans-serif',
              fontWeight: 900,
              fontSize: 32,
              color: '#fff',
              lineHeight: 1.1,
              textShadow: '0px 1.66px 1.66px rgba(0,0,0,0.25)',
              whiteSpace: 'nowrap',
            }}
          >
            Top 5 News
          </span>
        </div>
        <div
          style={{
            background: '#212529',
            padding: '5px 20px 8px 20px',
            display: 'inline-block',
          }}
        >
          <span
            style={{
              fontFamily: '"Gotham", sans-serif',
              fontWeight: 900,
              fontSize: 32,
              color: '#fff',
              lineHeight: 1.1,
              textShadow: '0px 1.66px 1.66px rgba(0,0,0,0.25)',
              whiteSpace: 'nowrap',
            }}
          >
            des Tages
          </span>
        </div>
      </div>

      {/* Audio player */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
        }}
      >
        <div style={{ paddingTop: 2, flexShrink: 0 }}>
          <SmallPlayIcon />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span
              style={{
                fontFamily: '"Gotham Condensed", sans-serif',
                fontWeight: 900,
                fontSize: 17,
                color: '#fff',
                lineHeight: 1.1,
              }}
            >
              00:00
            </span>
            <span
              style={{
                fontFamily: '"Gotham Condensed", sans-serif',
                fontWeight: 900,
                fontSize: 17,
                color: '#fff',
                lineHeight: 1.1,
              }}
            >
              01:30
            </span>
          </div>
          <div style={{ position: 'relative', height: 6 }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#212529',
                opacity: 0.3,
                borderRadius: 3,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '28%',
                height: '100%',
                background: '#212529',
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
