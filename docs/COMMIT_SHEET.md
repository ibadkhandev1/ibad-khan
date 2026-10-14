# Commit Sheet — ibadkhan.dev

## Reference board

| Reference | What it does | Technique taken (not copied) |
|---|---|---|
| Hubtown (Unseen Studio), SOTD 2026 | One lit hero object + cursor reveal | Cursor-reveal as the signature interaction |
| By-Kin / Mat Voyce, SOTD + Dev Award | Next.js + GSAP-only motion system, kinetic type | One motion engine, type-led layout |
| fromanother.love, SOTD May 2026 | Next.js + GSAP + WebGL as atmosphere | WebGL behind the content, never in front of it |
| Iventions, SOTD + Dev Award | WebGL as atmosphere, not spectacle | Shader field that pauses off-screen |
| Lando Norris (OFF+BRAND), SOTM Dec 2025 | Aggressive kinetic type, bold transitions | Oversized condensed display type, curtain route transitions |
| Lusion v3 / Zentry | Scroll-scrubbed storytelling | Pinned horizontal work reel scrubbed by scroll |

## The idea

**BIG IDEA:** Design on the surface, engineering underneath. The cursor is an X-ray.

**METAPHOR → INTERACTION:** Every finished surface has a blueprint layer under it. A
circular lens follows the cursor and reveals that layer: outlined type, a 48px grid,
the real CSS values and the HTML tags. On touch devices the lens drifts on its own.

**SIGNATURE MOMENT:** Moving the cursor over the giant "Ibad / Khan" and seeing the
outlined glyphs, baselines and `font-size: clamp(...)` annotation appear inside the lens,
over a topographic WebGL field that bends toward the pointer.

## Art direction

- **Palette:** ink `#0B0B0A`, bone `#ECE7DC`, graphite `#141412`, accent signal orange `#FF5B1F`
- **Type:** Bricolage Grotesque (display, `wdth` 78–88%, tight tracking), Inter (text),
  JetBrains Mono (labels, annotations)
- **Grid:** 12 columns, `clamp(1rem, 3.2vw, 3rem)` gutter. Broken by the hero name
  (left / right split) and the horizontal work reel.
- **Texture:** animated SVG grain at 6%, topographic contour shader, blueprint grid.

## Motion personality

Heavy and inertial for transitions (`expo.inout.custom`), soft for entrances
(`out.soft`), snappy for UI (`power2.out`). Only transform, opacity and clip-path are
animated. Lenis is the only smooth-scroll engine.

## Sections (narrative arc)

1. **Hook:** X-ray hero + WebGL contour field
2. **Tension:** manifesto that resolves word by word on scroll
3. **Reveal:** pinned horizontal work reel with per-card lens and velocity skew
4. **Reveal:** principles as a sticky card stack
5. **Proof:** experience, services, toolkit marquee
6. **Invitation:** footer finale, Cal.com booking modal, chat
