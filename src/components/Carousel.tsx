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

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCurrentSlide(Math.round(el.scrollLeft / el.clientWidth))
    if (hintVisible) setHintVisible(false)
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
        height: '100dvh',
        width: '100%',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        overflow: 'hidden',
        background: '#000',
        flexShrink: 0,
      }}
    >
      {/* Full-screen horizontally scrollable slides */}
      <div
        ref={scrollRef}
        className="carousel-slides"
        onScroll={handleScroll}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          touchAction: 'pan-x',
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
              background: '#000',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              src={slide.src}
              alt={slide.isAd ? 'Anzeige' : `${label} ${i + 1}`}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Category badge — first slide only */}
            {i === 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(env(safe-area-inset-top) + 16px)',
                  left: 16,
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
                  top: 'calc(env(safe-area-inset-top) + 16px)',
                  left: 16,
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

      {/* Bottom gradient — ensures UI legibility over image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.92) 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Slide counter — top right */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(env(safe-area-inset-top) + 16px)',
          right: 16,
          zIndex: 10,
          background: 'rgba(0,0,0,0.45)',
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

      {/* Ghost swipe hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(env(safe-area-inset-bottom) + 130px)',
          left: 0,
          right: 0,
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 5,
          opacity: hintVisible ? 1 : 0,
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

      {/* Bottom overlay: pagination dots + text + action rail */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 5,
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 20px)',
        }}
      >
        {/* Pagination dots */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
            paddingBottom: 14,
            pointerEvents: 'none',
          }}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === currentSlide ? 8 : 6,
                height: i === currentSlide ? 8 : 6,
                borderRadius: '50%',
                background: i === currentSlide ? '#fff' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Text + action rail */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 16,
          }}
        >
          {/* Text column */}
          <div style={{ flex: 1, paddingRight: 12 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#fff',
                marginBottom: 5,
                letterSpacing: '-0.01em',
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.7)',
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
              gap: 18,
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
      </div>
    </div>
  )
}
