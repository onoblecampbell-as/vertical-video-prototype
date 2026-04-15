# Vertical Feed MVP Requirements

## Project goal
Build a fast mobile-first prototype of a highly engaging vertical video feed for a media publisher.

The prototype should feel similar in interaction quality to TikTok / Instagram Reels / YouTube Shorts, but it must remain visually neutral, white-label, and suitable for editorial media brands.

## Primary objective
Prototype the core feed experience for stakeholder review.

Focus on:
- engagement
- content-first experience
- ad integration
- realistic feed behaviour

Do not focus on:
- full platform architecture
- backend systems
- recommendation engine
- production analytics
- account systems

## MVP screens / states
The prototype must include these 3 states:

1. Organic editorial video
2. Sponsored in-feed video
3. Organic video with lower-third overlay ad

Optional:
- a slight variation of the organic state showing sound-on or stronger caption treatment

## Out of scope
Do not build these now:
- comments
- publisher profile page
- article transition page
- bookmarks library
- advanced settings
- onboarding
- login
- full recommendation logic

## UX requirements
- One full-screen vertical video per viewport
- Mobile-first layout
- Vertical swipe / snap progression between videos
- Seamless feed experience
- Minimal interface chrome
- Content remains the visual focus
- UI should feel fast and believable

## Interaction requirements
- Autoplay active video
- Pause inactive videos
- Like button
- Double-tap affordance for like
- Share button
- Sound on/off toggle
- Captions/subtitles visible for silent viewing

## Advertising requirements
- Sponsored state must be clearly labelled
- Sponsored state must include a CTA
- Overlay ad must appear in the lower video area
- Overlay ad must feel native and non-intrusive
- Overlay ad must not block captions or essential metadata
- Ad treatment should feel compatible with premium publisher products

## Design requirements
- Dark mode
- Neutral white-label visual design
- Generic outlined icons
- Inter or similar sans-serif typography
- No explicit BILD / WELT branding
- Minimal colour usage
- Safe-area aware layout
- Editorial trust and clarity should be preserved

## Technical expectations
- Prototype can use mocked data
- Prototype can use placeholder media or sample streams
- Build for speed and clarity, not production completeness
- Structure code so media and feed items can be replaced later
- Keep implementation simple and maintainable

## Success criteria
A successful prototype should show:
- a believable vertical feed
- clear distinction between organic and sponsored content
- a realistic lower-third ad overlay
- working autoplay / active-item behaviour
- a strong enough UX to discuss with PM, CPO, engineering, and ads stakeholders