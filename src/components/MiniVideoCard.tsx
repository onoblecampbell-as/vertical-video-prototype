import { useState, useRef, useEffect } from 'react'

// Inline dark play triangle — used on white button background
function PlayIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1.5L17 11L1 20.5V1.5Z" fill="#111111" stroke="#111111" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}

export default function MiniVideoCard() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.currentTime = 0
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [isPlaying])

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
      {/* Teaser image — always present, blurs behind in playing state */}
      <img
        src="/images/articles/video-teaser.jpg"
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

      {/* ── IDLE LAYER ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: isPlaying ? 0 : 1,
          transition: 'opacity 0.3s ease',
          pointerEvents: isPlaying ? 'none' : 'auto',
        }}
      >
        {/* White play button — top centre */}
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
            onClick={() => setIsPlaying(true)}
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
              paddingLeft: 3,
            }}
          >
            <PlayIcon />
          </button>
        </div>

        {/* Bottom blur panel with kicker + title */}
        <div
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: 154,
            backdropFilter: 'blur(49.5px)',
            WebkitBackdropFilter: 'blur(49.5px)',
            background: 'rgba(66,44,44,0.09)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            padding: '0 16px',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 700,
              color: '#fff',
              textAlign: 'center',
              lineHeight: 1.1,
              fontFamily: '"Gotham XNarrow", sans-serif',
              textShadow: '0px 2px 3px rgba(0,0,0,0.25)',
            }}
          >
            Glücksfund beim Restaurieren
          </p>
          <h3
            style={{
              margin: 0,
              fontSize: 30,
              fontWeight: 900,
              color: '#fff',
              textAlign: 'center',
              lineHeight: 1,
              fontFamily: '"Gotham Condensed", sans-serif',
              textShadow: '0px 2px 3px rgba(0,0,0,0.25)',
            }}
          >
            Plötzlich entdecken sie das Bargeld-Versteck
          </h3>
        </div>
      </div>

      {/* ── PLAYING LAYER ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(49.5px)',
          WebkitBackdropFilter: 'blur(49.5px)',
          background: 'rgba(66,44,44,0.09)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isPlaying ? 1 : 0,
          transition: 'opacity 0.35s ease',
          pointerEvents: isPlaying ? 'auto' : 'none',
        }}
      >
        {/* 16:9 video frame — centred, ~88% card width */}
        <div
          style={{
            width: '88%',
            aspectRatio: '16 / 9',
            borderRadius: 8,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <video
            ref={videoRef}
            src="/ref/media/horizontal-video.mp4"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            playsInline
            muted
            loop
          />
        </div>

        {/* Tap anywhere to dismiss */}
        <button
          onClick={() => setIsPlaying(false)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label="Close video"
        />
      </div>
    </div>
  )
}
