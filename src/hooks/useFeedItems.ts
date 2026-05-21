import { useState, useEffect } from 'react'
import type { FeedItem } from '../types/feed'

const MRSS_NS = 'http://search.yahoo.com/mrss/'

export const FULLSCREEN_ADS: FeedItem[] = [
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


function hashInt(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

const MAX_ORGANIC = 16

function parseItems(xml: Document): FeedItem[] {
  const seenVideoSrcs = new Set<string>()
  const unique: FeedItem[] = []

  for (const item of Array.from(xml.querySelectorAll('channel > item'))) {
    if (unique.length === MAX_ORGANIC) break

    const mediaContents = Array.from(item.getElementsByTagNameNS(MRSS_NS, 'content'))
    const videoSrc = mediaContents
      .find(el => el.getAttribute('type') === 'video/mp4')
      ?.getAttribute('url') ?? ''

    // Skip items with no video or a duplicate video URL
    if (!videoSrc || seenVideoSrcs.has(videoSrc)) continue
    seenVideoSrcs.add(videoSrc)

    const guid = item.querySelector('guid')?.textContent?.trim() ?? ''
    const title = item.querySelector('title')?.textContent?.trim() ?? ''
    const description = item.querySelector('description')?.textContent?.trim() ?? ''
    const link = item.querySelector('link')?.textContent?.trim() ?? ''

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
    unique.push({
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
    })
  }

  return unique
}

// If the feed returns fewer than MAX_ORGANIC items, cycle from the start to fill all slots.
function cycleFill(items: FeedItem[]): FeedItem[] {
  if (items.length === 0) return []
  const result: FeedItem[] = []
  for (let i = 0; i < MAX_ORGANIC; i++) {
    const source = items[i % items.length]
    result.push(i < items.length ? source : { ...source, id: `${source.id}-cycle${i}` })
  }
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
        const organic = cycleFill(parseItems(doc))
        // Tag V4 (index 3) with the graphical banner ad
        if (organic[3]) organic[3] = { ...organic[3], hasGraphicalAd: true, graphicalAdSrc: '/images/ads/graphical-banner-ad.png' }
        setItems(organic)
      })
      .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { items, loading, error }
}
