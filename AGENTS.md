# AGENTS.md

## Stack

- **Next.js 16.2.10** (App Router) with **React 19.2.4** and **React Compiler** enabled
- **Tailwind CSS v4** — uses `@import "tailwindcss"` + `@theme inline` in `globals.css`, not v3 syntax
- **No TypeScript** — plain JS with `jsconfig.json` path aliases
- **Animation libs**: GSAP (`@gsap/react`), Motion (`motion`), OGL (`ogl`) for WebGL shaders

## Commands

```bash
npm run dev      # dev server (localhost:3000)
npm run build    # production build
npm run lint     # eslint
```

No test runner is configured. No typecheck script.

## Path alias

`@/*` maps to `./src/*` (jsconfig.json).

## Architecture

- `src/app/` — routes: `/` (home sections), `/services`, `/services/[slug]` (static, one
  per entry in `src/config/services.js`), `/work/[slug]` (static project pages from
  `PROJECTS` in `src/config/content.js`; images in `public/work/<slug>/`), `/blog`,
  `/blog/[slug]`, `/seo-docs`, plus `not-found.js`.
  `layout.js` mounts global chrome; `template.js` animates route-in after a tile transition.
- `src/lib/` — `gsap.js` (single plugin registration + custom eases), `lenis.js` (the only
  smooth-scroll engine, driven by the GSAP ticker; `getLenis()`), `motion-tokens.js`,
  `palette.js` (live palette store; writes `<html data-palette>`), `composition.js` (seeded
  hero layout: `compose(seed)`), `intro.js` (preloader → hero handoff), `cal.js` (Cal.com
  embed loader), `chat.js` (chat config + backend stub).
- `src/components/`
  - `layout/` — Header, Menu, Footer, Cursor, Preloader, TransitionProvider/TransitionLink
  - `motion/` — SplitReveal, Magnetic, Marquee, Counter
  - `sections/` — home sections (Hero, Manifesto, Work, Principles, Experience,
    ServicesTeaser, Stack) and shared ServiceList / MediaReveal
  - `memphis/Shape.js` — the Memphis primitives (circle, ring, triangle, half, squiggle…)
    every decorative mark is built from
  - `booking/BookCallButton.js` — opens Cal.com's own popup; hover/focus loads `embed.js`
    and preloads the booking iframe (never on page load: Cal sets a third-party cookie)
  - `chat/ChatWidget.js` — floating chat UI
  - `Backgrounds/`, `Animations/`, `TextAnimations/`, `Components/` — legacy, currently unused
- Content lives in `src/config/` (`content.js`, `services.js`, `personal.js`, `seo.js`,
  `palettes.js`).
- `docs/COMMIT_SHEET.md` (concept) and `docs/QA_REPORT.md` (last QA results).

## Key quirks

- Design system: Memphis on stucco cream. Fills come from `--c1…--c4`, which the hero's
  `palette` prop swaps at runtime (`[data-palette]` blocks in `globals.css`); never hard-code
  a fill colour — use `data-c="0…3"` (sets `--fill`) or the `c1…c4` Tailwind colours. Text
  accents use `--accent` (AA on paper). Every palette fill must keep ink text ≥ 4.5:1.
- Component CSS in `globals.css` sits inside `@layer components` so Tailwind utilities
  (`hidden`, `md:inline-flex`…) still win. Don't add unlayered rules that set `display`.
- Legacy WebGL components (`Aurora.js`/`Orb.js`) use raw OGL with GLSL shaders — they are client-only and will crash in SSR without a guard. They handle cleanup via `requestAnimationFrame` cancel + `WEBGL_lose_context`.
- `globals.css` uses Tailwind v4's `@theme inline` block for CSS custom property registration — not the v3 `tailwind.config.js` approach.
- ESLint uses flat config (`eslint.config.mjs`) with `eslint-config-next/core-web-vitals`.
- React Compiler is on (`reactCompiler: true` in `next.config.mjs`) — hooks rules are enforced at build time.
- Internal links use `@/components/layout/TransitionLink` (drop-in for `next/link`) so route
  changes get the tile transition and same-page hashes scroll through Lenis.
- Every GSAP animation goes inside `useGSAP` + `gsap.matchMedia()` with a reduced-motion
  path; never hide content with CSS (`opacity-0`) — hide it from GSAP so it stays visible
  without JS. Scrollable overlays need `data-lenis-prevent`.
- Env vars: `NEXT_PUBLIC_CAL_LINK` (optional, overrides the default `ibad-khaan/15min` Cal.com event).
- No CI, no `.github/workflows`, no `.cursorrules`, no `.cursor/rules/`.
