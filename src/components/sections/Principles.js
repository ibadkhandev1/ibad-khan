'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_OK } from '@/lib/motion-tokens'
import SectionLabel from '@/components/layout/SectionLabel'
import SplitReveal from '@/components/motion/SplitReveal'

const PRINCIPLES = [
  {
    title: 'Speed is a feature',
    text: `If a page makes you wait, nothing else on it matters much. I budget for performance
      from the first commit, not the week before launch.`,
    note: 'LCP · INP · CLS',
  },
  {
    title: 'Motion has to mean something',
    text: `Every animation should explain where something came from or where to look next.
      If it only decorates, it gets cut or toned down.`,
    note: 'transform · opacity · 60fps',
  },
  {
    title: 'Accessible by default',
    text: `Keyboard focus, real headings, readable contrast and reduced-motion fallbacks are
      part of the build, not a ticket for later.`,
    note: 'WCAG AA · prefers-reduced-motion',
  },
  {
    title: 'Code the next person can read',
    text: `Clear names, small components, short notes where the reasoning isn’t obvious.
      Someone will inherit this code. It might be me, six months from now.`,
    note: 'props · naming · notes',
  },
]

// Sticky stack: each card pins and the next one slides over it, while the one
// underneath shrinks back into the pile.
export default function Principles() {
  const rootRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const cards = gsap.utils.toArray('[data-principle]')
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
          opacity: 0.6,
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
        <SectionLabel index="04">Principles</SectionLabel>
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
              style={{ '--index': index }}
            >
              <span data-principle-shade className="principle-shade" aria-hidden="true" />
              <span className="principle-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="principle-body">
                <h3 className="display text-[clamp(2.25rem,5vw,4.5rem)]">{principle.title}</h3>
                <p className="lede mt-6">{principle.text.replace(/\s+/g, ' ')}</p>
                <p className="mono-label mt-8 text-accent">{principle.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
