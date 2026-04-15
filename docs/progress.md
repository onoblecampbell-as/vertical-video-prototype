# Vertical Video Feed — Project Progress

## Goal

Prototype a white-label vertical video feed for an Axel Springer internal concept. The experience targets mobile web and should feel comparable in interaction quality to TikTok / Instagram Reels / YouTube Shorts, while remaining visually neutral and suitable for any editorial media brand (BILD, WELT, Buzz, etc.).

The prototype is scoped for stakeholder review — not production. The priority was speed, believability, and a clean foundation for iteration.

---

## Architecture decisions

### Feed shell owns the experience, not the player

The feed, overlays, gestures, ad states, and interaction layer are all product UI. Bitmovin (or any other player) is treated as a drop-in playback engine only. This keeps the UI fully under our control and avoids coupling to a third-party component model.

### HTML5 video abstraction layer

`VideoPlayer.tsx` wraps a native `<video>` element behind a clean interface (`src`, `isActive`, `isMuted`). A single TODO comment marks the exact swap point for Bitmovin Player Web X. The public API of the component will not change when the swap happens.

### Bitmovin deferred

`@bitmovin/player-web-x` requires a domain-tied license key. To avoid blocking prototyping, HTML5 video is used now. The target integration is `@bitmovin/player-web-x/bundles/playerx-hls` as specified in `ref/docs/bitmovin-notes.md`.

### Data model: `organic` and `sponsored` only

Overlay ads are not a separate feed item type. They are a UI layer controlled by fields on an `organic` item:

```ts
hasOverlayAd: true
overlayAd: { label, title, description, cta }
```

This keeps the feed data model simple and avoids special-casing the scroll/snap logic.

### CSS scroll snap for vertical swipe

Feed items are full-viewport-height `div` elements inside a scroll container with `scroll-snap-type: y mandatory` and `scroll-snap-stop: always`. This gives native-quality snap behaviour with zero JavaScript scroll logic.

### IntersectionObserver for active item

An `IntersectionObserver` (threshold: 0.6) on the feed container detects which item crosses 60% visibility. The active index is lifted to `VideoFeed` and passed down as `isActive`. Only the active item plays; all others pause and reset.

### Media served via public symlink

`feedItems.ts` references media at paths like `/ref/media/organic-video-1.mp4`. A symlink `public/ref → ../ref` makes these paths resolve correctly through Vite's static file server without altering the data file or adding a plugin.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Language | TypeScript (strict) |
| Bundler | Vite 5 |
| Styling | Inline styles + CSS custom properties |
| Fonts | Inter (Google Fonts) |
| Video | HTML5 `<video>` (Bitmovin-ready) |
| Icons | Inline SVG (no icon library dependency) |
| Data | Mocked — `src/data/feedItems.ts` |
| Backend | None |

---

## Key features implemented

### Feed behaviour
- Full-screen vertical video per viewport (`100dvh`)
- CSS snap scroll between items — native feel, no JS scroll library
- `IntersectionObserver` active-item detection
- Active item autoplays; inactive items pause and reset to start
- Mute state persists across swipes for the session

### UI states
- **Organic** — publisher avatar, caption, hashtags, audio label, action rail
- **Sponsored** — same structure as organic + "Sponsored" pill badge + CTA button
- **Organic + overlay ad** — lower-third frosted glass ad card (title, description, product placeholder, CTA) that does not cover captions or essential metadata

### Interactions
- Sound toggle (top-left, persists across swipes)
- Like button with toggled filled/outlined heart state and count update
- Double-tap on video triggers heart flash animation and auto-likes the item
- Share button with `navigator.share` fallback

### Visual design
- Dark, neutral, white-label — no hardcoded brand colours
- CSS custom properties for all tokens (easy to theme later)
- Gradient overlay: light fade at top, heavy fade at bottom
- Subtitle/caption text rendered upper-centre with dark background pill for readability
- Frosted glass treatment on the sound toggle button and sponsored badge
- Bottom nav bar with `backdrop-filter` blur + safe-area inset padding

