import { useEffect, useRef } from 'react'

interface Props {
  src: string
  isActive: boolean
  isMuted: boolean
  poster?: string
}

/**
 * VideoPlayer — HTML5 video abstraction layer.
 *
 * TODO: Replace with Bitmovin Player Web X when a license key is available.
 * Integration point: @bitmovin/player-web-x/bundles/playerx-hls
 * See: ref/docs/bitmovin-notes.md
 *
 * The public API (src, isActive, isMuted) is intentionally identical to what
 * a Bitmovin wrapper would accept, so the swap is a drop-in replacement.
 */
export default function VideoPlayer({ src, isActive, isMuted, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isActive) {
      video.play().catch(() => {
        // Autoplay blocked — browser requires prior user interaction.
        // Muted videos should autoplay fine on first load.
      })
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [isActive])

  useEffect(() => {
    const video = videoRef.current
    if (video) video.muted = isMuted
  }, [isMuted])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      loop
      muted={isMuted}
      playsInline
      preload="metadata"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        background: '#000',
        display: 'block',
      }}
    />
  )
}
