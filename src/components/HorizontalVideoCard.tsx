import { useState, useRef, useEffect } from 'react'

const CARD_W = 'calc(100% - 16px)'

export default function HorizontalVideoCard({
  marginBottom = 0,
  marginTop = 0,
  height = 247,
  width = CARD_W,
}: {
  marginBottom?: number
  marginTop?: number
  height?: number
  width?: string
}) {
  // We never call play() ourselves — autoPlay handles it. We just slide the
  // thumbnail out of the way once the card is in the viewport.
  const [thumbVisible, setThumbVisible] = useState(true)
  const [previewPending, setPreviewPending] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const delayTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inViewport = useRef(false)
  const isHovered = useRef(false)

  const showPreview = () => {
    if (delayTimer.current) clearTimeout(delayTimer.current)
    setPreviewPending(true)
    delayTimer.current = setTimeout(() => {
      setThumbVisible(false)
      setPreviewPending(false)
    }, 700)
  }

  const hidePreview = () => {
    if (delayTimer.current) clearTimeout(delayTimer.current)
    setThumbVisible(true)
    setPreviewPending(false)
  }

  // Scroll-based visibility — getBoundingClientRect on the scrollable parent's
  // scroll event, which works inside position:fixed overflow:scroll containers
  // on iOS where IntersectionObserver (root:null) is unreliable.
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const getScrollParent = (el: HTMLElement): HTMLElement => {
      let parent = el.parentElement
      while (parent && parent !== document.body) {
        const { overflowY } = window.getComputedStyle(parent)
        if (overflowY === 'scroll' || overflowY === 'auto') return parent
        parent = parent.parentElement
      }
      return document.documentElement
    }

    const scrollParent = getScrollParent(card)

    const checkVisibility = () => {
      const rect = card.getBoundingClientRect()
      const vh = window.innerHeight
      const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
      const isVisible = rect.height > 0 && visible / rect.height >= 0.4

      if (isVisible && !inViewport.current) {
        inViewport.current = true
        if (!isHovered.current) showPreview()
      } else if (!isVisible && inViewport.current) {
        inViewport.current = false
        hidePreview()
      }
    }

    checkVisibility()
    scrollParent.addEventListener('scroll', checkVisibility, { passive: true })
    return () => {
      scrollParent.removeEventListener('scroll', checkVisibility)
      if (delayTimer.current) clearTimeout(delayTimer.current)
    }
  }, [])

  const handleMouseEnter = () => {
    isHovered.current = true
    showPreview()
  }

  const handleMouseLeave = () => {
    isHovered.current = false
    hidePreview()
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        height,
        width,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop,
        marginBottom,
        borderRadius: 24,
        overflow: 'hidden',
        flexShrink: 0,
        background: '#000',
        position: 'relative',
      }}
    >
      {/* autoPlay handles playback — no JS play() call needed */}
      <video
        src="/ref/media/video-highlights.mp4"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        autoPlay
        playsInline
        muted
        loop
        preload="auto"
      />

      {/* Thumbnail sits on top; slides away to reveal the playing video */}
      <img
        src="/images/thumbnails/horizontal-video-thumb1.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: thumbVisible ? (previewPending ? 0.5 : 1) : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
