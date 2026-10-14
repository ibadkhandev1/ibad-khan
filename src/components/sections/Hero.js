'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { onIntroReady } from '@/lib/intro'
import { createLens } from '@/lib/lens'
import { EASE, FINE_POINTER, MOTION_OK } from '@/lib/motion-tokens'
import { LOCATION } from '@/config/content'
import { RESUME } from '@/config/personal'
import TransitionLink from '@/components/layout/TransitionLink'
import { onPageReveal } from '@/components/layout/TransitionProvider'

const SignalField = dynamic(() => import('@/components/webgl/SignalField'), { ssr: false })

const NAME_LINES = ['Ibad', 'Khan']

function Annotation({ children, className = '' }) {
  return <span className={`xray-anno ${className}`}>{children}</span>
}

// Rendered twice into the same grid cell: once finished ("solid"), once as
// its own blueprint ("xray"). Identical type metrics keep both layers aligned.
function HeroLayer({ variant }) {
  const isXray = variant === 'xray'
  const Name = isXray ? 'p' : 'h1'

  return (
    <div
      className={`hero-layer ${isXray ? 'hero-xray blueprint' : ''}`}
      aria-hidden={isXray || undefined}
    >
      <div className="gutter flex min-h-svh flex-col pb-8 pt-24 sm:pb-10">
        <div
          className="hero-meta mono-label flex items-center justify-between"
          data-hero-fade="label"
        >
          <span className={`hidden sm:inline ${isXray ? 'xray-box' : ''}`}>
            {isXray ? '<header data-section="01">' : '(01) Portfolio — 2026'}
          </span>
          <span className={`flex items-center gap-2 ${isXray ? 'xray-box' : ''}`}>
            <span className="status-dot" />
            Open to freelance &amp; full-time
          </span>
        </div>

        <Name className="hero-name">
          {!isXray && <span className="sr-only">Ibad Khan — frontend developer</span>}
          {NAME_LINES.map((line, index) => (
            <span key={line} className={`hero-line hero-line-${index}`} aria-hidden="true">
              <span className="hero-line-inner">{line}</span>
              {isXray && index === 0 && (
                <>
                  <Annotation className="left-0 top-[0.06em]">
                    &lt;h1&gt; font-size: clamp(5rem, min(30vw, 40svh), 34rem)
                  </Annotation>
                  <span className="xray-baseline" />
                </>
              )}
              {isXray && index === 1 && (
                <>
                  <Annotation className="right-0 top-[0.06em]">
                    wght 700 · wdth 82 · line-height 0.8
                  </Annotation>
                  <span className="xray-baseline" />
                </>
              )}
            </span>
          ))}
        </Name>

        <div className="mt-auto grid grid-cols-12 items-end gap-x-6 gap-y-6 pt-10">
          <p className="mono-label col-span-12 md:col-span-4" data-hero-fade="label">
            <span className={isXray ? 'xray-box' : ''}>
              Frontend developer<br />
              {LOCATION.city}, {LOCATION.country} — working worldwide
            </span>
          </p>
          <p
            className={`hero-intro col-span-12 md:col-span-5 ${isXray ? 'xray-box' : ''}`}
            data-hero-fade="block"
          >
            I build web interfaces that look finished and are engineered to last — React,
            Next.js, motion and performance, from first frame to production.
          </p>
          <div
            className="col-span-12 flex flex-col items-start gap-4 md:col-span-3 md:items-end"
            data-hero-fade="block"
          >
            {isXray ? (
              <span className="btn btn--solid xray-box">&lt;a href=&quot;#work&quot;&gt;</span>
            ) : (
              <TransitionLink href="/#work" className="btn btn--solid">
                See the work
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M12 5v14M5 12l7 7 7-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </TransitionLink>
            )}
            {isXray ? (
              <span className="hero-resume xray-box">&lt;a download&gt;</span>
            ) : (
              <a href={RESUME.href} download={RESUME.fileName} className="hero-resume link-draw">
                Download resume ↓
              </a>
            )}
            <span className="mono-label hero-hint">
              {isXray ? 'blueprint layer · 48px grid' : (
                <>
                  <span className="hint-fine">Move your cursor — see how it’s built</span>
                  <span className="hint-touch">The lens shows how it’s built</span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const xrayRef = useRef(null)
  const ringRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(MOTION_OK, () => {
      const lines = gsap.utils.toArray('.hero-line-inner')
      const labels = gsap.utils.toArray('[data-hero-fade="label"]')
      const blocks = gsap.utils.toArray('[data-hero-fade="block"]')
      // Body copy and CTA stay painted (they are the LCP candidates); they only
      // travel. Small labels may fade.
      gsap.set(lines, { yPercent: 105 })
      gsap.set(labels, { autoAlpha: 0, y: 16 })
      gsap.set(blocks, { y: 48 })

      const intro = gsap.timeline({ paused: true })
        .to(lines, { yPercent: 0, duration: 1.5, ease: EASE.transition, stagger: 0.12 })
        .to(blocks, { y: 0, duration: 1.4, stagger: 0.08 }, 0.3)
        .to(labels, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.06 }, 0.75)
      // First load: wait for the preloader. Route change: wait for the curtain.
      let unsubscribeReveal
      const unsubscribe = onIntroReady(() => {
        unsubscribeReveal = onPageReveal(() => intro.play())
      })

      // Scroll-out: the two name lines drift apart at different speeds.
      const scrollOut = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
        .to('.hero-line-0', { yPercent: -35, xPercent: -6, ease: 'none' }, 0)
        .to('.hero-line-1', { yPercent: -10, xPercent: 6, ease: 'none' }, 0)
        .to(stageRef.current, { opacity: 0.25, ease: 'none' }, 0)

      return () => {
        unsubscribe()
        unsubscribeReveal?.()
        intro.kill()
        scrollOut.kill()
      }
    })

    const radius = () => Math.min(230, Math.max(110, window.innerWidth * 0.13))
    mm.add(`${FINE_POINTER} and ${MOTION_OK}`, () => createLens({
      surface: stageRef.current,
      layer: xrayRef.current,
      ring: ringRef.current,
      radius,
    }))
    mm.add(`(hover: none) and ${MOTION_OK}`, () => createLens({
      surface: stageRef.current,
      layer: xrayRef.current,
      ring: ringRef.current,
      radius: () => Math.min(window.innerWidth * 0.32, 170),
      auto: true,
    }))
  }, { scope: rootRef })

  return (
    <section ref={rootRef} id="top" className="hero" aria-label="Introduction">
      <SignalField className="absolute inset-0" />
      <div ref={stageRef} className="hero-stage" data-cursor="lens">
        <HeroLayer variant="solid" />
        <div ref={xrayRef} className="hero-xray-mask" aria-hidden="true">
          <HeroLayer variant="xray" />
        </div>
        <svg ref={ringRef} className="lens-ring" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="99" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </section>
  )
}
