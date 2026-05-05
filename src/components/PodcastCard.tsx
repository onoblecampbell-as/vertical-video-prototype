import { useState } from 'react'

// Five bars with staggered animation delays and different max heights
const EQ_BARS = [
  { delay: '0s',     height: 14 },
  { delay: '0.25s',  height: 10 },
  { delay: '0.1s',   height: 16 },
  { delay: '0.35s',  height: 8  },
  { delay: '0.18s',  height: 12 },
]

function EqBars({ playing }: { playing: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 2,
        width: 16,
        height: 16,
        flexShrink: 0,
      }}
    >
      {EQ_BARS.map((bar, i) => (
        <div
          key={i}
          style={{
            width: 2,
            height: bar.height,
            background: '#fff',
            borderRadius: 1,
            transformOrigin: 'bottom',
            transform: playing ? undefined : 'scaleY(0.25)',
            animation: playing
              ? `eq-bar 0.7s ease-in-out infinite alternate ${bar.delay}`
              : 'none',
          }}
        />
      ))}
    </div>
  )
}

export default function PodcastCard() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div
      style={{
        position: 'relative',
        flex: 1,
        borderRadius: 24,
        overflow: 'hidden',
        background: '#1a3a1a',
      }}
    >
      {/* Cover image */}
      <img
        src="/images/podcast/stammplatz-cover.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />

      {/* Play button — fades out when playing */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 20,
          opacity: isPlaying ? 0 : 1,
          transition: 'opacity 0.25s ease',
          pointerEvents: isPlaying ? 'none' : 'auto',
        }}
      >
        <button
          onClick={() => setIsPlaying(true)}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#7da94d',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src="/icons/play.svg" width={20} height={20} alt="Play" style={{ marginLeft: 3 }} />
        </button>
      </div>

      {/* Now playing panel — rises from below on play */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          backdropFilter: 'blur(49.5px)',
          WebkitBackdropFilter: 'blur(49.5px)',
          background: 'rgba(255,255,255,0.01)',
          borderTop: '1px solid #868e96',
          transform: isPlaying ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.45s cubic-bezier(0.34, 1.15, 0.64, 1)',
        }}
      >
        {/* Section header */}
        <div
          style={{
            height: 44,
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 900,
              color: '#fff',
              fontFamily: '"Gotham", sans-serif',
              lineHeight: 1.25,
            }}
          >
            Momentan abgespielt
          </span>
        </div>

        {/* Track row */}
        <div
          style={{
            height: 58,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            paddingLeft: 24,
            paddingRight: 12,
          }}
        >
          {/* Thumbnail */}
          <img
            src="/images/podcast/stammplatz-thumb.png"
            alt=""
            style={{
              width: 46,
              height: 46,
              borderRadius: 2,
              objectFit: 'cover',
              opacity: 0.6,
              flexShrink: 0,
            }}
          />

          {/* Text */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <EqBars playing={isPlaying} />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: '"Gotham XNarrow", sans-serif',
                  lineHeight: 1.1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                Dein Fußballstart in den Tag
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <img src="/icons/headphones.svg" width={14} height={14} alt="" />
              <span
                style={{
                  fontSize: 13,
                  color: '#ced4da',
                  fontFamily: '"Gotham XNarrow", sans-serif',
                  lineHeight: 1.1,
                }}
              >
                23:56 · Fußball
              </span>
            </div>
          </div>

          {/* Pause button */}
          <button
            onClick={() => setIsPlaying(false)}
            style={{
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <img src="/icons/pause.svg" width={26} height={26} alt="Pause" />
          </button>
        </div>

        {/* Bottom safe spacing */}
        <div style={{ height: 20 }} />
      </div>
    </div>
  )
}
