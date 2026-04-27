# Vertical Video Feed — TODO

## 1. Project Context

Mobile-first vertical video feed prototype for a large media publisher (Axel Springer).
Simulates TikTok / Instagram Reels UX with editorial content and native ad integration.

**Current phase:** Phase 7 — Static Carousel Feed Items + In-Carousel Ads
**Post-CPO demo.** Core video feed, advertising states, and Werbepause are complete and deployed.

---

## 2. Current Status Snapshot

| Area | Status |
|---|---|
| Core scroll / snap UX | ✅ Working |
| Video playback (HTML5) | ✅ Working |
| Overlay ads | ✅ Working |
| Fullscreen ads | ✅ Working |
| Werbepause state + countdown | ✅ Working |
| Scroll lock on Werbepause | ✅ Working |
| Skip button (skippable ads) | ✅ Working |
| Werbepause pill (compact bottom-right) | ✅ Working |
| Infinite loop (5× repeat) | ✅ Working |
| Linkout CTA buttons | ✅ Working |
| German UI / copy | ✅ Done |
| Vercel deployment | ✅ Live |
| Carousel feed items | ❌ Not yet |

---

## 3. Completed MVP Phases

Done. Do not revisit unless there is a visible bug blocking a demo.

- ✅ **Phase 1** — Core UX: subtitle alignment, action rail, overlay layout, caption readability
- ✅ **Phase 2** — Interactions: like (tap + double-tap), share (native + clipboard), sound toggle
- ✅ **Phase 3** — Navigation: top bar, back button, safe-area handling, mobile web behaviour
- ✅ **Phase 4** — Feed structure: organic + fullscreenAd types, 9-item loop, correct sequence
- ✅ **Phase 5** — Advertising states: overlay ad, fullscreen ad (skippable), Werbepause with countdown and scroll lock
- ✅ **Phase 6** — Feed behaviour: snap scroll, single active video, IntersectionObserver active tracking

---

## 4. Pre-CPO Demo Refinements (Reference)

These were completed or worked on before the CPO demo. Listed for historical reference.

- ✅ P1 — Infinite loop (5× feed repeat, modulo-safe Werbepause)
- ✅ P2 — Remove sponsored treatment (`isSponsored` removed, `hasLinkout` pattern)
- ✅ P3 — Fullscreen ad: remove "skip ad" label
- ✅ P4 — Overlay ad label: delayed appearance (1s timeout, cleared on swipe)
- ✅ Werbepause pill: compact bottom-right, embedded countdown ring, auto-hide after 3s

---

## 5. Phase 7 — Static Carousel Feed Items + In-Carousel Ads

**Goal:** Add a new `"carousel"` feed item type. User vertically swipes through the main feed as normal. When landing on a carousel item, they horizontally swipe through static images. One optional ad card can be inserted between images (monetisation concept).

### Data model

- [ ] Add `"carousel"` to the feed item type union in `feedItems.ts`
- [ ] Define `CarouselSlide` type: `{ type: "image" | "ad", src: string, alt?: string, adLabel?: string }`
- [ ] Add `slides: CarouselSlide[]` field on carousel items
- [ ] Add one demo carousel item to the feed sequence (position 3 or 4 in the loop)
- [ ] Add one in-carousel ad slide after image 3 (ad card with `type: "ad"`)

### Assets

- [ ] Add 4–5 placeholder static images to `/public/images/carousels/`
- [ ] Add one ad image/card to `/public/images/ads/` (or use a styled placeholder)
- [ ] Assets can be freely downloaded editorial photos or generated placeholders — no branding

### CarouselFeedItem component

- [ ] Create `src/components/CarouselFeedItem.tsx`
- [ ] Full-screen item, same height/width contract as `VideoFeedItem`
- [ ] Horizontal CSS scroll-snap-x for slide navigation — no gesture library
- [ ] Each slide fills the full item viewport
- [ ] Pagination indicator: slide counter top-right (`2 / 5` style, as seen in reference)
- [ ] Caption / title text overlay on the first slide (or configurable per-item)
- [ ] Action rail (like/share) consistent with video items — reuse `ActionRail`

### Ad slide treatment

- [ ] Ad slide uses a clearly different background (e.g. white or light grey card)
- [ ] "Anzeige" label — small, top-left of the ad slide
- [ ] Visually native in layout but still distinguishable at a glance
- [ ] No click tracking, no real CTA required — placeholder button is fine

### Feed integration

- [ ] Render `CarouselFeedItem` when `item.type === "carousel"` in `VideoFeed` or feed router
- [ ] Vertical snap scrolling must continue to work across all item types
- [ ] Entering / leaving a carousel item must not break scroll momentum
- [ ] Carousel horizontal scroll must not accidentally trigger vertical feed swipe

### Not in scope

- ❌ Gesture library (e.g. Framer Motion, use-gesture) — CSS snap only
- ❌ Video inside carousel slides
- ❌ Real ad tracking or impression logging
- ❌ Upload or CMS flow
- ❌ Backend integration
- ❌ Auto-advance timer

---

## 6. Implementation Approach

### Horizontal scroll strategy

Use `overflow-x: scroll` + `scroll-snap-type: x mandatory` on the slides container.
Each slide is `min-width: 100%` + `scroll-snap-align: start`.

This avoids any touch gesture library and works natively on mobile web.
The container is positioned absolutely inside the feed item to match `VideoFeedItem` sizing.

### Preventing scroll conflicts

The vertical feed uses `overflow-y: scroll` + `scroll-snap-type: y mandatory` on the outer container.
CSS handles the axis disambiguation natively — horizontal touch starts on a horizontal scroller do not propagate to the vertical parent.
No `touch-action` overrides should be needed unless testing reveals conflict.

### Pagination indicator

Simple `currentSlide / totalSlides` counter, updated via `onScroll` listener (or `IntersectionObserver` on slides).
Top-right position, small semi-transparent text, consistent with reference image style.

### Component boundary

`CarouselFeedItem` is a new component peer to `VideoFeedItem` and `FullscreenAdItem`.
It receives the full carousel feed item object as a prop.
No shared state with the video player. No playback logic.

---

## 7. Out of Scope (This Session)

- ❌ Bitmovin player integration
- ❌ Backend / API / data fetching
- ❌ BILD / WELT branding layer
- ❌ Comments or profile pages
- ❌ Onboarding flow
- ❌ Analytics or tracking
- ❌ Performance optimisation
- ❌ Architecture refactoring

---

## Notes

**Execution principle:** prefer fake, mocked, and hardcoded over correct systems. Demo clarity beats technical purity.

**Stack:** Vite + React + TypeScript, HTML5 video, mobile web first, no backend.
