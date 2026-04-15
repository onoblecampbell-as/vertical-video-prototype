import { useRef, useState, useEffect, useCallback } from 'react'
import { feedItems } from '../data/feedItems'
import VideoFeedItem from './VideoFeedItem'
import type { FeedItem } from '../types/feed'

export default function VideoFeed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)

  const handleMuteToggle = useCallback(() => setIsMuted((prev) => !prev), [])

  // IntersectionObserver: mark the item that covers ≥ 60% of the viewport as active
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const idx = parseInt(
              (entry.target as HTMLElement).dataset.index ?? '0',
              10
            )
            setActiveIndex(idx)
          }
        })
      },
      {
        root: container,
        threshold: 0.6,
      }
    )

    const items = container.querySelectorAll('[data-feed-item]')
    items.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="feed-container"
      style={{
        position: 'fixed',
        inset: 0,
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}
    >
      {(feedItems as FeedItem[]).map((item, index) => (
        <VideoFeedItem
          key={item.id}
          item={item}
          index={index}
          isActive={activeIndex === index}
          isMuted={isMuted}
          onMuteToggle={handleMuteToggle}
        />
      ))}
    </div>
  )
}
