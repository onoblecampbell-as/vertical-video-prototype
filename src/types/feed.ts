export interface OverlayAd {
  label: string
  title: string
  description: string
  cta: string
}

export interface FeedItem {
  id: string
  type: 'organic' | 'sponsored'
  videoSrc: string
  caption: string
  captions: string
  likes: number
  shares: number
  // Organic
  publisher?: string
  publisherVerified?: boolean
  hashtags?: string[]
  audioLabel?: string
  hasOverlayAd?: boolean
  overlayAd?: OverlayAd
  // Sponsored
  sponsor?: string
  sponsoredLabel?: string
  cta?: string
}
