export interface OverlayAd {
  label: string
  title: string
  description: string
  cta: string
}

export interface FeedItem {
  id: string
  type: 'organic' | 'fullscreenAd'
  videoSrc: string

  // Organic fields
  publisher?: string
  publisherVerified?: boolean
  caption?: string
  captions?: string
  likes?: number
  shares?: number
  hashtags?: string[]
  audioLabel?: string

  // Mocked subtitle words (cycled with highlight for prototype)
  subtitleWords?: string[]

  // Overlay ad (on organic items)
  hasOverlayAd?: boolean
  overlayAd?: OverlayAd

  // Sponsored treatment (on organic items)
  isSponsored?: boolean
  cta?: string

  // Fullscreen ad fields
  advertiser?: string
  adHeadline?: string
  adSubline?: string
  adCta?: string
  isWerbepause?: boolean
  skipAfterSeconds?: number
}
