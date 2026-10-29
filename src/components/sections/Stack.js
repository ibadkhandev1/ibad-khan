'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_OK } from '@/lib/motion-tokens'
import { MARQUEE_PRIMARY, MARQUEE_SECONDARY, STACK_GROUPS } from '@/config/content'
import SectionLabel from '@/components/layout/SectionLabel'
import Marquee from '@/components/motion/Marquee'

const pad = (value) => String(value).padStart(2, '0')
const TILT = [-1.5, 1, -0.5, 1.5]

// Two taped bands cross the page; the toolkit cards drop onto the table under them.
export default function Stack() {
  const rootRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.from('[data-stack-card]', {
        y: -140,
        rotation: (index) => (index % 2 ? 18 : -18),
        autoAlpha: 0,
        duration: 0.9,
        ease: 'bounce.out',
        stagger: { each: 0.08, from: 'random' },
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
        <SectionLabel index="07" tone={3}>Toolkit</SectionLabel>
        <h2 id="stack-title" className="mono-label text-ink">What the work is made with</h2>
      </div>

      <div className="bands mt-10" aria-hidden="true">
        <div className="band band--a" data-c={1}>
          <Marquee items={MARQUEE_PRIMARY} />
        </div>
        <div className="band band--b" data-c={0}>
          <Marquee items={MARQUEE_SECONDARY} reverse outline duration={38} />
        </div>
      </div>

      <div
        data-stack-grid
        className="gutter mt-16 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {STACK_GROUPS.map((group, groupIndex) => (
          <div
            key={group.title}
            data-stack-card
            className="sticker p-5"
            style={{ rotate: `${TILT[groupIndex % TILT.length]}deg` }}
          >
            <h3 className="mono-label flex items-center text-ink">
              <span className="label-chip" data-c={groupIndex % 4}>{pad(groupIndex + 1)}</span>
              {group.title}
            </h3>
            <ul className="mt-4 space-y-1.5">
              {group.items.map((item) => (
                <li key={item} className="text-lg font-semibold">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
