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
  const [previewing, setPreviewing] = useState(false)
  const [previewPending, setPreviewPending] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const delayTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inViewport = useRef(false)
  const isHovered = useRef(false)
  const pendingDoPlay = useRef<(() => void) | null>(null)

  const startPreview = () => {
    if (delayTimer.current) clearTimeout(delayTimer.current)
    setPreviewPending(true)
    delayTimer.current = setTimeout(() => {
      const video = videoRef.current
      if (!video) return
      const doPlay = () => {
        pendingDoPlay.current = null
        try { video.currentTime = 0 } catch (_) {}
        video.play().catch(() => {})
        setPreviewing(true)
        setPreviewPending(false)
      }
      if (video.readyState >= 1) {
        doPlay()
      } else {
        pendingDoPlay.current = doPlay
        video.addEventListener('loadedmetadata', doPlay, { once: true })
        video.load()
      }
    }, 800)
  }

  const stopPreview = () => {
    if (delayTimer.current) clearTimeout(delayTimer.current)
    if (pendingDoPlay.current) {
      videoRef.current?.removeEventListener('loadedmetadata', pendingDoPlay.current)
      pendingDoPlay.current = null
    }
    const video = videoRef.current
    if (video) {
      video.pause()
      try { video.currentTime = 0 } catch (_) {}
    }
    setPreviewing(false)
    setPreviewPending(false)
  }

  // Scroll-based visibility — IntersectionObserver with root:null doesn't fire
  // reliably inside position:fixed overflow:scroll containers on iOS Chrome/Safari.
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
      const isVisible = rect.height > 0 && visible / rect.height >= 0.5

      if (isVisible && !inViewport.current) {
        inViewport.current = true
        if (!isHovered.current) startPreview()
      } else if (!isVisible && inViewport.current) {
        inViewport.current = false
        stopPreview()
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
    startPreview()
  }

  const handleMouseLeave = () => {
    isHovered.current = false
    stopPreview()
  }

  const handleVideoEnded = () => {
    setPreviewing(false)
    setPreviewPending(false)
    const video = videoRef.current
    if (video) {
      try { video.currentTime = 0 } catch (_) {}
    }
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
      {/* Thumbnail — dims while preview loads, fades out once playing */}
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
          opacity: previewing ? 0 : previewPending ? 0.45 : 1,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Preview video — fades in, plays once, fades back out */}
      <video
        ref={videoRef}
        src="/ref/media/video-highlights.mp4"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: previewing ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
        playsInline
        muted
        preload="metadata"
        onEnded={handleVideoEnded}
      />
    </div>
  )
}
