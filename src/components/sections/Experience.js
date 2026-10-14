'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_OK } from '@/lib/motion-tokens'
import { EXPERIENCES } from '@/config/content'
import SectionLabel from '@/components/layout/SectionLabel'
import SplitReveal from '@/components/motion/SplitReveal'

export default function Experience() {
  const rootRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.utils.toArray('[data-exp-row]').forEach((row) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: 'top 82%', once: true },
        })
        tl.from(row.querySelector('[data-exp-rule]'), {
          scaleX: 0,
          transformOrigin: '0% 50%',
          duration: 1.4,
          ease: 'expo.inout.custom',
        })
          .from(row.querySelectorAll('[data-exp-cell]'), {
            yPercent: 40,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.12,
          }, 0.35)
      })
    })
  }, { scope: rootRef })

  return (
    <section ref={rootRef} id="experience" className="section" aria-labelledby="experience-title">
      <div className="gutter">
        <SectionLabel index="05">Experience</SectionLabel>
        <SplitReveal
          id="experience-title"
          className="display mt-4 max-w-[12ch] text-[clamp(3rem,8vw,7.5rem)]"
        >
          Where I&apos;ve shipped
        </SplitReveal>

        <ol className="mt-20">
          {EXPERIENCES.map((exp) => (
            <li key={exp.company} data-exp-row className="exp-row group">
              <span data-exp-rule className="exp-rule" />
              <div className="grid grid-cols-12 gap-x-6 gap-y-6 py-10 sm:py-14">
                <p className="mono-label col-span-12 md:col-span-3" data-exp-cell>
                  {exp.period}
                  <br />
                  {exp.type}
                </p>
                <div className="col-span-12 md:col-span-5" data-exp-cell>
                  <h3 className="exp-company">{exp.company}</h3>
                  <p className="mt-2 text-ink-muted">{exp.role}</p>
                </div>
                <div className="col-span-12 md:col-span-4" data-exp-cell>
                  <ul className="space-y-3">
                    {exp.points.map((point) => (
                      <li key={point} className="exp-point">{point}</li>
                    ))}
                  </ul>
                  <p className="mono-label mt-6 leading-relaxed">{exp.skills.join(' · ')}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
