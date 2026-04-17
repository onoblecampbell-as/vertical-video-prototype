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
    publisher: 'Sport BILD',
    publisherVerified: true,
    caption: 'Bayern unter Druck – das Heimspiel heute Abend muss ein Sieg werden.',
    hashtags: ['#Bundesliga', '#FCBayern', '#Matchday'],
    audioLabel: 'Originalton – Sport BILD',
    likes: 12500,
    shares: 432,
    captions: 'Bayern steht heute unter Druck.',
    hasLinkout: true,
    linkoutCta: 'Ganze Folge ansehen',
  },

  // 2 — Organic + overlay ad (NBA Berlin contextual)
  {
    id: 'feed-2',
    type: 'organic',
    videoSrc: '/ref/media/organic-video-2.mp4',
    publisher: 'BILD Sport',
    publisherVerified: true,
    caption: 'So sieht man ihn selten – Dirk Nowitzki tanzt mit seiner Tochter und das Internet dreht durch.',
    hashtags: ['#DirkNowitzki', '#NBA', '#BILDexklusiv'],
    audioLabel: 'Originalton – BILD Sport',
    likes: 14300,
    shares: 620,
    captions: 'Der ernste Profi von früher? Den gibt es nicht mehr.',
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

  // 4 — Organic
  {
    id: 'feed-4',
    type: 'organic',
    videoSrc: '/ref/media/organic-video-3.mp4',
    publisher: 'Sport BILD',
    publisherVerified: true,
    caption: 'Derby-Fieber in der Stadt – beide Mannschaften wollen nur einen Sieg.',
    hashtags: ['#Derby', '#Bundesliga', '#Rivalität'],
    audioLabel: 'Originalton – Sport BILD',
    likes: 9200,
    shares: 318,
    captions: 'Derby-Fieber – beide Teams wollen gewinnen.',
  },

  // 5 — Organic + overlay ad (football kit contextual)
  {
    id: 'feed-5',
    type: 'organic',
    videoSrc: '/ref/media/organic-video-4.mp4',
    publisher: 'BILD Fußball',
    publisherVerified: true,
    caption: 'Die Fans erwarten eine Reaktion – nach der letzten Niederlage ist der Druck enorm.',
    hashtags: ['#Fußball', '#Bundesliga', '#Derby'],
    audioLabel: 'Originalton – BILD Fußball',
    likes: 8400,
    shares: 210,
    captions: 'Die Fans erwarten eine Reaktion.',
    hasOverlayAd: true,
    overlayAd: {
      label: 'Anzeige',
      overlayImage: '/images/ads/organic-video-4.webp',
      title: 'Union Berlin Heimtrikot',
      description: 'Das offizielle Trikot der Saison – jetzt erhältlich.',
      cta: 'Jetzt Trikot sichern',
    },
  },

  // 6 — Organic
  {
    id: 'feed-6',
    type: 'organic',
    videoSrc: '/ref/media/organic-video-5.mp4',
    publisher: 'BILD Fußball',
    publisherVerified: true,
    caption: 'Bundesliga-Profi liebt Reality-Star – erster Knutsch-Post macht die Romanze offiziell.',
    hashtags: ['#Bundesliga', '#Liebe', '#BILDexklusiv'],
    audioLabel: 'Originalton – BILD Fußball',
    likes: 6700,
    shares: 145,
    captions: 'Jetzt ist es offiziell – er hat sie auf Instagram gepostet.',
  },

  // 7 — Fullscreen ad, Werbepause (protein / shake themed)
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

  // 8 — Organic
  {
    id: 'feed-8',
    type: 'organic',
    videoSrc: '/ref/media/organic-video-6.mp4',
    publisher: 'Sport BILD',
    publisherVerified: true,
    caption: 'In der zweiten Halbzeit hat die Mannschaft den Schalter umgelegt – drei Punkte zuhause.',
    hashtags: ['#Comeback', '#Bundesliga', '#DreiPunkte'],
    audioLabel: 'Originalton – Sport BILD',
    likes: 11100,
    shares: 487,
    captions: 'Der Schalter wurde umgelegt – drei Punkte.',
  },

  // 9 — Organic + overlay ad
  {
    id: 'feed-9',
    type: 'organic',
    videoSrc: '/ref/media/organic-video-7.mp4',
    publisher: 'Stammplatz Podcast',
    publisherVerified: true,
    caption: 'Taktik, Transfers, heiße Diskussionen – der Stammplatz Podcast bringt euch die besten Fußball-Gespräche.',
    hashtags: ['#Stammplatz', '#Fußball', '#Podcast'],
    audioLabel: 'Stammplatz – Folge 214',
    likes: 7800,
    shares: 234,
    captions: 'Der soll wirklich weg? Ich glaub das erst, wenn ich den Vertrag sehe.',
    subtitleUpperThird: true,
    hasLinkout: true,
    linkoutCta: 'Ganze Folge ansehen',
  },
]
