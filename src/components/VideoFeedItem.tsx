import { useState, useRef, useCallback } from 'react'
import type { FeedItem } from '../types/feed'
import VideoPlayer from './VideoPlayer'
import VideoOverlay from './VideoOverlay'

interface Props {
  item: FeedItem
  index: number
  isActive: boolean
  isMuted: boolean
  onMuteToggle: () => void
}

export default function VideoFeedItem({
  item,
  index,
  isActive,
  isMuted,
  onMuteToggle,
}: Props) {
  const [liked, setLiked] = useState(false)
  const [tapHeart, setTapHeart] = useState<{ x: number; y: number } | null>(null)
  const lastTapRef = useRef(0)
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleLike = useCallback(() => {
    setLiked((prev) => !prev)
  }, [])

  const handleVideoTap = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now()
    const delta = now - lastTapRef.current
    lastTapRef.current = now

    if (delta < 320) {
      // Double-tap: show heart flash and like
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current)
      setLiked(true)
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
      setTapHeart({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      tapTimerRef.current = setTimeout(() => setTapHeart(null), 750)
    }
    // Single tap: could toggle play state — skipped for now to avoid interference
    // with double-tap and overlay button presses
  }, [])

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
      <VideoPlayer src={item.videoSrc!} poster={item.posterSrc} isActive={isActive} isMuted={isMuted} />

      {/* Tap-capture area (sits above video, below overlay buttons) */}
      <div
        onClick={handleVideoTap}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          cursor: 'pointer',
        }}
      />

      {/* Double-tap heart flash */}
      {tapHeart && (
        <span
          className="tap-heart"
          style={{
            left: tapHeart.x - 48,
            top: tapHeart.y - 48,
            color: '#ff4757',
          }}
        >
          ♥
        </span>
      )}

      {/* All overlay UI */}
      <VideoOverlay
        item={item}
        isActive={isActive}
        isMuted={isMuted}
        onMuteToggle={onMuteToggle}
        onLike={handleLike}
        liked={liked}
      />
    </div>
  )
}
