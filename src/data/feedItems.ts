import type { FeedItem } from '../types/feed'

// 10-step loop sequence (items 1–9, then loops back to 1)
// 1  Organic
// 2  Organic + overlay ad
// 3  Fullscreen ad — skippable (bank/card themed)
// 4  Organic
// 5  Organic + overlay ad + sponsored treatment
// 6  Organic
// 7  Fullscreen ad — Werbepause (protein/shake themed)
// 8  Organic
// 9  Organic + overlay ad
// 10 → loop

export const feedItems: FeedItem[] = [
  // 1 — Organic
  {
    id: 'feed-1',
    type: 'organic',
    videoSrc: '/ref/media/organic-video-1.mp4',
    publisher: 'Global Reports',
    publisherVerified: true,
    caption: 'Exploring the silent depths of the Pacific Northwest. The fog rolls in across the forest canopy.',
    hashtags: ['#Nature', '#Editorial', '#ForestLife'],
    audioLabel: 'Original Sound - Global Reports',
    likes: 12500,
    shares: 432,
    captions: 'Exploring the silent depths of the Pacific Northwest.',
    subtitleWords: ['Die', 'Stille', 'des', 'Waldes', 'erzählt', 'mehr', 'als', 'jedes', 'Wort', '–', 'hier', 'beginnt', 'die', 'wahre', 'Geschichte'],
  },

  // 2 — Organic + overlay ad
  {
    id: 'feed-2',
    type: 'organic',
    videoSrc: '/ref/media/organic-video-2.mp4',
    publisher: 'Tech Insights',
    publisherVerified: true,
    caption: 'The future of hardware is here. Analysing the next generation of neural processing units.',
    hashtags: ['#Tech', '#Analysis', '#AI'],
    audioLabel: 'Original Audio - Tech Insights Series',
    likes: 8400,
    shares: 210,
    captions: 'The future of hardware is here.',
    subtitleWords: ['Künstliche', 'Intelligenz', 'verändert', 'die', 'Welt', 'der', 'Prozessoren', 'schneller', 'als', 'je', 'zuvor'],
    hasOverlayAd: true,
    overlayAd: {
      label: 'Advertisement',
      title: 'Flash Sale: 20% Off',
      description: 'Limited-time offer on the Alpha Watch.',
      cta: 'Learn more',
    },
  },

  // 3 — Fullscreen ad, skippable (bank / card themed)
  {
    id: 'feed-3-ad',
    type: 'fullscreenAd',
    videoSrc: '/ref/media/fullscreen-ad-1.mp4',
    advertiser: 'NeoBank',
    adHeadline: 'Your money, reimagined.',
    adSubline: 'Open a free account in 2 minutes. No fees, no fuss.',
    adCta: 'Open Account',
    skipAfterSeconds: 5,
  },

  // 4 — Organic
  {
    id: 'feed-4',
    type: 'organic',
    videoSrc: '/ref/media/organic-video-3.mp4',
    publisher: 'City Perspectives',
    publisherVerified: true,
    caption: 'The architecture of tomorrow is being built today. A look inside the world\'s most ambitious urban projects.',
    hashtags: ['#Cities', '#Architecture', '#Urban'],
    audioLabel: 'Original Sound - City Perspectives',
    likes: 9200,
    shares: 318,
    captions: 'The architecture of tomorrow is being built today.',
    subtitleWords: ['Die', 'kühnsten', 'Bauprojekte', 'der', 'Welt', 'entstehen', 'genau', 'jetzt', '–', 'mitten', 'in', 'unseren', 'Städten'],
  },

  // 5 — Organic + overlay ad + sponsored treatment
  {
    id: 'feed-5',
    type: 'organic',
    videoSrc: '/ref/media/organic-video-4.mp4',
    publisher: 'Active Living',
    publisherVerified: true,
    caption: 'High altitude training: how elite athletes push their limits above the clouds.',
    hashtags: ['#Fitness', '#Sport', '#Training'],
    audioLabel: 'Original Sound - Active Living',
    likes: 14300,
    shares: 620,
    captions: 'High altitude training: how elite athletes push their limits.',
    subtitleWords: ['Höhentraining', 'auf', 'dreitausend', 'Metern', '–', 'so', 'bereiten', 'sich', 'Profis', 'auf', 'die', 'Saison', 'vor'],
    isSponsored: true,
    cta: 'Explore gear',
    hasOverlayAd: true,
    overlayAd: {
      label: 'Advertisement',
      title: 'Built for performance.',
      description: 'TrailX Pro — engineered for elite training.',
      cta: 'Shop now',
    },
  },

  // 6 — Organic
  {
    id: 'feed-6',
    type: 'organic',
    videoSrc: '/ref/media/organic-video-5.mp4',
    publisher: 'Culture Desk',
    publisherVerified: true,
    caption: 'Street food, storytelling, and the cities that make them extraordinary.',
    hashtags: ['#Culture', '#Food', '#Travel'],
    audioLabel: 'Original Sound - Culture Desk',
    likes: 6700,
    shares: 145,
    captions: 'Street food and the cities that make them extraordinary.',
    subtitleWords: ['Streetfood', 'ist', 'mehr', 'als', 'Essen', '–', 'es', 'ist', 'Kultur', 'auf', 'dem', 'Teller'],
  },

  // 7 — Fullscreen ad, Werbepause (protein / shake themed)
  {
    id: 'feed-7-ad',
    type: 'fullscreenAd',
    videoSrc: '/ref/media/fullscreen-ad-2.mp4',
    advertiser: 'PureFuel',
    adHeadline: 'Fuel your next level.',
    adSubline: 'Premium protein. Real ingredients. Zero compromise.',
    adCta: 'Shop Now',
    isWerbepause: true,
  },

  // 8 — Organic
  {
    id: 'feed-8',
    type: 'organic',
    videoSrc: '/ref/media/organic-video-6.mp4',
    publisher: 'Science Desk',
    publisherVerified: true,
    caption: 'The ocean holds secrets we are only beginning to understand. New research from the deep.',
    hashtags: ['#Science', '#Ocean', '#Research'],
    audioLabel: 'Original Sound - Science Desk',
    likes: 11100,
    shares: 487,
    captions: 'The ocean holds secrets we are only beginning to understand.',
    subtitleWords: ['Die', 'Tiefsee', 'bleibt', 'das', 'größte', 'Geheimnis', 'unseres', 'Planeten', '–', 'neue', 'Forschung', 'gibt', 'Antworten'],
  },

  // 9 — Organic + overlay ad
  {
    id: 'feed-9',
    type: 'organic',
    videoSrc: '/ref/media/organic-video-7.mp4',
    publisher: 'Market Watch',
    publisherVerified: false,
    caption: 'Markets in motion: tracking the global shift towards green energy investment.',
    hashtags: ['#Finance', '#Economy', '#GreenEnergy'],
    audioLabel: 'Original Sound - Market Watch',
    likes: 7800,
    shares: 234,
    captions: 'Markets in motion: tracking the global shift towards green energy.',
    subtitleWords: ['Grüne', 'Energie', 'verändert', 'die', 'globalen', 'Finanzmärkte', '–', 'Investoren', 'setzen', 'jetzt', 'auf', 'Nachhaltigkeit'],
    hasOverlayAd: true,
    overlayAd: {
      label: 'Advertisement',
      title: 'Invest smarter.',
      description: 'Trade from anywhere with zero commission.',
      cta: 'Start free',
    },
  },
]
