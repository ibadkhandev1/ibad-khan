'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_OK } from '@/lib/motion-tokens'
import { MARQUEE_PRIMARY, MARQUEE_SECONDARY, STACK_GROUPS } from '@/config/content'
import SectionLabel from '@/components/layout/SectionLabel'
import Marquee from '@/components/motion/Marquee'

export default function Stack() {
  const rootRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.from('[data-stack-item]', {
        xPercent: -12,
        autoAlpha: 0,
        duration: 0.9,
        stagger: { each: 0.035, from: 'start' },
        ease: 'power2.out',
        scrollTrigger: { trigger: '[data-stack-grid]', start: 'top 85%', once: true },
      })
    })
  }, { scope: rootRef })

  return (
    <section
      ref={rootRef}
      id="stack"
      className="section overflow-hidden"
      aria-labelledby="stack-title"
    >
      <div className="gutter flex flex-wrap items-baseline justify-between gap-4">
        <SectionLabel index="07">Toolkit</SectionLabel>
        <h2 id="stack-title" className="mono-label">What the work is made with</h2>
      </div>

      <div className="mt-12 space-y-2" aria-hidden="true">
        <Marquee items={MARQUEE_PRIMARY} />
        <Marquee items={MARQUEE_SECONDARY} reverse outline duration={38} />
      </div>

      <div
        data-stack-grid
        className="gutter mt-20 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4"
      >
        {STACK_GROUPS.map((group, groupIndex) => (
          <div key={group.title} className="border-t border-hairline-strong pt-4">
            <h3 className="mono-label">
              <span className="text-accent">{String(groupIndex + 1).padStart(2, '0')}</span>{' '}
              {group.title}
            </h3>
            <ul className="mt-5 space-y-2">
              {group.items.map((item) => (
                <li key={item} data-stack-item className="text-lg">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
