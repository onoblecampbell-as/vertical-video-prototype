import type { FeedItem } from '../types/feed'
import VideoPlayer from './VideoPlayer'

interface Props {
  item: FeedItem
  index: number
  isActive: boolean
  isMuted: boolean
}

export default function FullscreenAdItem({ item, index, isActive, isMuted }: Props) {
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
        {item.isWerbepause ? 'Werbepause' : 'Ad'}
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

        {/* Skip / Werbepause scaffold — interaction wired in Phase 5 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          {item.isWerbepause ? (
            // Werbepause: static circular indicator, Phase 5 will animate + lock scroll
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: 'rgba(255,255,255,0.65)',
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '2.5px solid rgba(255,255,255,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                ⏸
              </div>
              <span>Cannot skip</span>
            </div>
          ) : item.skipAfterSeconds !== undefined ? (
            // Skippable ad: skip button scaffold, Phase 5 will enable after countdown
            <button
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 6,
                color: 'rgba(255,255,255,0.55)',
                fontSize: 12,
                fontWeight: 600,
                padding: '7px 14px',
                cursor: 'default',
                letterSpacing: '0.03em',
              }}
            >
              Skip Ad ›
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
