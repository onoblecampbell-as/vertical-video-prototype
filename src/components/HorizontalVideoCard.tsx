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
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const delayTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inViewport = useRef(false)
  const isHovered = useRef(false)

  const startPreview = () => {
    if (delayTimer.current) clearTimeout(delayTimer.current)
    delayTimer.current = setTimeout(() => {
      const video = videoRef.current
      if (!video) return
      const doPlay = () => {
        video.currentTime = 0
        video.play().catch(() => {})
        setPreviewing(true)
      }
      if (video.readyState >= 1) {
        doPlay()
      } else {
        video.addEventListener('loadedmetadata', doPlay, { once: true })
        video.load()
      }
    }, 1000)
  }

  const stopPreview = () => {
    if (delayTimer.current) clearTimeout(delayTimer.current)
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    setPreviewing(false)
  }

  // Intersection — mobile trigger
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport.current = entry.isIntersecting
        if (entry.isIntersecting && !isHovered.current) {
          startPreview()
        } else if (!entry.isIntersecting) {
          stopPreview()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(card)
    return () => {
      observer.disconnect()
      if (delayTimer.current) clearTimeout(delayTimer.current)
    }
  }, [])

  // Hover — desktop trigger
  const handleMouseEnter = () => {
    isHovered.current = true
    startPreview()
  }

  const handleMouseLeave = () => {
    isHovered.current = false
    // Only stop if also out of viewport (mobile fallback stays active)
    if (!inViewport.current) stopPreview()
    else stopPreview()
  }

  const handleVideoEnded = () => {
    setPreviewing(false)
    const video = videoRef.current
    if (video) video.currentTime = 0
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
      {/* Thumbnail — fades out during preview */}
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
          opacity: previewing ? 0 : 1,
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
