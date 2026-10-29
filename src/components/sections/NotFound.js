'use client'

import { usePathname } from 'next/navigation'
import { useRef, useSyncExternalStore } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { onIntroReady } from '@/lib/intro'
import { MOTION_OK } from '@/lib/motion-tokens'
import { onPageReveal } from '@/components/layout/TransitionProvider'
import TransitionLink from '@/components/layout/TransitionLink'
import SectionLabel from '@/components/layout/SectionLabel'
import Shape from '@/components/memphis/Shape'

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

export default function NotFound() {
  const pathname = useRequestedPath() ?? 'this address'
  const rootRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(MOTION_OK, () => {
      const digits = gsap.utils.toArray('[data-nf-digit]')
      const fades = gsap.utils.toArray('[data-nf-fade]')
      gsap.set(digits, { yPercent: -160, rotation: (index) => [-25, 40, 18][index] })
      gsap.set(fades, { autoAlpha: 0, y: 24 })

      // The page "fails to render": the digits fall in and land crooked.
      const intro = gsap.timeline({ paused: true })
        .to(digits, {
          yPercent: 0,
          rotation: (index) => [-6, 12, 4][index],
          duration: 0.9,
          ease: 'bounce.out',
          stagger: 0.12,
        })
        .to(fades, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07 }, 0.5)

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
  }, { scope: rootRef })

  return (
    <section ref={rootRef} className="nf gutter" aria-labelledby="nf-title">
      <div className="flex flex-wrap items-center justify-between gap-4" data-nf-fade>
        <SectionLabel index="404" tone={1}>Not found</SectionLabel>
        <p className="mono-label">
          No page at <code className="text-accent normal-case">{pathname}</code>
        </p>
      </div>

      <p className="nf-digits" aria-hidden="true">
        <span className="nf-digit" data-nf-digit data-c={0}>4</span>
        <span className="nf-zero" data-nf-digit data-c={3}>
          <Shape type="ring" />
        </span>
        <span className="nf-digit" data-nf-digit data-c={2}>4</span>
      </p>

      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-6" data-nf-fade>
          <h1 id="nf-title" className="display text-[clamp(2.5rem,5vw,4.5rem)]">
            This component didn’t render.
          </h1>
          <p className="lede mt-6">
            The link might be old, or the page has moved. Everything that does exist is one
            click away.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <TransitionLink href="/" className="btn btn--solid">Back to home</TransitionLink>
            <TransitionLink href="/services" className="btn">See services</TransitionLink>
          </div>
        </div>

        <nav className="col-span-12 md:col-span-5 md:col-start-8" aria-label="Pages" data-nf-fade>
          <ul className="border-t-[3px] border-ink">
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
