'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { EASE, MOTION_OK } from '@/lib/motion-tokens'
import { LOCATION, STATS } from '@/config/content'
import SectionLabel from '@/components/layout/SectionLabel'
import Counter from '@/components/motion/Counter'
import Shape from '@/components/memphis/Shape'

const FACTS = [
  { label: 'Based in', value: `${LOCATION.city}, ${LOCATION.country}` },
  { label: 'Currently', value: 'Frontend at Nanolix Digital' },
  { label: 'Focus', value: 'Next.js, motion, performance' },
]

const TILT = [-2.5, 1.5, -1]

function InlineShape({ type, tone }) {
  return (
    <span className="inline-shape" data-c={tone} data-inline-shape aria-hidden="true">
      <Shape type={type} />
    </span>
  )
}

// Reveal grammar: a marker sweeps in behind the claims as you read, and the
// shapes set into the sentence pop in like stickers.
export default function Manifesto() {
  const rootRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.utils.toArray('[data-marker]').forEach((marker) => {
        gsap.fromTo(marker, { '--marker': '0%' }, {
          '--marker': '100%',
          ease: 'none',
          scrollTrigger: { trigger: marker, start: 'top 80%', end: 'top 50%', scrub: 0.4 },
        })
      })
      gsap.utils.toArray('[data-inline-shape]').forEach((shape) => {
        gsap.from(shape, {
          scale: 0,
          rotation: -180,
          duration: 0.6,
          ease: EASE.pop,
          scrollTrigger: { trigger: shape, start: 'top 82%', once: true },
        })
      })
      gsap.from('[data-stat]', {
        y: -90,
        rotation: (index) => (index % 2 ? 14 : -14),
        autoAlpha: 0,
        duration: 0.7,
        ease: 'back.out(2.2)',
        stagger: 0.09,
        scrollTrigger: { trigger: '[data-stats]', start: 'top 85%', once: true },
      })
    })
  }, { scope: rootRef })

  return (
    <section ref={rootRef} id="about" className="section" aria-labelledby="about-title">
      <div className="gutter grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-3">
          <SectionLabel index="02" tone={0} className="lg:sticky lg:top-28">About</SectionLabel>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <h2 id="about-title" className="sr-only">About Ibad Khan</h2>
          <p className="manifesto">
            Every interface is a pile of small parts
            <InlineShape type="circle" tone={0} />. I make each one{' '}
            <span className="marker" data-marker data-c={3}>solid</span> — components that
            scale, motion that respects the frame budget
            <InlineShape type="triangle" tone={1} />, pages that load before you notice —
            then let them <span className="marker" data-marker data-c={2}>play together</span>
            <InlineShape type="squiggle" tone={0} />.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-3">
            {FACTS.map((fact) => (
              <div key={fact.label} className="border-t-[3px] border-ink pt-4">
                <dt className="mono-label">{fact.label}</dt>
                <dd className="mt-2 text-lg font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <ul data-stats className="mt-16 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3">
            {STATS.map((stat, index) => (
              <li
                key={stat.label}
                data-stat
                data-c={index}
                className="stat-tile"
                style={{ rotate: `${TILT[index % TILT.length]}deg` }}
              >
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  pad={stat.pad}
                  suffix={stat.suffix}
                  className="stat-value"
                />
                <p className="mt-3 max-w-[20ch] font-semibold">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
