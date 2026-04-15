# Vertical Video Feed

A white-label vertical video feed prototype for mobile web. Built for internal concept review at Axel Springer.

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

Open at a mobile viewport (e.g. iPhone 14 Pro, 390×844).

## What it is

A TikTok / Reels–style vertical feed with three UI states:

| State | Description |
|---|---|
| Organic | Editorial video with publisher metadata, captions, action rail |
| Sponsored | Same structure as organic + "Sponsored" badge + CTA button |
| Overlay ad | Organic video with a lower-third frosted glass ad card |

Overlay ads are a UI layer on top of organic items, not a separate feed type.

## Stack

- **React 18 + TypeScript** via Vite
- **HTML5 video** behind a Bitmovin-ready abstraction layer
- **CSS scroll snap** for native-quality swipe behaviour
- **IntersectionObserver** for active-item detection and autoplay
- **Inline styles + CSS custom properties** — no CSS framework, easy to theme

## Key behaviours

- One full-screen item per viewport, snaps on swipe
- Active item autoplays; inactive items pause and reset
- Mute state persists across swipes
- Like button + double-tap heart flash
- Share via `navigator.share` where available
- Safe-area aware layout for notched devices

## Structure

```
src/
  data/feedItems.ts       mock feed data (source of truth)
  types/feed.ts           FeedItem and OverlayAd types
  components/
    VideoFeed.tsx         scroll container + active-item logic
    VideoFeedItem.tsx     single item + double-tap gesture
    VideoPlayer.tsx       video abstraction (Bitmovin swap point)
    VideoOverlay.tsx      all UI chrome
    AdOverlay.tsx         lower-third ad card
    BottomNav.tsx         tab bar
public/ref → ../ref       symlink — serves /ref/media/* paths
```

## Swapping in Bitmovin

The player abstraction in `src/components/VideoPlayer.tsx` is ready for it. Replace the `<video>` element with `@bitmovin/player-web-x/bundles/playerx-hls` — the component interface (`src`, `isActive`, `isMuted`) stays the same. Requires a valid Bitmovin license key.

## Next steps

1. Bitmovin Player Web X integration
2. Per-item progress bar (`timeupdate` → thin top line)
3. Per-brand token theming (`applyTheme('bild' | 'welt')`)

See [`docs/progress.md`](docs/progress.md) for full project notes.
