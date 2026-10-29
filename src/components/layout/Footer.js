'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { scrollToTarget } from '@/lib/lenis'
import { FINE_POINTER, MOTION_OK } from '@/lib/motion-tokens'
import { LOCATION, WHATSAPP } from '@/config/content'
import { PERSONAL_INFO, RESUME, SOCIAL_LINKS } from '@/config/personal'
import SplitReveal from '@/components/motion/SplitReveal'
import Magnetic from '@/components/motion/Magnetic'
import BookCallButton from '@/components/booking/BookCallButton'
import Shape from '@/components/memphis/Shape'

const SOCIALS = [
  { label: 'GitHub', href: SOCIAL_LINKS.github },
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
  { label: 'Upwork', href: SOCIAL_LINKS.upwork },
]

const CONFETTI = Array.from({ length: 28 }, (_, index) => ({
  type: ['circle', 'triangle', 'square', 'squiggle', 'plus', 'half'][index % 6],
  color: index % 4,
}))

const BURST_COOLDOWN_MS = 1400

// The finale: one invitation, a sticker that throws confetti when you reach for
// it, and the name rising out of the floor as the page ends.
export default function Footer() {
  const rootRef = useRef(null)
  const ctaRef = useRef(null)
  const burstRef = useRef(null)

  useGSAP((context, contextSafe) => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.from('[data-footer-name]', {
        yPercent: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-footer-name-wrap]',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })
      gsap.from('[data-footer-shape]', {
        scale: 0,
        rotation: -180,
        duration: 0.7,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '[data-footer-name-wrap]', start: 'top 85%', once: true },
      })

      // Confetti: one pooled set of shapes, thrown with real gravity from the
      // sticker's centre. Pointer-enter on desktop, every click everywhere.
      const pieces = gsap.utils.toArray('[data-confetti]')
      let lastBurst = 0
      const burst = contextSafe(() => {
        const now = Date.now()
        if (now - lastBurst < BURST_COOLDOWN_MS) return
        lastBurst = now
        const root = rootRef.current.getBoundingClientRect()
        const cta = ctaRef.current.getBoundingClientRect()
        const x = cta.left - root.left + cta.width / 2
        const y = cta.top - root.top + cta.height / 2
        pieces.forEach((piece) => {
          gsap.killTweensOf(piece)
          gsap.set(piece, { x, y, autoAlpha: 1, scale: gsap.utils.random(0.7, 1.5), rotation: 0 })
          gsap.to(piece, {
            physics2D: {
              velocity: gsap.utils.random(380, 820),
              angle: gsap.utils.random(-165, -15),
              gravity: 1100,
            },
            rotation: gsap.utils.random(-540, 540),
            duration: gsap.utils.random(1.1, 1.7),
            ease: 'none',
          })
          gsap.to(piece, { autoAlpha: 0, duration: 0.3, delay: 0.9 })
        })
      })
      burstRef.current = burst

      const cta = ctaRef.current
      const isFine = window.matchMedia(FINE_POINTER).matches
      if (isFine) cta.addEventListener('pointerenter', burst)
      return () => {
        burstRef.current = null
        cta.removeEventListener('pointerenter', burst)
      }
    })
  }, { scope: rootRef })

  const backToTop = () => {
    scrollToTarget(0, { duration: 1.6 })
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <footer ref={rootRef} id="contact" className="site-footer pt-28 sm:pt-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {CONFETTI.map((piece, index) => (
          <span key={index} data-confetti data-c={piece.color} className="confetti">
            <Shape type={piece.type} />
          </span>
        ))}
      </div>

      <div className="gutter relative">
        <p className="mono-label flex items-center">
          <span className="label-chip" data-c={3}>08</span>
          Contact · Freelance · Full-time · A conversation
        </p>

        <SplitReveal
          as="h2"
          type="chars"
          className="display mt-8 max-w-[13ch] text-[clamp(3.25rem,9.5vw,10rem)]"
        >
          Let&apos;s build something that moves.
        </SplitReveal>

        <div className="mt-14 grid grid-cols-12 items-center gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-6">
            <p className="max-w-[38ch] text-lg text-paper/80">
              Open to freelance projects, full-time roles, or just a conversation about the
              frontend. No pitches, no pressure.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BookCallButton className="btn">Book a call</BookCallButton>
              <a href={RESUME.href} download={RESUME.fileName} className="btn">
                Download resume
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:justify-self-end">
            <Magnetic strength={0.35}>
              <a
                ref={ctaRef}
                href={`mailto:${PERSONAL_INFO.email}`}
                className="cta-sticker"
                data-cursor="hide"
                onClick={() => burstRef.current?.()}
              >
                <svg viewBox="0 0 100 100" className="cta-ring" aria-hidden="true">
                  <defs>
                    <path id="cta-circle" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
                  </defs>
                  <text>
                    <textPath href="#cta-circle" textLength="236" lengthAdjust="spacing">
                      Write to me · Write to me · Write to me ·
                    </textPath>
                  </text>
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className="cta-arrow"
                  data-magnetic-inner
                  aria-hidden="true"
                >
                  <path d="M6 18 18 6M8 6h10v10" fill="none" stroke="currentColor"
                    strokeWidth="2.6" strokeLinecap="round" />
                </svg>
                <span className="sr-only">Write to me at {PERSONAL_INFO.email}</span>
              </a>
            </Magnetic>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-8 border-t-[3px] border-paper py-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
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
              <a href={WHATSAPP.href} target="_blank" rel="noopener" className="link-draw">
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
          <span className="hidden max-w-[52ch] text-center md:inline">
            Set in Anybody &amp; Gabarito. “Memphis” was also Windows 98’s codename — this
            one runs on Next.js.
          </span>
          <button type="button" onClick={backToTop} className="back-to-top">
            Back to top
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      <div data-footer-name-wrap className="overflow-hidden" aria-hidden="true">
        <p data-footer-name className="footer-name">
          Ibad
          <span className="footer-name-shape" data-footer-shape>
            <Shape type="circle" />
          </span>
          Khan
        </p>
      </div>
    </footer>
  )
}
