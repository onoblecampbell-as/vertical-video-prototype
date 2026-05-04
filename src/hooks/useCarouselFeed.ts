import { useMemo } from 'react'
import type { FeedItem } from '../types/feed'

export const CAROUSEL_CATEGORIES = [
  'marathon',
  'horoskop',
  'nutrition',
  'artemis',
  'timmy',
] as const

export type CarouselCategory = typeof CAROUSEL_CATEGORIES[number]

export const CAROUSEL_LABELS: Record<CarouselCategory, string> = {
  marathon:  'Marathon',
  horoskop:  'Horoskop',
  nutrition: 'Nutrition',
  artemis:   'Artemis',
  timmy:     'Timmy',
}

export type RenderItem =
  | { kind: 'feed';     item: FeedItem;       index: number; key: string }
  | { kind: 'carousel'; category: CarouselCategory; index: number; key: string }

// How many organic videos before a carousel is inserted
const ORGANIC_INTERVAL = 5
const LOOP_COUNT = 5

function buildFeed(feedItems: FeedItem[]): RenderItem[] {
  const result: RenderItem[] = []
  let globalIndex = 0
  let organicCount = 0
  let carouselRotation = 0

  for (let loop = 0; loop < LOOP_COUNT; loop++) {
    for (const item of feedItems) {
      result.push({ kind: 'feed', item, index: globalIndex, key: `${item.id}-loop${loop}` })
      globalIndex++

      if (item.type === 'organic') {
        organicCount++
        if (organicCount % ORGANIC_INTERVAL === 0) {
          const category = CAROUSEL_CATEGORIES[carouselRotation % CAROUSEL_CATEGORIES.length]
          carouselRotation++
          result.push({ kind: 'carousel', category, index: globalIndex, key: `carousel-${category}-${carouselRotation}` })
          globalIndex++
        }
      }
    }
  }

  return result
}

export function useCarouselFeed(feedItems: FeedItem[]) {
  return useMemo(() => buildFeed(feedItems), [feedItems])
}
