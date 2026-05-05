import { useRef, useState, useEffect, useCallback } from 'react'
import { useCarouselFeed } from '../hooks/useCarouselFeed'
import { useFeedItems } from '../hooks/useFeedItems'
import VideoFeedItem from './VideoFeedItem'
import FullscreenAdItem from './FullscreenAdItem'
import ScrollRevealAd from './ScrollRevealAd'
import Carousel from './Carousel'
import FreeScrollCards from './FreeScrollCards'

// Free-scroll section injected after this many render items (~halfway)
const FREE_SCROLL_AFTER = 8

export default function VideoFeed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const startSentinelRef = useRef<HTMLDivElement>(null)
  const endSentinelRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [scrollLocked, setScrollLocked] = useState(false)
  const [inFreeScroll, setInFreeScroll] = useState(false)

  const { items, loading, error } = useFeedItems()
  const renderItems = useCarouselFeed(items)

  const handleMuteToggle = useCallback(() => setIsMuted((prev) => !prev), [])

  // Lock scroll for 3 s once a Werbepause item has fully snapped into view.
  useEffect(() => {
    const activeRender = renderItems.find((r) => r.index === activeIndex)
    const isWerbepause =
      activeRender?.kind === 'feed' && activeRender.item.isWerbepause === true

    if (!isWerbepause) {
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

    container.addEventListener('scrollend', applyLock, { once: true })
    const fallback = setTimeout(applyLock, 450)

    return () => {
      container.removeEventListener('scrollend', applyLock)
      clearTimeout(fallback)
      clearTimeout(unlockTimer)
    }
  }, [activeIndex, renderItems])

  const handleSkip = useCallback(() => {
    const c = containerRef.current
    if (!c) return
    c.scrollBy({ top: c.clientHeight, behavior: 'smooth' })
  }, [])

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
  }, [renderItems])

  // Sentinel observer — switches scroll-snap off while user is inside the free-scroll zone
  useEffect(() => {
    const start = startSentinelRef.current
    const end = endSentinelRef.current
    const container = containerRef.current
    if (!start || !end || !container) return

    // Track whether each sentinel has scrolled above the container's top edge
    const state = { startPassedOrAt: false, endPassedAbove: false }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isAbove =
            !entry.isIntersecting &&
            entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0)

          if (entry.target === start) {
            state.startPassedOrAt = entry.isIntersecting || isAbove
          } else {
            state.endPassedAbove = isAbove
          }
        })
        setInFreeScroll(state.startPassedOrAt && !state.endPassedAbove)
      },
      { root: container, threshold: 0 }
    )

    observer.observe(start)
    observer.observe(end)
    return () => observer.disconnect()
  }, [renderItems])

  const renderFeedItem = (r: (typeof renderItems)[number]) => {
    if (r.kind === 'carousel') {
      return (
        <Carousel key={r.key} category={r.category} index={r.index} isActive={activeIndex === r.index} />
      )
    }
    const { item, index, key } = r
    if (item.type === 'fullscreenAd') {
      return (
        <FullscreenAdItem key={key} item={item} index={index} isActive={activeIndex === index} isMuted={isMuted} onSkip={handleSkip} />
      )
    }
    if (item.type === 'scrollRevealAd') {
      return <ScrollRevealAd key={key} item={item} index={index} isActive={activeIndex === index} />
    }
    return (
      <VideoFeedItem key={key} item={item} index={index} isActive={activeIndex === index} isMuted={isMuted} onMuteToggle={handleMuteToggle} />
    )
  }

  if (loading || error) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {error && <p style={{ color: '#fff', fontSize: 14, opacity: 0.5 }}>Feed konnte nicht geladen werden.</p>}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="feed-container"
      style={{
        position: 'fixed',
        inset: 0,
        overflowY: scrollLocked ? 'hidden' : 'scroll',
        scrollSnapType: inFreeScroll ? 'none' : 'y mandatory',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
        background: '#0d0d0d',
        paddingTop: 'calc(env(safe-area-inset-top) + 42px)',
        paddingBottom: '80px',
        scrollPaddingTop: 'calc(env(safe-area-inset-top) + 42px)',
      }}
    >
      {renderItems.slice(0, FREE_SCROLL_AFTER).map((r) => renderFeedItem(r))}

      {/* Snap → free-scroll boundary */}
      <div ref={startSentinelRef} style={{ height: 1 }} />
      <FreeScrollCards />
      <div ref={endSentinelRef} style={{ height: 1 }} />

      {renderItems.slice(FREE_SCROLL_AFTER).map((r) => renderFeedItem(r))}
    </div>
  )
}