---

## File structure

```
vertical-video/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── public/
│   └── ref → ../ref        ← symlink: serves /ref/media/* paths
├── ref/
│   ├── design/             ← design references and screen notes
│   ├── docs/               ← Bitmovin integration notes
│   └── media/              ← local .mp4 files used in mock data
├── docs/
│   └── progress.md         ← this file
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── feed.ts          ← FeedItem and OverlayAd types
    ├── data/
    │   └── feedItems.ts     ← mock feed data (source of truth)
    └── components/
        ├── icons.tsx        ← inline SVG icon set
        ├── VideoFeed.tsx    ← scroll container + active-item logic
        ├── VideoFeedItem.tsx← single item, double-tap, orchestration
        ├── VideoPlayer.tsx  ← HTML5 video abstraction (Bitmovin swap point)
        ├── VideoOverlay.tsx ← all UI chrome: metadata, actions, ad layer
        ├── AdOverlay.tsx    ← lower-third ad card component
        └── BottomNav.tsx    ← 3-tab navigation bar
```

---

## Important patterns

### Player abstraction

```tsx
// VideoPlayer.tsx
// TODO: Replace with Bitmovin Player Web X when a license key is available.
// Target: @bitmovin/player-web-x/bundles/playerx-hls
// The props interface (src, isActive, isMuted) is intentionally stable.

export default function VideoPlayer({ src, isActive, isMuted }: Props) { ... }
```

### Active-item detection

```tsx
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        setActiveIndex(parseInt(entry.target.dataset.index ?? '0', 10))
      }
    })
  },
  { root: containerRef.current, threshold: 0.6 }
)
```

### Overlay ad data model

```ts
// Overlay ad lives on an organic item — not a separate feed type
{
  id: 'organic-2-overlay',
  type: 'organic',
  hasOverlayAd: true,
  overlayAd: {
    label: 'Sponsored',
    title: 'Flash Sale: 20% Off',
    description: 'Limited-time offer on the Alpha Watch.',
    cta: 'Learn more',
  },
  // ...rest of organic fields
}
```

### Design tokens (CSS custom properties)

```css
:root {
  --color-bg: #000;
  --color-surface: rgba(255, 255, 255, 0.08);
  --color-surface-elevated: rgba(20, 20, 20, 0.9);
  --color-text-primary: #fff;
  --color-text-secondary: rgba(255, 255, 255, 0.65);
  --color-text-muted: rgba(255, 255, 255, 0.4);
  --color-border: rgba(255, 255, 255, 0.1);
  --font-ui: 'Inter', -apple-system, ...;
  --nav-height: 56px;
}
```

---

## How to run

```bash
cd /Users/oliver.noble-campbell/ai-projects/vertical-video
npm install
npm run dev
# → http://localhost:3000
```

Open in a browser with a mobile viewport (e.g. iPhone 14 Pro, 390×844) for the intended experience.

---

## Next steps

### 1. Bitmovin Player Web X integration

Replace the `<video>` element in `VideoPlayer.tsx` with the Bitmovin HLS bundle. The component interface is already aligned — this is a contained swap requiring only a valid license key.

```ts
import { PlayerX } from '@bitmovin/player-web-x/bundles/playerx-hls'
```

### 2. Progress bar

A 2px line at the top of each item tracking `currentTime / duration` via a `timeupdate` listener. High demo value, low complexity.

### 3. Swipe animation polish

Add a subtle scale/opacity transition on items as they scroll in and out of view. A `transform: scale(0.95)` + `opacity: 0.6` on inactive items would give the feed a more polished, premium feel without adding interaction complexity.

### 4. Token-based theming

Move the CSS custom properties in `index.css` to a per-brand theme object. A simple `applyTheme(brand: 'bild' | 'welt' | 'buzz')` function injected at startup would make the white-label positioning concrete for stakeholders.

### 5. Additional feed items

The feed currently shows 3 items. Adding 2–3 more (including a second sponsored item and a second overlay-ad item) would make the looping behaviour more convincing in a demo setting.
