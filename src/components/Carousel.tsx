import { useState, useRef, useEffect } from 'react'
import type { CarouselCategory } from '../hooks/useCarouselFeed'
import { CAROUSEL_LABELS } from '../hooks/useCarouselFeed'

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
  const [indicatorVisible, setIndicatorVisible] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const slides = buildSlides(category)
  const label = CAROUSEL_LABELS[category]

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
    if (indicatorVisible) setIndicatorVisible(false)
  }

  return (
    <div
      data-feed-item
      data-index={index}
      style={{
        position: 'relative',
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
      {/* Horizontally scrollable slides — fills entire card */}
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
              position: 'relative',
              overflow: 'hidden',
              background: '#111',
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
                objectPosition: 'center',
                display: 'block',
              }}
            />

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

      {/* Swipe indicator — fades in on activation, auto-dismisses after 2.5s */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
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
        {/* Pagination dots — one per slide, active slide highlighted */}
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {slides.map((_, i) => (
            <img
              key={i}
              src="/icons/ellipse.svg"
              width={14}
              height={14}
              alt=""
              style={{
                opacity: i === currentSlide ? 1 : 0.4,
                filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.8))',
                transition: 'opacity 0.2s ease',
              }}
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
    </div>
  )
}
