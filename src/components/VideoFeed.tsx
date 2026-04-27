import { useRef, useState, useEffect, useCallback } from 'react'
import { feedItems } from '../data/feedItems'
import VideoFeedItem from './VideoFeedItem'
import FullscreenAdItem from './FullscreenAdItem'
import CarouselFeedItem from './CarouselFeedItem'
import type { FeedItem } from '../types/feed'

// Repeat the sequence to create an effectively infinite feed for demo purposes
const LOOP_COUNT = 5
const loopedItems = Array.from({ length: LOOP_COUNT }, (_, r) =>
  feedItems.map((item, i) => ({
    item: item as FeedItem,
    index: r * feedItems.length + i,
    key: `${item.id}-loop${r}`,
  }))
).flat()

export default function VideoFeed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [scrollLocked, setScrollLocked] = useState(false)

  const handleMuteToggle = useCallback(() => setIsMuted((prev) => !prev), [])

  // Lock scroll for 3 s once a Werbepause item has fully snapped into view.
  // We must wait for the snap animation to finish before setting overflow:hidden —
  // applying it mid-animation stops the scroll at ~60% (where IntersectionObserver fires).
  useEffect(() => {
    const activeItem = feedItems[activeIndex % feedItems.length]
    if (!activeItem?.isWerbepause) {
      setScrollLocked(false)
      return
    }

    const container = containerRef.current
    if (!container) return

    let applied = false
    let unlockTimer: ReturnType<typeof setTimeout>

    const applyLock = () => {
      if (applied) return
      applied = true
      setScrollLocked(true)
      unlockTimer = setTimeout(() => setScrollLocked(false), 3000)
    }

    // scrollend fires when the snap animation completes (Chrome 114+, FF 109+, Safari 17.4+)
    container.addEventListener('scrollend', applyLock, { once: true })
    // Fallback: apply after 450 ms if scrollend never fires
    const fallback = setTimeout(applyLock, 450)

    return () => {
      container.removeEventListener('scrollend', applyLock)
      clearTimeout(fallback)
      clearTimeout(unlockTimer)
    }
  }, [activeIndex])

  // Skip forward one item (used by skippable fullscreen ads)
  const handleSkip = useCallback(() => {
    const c = containerRef.current
    if (!c) return
    c.scrollBy({ top: c.clientHeight, behavior: 'smooth' })
  }, [])

  // Phase 4: renders all feedItems (organic + fullscreenAd) using IntersectionObserver
  // to mark the item that covers ≥ 60% of the viewport as active
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
        overflowY: scrollLocked ? 'hidden' : 'scroll',
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}
    >
      {loopedItems.map(({ item, index, key }) =>
        item.type === 'fullscreenAd' ? (
          <FullscreenAdItem
            key={key}
            item={item}
            index={index}
            isActive={activeIndex === index}
            isMuted={isMuted}
            onSkip={handleSkip}
          />
        ) : item.type === 'carousel' ? (
          <CarouselFeedItem
            key={key}
            item={item}
            index={index}
            isActive={activeIndex === index}
          />
        ) : (
          <VideoFeedItem
            key={key}
            item={item}
            index={index}
            isActive={activeIndex === index}
            isMuted={isMuted}
            onMuteToggle={handleMuteToggle}
          />
        )
      )}
    </div>
  )
}
