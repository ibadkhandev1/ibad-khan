'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { EASE, MOTION_OK } from '@/lib/motion-tokens'
import SectionLabel from '@/components/layout/SectionLabel'
import SplitReveal from '@/components/motion/SplitReveal'

// One primitive per rule, drawn as a single stroke so DrawSVG can ink it in.
const MARKS = {
  zigzag: 'M8 70 28 30l20 40 20-40 20 40',
  squiggle: 'M6 50q11-26 22 0t22 0 22 0 22 0',
  circle: 'M50 8a42 42 0 1 1 0 84a42 42 0 1 1 0-84Z',
  triangle: 'M50 8 92 86H8Z',
}

function Mark({ type }) {
  const isLine = type === 'zigzag' || type === 'squiggle'
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {!isLine && (
        <path
          d={MARKS[type]}
          fill="var(--paper-2)"
          transform="translate(6 6)"
          data-mark-fill
        />
      )}
      <path
        d={MARKS[type]}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={isLine ? 9 : 5}
        strokeLinecap="round"
        strokeLinejoin="round"
        data-mark-line
      />
    </svg>
  )
}

const PRINCIPLES = [
  {
    title: 'Speed is a feature',
    text: `If a page makes you wait, nothing else on it matters much. I budget for performance
      from the first commit, not the week before launch.`,
    note: 'LCP · INP · CLS',
    mark: 'zigzag',
  },
  {
    title: 'Motion has to mean something',
    text: `Every animation should explain where something came from or where to look next.
      If it only decorates, it gets cut or toned down.`,
    note: 'transform · opacity · 60fps',
    mark: 'squiggle',
  },
  {
    title: 'Accessible by default',
    text: `Keyboard focus, real headings, readable contrast and reduced-motion fallbacks are
      part of the build, not a ticket for later.`,
    note: 'WCAG AA · prefers-reduced-motion',
    mark: 'circle',
  },
  {
    title: 'Code the next person can read',
    text: `Clear names, small components, short notes where the reasoning isn’t obvious.
      Someone will inherit this code. It might be me, six months from now.`,
    note: 'props · naming · notes',
    mark: 'triangle',
  },
]

// Sticky stack: each card pins and the next one slides over it, while the one
// underneath shrinks back into the pile. Each card's primitive inks itself in
// as the card arrives.
export default function Principles() {
  const rootRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const cards = gsap.utils.toArray('[data-principle]')
      cards.forEach((card) => {
        gsap.from(card.querySelector('[data-mark-line]'), {
          drawSVG: '0%',
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 40%', scrub: 0.5 },
        })
        const fill = card.querySelector('[data-mark-fill]')
        if (fill) {
          gsap.from(fill, {
            scale: 0,
            transformOrigin: '50% 50%',
            duration: 0.6,
            ease: EASE.pop,
            scrollTrigger: { trigger: card, start: 'top 45%', once: true },
          })
        }
      })
      cards.slice(0, -1).forEach((card, index) => {
        const next = cards[index + 1]
        gsap.to(card, {
          scale: 0.92,
          ease: 'none',
          scrollTrigger: {
            trigger: next,
            start: 'top bottom',
            end: 'top 30%',
            scrub: true,
          },
        })
        gsap.to(card.querySelector('[data-principle-shade]'), {
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 30%', scrub: true },
        })
      })
    })
  }, { scope: rootRef })

  return (
    <section
      ref={rootRef}
      id="principles"
      className="section"
      aria-labelledby="principles-title"
    >
      <div className="gutter">
        <SectionLabel index="04" tone={2}>Principles</SectionLabel>
        <SplitReveal
          id="principles-title"
          className="display mt-4 max-w-[14ch] text-[clamp(3rem,8vw,7.5rem)]"
        >
          Four rules I build by
        </SplitReveal>

        <ol className="principles mt-16">
          {PRINCIPLES.map((principle, index) => (
            <li
              key={principle.title}
              data-principle
              className="principle-card"
              data-c={index % 4}
              style={{ '--index': index }}
            >
              <span data-principle-shade className="principle-shade" aria-hidden="true" />
              <div className="principle-mark">
                <Mark type={principle.mark} />
                <span className="principle-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="principle-body">
                <h3 className="display text-[clamp(2.25rem,5vw,4.5rem)]">{principle.title}</h3>
                <p className="lede mt-6">{principle.text.replace(/\s+/g, ' ')}</p>
                <p className="chip mt-8" data-c={(index + 2) % 4}>{principle.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
