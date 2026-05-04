import { useRef, useEffect } from 'react'
import type { FeedItem } from '../types/feed'

interface Props {
  item: FeedItem
  index: number
  isActive: boolean
}

const WINDOW_HEIGHT: Record<string, string> = {
  mrec:  '52dvh',
  large: '62dvh',
  full:  '72dvh',
}

// Extra height added above and below the creative so parallax travel
// never reveals empty space at the edges of the window.
const PARALLAX = 32

export default function ScrollRevealAd({ item, index, isActive: _isActive }: Props) {
  const outerRef    = useRef<HTMLDivElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const creativeRef = useRef<HTMLDivElement>(null)
  const isVideo     = !!item.videoSrc

  // Video play/pause — driven by IntersectionObserver, not activeIndex,
  // because the outer container has no data-feed-item.
  useEffect(() => {
    if (!isVideo) return
    const outer = outerRef.current
    const video = videoRef.current
    if (!outer || !video) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { root: null, threshold: 0 }
    )
    obs.observe(outer)
    return () => obs.disconnect()
  }, [isVideo])

  // Scroll-driven parallax: creative rises as user scrolls through the 200dvh zone.
  // progress 0 → translateY(+PARALLAX)  — image sits lower, revealing from below
  // progress 1 → translateY(-PARALLAX)  — image has risen to show top portion
  useEffect(() => {
    const outer    = outerRef.current
    const creative = creativeRef.current
    if (!outer || !creative) return

    // The scroll container is the direct parent (VideoFeed's overflow-y div)
    const container = outer.parentElement as HTMLElement | null
    if (!container) return

    const update = () => {
      const scrolled  = container.scrollTop - outer.offsetTop
      const progress  = Math.max(0, Math.min(1, scrolled / window.innerHeight))
      const offset    = PARALLAX - progress * PARALLAX * 2
      creative.style.transform = `translateY(${offset}px)`
    }

    update() // set initial position before any scroll fires
    container.addEventListener('scroll', update, { passive: true })
    return () => container.removeEventListener('scroll', update)
  }, [])

  const windowHeight = WINDOW_HEIGHT[item.viewportSize ?? 'large']

  return (
    // Outer: 200dvh — snap stops here; no inner snap points, so the user
    // scrolls freely through a full viewport height of parallax travel,
    // then snaps forward to the next feed item.
    <div
      ref={outerRef}
      style={{
        height: '200dvh',
        width: '100%',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        flexShrink: 0,
      }}
    >
      {/* Sticky frame — stays fixed at top:0 while the 200dvh outer scrolls */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          width: '100%',
          overflow: 'hidden',
          background: '#0d0d0d',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'calc(env(safe-area-inset-top) + 16px)',
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 20px)',
        }}
      >
        {/* Label row */}
        <div
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            Advertisement
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        </div>

        {/* Ad window */}
        <div
          style={{
            width: '100%',
            height: windowHeight,
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          {/* Creative — extends PARALLAX px above and below the window so
              the scroll travel never reveals a gap at either edge */}
          <div
            ref={creativeRef}
            style={{
              position: 'absolute',
              top: -PARALLAX,
              bottom: -PARALLAX,
              left: 0,
              right: 0,
              transform: `translateY(${PARALLAX}px)`, // initial: sits low
              willChange: 'transform',
            }}
          >
            {isVideo ? (
              <video
                ref={videoRef}
                src={item.videoSrc}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={item.imageSrc}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
              />
            )}
          </div>

          {/* Inset shadow reinforces the window frame */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              boxShadow: 'inset 0 0 32px rgba(0,0,0,0.4)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Footer: advertiser + CTA */}
        <div
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            {item.advertiser && (
              <span
                style={{
                  display: 'block',
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase' as const,
                  marginBottom: 4,
                }}
              >
                {item.advertiser}
              </span>
            )}
            {item.adHeadline && (
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#fff',
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {item.adHeadline}
              </p>
            )}
          </div>

          {item.adCta && (
            <button
              style={{
                flexShrink: 0,
                padding: '12px 20px',
                background: '#fff',
                color: '#000',
                border: 'none',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                whiteSpace: 'nowrap' as const,
                letterSpacing: '0.01em',
              }}
            >
              {item.adCta}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
