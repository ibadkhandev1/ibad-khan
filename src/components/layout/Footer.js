'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { scrollToTarget } from '@/lib/lenis'
import { MOTION_OK } from '@/lib/motion-tokens'
import { LOCATION, WHATSAPP } from '@/config/content'
import { PERSONAL_INFO, RESUME, SOCIAL_LINKS } from '@/config/personal'
import SplitReveal from '@/components/motion/SplitReveal'
import Magnetic from '@/components/motion/Magnetic'
import BookCallButton from '@/components/booking/BookCallButton'

const SOCIALS = [
  { label: 'GitHub', href: SOCIAL_LINKS.github },
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
  { label: 'Upwork', href: SOCIAL_LINKS.upwork },
]

// The finale: one invitation, one big button, and the name rising out of the
// floor as you reach the end of the page.
export default function Footer() {
  const rootRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.from('[data-footer-name]', {
        yPercent: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-footer-name-wrap]',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      })
      gsap.from('[data-footer-rule]', {
        scaleX: 0,
        transformOrigin: '0% 50%',
        duration: 1.6,
        scrollTrigger: { trigger: '[data-footer-rule]', start: 'top 95%', once: true },
      })
    })
  }, { scope: rootRef })

  const backToTop = () => {
    scrollToTarget(0, { duration: 2 })
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <footer ref={rootRef} id="contact" className="relative overflow-hidden pt-28 sm:pt-40">
      <div className="gutter">
        <p className="mono-label">
          <span className="text-accent">(Contact)</span> Freelance · Full-time · A conversation
        </p>

        <SplitReveal
          as="h2"
          type="chars"
          className="display mt-8 max-w-[14ch] text-[clamp(3.25rem,10vw,10.5rem)]"
        >
          Let&apos;s build something that moves.
        </SplitReveal>

        <div className="mt-16 grid grid-cols-12 items-end gap-x-6 gap-y-12">
          <p className="col-span-12 max-w-[38ch] text-lg text-ink-muted md:col-span-5">
            Open to freelance projects, full-time roles, or just a conversation about the
            frontend. No pitches, no pressure.
            <span className="mt-8 flex flex-wrap gap-3">
              <BookCallButton className="btn">Book a call</BookCallButton>
              <a href={RESUME.href} download={RESUME.fileName} className="btn">
                Download resume
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 5v12M6 12l6 6 6-6M5 20h14" fill="none" stroke="currentColor"
                    strokeWidth="1.5" />
                </svg>
              </a>
            </span>
          </p>
          <div className="col-span-12 md:col-span-3 md:col-start-10 md:justify-self-end">
            <Magnetic strength={0.4}>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="cta-orb"
                data-cursor="hide"
              >
                <span data-magnetic-inner className="cta-orb-label">
                  Write to me
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      d="M7 17 17 7M8 7h9v9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </a>
            </Magnetic>
          </div>
        </div>

        <div data-footer-rule className="mt-20 h-px bg-hairline-strong" />

        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4">
          <div>
            <dt className="mono-label">Email</dt>
            <dd className="mt-3">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="link-draw break-all">
                {PERSONAL_INFO.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="mono-label">WhatsApp</dt>
            <dd className="mt-3">
              <a
                href={WHATSAPP.href}
                target="_blank"
                rel="noopener"
                className="link-draw"
              >
                {WHATSAPP.display}
                <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
              </a>
            </dd>
          </div>
          <div>
            <dt className="mono-label">Elsewhere</dt>
            <dd className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {SOCIALS.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="me noopener"
                  className="link-draw">{label}</a>
              ))}
            </dd>
          </div>
          <div>
            <dt className="mono-label">Based in</dt>
            <dd className="mt-3">{LOCATION.city}, {LOCATION.country}</dd>
          </div>
        </dl>

        <div className="mono-label flex flex-wrap items-center justify-between gap-4 pb-6">
          <span>© {new Date().getFullYear()} Ibad Khan</span>
          <span className="hidden sm:inline">Built with Next.js, GSAP, Lenis &amp; OGL</span>
          <button type="button" onClick={backToTop} className="back-to-top">
            Back to top
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      <div data-footer-name-wrap className="overflow-hidden" aria-hidden="true">
        <p data-footer-name className="footer-name">Ibad Khan</p>
      </div>
    </footer>
  )
}
