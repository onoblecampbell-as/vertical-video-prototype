# CLAUDE.md - Vertical Video Feed Prototype

## Project Context

This is a mobile-first prototype of a vertical video feed for a large media publisher (Axel Springer).

The goal is to simulate a highly engaging short-form video experience similar to TikTok / Instagram Reels / YouTube Shorts, but with a neutral, white-label design suitable for editorial media brands.

This is an MVP prototype. Speed, clarity, and correctness of core UX patterns are more important than completeness or production readiness.

---

## Source of Truth

Always prioritise:

* /ref/design/vertical-feed-requirements.md
* /ref/design/DESIGN.md
* /ref/design/screen-notes.md
* /ref/docs/bitmovin-notes.md
* /src/data/feedItems.ts
* /docs/TODO.md (task execution plan)

Do NOT invent new product requirements or data structures if these already define them.

---

## Core Product Model

### Feed item types

Only two item types exist:

* organic
* sponsored

### Overlay ad logic

Overlay ads are NOT a separate feed item type.

They are a UI layer on top of an organic item.

Example:

type === "organic" && hasOverlayAd === true

Do NOT introduce:

* "overlayAd" as a feed item type
* separate video assets for overlay ads

---

## MVP Scope (STRICT)

Only build and maintain these 3 UI states:

1. Organic editorial video
2. Sponsored in-feed video
3. Organic video with overlay ad

Out of scope (DO NOT BUILD):

* comments
* profile / publisher pages
* article transition flows
* bookmarks / save systems
* onboarding
* recommendation engine
* backend integration
* analytics pipelines

---

## Architecture Rules

### Player abstraction

Video playback must go through:

VideoPlayer.tsx

This is an abstraction layer.

Current implementation:

* HTML5 <video>

Future:

* Bitmovin Player Web X

DO NOT:

* embed player logic directly into feed items
* tightly couple UI with playback implementation

---

### Feed structure

Core components:

* VideoFeed → manages scroll + active item
* VideoFeedItem → one full-screen item
* VideoPlayer → playback layer
* VideoOverlay → metadata + UI
* AdOverlay → lower-third ad
* ActionRail → like/share UI

Maintain separation of concerns.

---

## Behaviour Rules

### Playback

* Only one video plays at a time
* Active item autoplay
* Inactive items pause
* Use viewport / intersection logic

### Interaction

* Vertical snap scrolling
* Double-tap like
* Tap toggles play/pause (if implemented)
* Sound toggle should persist within session if possible

### UI

* Minimal chrome
* Dark mode
* Content-first
* Captions must remain readable at all times

---

## Advertising Rules

### Sponsored items

* Must include clear "Sponsored" label
* Must include CTA
* Must look native to the feed

### Overlay ads

* Appear in lower third
* Must NOT block captions
* Must NOT dominate screen
* Must feel integrated and non-intrusive

---

## Bitmovin Strategy

Bitmovin is the target playback engine, but not required for the first prototype.

Current:

* HTML5 video

Future:

* Replace inside VideoPlayer.tsx only

DO NOT:

* block progress on Bitmovin setup
* require a player key to continue development
* introduce Bitmovin complexity outside the player abstraction

---

## Media Handling

Media is loaded from:

/ref/media/*.mp4

Feed data is defined in:

/src/data/feedItems.ts

Do NOT hardcode video paths elsewhere.

---

## Design Constraints

* Neutral, white-label UI
* No BILD / WELT branding
* Inter or similar sans-serif
* Minimal colour usage
* Generic iconography
* Premium editorial feel

---

## Development Philosophy

* Do not overengineer
* Prefer simple, readable code
* Prefer progress over perfection
* Keep structure clean and extensible
* Only build what is required for MVP

---

## When in doubt

* Follow /ref files
* Keep scope tight
* Do not introduce new concepts
* Ask for clarification instead of inventing features
