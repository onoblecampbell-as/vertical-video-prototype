import { useState, useRef } from 'react'
import type { FeedItem } from '../types/feed'

interface Slide {
  type: 'image' | 'ad'
  src: string
}

function buildSlides(item: FeedItem): Slide[] {
  const images = item.images ?? []
  const slides: Slide[] = []
  for (let i = 0; i < images.length; i++) {
    if (i === item.adAfterIndex && item.adImage) {
      slides.push({ type: 'ad', src: item.adImage })
    }
    slides.push({ type: 'image', src: images[i] })
  }
  return slides
}

interface Props {
  item: FeedItem
  index: number
  isActive: boolean
}

export default function CarouselFeedItem({ item, index }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const slides = buildSlides(item)

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
      {/* Horizontally scrollable slides — fills remaining height above bottom panel */}
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
            }}
          >
            {/* Single contained image — no background blur, no cropping */}
            <img
              src={slide.src}
              alt={slide.type === 'ad' ? 'Anzeige' : `Bild ${i + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />

            {/* Ad label — top-left, ad slides only */}
            {slide.type === 'ad' && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(env(safe-area-inset-top) + 16px)',
                  left: 16,
                  zIndex: 10,
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  border: '1px solid #FFBE00',
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

      {/* Bottom panel — solid black, visually separates text from swipeable images */}
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
        {item.publisher && (
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#fff',
              marginBottom: 5,
              letterSpacing: '-0.01em',
            }}
          >
            {item.publisher}
          </div>
        )}
        {item.caption && (
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.88)',
              lineHeight: 1.45,
              letterSpacing: '-0.01em',
            }}
          >
            {item.caption}
          </div>
        )}
        {item.hashtags && item.hashtags.length > 0 && (
          <div
            style={{
              marginTop: 6,
              fontSize: 13,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '-0.01em',
            }}
          >
            {item.hashtags.join(' ')}
          </div>
        )}
      </div>
    </div>
  )
}
