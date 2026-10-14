# QA Report

Measured on a production build (`next build && next start`) with headless Microsoft Edge
(Playwright) and Lighthouse 12.8.2, mobile preset. Headless Edge has no GPU, so WebGL runs
on SwiftShader (software). That inflates main-thread cost compared with a real phone.

## Automated checks

| Check | Result |
|---|---|
| `npm run build` | Pass |
| `npm run lint` on new code (`src/app`, `src/lib`, `src/components/{layout,motion,sections,webgl,chat,booking}`) | Clean |
| `npm run lint` on whole repo | 4 pre-existing issues in unused legacy components (`Backgrounds/Aurora.js`, `Backgrounds/Orb.js`, `TextAnimations/SplitText.js`, `TextAnimations/GradientText.js`) |
| Console errors / page errors (desktop, mobile, reduced motion) | None |
| Route change × 5 (home ↔ blog) | 1 pin-spacer, 1 canvas, curtain hidden, scroll at top: no leaks |
| Footer heading after navigating home → /services → bottom | All characters revealed |
| Leaf text hidden after full scroll (desktop, mobile, reduced motion) | None |
| Horizontal overflow at 390px | 0px |
| Menu: focus moves to first link, Esc closes | Pass |
| Chat: send, typing state, reply, Esc closes | Pass |
| Book a call: opens Cal.com's own popup | See "Not done" |
| Service pages: one `h1`, canonical, meta description, Service/Breadcrumb/FAQ JSON-LD | Pass |
| Sitemap includes all 7 service URLs | Pass |

## Lighthouse (mobile, home page)

| Category | Score | Target |
|---|---|---|
| Performance | 44–51 (service pages: 70) | ≥ 85, **not met** |
| Accessibility | 100 | ≥ 95 |
| Best Practices | 100 | ≥ 95 |
| SEO | 100 | 100 |

CLS is 0. Simulated LCP is about 4–5s and TBT about 1.6–2.2s. In the unthrottled trace,
first paint dropped from 5.3s to about 2s after the WebGL field was deferred until after
the intro and rendered below native resolution.

### What still costs performance

1. Script evaluation and hydration of GSAP, SplitText, ScrollTrigger and the page
   components under 4× CPU throttling.
2. The preloader by design holds the hero for at least 1s on a first visit.
3. Software WebGL in headless test runs. Re-test on a real mid-range phone and in
   PageSpeed Insights after deploy before acting on these numbers.

### Next steps if the score must reach 85+

- Lazy-load the GSAP plugins used only below the fold (SplitText for later sections).
- Drop the preloader on repeat visits entirely, or make it skip when assets are cached.
- Code-split the home sections below the fold with `next/dynamic`.

## Jury self-score (honest)

| Criterion | Score | Note |
|---|---|---|
| Design | 8 | Distinct type-led direction, consistent palette |
| Usability | 6.5 | A11y strong, mobile perf below target |
| Creativity | 8 | X-ray lens concept carried through hero, work cards and annotations |
| Content | 7.5 | Real copy and projects; no project imagery yet |

## Not done

- No real project screenshots exist, so cards use generated typographic art and there
  is no WebGL image-hover displacement.
- No sound design (optional in the brief).
- Not tested on real Safari / iOS hardware.
- The Cal.com popup is third-party UI and was not verified in the headless run; click
  "Book a call" once in a real browser to confirm the `ibad-khaan/15min` event loads.
