import { useState, useEffect } from 'react'
import type { FeedItem } from '../types/feed'

const MRSS_NS = 'https://search.yahoo.com/mrss/'

const FULLSCREEN_ADS: FeedItem[] = [
  {
    id: 'feed-ad-1',
    type: 'fullscreenAd',
    videoSrc: '/ref/media/fullscreen-ad-1.mp4',
    advertiser: 'NeoBank',
    adHeadline: 'Dein Geld. Neu gedacht.',
    adSubline: 'Kostenloses Konto in 2 Minuten. Keine Gebühren.',
    adCta: 'Jetzt eröffnen',
    skipAfterSeconds: 5,
  },
  {
    id: 'feed-ad-2',
    type: 'fullscreenAd',
    videoSrc: '/ref/media/fullscreen-ad-2.mp4',
    advertiser: 'PureFuel',
    adHeadline: 'Fuel dein nächstes Level.',
    adSubline: 'Premium Protein. Echte Zutaten. Kein Kompromiss.',
    adCta: 'Jetzt shoppen',
    isWerbepause: true,
  },
]

const SCROLL_REVEAL_ADS: FeedItem[] = [
  {
    id: 'scroll-reveal-1',
    type: 'scrollRevealAd',
    videoSrc: '/images/ads/interscroller-video.mp4',
    advertiser: 'Premium Partner',
    adHeadline: 'Entdecke die neue Kollektion',
    adCta: 'Jetzt entdecken',
    viewportSize: 'large',
  },
  {
    id: 'scroll-reveal-2',
    type: 'scrollRevealAd',
    imageSrc: '/images/ads/underscroller.png',
    advertiser: 'Premium Partner',
    adHeadline: 'Exklusiv für dich',
    adCta: 'Mehr erfahren',
    viewportSize: 'large',
  },
]

function hashInt(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function parseItems(xml: Document): FeedItem[] {
  return Array.from(xml.querySelectorAll('channel > item')).map(item => {
    const guid = item.querySelector('guid')?.textContent?.trim() ?? ''
    const title = item.querySelector('title')?.textContent?.trim() ?? ''
    const description = item.querySelector('description')?.textContent?.trim() ?? ''
    const link = item.querySelector('link')?.textContent?.trim() ?? ''

    const mediaContents = Array.from(item.getElementsByTagNameNS(MRSS_NS, 'content'))

    const videoSrc = mediaContents
      .find(el => el.getAttribute('type') === 'video/mp4')
      ?.getAttribute('url') ?? ''

    const posterSrc = (
      mediaContents.find(
        el => el.getAttribute('medium') === 'image' &&
              (el.getAttribute('url') ?? '').includes('-portrait,')
      ) ??
      mediaContents.find(el => el.getAttribute('medium') === 'image')
    )?.getAttribute('url') ?? ''

    const hashtags = Array.from(item.querySelectorAll('category'))
      .map(el => `#${el.textContent?.trim()}`)
      .slice(0, 4)

    const h = hashInt(guid)
    return {
      id: guid,
      type: 'organic' as const,
      videoSrc,
      posterSrc,
      publisher: 'BILD',
      publisherVerified: true,
      caption: title,
      captions: description,
      hashtags,
      likes: 5000 + (h % 30000),
      shares: 200 + (h % 1800),
      hasLinkout: !!link,
      linkoutCta: 'Zum Artikel',
    }
  })
}

// Inject all ad formats at fixed positions within the organic list.
// Fullscreen ads: positions 2 and 7. Interscroller: 12. Underscroller: 17.
function injectAds(organic: FeedItem[]): FeedItem[] {
  const result = [...organic]
  result.splice(2, 0, FULLSCREEN_ADS[0])
  result.splice(7, 0, FULLSCREEN_ADS[1])
  result.splice(12, 0, SCROLL_REVEAL_ADS[0])
  result.splice(17, 0, SCROLL_REVEAL_ADS[1])
  return result
}

export function useFeedItems() {
  const [items, setItems] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch('/api/feed')
      .then(res => {
        if (!res.ok) throw new Error(`Feed fetch failed: ${res.status}`)
        return res.text()
      })
      .then(text => {
        const doc = new DOMParser().parseFromString(text, 'application/xml')
        setItems(injectAds(parseItems(doc)))
      })
      .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { items, loading, error }
}
