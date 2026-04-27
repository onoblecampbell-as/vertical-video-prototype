import type { FeedItem } from '../types/feed'

// 10-item loop sequence
// 1  Organic — sport (linkout)
// 2  Organic + graphical ad — entertainment (Hochkant)
// 3  Fullscreen ad — skippable (NeoBank)
// 4  Carousel — photo series with in-carousel ad
// 5  Organic — news
// 6  Organic + overlay ad — entertainment (Hochkant)
// 7  Organic — entertainment (Hochkant)
// 8  Fullscreen ad — Werbepause (PureFuel)
// 9  Organic — news (Hochkant)
// 10 Organic + overlay ad — news (linkout)
//
// Video source: BILD Outbrain feed (public/feeds/outbrain-videos.xml)
// Video URLs:   https://hds.ak.token.bild.de/{guid},delivery=pmd  (progressive MP4)
// Poster URLs:  https://images.bild.de/{guid}/{hash}-portrait,{colorHash}?w=1280

export const feedItems: FeedItem[] = [
  // 1 — Organic: Eisbären Berlin 50th playoff goal
  {
    id: '69ef66b57573b6e50794ade7',
    type: 'organic',
    videoSrc: 'https://hds.ak.token.bild.de/69ef66b57573b6e50794ade7,delivery=pmd',
    posterSrc: 'https://images.bild.de/69ef66b57573b6e50794ade7/bcf2caa7772a7ee6fd8b4aee2c6bd978-portrait,b375a2d3?w=1280',
    publisher: 'Sport BILD',
    publisherVerified: true,
    caption: '50. Playoff-Tor – Historischer Rekord von Eisbären-Star',
    hashtags: ['#Eishockey', '#Playoffs', '#EisbärenBerlin'],
    likes: 14200,
    shares: 531,
    captions: 'Leonard Pföderl bricht den Rekord.',
    hasLinkout: true,
    linkoutCta: 'Zum Artikel',
  },

  // 2 — Organic + graphical ad: Manatee drinks from police boat (Hochkant)
  {
    id: '69ed0364e5056f185e23511b',
    type: 'organic',
    videoSrc: 'https://hds.ak.token.bild.de/69ed0364e5056f185e23511b,delivery=pmd',
    posterSrc: 'https://images.bild.de/69ed0364e5056f185e23511b/e7b7b2fa5f756b3963f254707ebcbb99-portrait,92f24093?w=1280',
    publisher: 'BILD',
    publisherVerified: true,
    caption: 'Zum Wohl – Seekuh nuckelt an Polizeiboot',
    hashtags: ['#Florida', '#Seekuh', '#Viral'],
    likes: 19400,
    shares: 882,
    captions: 'Erfrischung gefällig? Die Seekuh trinkt direkt am Boot.',
    hasGraphicalAd: true,
    graphicalAdSrc: '/images/ads/organic-video-ad-2.png',
  },

  // 3 — Fullscreen ad, skippable (bank / card themed)
  {
    id: 'feed-3-ad',
    type: 'fullscreenAd',
    videoSrc: '/ref/media/fullscreen-ad-1.mp4',
    advertiser: 'NeoBank',
    adHeadline: 'Dein Geld. Neu gedacht.',
    adSubline: 'Kostenloses Konto in 2 Minuten. Keine Gebühren.',
    adCta: 'Jetzt eröffnen',
    skipAfterSeconds: 5,
  },

  // 4 — Carousel: editorial photo series with in-carousel ad
  {
    id: 'carousel-1',
    type: 'carousel',
    publisher: 'Sport BILD',
    publisherVerified: true,
    caption: 'Die besten Momente der Saison – in Bildern.',
    hashtags: ['#Bundesliga', '#Saison2425', '#BestOf'],
    likes: 18600,
    shares: 741,
    images: [
      '/images/carousels/carousel-1-01.png',
      '/images/carousels/carousel-1-02.png',
      '/images/carousels/carousel-1-03.png',
      '/images/carousels/carousel-1-04.png',
    ],
    adImage: '/images/ads/carousel-ad-1.png',
    adAfterIndex: 2,
  },

  // 5 — Organic: Ship fire on Saarland highway
  {
    id: '69eef5ad161d963ca5f22bd8',
    type: 'organic',
    videoSrc: 'https://hds.ak.token.bild.de/69eef5ad161d963ca5f22bd8,delivery=pmd',
    posterSrc: 'https://images.bild.de/69eef5ad161d963ca5f22bd8/409fa409b72f6ca49c28dd6b38faae8e-portrait,a9abf782?w=1280',
    publisher: 'BILD News',
    publisherVerified: true,
    caption: 'A620 in Vollsperrung – Schiff brennt auf Autobahn aus',
    hashtags: ['#Saarland', '#Brand', '#Breaking'],
    likes: 8700,
    shares: 294,
    captions: 'Das historische Schiff „Vaterland" steht in Flammen.',
  },

  // 6 — Organic + overlay ad: Pig squealing competition Estonia (Hochkant)
  {
    id: '69ee54cde5056f185e235f99',
    type: 'organic',
    videoSrc: 'https://hds.ak.token.bild.de/69ee54cde5056f185e235f99,delivery=pmd',
    posterSrc: 'https://images.bild.de/69ee54cde5056f185e235f99/5b91f83cd4972497972a99a98478c377-portrait,b5d717d4?w=1280',
    publisher: 'BILD',
    publisherVerified: true,
    caption: 'Was für eine Sauerei! – Wer ist hier die größte Sau?',
    hashtags: ['#Estland', '#Wettbewerb', '#Viral'],
    likes: 11300,
    shares: 476,
    captions: 'Erster Schweinequiek-Wettbewerb in Estland.',
    hasOverlayAd: true,
    overlayAd: {
      label: 'Anzeige',
      overlayImage: '/images/ads/organic-video-4.webp',
      title: 'Union Berlin Heimtrikot',
      description: 'Das offizielle Trikot der Saison – jetzt erhältlich.',
      cta: 'Jetzt Trikot sichern',
    },
  },

  // 7 — Organic: Sydney Sweeney at Stagecoach Festival (Hochkant)
  {
    id: '69ef1f07332520ab214068c7',
    type: 'organic',
    videoSrc: 'https://hds.ak.token.bild.de/69ef1f07332520ab214068c7,delivery=pmd',
    posterSrc: 'https://images.bild.de/69ef1f07332520ab214068c7/74a1df724831cf0cd4e75132b2191314-portrait,4ea1fbab?w=1280',
    publisher: 'BILD Stars',
    publisherVerified: true,
    caption: 'Sydney Sweeney sorgt beim Stagecoach Festival für Aufsehen',
    hashtags: ['#SydneySweeney', '#Stagecoach', '#Stars'],
    likes: 23100,
    shares: 1240,
    captions: 'Auf dem Stagecoach-Festival wirbt sie für ihre neue Kollektion.',
  },

  // 8 — Fullscreen ad, Werbepause (protein / shake themed)
  {
    id: 'feed-7-ad',
    type: 'fullscreenAd',
    videoSrc: '/ref/media/fullscreen-ad-2.mp4',
    advertiser: 'PureFuel',
    adHeadline: 'Fuel dein nächstes Level.',
    adSubline: 'Premium Protein. Echte Zutaten. Kein Kompromiss.',
    adCta: 'Jetzt shoppen',
    isWerbepause: true,
  },

  // 9 — Organic: Luxury hotel demolished in Miami (Hochkant)
  {
    id: '69e0e16804fccc11ef07a35a',
    type: 'organic',
    videoSrc: 'https://hds.ak.token.bild.de/69e0e16804fccc11ef07a35a,delivery=pmd',
    posterSrc: 'https://images.bild.de/69e0e16804fccc11ef07a35a/f0095fdbe348854cbb485d12f79cb1f3-portrait,e8973c0?w=1280',
    publisher: 'BILD News',
    publisherVerified: true,
    caption: 'In 20 Sekunden – Luxushotel in Schutt und Asche',
    hashtags: ['#Miami', '#Sprengung', '#Spektakel'],
    likes: 31500,
    shares: 1870,
    captions: 'Das Mandarin Oriental Miami ist Geschichte.',
  },

  // 10 — Organic + overlay ad: Polite robber (linkout)
  {
    id: '69ef5c8cbb738f64ea780101',
    type: 'organic',
    videoSrc: 'https://hds.ak.token.bild.de/69ef5c8cbb738f64ea780101,delivery=pmd',
    posterSrc: 'https://images.bild.de/69ef5c8cbb738f64ea780101/896cdef602292b3ae91b173afc549a97-portrait,f88dbea0?w=1280',
    publisher: 'BILD News',
    publisherVerified: true,
    caption: '„Danke, das reicht" – der höflichste Räuber der Welt',
    hashtags: ['#USA', '#Kurios', '#Überfall'],
    likes: 27800,
    shares: 1560,
    captions: 'Videoüberwachung zeigt den freundlichsten Überfall aller Zeiten.',
    hasLinkout: true,
    linkoutCta: 'Zum Artikel',
    subtitleUpperThird: true,
  },
]
