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
        height: '100dvh',
        width: '100%',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        overflow: 'hidden',
        background: '#000',
        flexShrink: 0,
      }}
    >
      {/* Video layer */}
      <VideoPlayer src={item.videoSrc} isActive={isActive} isMuted={isMuted} />

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

      {/* Top-left: ad type label */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(env(safe-area-inset-top) + 16px)',
          right: 16,
          zIndex: 10,
          background: 'rgba(255,255,255,0.14)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 99,
          padding: '4px 11px',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          color: '#fff',
        }}
      >
        {item.isWerbepause && !expired ? 'Werbepause' : 'Anzeige'}
      </div>

      {/* Bottom section: advertiser, headline, subline, CTA, skip scaffold */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 28px)',
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

        {/* Skip / Werbepause row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          {item.isWerbepause ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: expired ? '#fff' : 'rgba(255,255,255,0.65)',
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              <div
                key={isActive ? 1 : 0}
                style={{ position: 'relative', width: 40, height: 40, flexShrink: 0 }}
              >
                <svg
                  width="40" height="40"
                  viewBox="0 0 40 40"
                  style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
                >
                  {/* Track */}
                  <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                  {/* Countdown arc */}
                  <circle
                    cx="20" cy="20" r="17"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="2"
                    strokeDasharray="106.81"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    style={{ animation: isActive ? 'werbepause-countdown 3s linear forwards' : 'none' }}
                  />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, color: '#fff',
                }}>
                  ⏸
                </div>
              </div>
              <span>{expired ? 'Anzeige überspringen ›' : 'Nicht überspringbar'}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
