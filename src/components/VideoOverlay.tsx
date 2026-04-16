import { useState, useCallback, useEffect } from 'react'
import type { FeedItem } from '../types/feed'
import {
  HeartIcon,
  ShareIcon,
  VolumeOnIcon,
  VolumeOffIcon,
  VerifiedIcon,
  MusicNoteIcon,
} from './icons'
import AdOverlay from './AdOverlay'

interface Props {
  item: FeedItem
  isMuted: boolean
  onMuteToggle: () => void
  onLike: () => void
  liked: boolean
}

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

export default function VideoOverlay({
  item,
  isMuted,
  onMuteToggle,
  onLike,
  liked,
}: Props) {
  const [shareFlash, setShareFlash] = useState(false)
  const [copyToast, setCopyToast] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    setWordIndex(0)
    const words = item.subtitleWords
    if (!words?.length) return
    const id = setInterval(() => setWordIndex(i => (i + 1) % words.length), 400)
    return () => clearInterval(id)
  }, [item.id, item.subtitleWords])

  const handleShare = useCallback(() => {
    const url = `${window.location.origin}/video/${item.id}`
    setShareFlash(true)
    setTimeout(() => setShareFlash(false), 600)
    if (navigator.share) {
      navigator.share({ title: item.caption, url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopyToast(true)
        setTimeout(() => setCopyToast(false), 2000)
      }).catch(() => {})
    }
  }, [item.id, item.caption])

  const displayName = item.publisher
  const isVerified = item.publisherVerified ?? false

  return (
    <>
      {/* Gradient — top fade + heavy bottom fade */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 20%, transparent 45%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.85) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Subtitle / caption overlay — positioned upper-center */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 16,
          right: 16,
          transform: 'translateY(-50%)',
          textAlign: 'center',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        {item.subtitleWords?.map((word, i) => (
          <span
            key={i}
            style={{
              display: 'inline',
              fontSize: 15,
              fontWeight: 600,
              lineHeight: 1.8,
              color: i === wordIndex ? '#000' : '#fff',
              background: i === wordIndex ? '#E30613' : 'rgba(0,0,0,0.32)',
              textShadow: i === wordIndex ? 'none' : '0 1px 6px rgba(0,0,0,0.9)',
              padding: '2px 5px',
              borderRadius: 3,
              marginRight: 3,
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Copy-link toast */}
      {copyToast && (
        <div className="copy-toast">
          Link copied
        </div>
      )}

      {/* Top-right: Sponsored badge (isSponsored treatment only) */}
      {item.isSponsored && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(env(safe-area-inset-top) + 16px)',
            right: 16,
            background: 'rgba(255,255,255,0.14)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.28)',
            borderRadius: 99,
            padding: '4px 11px',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#fff',
            zIndex: 10,
          }}
        >
          Sponsored
        </div>
      )}

      {/* Bottom section — ad overlay (if any) + metadata row */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 5,
        }}
      >
        {/* Metadata + action rail */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            padding: '0 12px 16px',
            gap: 8,
          }}
        >
          {/* Left: metadata */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {/* Lower-third overlay ad — sits directly above publisher row */}
            {item.hasOverlayAd && item.overlayAd && (
              <div style={{ marginBottom: 6 }}>
                <AdOverlay ad={item.overlayAd} />
              </div>
            )}

            {/* Publisher row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {/* Avatar placeholder */}
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.18)',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '-0.01em',
                }}
              >
                {displayName?.[0] ?? '?'}
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#fff',
                  letterSpacing: '-0.01em',
                }}
              >
                @{displayName}
              </span>
              {isVerified && <VerifiedIcon />}
            </div>

            {/* Caption */}
            <p
              style={{
                fontSize: 13,
                color: '#fff',
                lineHeight: 1.45,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {item.caption ?? ''}
            </p>

            {/* Hashtags */}
            {item.hashtags && item.hashtags.length > 0 && (
              <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
                {item.hashtags.join(' ')}
              </p>
            )}

            {/* Audio label */}
            {item.audioLabel && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ color: 'rgba(255,255,255,0.55)', display: 'flex' }}>
                  <MusicNoteIcon />
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.55)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.audioLabel}
                </span>
              </div>
            )}

            {/* CTA for sponsored treatment */}
            {item.isSponsored && item.cta && (
              <button
                style={{
                  marginTop: 4,
                  padding: '10px 20px',
                  background: '#fff',
                  color: '#000',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  letterSpacing: '0.03em',
                }}
              >
                {item.cta}
              </button>
            )}
          </div>

          {/* Right: action rail */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
              flexShrink: 0,
              paddingBottom: 4,
            }}
          >
            <button
              onClick={onMuteToggle}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#fff',
                padding: 4,
              }}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
              <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>Sound</span>
            </button>
            <ActionButton
              icon={<HeartIcon filled={liked} />}
              count={(item.likes ?? 0) + (liked ? 1 : 0)}
              onClick={onLike}
              color={liked ? '#ff4757' : '#fff'}
              className={liked ? 'heart-pop' : ''}
            />
            <ActionButton
              icon={<ShareIcon />}
              count={item.shares ?? 0}
              onClick={handleShare}
              color={shareFlash ? 'rgba(255,255,255,0.5)' : '#fff'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

function ActionButton({
  icon,
  count,
  onClick,
  color = '#fff',
  className = '',
}: {
  icon: React.ReactNode
  count: number
  onClick: () => void
  color?: string
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color,
        padding: 4,
        transition: 'color 0.15s',
      }}
    >
      <span className={className}>{icon}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>
        {formatCount(count)}
      </span>
    </button>
  )
}
