import { useState, useEffect } from 'react'
import type { FeedItem } from '../types/feed'
import VideoPlayer from './VideoPlayer'

interface Props {
  item: FeedItem
  index: number
  isActive: boolean
  isMuted: boolean
  onSkip?: () => void
}

export default function FullscreenAdItem({ item, index, isActive, isMuted, onSkip }: Props) {
  const [expired, setExpired] = useState(false)
  const [canSkip, setCanSkip] = useState(false)

  // Werbepause: flip label + text after 3 s
  useEffect(() => {
    if (!item.isWerbepause) return
    setExpired(false)
    if (!isActive) return
    const t = setTimeout(() => setExpired(true), 3000)
    return () => clearTimeout(t)
  }, [isActive, item.isWerbepause])

  // Skippable ad: enable skip button after skipAfterSeconds
  useEffect(() => {
    if (item.skipAfterSeconds === undefined) return
    setCanSkip(false)
    if (!isActive) return
    const t = setTimeout(() => setCanSkip(true), item.skipAfterSeconds * 1000)
    return () => clearTimeout(t)
  }, [isActive, item.skipAfterSeconds])
  return (
    <div
      data-feed-item
      data-index={index}
      style={{
        position: 'relative',
        height: 'calc(100dvh - env(safe-area-inset-top) - 94px)',
        width: 'calc(100% - 16px)',
        margin: '0 auto',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        overflow: 'hidden',
        background: '#000',
        flexShrink: 0,
        borderRadius: 24,
        marginBottom: 12,
      }}
    >
      {/* Video layer */}
      <VideoPlayer src={item.videoSrc!} poster={item.posterSrc} isActive={isActive} isMuted={isMuted} />

      {/* Gradient — heavier bottom fade for copy legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 25%, transparent 45%, rgba(0,0,0,0.65) 72%, rgba(0,0,0,0.94) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* UI overlay — hidden until card is active */}
      <div style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.25s ease', pointerEvents: isActive ? 'auto' : 'none' }}>

      {/* Top-right: ad label — skippable ads only */}
      {!item.isWerbepause && (
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            background: 'rgba(255,255,255,0.14)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1px solid #FFBE00',
            borderRadius: 99,
            padding: '4px 11px',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            color: '#fff',
          }}
        >
          Anzeige
        </div>
      )}

      {/* Bottom section: advertiser, headline, subline, CTA, skip scaffold */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 28,
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {/* Advertiser name */}
        {item.advertiser && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
            }}
          >
            {item.advertiser}
          </span>
        )}

        {/* Headline */}
        {item.adHeadline && (
          <h2
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {item.adHeadline}
          </h2>
        )}

        {/* Subline */}
        {item.adSubline && (
          <p
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.78)',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {item.adSubline}
          </p>
        )}

        {/* CTA button */}
        {item.adCta && (
          <button
            style={{
              marginTop: 6,
              padding: '13px 28px',
              background: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              alignSelf: 'flex-start',
              letterSpacing: '0.02em',
            }}
          >
            {item.adCta}
          </button>
        )}

      </div>

      {/* Bottom-right: Werbepause pill with embedded countdown — disappears after expiry */}
      {item.isWerbepause && !expired && (
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            right: 20,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.14)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1px solid #FFBE00',
            borderRadius: 99,
            padding: '6px 12px 6px 8px',
          }}
        >
          {/* Countdown ring — grey outline always visible, yellow drains during countdown */}
          <div
            key={isActive ? 1 : 0}
            style={{ position: 'relative', width: 22, height: 22, flexShrink: 0 }}
          >
            <svg
              width="22" height="22"
              viewBox="0 0 22 22"
              style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
            >
              <circle cx="11" cy="11" r="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              {!expired && (
                <circle
                  cx="11" cy="11" r="8"
                  fill="none"
                  stroke="#FFD700"
                  strokeWidth="2"
                  strokeDasharray="50.27"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  style={{ animation: isActive ? 'werbepause-countdown-small 3s linear forwards' : 'none' }}
                />
              )}
            </svg>
          </div>

          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#fff',
              minWidth: 72,
              textAlign: 'center',
            }}
          >
            {expired ? 'Anzeige' : 'Werbepause'}
          </span>
        </div>
      )}

      </div>{/* end UI overlay */}
    </div>
  )
}
