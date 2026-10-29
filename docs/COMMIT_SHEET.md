# Commit Sheet — ibadkhan.dev (Memphis revamp, 2026-10-29)

**TRUTH SENTENCE:** A frontend developer in Hyderabad who builds every interface out of
small, reusable parts — and makes them move.

**BIG IDEA:** Props in, play out. The whole site is one Memphis component kit; the hero is a
live component you re-render by changing its props.

**AXIS:** System (a living component library).

**METAPHOR → INTERACTION:** A component and its controls panel (Storybook-style). The
visitor changes real props — `seed`, `wdth`, `palette` — and watches the page re-render.
`palette` is a design token swap, so it re-skins the entire site, not just the hero.

## Signature moment — Shuffle

```
TRIGGER:        Shuffle button, or the S key while the hero is on screen
BEATS:          1. 0.00s  shapes squash to 35% in random order (22 ms stagger)
                2. 0.13s  each recolours while small
                3. 0.13s  each snaps to its new spot / angle / scale (back.out 1.7, 0.62s)
                4. 0.00s  the name's wdth axis springs to a new width (elastic, 1s)
                5. 0.10s  readout <Hero … seed={n} /> flashes the changed prop
PEAK:           ~0.4s: half the pile mid-flight, name overshooting its new width
RESOLUTION:     composition settles; pointer parallax resumes from the new layout
TOUCH VERSION:  same button; parallax off; 12 of 20 shapes on phones
REDUCED-MOTION: instant re-layout and width change, no tween; still a new composition
LOW-END:        drop shadows thin to 3px on phones; extra shapes hidden under 768px
```

**SECONDARY MOMENTS:**
1. Palette swatches: one click re-skins the site (stored per visitor in localStorage).
2. Footer sticker: reach for "Write to me" and it throws a burst of Physics2D confetti.

**RENDER TECH + WHY:** DOM + SVG + GSAP. The idea is components and tokens, so the
composition *is* the DOM; no canvas or WebGL needed. The old OGL contour field was removed.

**NARRATIVE STRUCTURE:** A kit opened in order: live `<Hero />` → About → Work reel
(pinned, scrubbed) → Principles (sticky stack) → Changelog → Services → Toolkit → finale.

## Art direction

- **Palette "Bel Air '82"** (after Peter Shire): stucco `#F7F0E3`, ink `#1B1A17`, fills
  teal `#22B8A6`, tomato `#FF6A45`, lilac `#B7A2FF`, sun `#FFCF3F`; text accent `#C8321E`.
  Alternates: Arcade, Sorbet. Every fill keeps ink text ≥ 4.5:1.
- **Type:** Anybody (variable `wdth` 50–150, display; the `wdth` axis is a live prop),
  Gabarito (text), DM Mono (labels, props readout).
- **Grid:** 12 columns, `clamp(1rem, 3.2vw, 3rem)` gutter. Broken by the hero shape field,
  the tilted work frames and the crossing marquee bands.
- **Texture:** one printed dot screen (22px) on paper; hard 3px ink outlines and offset
  shadows on every sticker.
- **Imagery:** Memphis primitives only (no stock); project screenshots in the reel.

## Motion persona — snap, shuffle, wiggle

Durations 0.2 / 0.45 / 0.8s; `snap.out` (custom), `back.out(1.7)`, `elastic.out(1, 0.5)`;
staggers 0.02–0.05. Reveal grammars: masked line split (headings), scale-from-object pop
(hero, inline shapes), marker sweep (About), circle clip (work covers), DrawSVG stroke
(principles), ScrambleText (changelog versions), bounce drop (toolkit cards).

**SOUND:** none.

**DEFAULTS USED:**
- Six-colour palette (Memphis requires polychrome; capped at four swappable fills).
- Hard offset shadows (they are the cut-paper language of the style, not a trend default).
- Pinned horizontal work reel kept from the previous build (the projects are real; the reel
  now carries the kit's tilt and velocity wiggle instead of distortion).

## Fingerprint diff vs Wobbly Ensemble (last entry, also Memphis)

axis Toy → System · render DOM+Canvas2D+SVG → DOM+SVG · palette flamingo-led → Bel Air
teal/tomato/lilac with live swap · background colour-field chapters → constant stucco +
ink finale · display Bagel Fat One → Anybody (wdth as prop) · layout collage grid →
component spec board · navigation physics toy → props panel · persona bounce/fling/pop →
snap/shuffle/wiggle · signature shapes rain and pile → seeded re-render via props.
8 of 10 fields differ; no references repeated.
