# Talking With Lapwing

An atmospheric, responsive landing page for Lapwing, an AI virtual streamer. A cinematic neon-city illustration anchors the design, followed by the voice experience, an accessible three-step guide, and community links.

**Website:** https://zhuyifeiabcd1.github.io/Talking-With-Lapwing/

## Run locally

No installation or build step is needed:

```sh
python3 -m http.server 8787 --bind 127.0.0.1
```

Open http://127.0.0.1:8787/ in a browser.

## Publish

GitHub Pages serves branch `main`, folder `/` (root). Push these static files to that branch. `.nojekyll` keeps the site as plain static files. Relative asset paths support the repository's Pages subdirectory.

## Features

- Responsive desktop, tablet and phone layouts.
- English / Chinese switch with local preference persistence.
- Decorative motion toggle; respects the operating system's reduced-motion setting and pauses animation in hidden tabs.
- Keyboard-accessible mobile navigation and native expandable instructions.
- Optimized responsive WebP artwork, social sharing image and SVG favicon.
- Original voice-room and Twitch, Discord, X, Bluesky destinations preserved.

The landing page does not connect to the inference server, request microphone access, play audio, or invent a live status. The voice-room destination is an independently hosted service; its availability is separate from GitHub Pages. The existing 18+ / on-stream notice and AI-character disclosure remain visible.

## Files

- `index.html`: page structure and English fallback content; still readable without JavaScript.
- `styles.css`: layout, typography, atmosphere and responsive behavior.
- `app.js`: Chinese copy, language preference, motion preference and mobile navigation.
- `assets/`: self-contained artwork and favicon.
- `ARTWORK.md`: image provenance and complete generation prompt.

Typography uses self-hosted DM Sans and Instrument Serif, with local system fallbacks. Their SIL Open Font Licenses are included under `assets/fonts/`; the page does not contact Google Fonts.
