# Vertical Video Feed — TODO

## 1. Project Goal

Build a highly engaging vertical video feed prototype for a media publisher (Axel Springer / BILD) demonstrating realistic monetisation behaviour, editorial content, and ad integration.

**Today's goal:** Improve demo clarity, ad realism, and monetisation storytelling for stakeholder review.
Not: perfect engineering, production behaviour, or deep refactoring.

---

## 2. Current Status Snapshot

| Area | Status |
|---|---|
| Core scroll / snap UX | ✅ Working |
| Video playback (HTML5) | ✅ Working |
| Overlay ads | ✅ Working |
| Fullscreen ads | ✅ Working |
| Werbepause state | ✅ Working |
| Scroll lock on Werbepause | ✅ Working |
| Skip button (skippable ads) | ✅ Working |
| German UI / copy | ✅ Done |
| Vercel deployment | ✅ Live |
| Infinite loop | ❌ Not yet |
| Sponsored treatment | 🔶 Present but to be removed |

---

## 3. Completed MVP Phases

These are done. Do not revisit unless there is a visible bug blocking the demo.

- ✅ **Phase 1** — Core UX: subtitle alignment, action rail, overlay layout, caption readability
- ✅ **Phase 2** — Interactions: like (tap + double-tap), share (native + clipboard), sound toggle
- ✅ **Phase 3** — Navigation: top bar, back button, safe-area handling, mobile web behaviour
- ✅ **Phase 4** — Feed structure: organic + fullscreenAd types, 9-item loop, correct sequence
- ✅ **Phase 5** — Advertising states: overlay ad, fullscreen ad (skippable), Werbepause with countdown and scroll lock
- ✅ **Phase 6** — Feed behaviour: snap scroll, single active video, IntersectionObserver active tracking

---

## 4. Today's Priority Demo Refinements

Work through these in order. Stop when time runs out — lower-numbered items have higher demo impact.

---

### ✅ P1 — Infinite loop

Feed repeats 5× (45 items) with unique keys. Scroll lock modulo fixed for Werbepause across loops.

---

### ✅ P2 — Remove sponsored treatment

`isSponsored` removed. Replaced with `hasLinkout` / `linkoutCta` pattern on feed-1 and feed-9. "Gesponsert" badge and sponsored CTA gone from VideoOverlay.

---

### ✅ P3 — Fullscreen ad 1: remove "skip ad" label

Skip button UI removed from `FullscreenAdItem`. `canSkip` / `onSkip` logic kept intact.

---

### ✅ P4 — Ad label: delayed appearance (organic overlay only)

**The overlay ad label ("Anzeige") on organic videos should appear 1 second after the video comes into view — only if the user stays.**

- If user swipes past quickly, the label should not appear
- Implementation: `setTimeout` of ~1000 ms, cleared on unmount / inactive
- Applies to: overlay ad label on organic items only
- Fullscreen ad label ("Anzeige" / "Werbepause") should appear immediately — no delay
- Keep it simple — no animation required, just a delayed render

---

### P5 — Subtitle timing / progression

**Make subtitles feel more aligned to the spoken content.**

- Rotate or cycle through short phrases every ~2–3 seconds rather than showing a single static line
- This is still prototype-level — no real caption sync required
- Option: split `captions` string into an array of short phrases, cycle on a timer per active item
- Reset when item becomes inactive

---

### P6 — Overlay ad creative

**Improve the visual quality of overlay ads (lower-third).**

- Replace the 👕 emoji with a styled ad banner (image-like block or a coloured rectangle with brand text)
- Add a close button (✕) top-right of the overlay card
- Add a three-dot menu button (⋯) next to the close button
- Keep layout compact — avoid clutter
- No click functionality required, just visual presence

---

### P7 — Display ad layout: content shifts up

**When an overlay ad appears, the video content (publisher row, caption, hashtags) should shift upward to make visual room.**

- Ad should sit clearly in the lower third, distinct from metadata
- No duplicate "Anzeige" label — if the banner has a label, remove any separate label above it
- No extra UI layered on top of the banner itself

---

### P8 — Video CTA / linkout button

**Add an optional per-item CTA button that links out to a relevant destination.**

- Configurable in `feedItems.ts` — add a `linkoutCta?: string` field and `linkoutUrl?: string`
- Renders as a button on videos that have it set
- Example: `"Jetzt Tickets sichern"` on a sports/event video
- Does not need to navigate anywhere — `onClick: () => {}` placeholder is fine
- Keep styling consistent with existing CTA buttons

---

### P9 — Subtitle/video swap

**Swap which video shows subtitles.**

- The video that currently has subtitles should become the one without
- Adjust `captions` field in the relevant `feedItems.ts` entry
- No component changes needed

---

### P10 — Final ad video: ticketing theme

**Update the final fullscreen ad (currently PureFuel protein) to feel more compelling.**

- Change ad copy to a ticketing / event theme (e.g. football event, WM, live sport)
- Update `advertiser`, `adHeadline`, `adSubline`, `adCta` in `feedItems.ts`
- The ad remains `isWerbepause: true`
- This is copy-only — no new video needed
- Example direction: "WM 2026. Sei dabei." / ticketing platform feel

---

## 5. Nice to Have — Only If Time Remains

These are lower priority. Only pick up if all P1–P10 items above are complete.

- [ ] Werbepause visual feedback on blocked swipe attempt (scale flash or opacity pulse)
- [ ] Smooth fade-in transition when subtitle text cycles
- [ ] TopBar back button routes somewhere meaningful
- [ ] Overlay ad close button actually dismisses the overlay (local state)

---

## 6. Do NOT Work On Today

These are explicitly out of scope for this session.

- ❌ Bitmovin player integration
- ❌ Backend / API / data fetching
- ❌ BILD / WELT branding layer
- ❌ Comments or profile pages
- ❌ Onboarding flow
- ❌ Analytics or tracking
- ❌ Performance optimisation (preloading, lazy loading)
- ❌ Generic interaction polish with no visible demo impact
- ❌ Architecture refactoring
- ❌ Production-grade error handling

---

## Notes

**Execution principle:** prefer fake, mocked, and hardcoded over correct systems. Demo clarity beats technical purity every time in this session.

**Stack:** Vite + React + TypeScript, HTML5 video, mobile web first, no backend.
