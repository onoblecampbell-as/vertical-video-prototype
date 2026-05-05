import { useMemo } from 'react'
import type { FeedItem } from '../types/feed'
import type { CarouselCategory, RenderItem } from './useCarouselFeed'
import { FULLSCREEN_ADS } from './useFeedItems'

export interface AreaGroup {
  area1: RenderItem[]
  area3: RenderItem[]
  area5: RenderItem[]
}

// Number of times the full Area 1→5 structure repeats for infinite scroll
const LOOP_COUNT = 3

function f(item: FeedItem, index: number, loop: number): RenderItem {
  return { kind: 'feed', item, index, key: `${item.id}-loop${loop}` }
}

function c(category: CarouselCategory, index: number, loop: number): RenderItem {
  return { kind: 'carousel', category, index, key: `carousel-${category}-${loop}-${index}` }
}

function buildAreaGroups(organic: FeedItem[]): AreaGroup[] {
  const groups: AreaGroup[] = []
  let idx = 0

  for (let loop = 0; loop < LOOP_COUNT; loop++) {
    // Unique ad IDs per loop so React keys stay stable across re-renders
    const ad0 = { ...FULLSCREEN_ADS[0], id: `feed-ad-1-loop${loop}` }
    const ad1 = { ...FULLSCREEN_ADS[1], id: `feed-ad-2-loop${loop}` }

    // Area 1 — V1 V2 V3  [Carousel]  [FullscreenAd0]  V4 V5 V6
    const area1: RenderItem[] = [
      f(organic[0],  idx++, loop),
      f(organic[1],  idx++, loop),
      f(organic[2],  idx++, loop),
      c('marathon',  idx++, loop),
      f(ad0,         idx++, loop),
      f(organic[3],  idx++, loop),
      f(organic[4],  idx++, loop),
      f(organic[5],  idx++, loop),
    ]

    // Area 3 — V7 V8  [Carousel]  [FullscreenAd1]  V9 V10 V11
    const area3: RenderItem[] = [
      f(organic[6],  idx++, loop),
      f(organic[7],  idx++, loop),
      c('marathon',  idx++, loop),
      f(ad1,         idx++, loop),
      f(organic[8],  idx++, loop),
      f(organic[9],  idx++, loop),
      f(organic[10], idx++, loop),
    ]

    // Area 5 — V12 V13 V14  [Carousel]  V15 V16
    const area5: RenderItem[] = [
      f(organic[11], idx++, loop),
      f(organic[12], idx++, loop),
      f(organic[13], idx++, loop),
      c('marathon',  idx++, loop),
      f(organic[14], idx++, loop),
      f(organic[15], idx++, loop),
    ]

    groups.push({ area1, area3, area5 })
  }

  return groups
}

export function useAreaFeed(organic: FeedItem[]): AreaGroup[] {
  return useMemo(
    () => (organic.length > 0 ? buildAreaGroups(organic) : []),
    [organic]
  )
}
