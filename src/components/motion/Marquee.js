'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { MOTION_OK } from '@/lib/motion-tokens'
import Shape from '@/components/memphis/Shape'

const MARKS = ['circle', 'triangle', 'plus', 'half', 'square']

function Group({ items, outline, hidden }) {
  return (
    <ul className="marquee-group" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <li key={item} className={`marquee-item ${outline ? 'text-outline' : ''}`}>
          {item}
          <Shape type={MARKS[index % MARKS.length]} className="marquee-mark" />
        </li>
      ))}
    </ul>
  )
}

// Infinite marquee whose speed and direction follow scroll velocity.
export default function Marquee({ items, reverse = false, outline = false, duration = 32 }) {
  const rootRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const from = reverse ? -50 : 0
      const loop = gsap.fromTo(
        trackRef.current,
        { xPercent: from },
        { xPercent: from + (reverse ? 50 : -50), duration, ease: 'none', repeat: -1 },
      )

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const boost = Math.min(Math.abs(self.getVelocity()) / 250, 6)
          const direction = self.direction
          gsap.to(loop, {
            timeScale: direction * (1 + boost),
            duration: 0.2,
            overwrite: true,
            onComplete: () => {
              gsap.to(loop, { timeScale: direction, duration: 1, ease: 'power2.out' })
            },
          })
        },
      })
    })
  }, { scope: rootRef })

  return (
    <div ref={rootRef} className="marquee">
      <div ref={trackRef} className="marquee-track">
        <Group items={items} outline={outline} />
        <Group items={items} outline={outline} hidden />
      </div>
    </div>
  )
}
