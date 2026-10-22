'use client'

import { usePathname } from 'next/navigation'
import { useRef, useSyncExternalStore } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { onIntroReady } from '@/lib/intro'
import { createLens } from '@/lib/lens'
import { EASE, FINE_POINTER, MOTION_OK } from '@/lib/motion-tokens'
import { onPageReveal } from '@/components/layout/TransitionProvider'
import TransitionLink from '@/components/layout/TransitionLink'
import SectionLabel from '@/components/layout/SectionLabel'

const DIGITS = ['4', '0', '4']

// The 404 page is prerendered once at build time, so the requested path can only
// be known in the browser. The server snapshot (null) is used for SSR and
// hydration; React then re-renders with the real path, so the markup always matches.
const subscribeNoop = () => () => {}
const useRequestedPath = () => {
  const pathname = usePathname()
  return useSyncExternalStore(subscribeNoop, () => pathname, () => null)
}

const WAYS_BACK = [
  { label: 'Selected work', href: '/#work', note: 'Seven builds, scroll sideways' },
  { label: 'Services', href: '/services', note: 'What I can build for you' },
  { label: 'Blog', href: '/blog', note: 'Notes on React and Next.js' },
  { label: 'Contact', href: '#contact', note: 'Ask about a project' },
]

// Rendered twice in the same grid cell (finished + blueprint), like the hero.
function Digits({ variant, path }) {
  const isXray = variant === 'xray'
  return (
    <div className={`nf-layer ${isXray ? 'nf-xray-layer blueprint' : ''}`}>
      <p className="nf-digits" aria-hidden="true">
        {DIGITS.map((digit, index) => (
          <span key={index} className="nf-digit-mask">
            <span className="nf-digit">{digit}</span>
          </span>
        ))}
      </p>
      {isXray && (
        <>
          <span className="xray-anno nf-anno-top">GET {path} → 404</span>
          <span className="xray-anno nf-anno-bottom">route: undefined · no page.js found</span>
        </>
      )}
    </div>
  )
}

export default function NotFound() {
  const pathname = useRequestedPath() ?? 'this address'
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const xrayRef = useRef(null)
  const ringRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(MOTION_OK, () => {
      const digits = gsap.utils.toArray('.nf-digit')
      const fades = gsap.utils.toArray('[data-nf-fade]')
      gsap.set(digits, { yPercent: 105 })
      gsap.set(fades, { autoAlpha: 0, y: 24 })

      const intro = gsap.timeline({ paused: true })
        .to(digits, { yPercent: 0, duration: 1.4, ease: EASE.transition, stagger: 0.1 })
        .to(fades, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07 }, 0.6)

      let unsubscribeReveal
      const unsubscribe = onIntroReady(() => {
        unsubscribeReveal = onPageReveal(() => intro.play())
      })
      return () => {
        unsubscribe()
        unsubscribeReveal?.()
        intro.kill()
      }
    })

    const lens = (auto) => createLens({
      surface: stageRef.current,
      layer: xrayRef.current,
      ring: ringRef.current,
      radius: () => Math.min(200, Math.max(100, window.innerWidth * 0.12)),
      auto,
    })
    mm.add(`${FINE_POINTER} and ${MOTION_OK}`, () => lens(false))
    mm.add(`(hover: none) and ${MOTION_OK}`, () => lens(true))
  }, { scope: rootRef })

  return (
    <section ref={rootRef} className="nf gutter" aria-labelledby="nf-title">
      <div className="flex flex-wrap items-center justify-between gap-4" data-nf-fade>
        <SectionLabel index="404">Not found</SectionLabel>
        <p className="mono-label">
          No page at <code className="text-accent normal-case">{pathname}</code>
        </p>
      </div>

      <div ref={stageRef} className="nf-stage" data-cursor="lens">
        <Digits variant="solid" path={pathname} />
        <div ref={xrayRef} className="nf-xray" aria-hidden="true">
          <Digits variant="xray" path={pathname} />
        </div>
        <svg ref={ringRef} className="lens-ring" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="99" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-6" data-nf-fade>
          <h1 id="nf-title" className="display text-[clamp(2.5rem,5vw,4.5rem)]">
            This page was never built.
          </h1>
          <p className="lede mt-6">
            The link might be old, or the page has moved. Everything that does exist is one
            click away.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TransitionLink href="/" className="btn btn--solid">Back to home</TransitionLink>
            <TransitionLink href="/services" className="btn">See services</TransitionLink>
          </div>
        </div>

        <nav className="col-span-12 md:col-span-5 md:col-start-8" aria-label="Pages" data-nf-fade>
          <ul className="border-t border-hairline-strong">
            {WAYS_BACK.map((link) => (
              <li key={link.href}>
                <TransitionLink href={link.href} transitionLabel={link.label} className="nf-link">
                  <span>{link.label}</span>
                  <span className="mono-label">{link.note} →</span>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
