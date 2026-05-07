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

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Entered view — start preview after 1s delay
          delayTimer.current = setTimeout(() => {
            const video = videoRef.current
            if (!video) return
            video.currentTime = 0
            video.play().catch(() => {})
            setPreviewing(true)
          }, 1000)
        } else {
          // Left view — cancel pending delay and reset immediately
          if (delayTimer.current) clearTimeout(delayTimer.current)
          const video = videoRef.current
          if (video) {
            video.pause()
            video.currentTime = 0
          }
          setPreviewing(false)
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

  const handleVideoEnded = () => {
    // Fade back to thumbnail after preview completes
    setPreviewing(false)
    const video = videoRef.current
    if (video) video.currentTime = 0
  }

  return (
    <div
      ref={cardRef}
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
        onEnded={handleVideoEnded}
      />
    </div>
  )
}
