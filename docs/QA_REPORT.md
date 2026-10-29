# QA Report — Memphis revamp (2026-10-29)

Tested against `npm run build && npm start`, driven by Playwright in Edge at 1440×900,
1280×800 and 390×844 (touch), plus a `prefers-reduced-motion: reduce` pass.

## Checks

| Check | Result |
|---|---|
| `npm run build` | Passes, 31 static routes |
| `npm run lint` | Clean on everything touched. 4 pre-existing problems remain in the unused legacy folders (`Backgrounds/Aurora.js`, `Backgrounds/Orb.js`, `TextAnimations/*`) |
| Console errors: `/`, `/services`, `/services/react-developer`, `/blog`, `/work/*` | None (dev and production) |
| Hydration | Clean. Fixed: whitespace mismatch in the props readout; raw `<script>` in layout moved to `next/script` (`beforeInteractive`) |
| `/nope` (404) | Only the page's own 404. Fixed: hash-only links (`#contact`) no longer prefetch the current URL |
| Hero at 1440×900 / 390×844 | Name, intro, CTAs and props panel all above the fold |
| Shuffle | New seed, layout, colours and `wdth`; readout updates; S shortcut works |
| Palette swap | Re-skins hero, header, menu, chat, tiles, cards; persists per visitor |
| Work reel (desktop) | Pins and scrubs; covers reveal; velocity wiggle settles |
| Menu | Opens as a circle from the toggle; Esc closes; focus moves to the first link |
| Route transition | Tiles cover, label pops, new route, tiles clear |
| Reduced motion | Full static composition; nothing left at opacity 0; shuffle still works, instantly |
| Mobile | Header utilities respected (see below); stack, principles, footer readable |

## Bugs found and fixed during QA

- Component CSS was unlayered, so it beat Tailwind v4 utilities (`hidden` lost to
  `.header-pill { display }`). Moved into `@layer components`.
- Footer name overflowed at `wdth` 150 (15.5vw → 12vw).
- Hero overflowed 900px tall viewports; name resized to `min(22vw, 24svh)`.
- Clip-path reveals cut off the hard shadows (chat panel, media frames): negative insets
  plus `clearProps`.
- GSAP's inline `transform` overrode the work card hover lift; hover moved to `translate`.

## Not verified here

- Lighthouse scores, Safari / iOS and Firefox (no runner available in this session).
- Memory over many route changes.

## Juror Mode (harsh)

| Criterion | Score | Note |
|---|---|---|
| Design | 8 | Strong, coherent Memphis kit; type-led hero |
| Usability | 8 | Fast DOM-only; chat button crowds small screens |
| Creativity | 8 | The props panel as navigation is the idea, and it re-skins the whole site |
| Content | 7 | Copy is real; project images are still generated demos |
| Animations | 8 | Seven reveal grammars, one persona |
| Accessibility | 8 | Native radios/range/button, live region, reduced-motion path |
| Responsive | 8 | Designed mobile hero (12 shapes), no horizontal scroll |

**The one thing more time would buy:** real project screenshots, and a new OG image (the
current `featured-image.jpg` shows the old dark design).
