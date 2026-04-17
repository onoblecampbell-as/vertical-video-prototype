import { useState, useCallback, useEffect } from 'react'
import type { FeedItem } from '../types/feed'
import {
  HeartIcon,
  ShareIcon,
  VolumeOnIcon,
  VolumeOffIcon,
  VerifiedIcon,
} from './icons'
import AdOverlay from './AdOverlay'

interface Props {
  item: FeedItem
  isActive: boolean
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
  isActive,
  isMuted,
  onMuteToggle,
  onLike,
  liked,
}: Props) {
  const [shareFlash, setShareFlash] = useState(false)
  const [copyToast, setCopyToast] = useState(false)
  const [showOverlayAd, setShowOverlayAd] = useState(false)

  // Delay ad appearance by 1 s — applies to both overlay card and graphical ad
  useEffect(() => {
    if (!isActive || (!item.hasOverlayAd && !item.hasGraphicalAd)) {
      setShowOverlayAd(false)
      return
    }
    const t = setTimeout(() => setShowOverlayAd(true), 1000)
    return () => clearTimeout(t)
  }, [isActive, item.hasOverlayAd, item.hasGraphicalAd])

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

      {/* Subtitle block — single continuous bg, max 2 lines */}
      {item.captions && (
        <div
          style={{
            position: 'absolute',
            top: (item.subtitleUpperThird || (showOverlayAd && !!item.graphicalAdSrc)) ? '33%' : '50%',
            transition: 'top 0.3s ease',
            left: 32,
            right: 32,
            textAlign: 'center',
            transform: 'translateY(-50%)',
            zIndex: 2,
            pointerEvents: 'none',
            background: 'rgba(0,0,0,0.6)',
            borderRadius: 6,
            padding: '8px 8px',
            lineHeight: 1.8,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>
            {item.captions ?? ''}
          </span>
        </div>
      )}

      {/* Copy-link toast */}
      {copyToast && (
        <div className="copy-toast">
          Link kopiert
        </div>
      )}


      {/* Bottom section */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 5,
        }}
      >
        {/* Metadata column — shifts up when graphical ad appears */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            paddingLeft: 12,
            paddingRight: 72,
            paddingBottom: 'calc(env(safe-area-inset-bottom) + 28px)',
          }}
        >
          {/* Overlay ad card — sits above publisher row */}
          {showOverlayAd && item.overlayAd && (
            <div style={{ marginBottom: 6 }}>
              <AdOverlay ad={item.overlayAd} />
            </div>
          )}

          {/* Publisher row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
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

          {/* Linkout CTA — content continuation, not an ad */}
          {item.hasLinkout && item.linkoutCta && (
            <button
              onClick={() => {}}
              style={{
                marginTop: 4,
                padding: '10px 20px',
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                alignSelf: 'flex-start',
                letterSpacing: '0.03em',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            >
              {item.linkoutCta}
            </button>
          )}
        </div>

        {/* Graphical ad — full-width image docked to the bottom, pushes metadata up */}
        {showOverlayAd && item.graphicalAdSrc && (
          <img
            src={item.graphicalAdSrc}
            alt=""
            style={{ width: '100%', display: 'block' }}
          />
        )}

        {/* Action rail — shifts up with graphical ad when visible */}
        <div
          style={{
            position: 'absolute',
            right: 12,
            bottom: showOverlayAd && item.graphicalAdSrc
              ? 'calc(env(safe-area-inset-bottom) + 16px + 160px)'
              : 'calc(env(safe-area-inset-bottom) + 16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            transition: 'bottom 0.3s ease',
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
            <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>Ton</span>
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
