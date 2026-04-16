# Vertical Video Feed - TODO

This file is the active task list for the project.
Claude should always reference this file when implementing features.

## Project Goal

Build a highly engaging vertical video feed prototype for a media publisher with realistic monetisation behaviour, based on defined PM flow and ad patterns.

Focus:

* Core feed UX
* Ad integration (overlay + full screen + werbepause)
* Smooth interaction
* Fast iteration

---

# 🔴 Phase 1 - Core UX Polish

* [x] Fix subtitle alignment (centered, safe-area aware)
* [x] Move audio toggle into right-side action rail
* [x] Improve spacing and visual balance of overlay UI
* [x] Ensure captions are always readable above overlays

---

# 🟠 Phase 2 - Core Interactions

* [x] Implement Like interaction

  * tap to like
  * double-tap gesture
  * filled heart state
* [x] Implement Share functionality

  * copy link
  * native share API (if available)
  * fallback UI

---

# 🟡 Phase 3 - Navigation & Web Behaviour

* [x] Implement full-page vertical video route
* [x] Add top navigation bar with back button / exit interaction
* [x] Ensure mobile browser safe-area handling
* [x] Validate mobile web behaviour vs native expectations
* [x] Remove bottom app-style navigation bar

---

# 🔵 Phase 4 - Feed Structure (CRITICAL)

We must follow the PM-defined sequence.

## Current media inventory

Organic videos:

* `organic-video-1.mp4`
* `organic-video-2.mp4`
* `organic-video-3.mp4`
* `organic-video-4.mp4`
* `organic-video-5.mp4`
* `organic-video-6.mp4`
* `organic-video-7.mp4`

Fullscreen ad videos:

* `fullscreen-ad-1.mp4`
* `fullscreen-ad-2.mp4`

Important:

* There is no longer a file named `sponsored-video-1.mp4`
* Sponsored is now a state/treatment, not a file type
* Overlay ads remain a UI layer on top of organic content

## Target sequence

1. Organic video
2. Organic video + overlay ad
3. Full screen video ad (skippable)
4. Organic video
5. Organic video + overlay ad + sponsored treatment
6. Organic video
7. Full screen video ad (Werbepause)
8. Organic video
9. Organic video + overlay ad
10. Loop back to 1

---

## Data model updates

* [ ] Extend `feedItems.ts` to support:

  * `type: "organic" | "fullscreenAd"`
  * `hasOverlayAd`
  * `overlayAd`
  * `isSponsored`
  * `isWerbepause`
  * `skipAfterSeconds`
* [ ] Add feed items using the current media inventory
* [ ] Implement looping behaviour for the defined sequence

---

# 🟣 Phase 5 - Advertising States

## 5.1 Overlay Ad (refinement)

* [ ] Ensure lower-third placement is clean
* [ ] Ensure captions are not blocked
* [ ] Improve visual polish (spacing, hierarchy)
* [ ] Use label: `Advertisement`
* [ ] Keep overlay ads semantically distinct from sponsored treatment

---

## 5.2 Full Screen Ad

* [ ] Create full-screen ad state
* [ ] Add clear sponsored / ad status label
* [ ] Add headline + CTA
* [ ] Add skip behaviour (after X seconds)
* [ ] Use simple placeholder ad copy for now

  * bank card themed ad
  * healthy shake / protein themed ad

---

## 5.3 Werbepause State (HIGH PRIORITY)

This is a special full-screen ad with interaction constraints.

### Behaviour

* [ ] Show circular button with pause icon
* [ ] Circular border animates as countdown (3 seconds)
* [ ] User cannot scroll during countdown

### Interaction

* [ ] If user tries to scroll:

  * Option A: trigger haptic feedback (if possible)
  * Option B: visual feedback

    * ad label scales ~10%
    * subtle animation indicating blocked interaction

### After countdown

* [ ] Scrolling becomes enabled again
* [ ] UI updates to reflect unlocked state

---

# 🟢 Phase 6 - Feed Behaviour Enhancements

* [ ] Ensure smooth snap scrolling
* [ ] Improve swipe feel (less mechanical)
* [ ] Add subtle scaling/opacity transition for inactive items
* [ ] Ensure only one video plays at a time
* [ ] Improve perceived performance (preload next video if possible)

---

# 🟥 Phase 7 - BILD Branding Layer

## Goal

Adapt the neutral prototype into a BILD-style experience while preserving core UX and layout.

Branding should be applied as a visual layer only, not by restructuring components.

## Branding tasks

* [ ] Apply BILD color system

  * primary red (#E30613 or closest match)
  * neutral dark backgrounds
* [ ] Update typography

  * stronger headline weight
  * more tabloid-style hierarchy
* [ ] Adjust captions styling

  * larger, bolder, more punchy
  * high contrast for readability
* [ ] Refine action rail icons

  * slightly more expressive / bold
* [ ] Add subtle brand presence

  * optional BILD logo in top bar
  * optional label like "BILD News"
* [ ] Adjust spacing to feel more editorial/tabloid
* [ ] Ensure ads visually align with BILD style

## Constraints

* [ ] Do not change layout structure
* [ ] Do not move core components
* [ ] Do not break interaction patterns
* [ ] Do not reduce readability

## Goal outcome

A prototype that:

* feels like BILD
* remains clean and modern
* still works as a white-label base if needed

---

# ⚪ Phase 8 - Feed Entry Experience (Optional)

* [ ] Add intro / entry state (e.g. "Trending", "For You")
* [ ] Define transition into feed

---

# ⚫ Phase 9 - Deployment & Testing

* [ ] Enable local network testing on mobile
* [ ] Deploy to Vercel
* [ ] Test on real devices
* [ ] Share with stakeholders

---

# 🔔 Reminder - Localisation

* [ ] Translate all UI text from English to German before final handoff

  * Includes: labels, buttons, captions, ad copy, action rail labels, toast messages
  * Do this last, after all phases are complete

---

# 📌 Notes

## Product constraints

* Keep scope tight (MVP)
* Do not introduce new features outside defined flow
* Ads must feel integrated, not annoying

## Technical constraints

* Use `VideoPlayer` abstraction
* Do not block progress on Bitmovin
* Keep code simple and modular

## UX priorities

* Immersion
* Clarity
* Smoothness
* Monetisation without disruption

---

# 🚀 Execution Strategy

Work in phases:

1. Phase 1 → polish
2. Phase 2 → interactions
3. Phase 4 → feed structure (CRITICAL)
4. Phase 5 → ad systems (CRITICAL)
5. Phase 6 → behaviour polish
6. Phase 7 → branding
7. Phase 9 → deploy

Do not jump ahead or build everything at once.
