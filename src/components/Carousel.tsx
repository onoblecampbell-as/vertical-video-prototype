import { useState, useRef } from 'react'
import type { CarouselCategory } from '../hooks/useCarouselFeed'
import { CAROUSEL_LABELS } from '../hooks/useCarouselFeed'

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
}

export default function Carousel({ category, index }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const slides = buildSlides(category)
  const label = CAROUSEL_LABELS[category]

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCurrentSlide(Math.round(el.scrollLeft / el.clientWidth))
  }

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
      {/* Horizontally scrollable slides */}
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
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 20px)',
        }}
      >
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
    </div>
  )
}
