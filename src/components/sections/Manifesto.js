'use client'

import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { MOTION_OK } from '@/lib/motion-tokens'
import { LOCATION, STATS } from '@/config/content'
import SectionLabel from '@/components/layout/SectionLabel'
import Counter from '@/components/motion/Counter'

const FACTS = [
  { label: 'Based in', value: `${LOCATION.city}, ${LOCATION.country}` },
  { label: 'Currently', value: 'Frontend at Nanolix Digital' },
  { label: 'Focus', value: 'Next.js, motion, performance' },
]

// The tension beat: a statement that resolves word by word as you scroll,
// instead of yet another block fading up.
export default function Manifesto() {
  const rootRef = useRef(null)
  const textRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      // Words stay real text (aria: 'none'); the dim state still clears the
      // 3:1 large-text contrast ratio, so nothing is ever unreadable.
      const split = SplitText.create(textRef.current, { type: 'words', aria: 'none' })
      gsap.fromTo(split.words, { color: '#66625a' }, {
        color: (index, word) => getComputedStyle(word.parentElement).color,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 78%',
          end: 'bottom 45%',
          scrub: true,
        },
      })
      gsap.from('[data-fact]', {
        clipPath: 'inset(0% 0% 100% 0%)',
        y: 20,
        duration: 1,
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-facts]', start: 'top 88%', once: true },
      })
      return () => split.revert()
    })
  }, { scope: rootRef })

  return (
    <section ref={rootRef} id="about" className="section" aria-labelledby="about-title">
      <div className="gutter grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-3">
          <SectionLabel index="02" className="lg:sticky lg:top-28">Approach</SectionLabel>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <h2 id="about-title" className="sr-only">About Ibad Khan</h2>
          <p ref={textRef} className="manifesto">
            Most interfaces look finished. Few are built to last. I care about both
            layers — the pixels you see, and <span className="text-accent">the system
            underneath</span>: components that scale, motion that respects the frame budget,
            and pages that load before you notice.
          </p>

          <dl data-facts className="mt-20 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
            {FACTS.map((fact) => (
              <div key={fact.label} data-fact className="border-t border-hairline-strong pt-4">
                <dt className="mono-label">{fact.label}</dt>
                <dd className="mt-2 text-lg">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
            {STATS.map((stat) => (
              <li key={stat.label}>
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  pad={stat.pad}
                  suffix={stat.suffix}
                  className="stat-value"
                />
                <p className="mt-2 max-w-[20ch] text-ink-muted">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
