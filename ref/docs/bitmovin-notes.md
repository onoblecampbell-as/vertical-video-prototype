# Bitmovin Notes - Prototype Guidance

## Purpose
Use Bitmovin as the playback engine for the prototype, not as the full feed framework.

## Integration intent
- Build a mobile-web prototype first
- Use Bitmovin Player Web X
- Use the ready-made HLS bundle for the first implementation
- Do not start with custom PWX packages or framework-level extension work

## Preferred starting point
Use:
`@bitmovin/player-web-x/bundles/playerx-hls`

Treat this as the fastest route to getting video playback working inside a feed item.

## Implementation guidance
- Build the feed shell yourself
- Build custom overlays yourself
- Keep player controls hidden or minimal where possible
- Treat each feed item as a container that includes:
  - video playback area
  - metadata overlay
  - action rail
  - optional sponsored label / CTA
  - optional lower-third overlay ad

## Do not overbuild
For the first prototype, do not:
- build custom PWX packages
- build package-template infrastructure
- optimise bundle composition
- add complex player control bars
- add advanced analytics integrations
- attempt final production architecture

## Feed behaviour expectations
- only one feed item should be active at a time
- active item autoplay
- inactive items pause
- use simple mocked data
- isolate media URLs in mock data for easy replacement later

## Media guidance
- If local sample media exists, use it
- If local media does not exist yet, temporary sample streams are acceptable
- Structure code so sample media can be swapped out easily

## Design alignment
- Bitmovin is the playback layer
- Product overlays and feed behaviour belong to our UI layer
- The UI should remain neutral, minimal, and publisher-friendly