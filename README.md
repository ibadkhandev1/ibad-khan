# Ibad Khan — Portfolio

Personal site of Ibad Khan, frontend developer. Built around one idea: **design on the
surface, engineering underneath.** A cursor lens reveals the blueprint (grid, outlined
type, real CSS values) under the finished hero.

Next.js 16 (App Router) · React 19 · GSAP · Lenis · OGL (WebGL) · Tailwind CSS v4

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Environment variables

| Variable | Required | What it does |
|---|---|---|
| `NEXT_PUBLIC_CAL_LINK` | No | Overrides the Cal.com event (default `ibad-khaan/15min`). "Book a call" buttons open Cal.com's own popup. |

## Where to edit content

| What | File |
|---|---|
| Projects, experience, stats, toolkit, menu | `src/config/content.js` |
| Service pages (copy, FAQ, SEO titles/descriptions) | `src/config/services.js` |
| Name, email, social links | `src/config/personal.js` |
| Chat greeting and suggestions | `src/lib/chat.js` (`CHAT_CONFIG`) |
| Chat backend | `src/lib/chat.js` → `sendChatMessage()` |
| Resume PDF | `public/ibad-khan-resume.pdf` (download name set in `RESUME` in `personal.js`) |

### Connecting the chat

`sendChatMessage(messages)` receives `[{ role, content }]` and must return the reply
string. It currently returns a placeholder. Replace it with a call to your own route
(e.g. `POST /api/chat`); the comment in the file shows the shape.

## Architecture

```
src/
  app/                 routes, layout (fonts, metadata, providers), template (route-in)
    services/[slug]/   one static, SEO-optimised page per service
  lib/                 gsap setup, lenis, motion tokens, lens, intro signal, cal, chat
  components/
    layout/            Header, Menu, Footer, Cursor, Preloader, page transitions
    motion/            SplitReveal, Magnetic, Marquee, Counter
    sections/          Hero, Manifesto, Work, Principles, Experience, Services, Stack
    webgl/             SignalField (OGL contour shader)
    booking/           BookCallButton (loads Cal.com on hover/focus, opens its popup)
    chat/              ChatWidget
docs/                  COMMIT_SHEET.md, QA_REPORT.md
```

Every animation lives in `useGSAP` inside `gsap.matchMedia()`, so it reverts on unmount and
has a reduced-motion fallback. Content is server-rendered and never hidden by CSS.

## Deploy

Push to GitHub and import the repo in Vercel. Add the environment variables above in
the Vercel project settings.

## Awwwards submission blurb

**Title:** Ibad Khan — Frontend Developer

**Description:** A portfolio built on one idea: design on the surface, engineering
underneath. An X-ray lens follows the cursor and reveals the blueprint of the page,
including grid, outlined type and the CSS that produced it, over a live WebGL contour
field.

**Tech:** Next.js, React, GSAP, ScrollTrigger, SplitText, Lenis, WebGL (OGL), Tailwind CSS

**Highlights:** X-ray cursor lens · pinned horizontal work reel with velocity skew ·
curtain page transitions
