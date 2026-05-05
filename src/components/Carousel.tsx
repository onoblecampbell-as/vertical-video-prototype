import { useState, useRef, useCallback, useEffect } from 'react'
import type { CarouselCategory } from '../hooks/useCarouselFeed'
import { CAROUSEL_LABELS } from '../hooks/useCarouselFeed'
import { HeartIcon, ShareIcon } from './icons'

// Session-level flag — hint shown once across all carousel instances
let hintHasBeenShown = false

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

const CAROUSEL_STATS: Record<CarouselCategory, { likes: number; shares: number }> = {
  marathon:  { likes: 8700,  shares: 312 },
  horoskop:  { likes: 11300, shares: 447 },
  nutrition: { likes: 6400,  shares: 218 },
  artemis:   { likes: 9200,  shares: 376 },
  timmy:     { likes: 14100, shares: 589 },
}

interface Slide {
  src: string
  isAd: boolean
}

const CAROUSEL_FOLDER: Record<CarouselCategory, string> = {
  marathon:  'marathon-test',
  horoskop:  'horoskop',
  nutrition: 'nutrition',
  artemis:   'artemis',
  timmy:     'timmy',
}

function buildSlides(category: CarouselCategory): Slide[] {
  const base = `/images/carousels/${CAROUSEL_FOLDER[category]}/`
  return [
    { src: `${base}${category}-1.png`, isAd: false },
    { src: `${base}${category}-2.png`, isAd: false },
    { src: `${base}${category}-ad.png`, isAd: true },
    { src: `${base}${category}-3.png`, isAd: false },
    { src: `${base}${category}-4.png`, isAd: false },
  ]
}

interface Props {
  category: CarouselCategory
  index: number
  isActive: boolean
}

export default function Carousel({ category, index, isActive }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [liked, setLiked] = useState(false)
  const [shareFlash, setShareFlash] = useState(false)
  const [hintVisible, setHintVisible] = useState(false)
  const [indicatorVisible, setIndicatorVisible] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const slides = buildSlides(category)
  const label = CAROUSEL_LABELS[category]
  const stats = CAROUSEL_STATS[category]

  // Show ghost hint on first-ever carousel exposure
  useEffect(() => {
    if (!isActive || hintHasBeenShown) return
    hintHasBeenShown = true
    setHintVisible(true)
    const t = setTimeout(() => setHintVisible(false), 2000)
    return () => clearTimeout(t)
  }, [isActive])

  // Show swipe indicator on every activation, auto-dismiss after 2.5s
  useEffect(() => {
    if (!isActive) {
      setIndicatorVisible(false)
      return
    }
    setIndicatorVisible(true)
    const t = setTimeout(() => setIndicatorVisible(false), 2500)
    return () => clearTimeout(t)
  }, [isActive])

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCurrentSlide(Math.round(el.scrollLeft / el.clientWidth))
    if (hintVisible) setHintVisible(false)
    if (indicatorVisible) setIndicatorVisible(false)
  }

  const handleShare = useCallback(() => {
    setShareFlash(true)
    setTimeout(() => setShareFlash(false), 600)
    const url = window.location.href
    if (navigator.share) {
      navigator.share({ title: label, url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(url).catch(() => {})
    }
  }, [label])

  return (
    <div
      data-feed-item
      data-index={index}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100dvh - env(safe-area-inset-top) - 94px)',
        width: 'calc(100% - 16px)',
        margin: '0 auto',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        overflow: 'hidden',
        background: '#111',
        flexShrink: 0,
        borderRadius: 24,
        marginBottom: 12,
      }}
    >
      {/* Horizontally scrollable slides — fills full card height */}
      <div
        ref={scrollRef}
        className="carousel-slides"
        onScroll={handleScroll}
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          touchAction: 'pan-x',
          position: 'relative',
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            style={{
              flex: '0 0 100%',
              height: '100%',
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always',
              position: 'relative',
              overflow: 'hidden',
              background: '#111',
            }}
          >
            {/* Full-bleed cover image */}
            <img
              src={slide.src}
              alt={slide.isAd ? 'Anzeige' : `${label} ${i + 1}`}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />

            {/* Category badge — first slide only */}
            {i === 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  zIndex: 10,
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  borderRadius: 99,
                  padding: '4px 11px',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: '#fff',
                }}
              >
                {label}
              </div>
            )}

            {/* Ad label — ad slide only */}
            {slide.isAd && (
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  zIndex: 10,
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  borderRadius: 99,
                  padding: '4px 11px',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: '#fff',
                }}
              >
                Anzeige
              </div>
            )}
          </div>
        ))}

      </div>

      {/* Bottom row — metadata + action rail */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 16,
          paddingTop: 10,
          paddingBottom: 20,
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.25s ease',
          pointerEvents: isActive ? 'auto' : 'none',
        }}
      >
        {/* Metadata */}
        <div style={{ flex: 1, paddingRight: 12 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#fff',
              marginBottom: 4,
              letterSpacing: '-0.01em',
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '-0.01em',
            }}
          >
            {slides.length} Bilder · Wische zum Entdecken
          </div>
        </div>

        {/* Action rail */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <button
            onClick={() => setLiked((p) => !p)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: liked ? '#ff4757' : '#fff',
              padding: 4,
              transition: 'color 0.15s',
            }}
            aria-label="Like"
          >
            <span className={liked ? 'heart-pop' : ''}>
              <HeartIcon filled={liked} />
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>
              {formatCount(stats.likes + (liked ? 1 : 0))}
            </span>
          </button>
          <button
            onClick={handleShare}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: shareFlash ? 'rgba(255,255,255,0.5)' : '#fff',
              padding: 4,
              transition: 'color 0.15s',
            }}
            aria-label="Teilen"
          >
            <ShareIcon />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>
              {formatCount(stats.shares)}
            </span>
          </button>
        </div>
      </div>

      {/* Slide counter — top right, above everything */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 20,
          background: 'rgba(0,0,0,0.45)',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.25s ease',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          borderRadius: 99,
          padding: '4px 11px',
          fontSize: 12,
          fontWeight: 600,
          color: '#fff',
          letterSpacing: '0.04em',
        }}
      >
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Swipe indicator — fades in on activation, auto-dismisses after 2.5s */}
      <div
        style={{
          position: 'absolute',
          bottom: 155,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          pointerEvents: 'none',
          zIndex: 10,
          opacity: indicatorVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {[0, 1, 2].map(i => (
            <img
              key={i}
              src="/icons/ellipse.svg"
              width={14}
              height={14}
              alt=""
              style={{ opacity: i === 1 ? 1 : 0.45 }}
            />
          ))}
        </div>
        <img
          src="/icons/swipe.svg"
          width={34}
          height={32}
          alt=""
          style={{ filter: 'drop-shadow(0 1px 8px rgba(0,0,0,0.7))' }}
        />
      </div>

      {/* Ghost swipe hint — floats above the swipe indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 195,
          left: 0,
          right: 0,
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 5,
          opacity: isActive && hintVisible ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.04em',
          }}
        >
          Wische →
        </span>
      </div>
    </div>
  )
}
