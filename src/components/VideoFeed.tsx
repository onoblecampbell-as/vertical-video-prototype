import { Fragment, useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { useAreaFeed } from '../hooks/useFeedLayout'
import type { RenderItem } from '../hooks/useCarouselFeed'
import { useFeedItems } from '../hooks/useFeedItems'
import VideoFeedItem from './VideoFeedItem'
import FullscreenAdItem from './FullscreenAdItem'
import ScrollRevealAd from './ScrollRevealAd'
import Carousel from './Carousel'
import FreeScrollCards from './FreeScrollCards'

export default function VideoFeed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const zoneState = useRef<Map<string, { started: boolean; ended: boolean }>>(new Map())
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [scrollLocked, setScrollLocked] = useState(false)
  const [inFreeScroll, setInFreeScroll] = useState(false)

  const { items, loading, error } = useFeedItems()
  const areaGroups = useAreaFeed(items)

  // Flat list of all snap render items — used for werbepause detection
  const allRenderItems = useMemo(
    () => areaGroups.flatMap(({ area1, area3, area5 }) => [...area1, ...area3, ...area5]),
    [areaGroups]
  )

  const handleMuteToggle = useCallback(() => setIsMuted((prev) => !prev), [])

  useEffect(() => {
    const set = () => document.documentElement.style.setProperty('--real-vh', `${window.innerHeight}px`)
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])

  // Lock scroll for 3 s once a Werbepause item has fully snapped into view.
  useEffect(() => {
    const activeRender = allRenderItems.find((r) => r.index === activeIndex)
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
  }, [activeIndex, allRenderItems])

  const handleSkip = useCallback(() => {
    const c = containerRef.current
    if (!c) return
    c.scrollBy({ top: c.clientHeight, behavior: 'smooth' })
  }, [])

  // Active item observer — DOM-based, re-arms when area layout changes
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
      { root: container, threshold: 0.6 }
    )

    container.querySelectorAll('[data-feed-item]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [areaGroups])

  // Multi-zone sentinel observer — disables scroll-snap while inside any smooth zone
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    zoneState.current.clear()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          const zoneId = el.dataset.zoneId!
          const zoneType = el.dataset.zoneType! // 'start' | 'end'

          const isAbove =
            !entry.isIntersecting &&
            entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0)
          const isPassed = entry.isIntersecting || isAbove

          if (!zoneState.current.has(zoneId)) {
            zoneState.current.set(zoneId, { started: false, ended: false })
          }
          const state = zoneState.current.get(zoneId)!

          if (zoneType === 'start') {
            state.started = isPassed
          } else {
            state.ended = isPassed
          }
        })

        const inAnyZone = Array.from(zoneState.current.values()).some(
          (s) => s.started && !s.ended
        )
        setInFreeScroll(inAnyZone)
      },
      { root: container, threshold: 0 }
    )

    container.querySelectorAll('[data-zone-id]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [areaGroups])

  const renderFeedItem = (r: RenderItem) => {
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
        overscrollBehavior: 'contain',
        background: '#0d0d0d',
        paddingTop: 'calc(env(safe-area-inset-top) + 42px)',
        paddingBottom: '80px',
        scrollPaddingTop: 'calc(env(safe-area-inset-top) + 42px)',
      }}
    >
      {areaGroups.map(({ area1, area3, area5 }, loopIdx) => (
        <Fragment key={`loop-${loopIdx}`}>
          {/* ── Area 1 (snap) ── */}
          {area1.map(renderFeedItem)}

          {/* ── Area 2 (smooth) ── */}
          <div style={{ height: 1 }} data-zone-id={`a${loopIdx}`} data-zone-type="start" />
          <FreeScrollCards />
          <div style={{ height: 1 }} data-zone-id={`a${loopIdx}`} data-zone-type="end" />

          {/* ── Area 3 (snap) ── */}
          {area3.map(renderFeedItem)}

          {/* ── Area 4 (smooth) ── */}
          <div style={{ height: 1 }} data-zone-id={`b${loopIdx}`} data-zone-type="start" />
          <FreeScrollCards />
          <div style={{ height: 1 }} data-zone-id={`b${loopIdx}`} data-zone-type="end" />

          {/* ── Area 5 (snap) ── */}
          {area5.map(renderFeedItem)}
        </Fragment>
      ))}
    </div>
  )
}
