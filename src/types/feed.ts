export interface OverlayAd {
  label: string
  title: string
  description: string
  cta: string
  emoji?: string
  overlayImage?: string
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

  // Linkout — optional content-continuation CTA (not an ad)
  hasLinkout?: boolean
  linkoutCta?: string
  subtitleUpperThird?: boolean

  // Graphical ad — full-width image docked to the bottom, replaces overlay ad card
  hasGraphicalAd?: boolean
  graphicalAdSrc?: string

  // Fullscreen ad fields
  advertiser?: string
  adHeadline?: string
  adSubline?: string
  adCta?: string
  isWerbepause?: boolean
  skipAfterSeconds?: number
}
