import { useState, useRef, useCallback, useEffect } from 'react'
import type { CarouselCategory } from '../hooks/useCarouselFeed'
import { CAROUSEL_LABELS } from '../hooks/useCarouselFeed'
import { HeartIcon, ShareIcon } from './icons'

// Session-level flag — hint shown once across all carousel instances
let hintHasBeenShown = false

interface Slide {
  src: string
  isAd: boolean
}

function buildSlides(category: CarouselCategory): Slide[] {
  const base = `/images/carousels/${category}/`
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
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        width: '100%',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        overflow: 'hidden',
        background: '#000',
        flexShrink: 0,
      }}
    >
      {/* Slides wrapper — position:relative so hint can anchor to its bottom */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        {/* Horizontally scrollable slides */}
        <div
          ref={scrollRef}
          className="carousel-slides"
          onScroll={handleScroll}
          style={{
            width: '100%',
            height: '100%',
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={slide.src}
                alt={slide.isAd ? 'Anzeige' : `${label} ${i + 1}`}
                loading="lazy"
                style={{
                  width: 'calc(100% - 24px)',
                  height: '100%',
                  objectFit: 'contain',
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

        {/* Ghost swipe hint — first carousel exposure only, fades after 2s or on scroll */}
        <div
          style={{
            position: 'absolute',
            bottom: 12,
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
      </div>

      {/* Pagination dots */}
      <div
        style={{
          height: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
          background: '#000',
          flexShrink: 0,
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
              background: i === currentSlide ? '#fff' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Slide counter — top right */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(env(safe-area-inset-top) + 16px)',
          right: 16,
          zIndex: 20,
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

      {/* Bottom panel */}
      <div
        style={{
          background: '#000',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 14,
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 20px)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Text column */}
        <div style={{ flex: 1, paddingLeft: 20, paddingRight: 12 }}>
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
              color: 'rgba(255,255,255,0.6)',
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
            paddingRight: 16,
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
          </button>
        </div>
      </div>
    </div>
  )
}
