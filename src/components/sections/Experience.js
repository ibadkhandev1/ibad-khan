'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { EASE, MOTION_OK } from '@/lib/motion-tokens'
import { EXPERIENCES } from '@/config/content'
import SectionLabel from '@/components/layout/SectionLabel'
import SplitReveal from '@/components/motion/SplitReveal'
import Shape from '@/components/memphis/Shape'

const BULLETS = ['circle', 'triangle', 'square']

// "May 2025 — Present" → "v2025.05 → now": the job history read as a changelog.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const toVersion = (part) => {
  const [month, year] = part.trim().split(' ')
  const index = MONTHS.indexOf(month)
  if (index < 0 || !year) return 'now'
  return `v${year}.${String(index + 1).padStart(2, '0')}`
}
const versionRange = (period) => period.split('—').map(toVersion).join(' → ')

export default function Experience() {
  const rootRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const rows = gsap.utils.toArray('[data-exp-row]')
      const versions = rows.map((row) => row.querySelector('[data-exp-version]'))
      const labels = versions.map((version) => version.textContent)
      rows.forEach((row, index) => {
        const version = versions[index]
        // The chip holds a dotted placeholder, then types its version in like a
        // build stamping a tag.
        version.textContent = labels[index].replace(/[0-9a-z]/gi, '·')
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: 'top 80%', once: true },
        })
        tl.to(version, {
          scrambleText: { text: labels[index], chars: '0123456789.v', speed: 0.5 },
          duration: 0.8,
          ease: 'none',
        })
          .from(row.querySelectorAll('[data-exp-cell]'), {
            x: -40,
            autoAlpha: 0,
            duration: 0.55,
            stagger: 0.08,
          }, 0.1)
          .from(row.querySelectorAll('[data-exp-bullet]'), {
            scale: 0,
            rotation: -90,
            duration: 0.45,
            ease: EASE.pop,
            stagger: 0.06,
          }, 0.35)
      })
      return () => versions.forEach((version, index) => {
        version.textContent = labels[index]
      })
    })
  }, { scope: rootRef })

  return (
    <section ref={rootRef} id="experience" className="section" aria-labelledby="experience-title">
      <div className="gutter">
        <SectionLabel index="05" tone={0}>Experience</SectionLabel>
        <SplitReveal
          id="experience-title"
          className="display mt-4 max-w-[12ch] text-[clamp(3rem,8vw,7.5rem)]"
        >
          The changelog
        </SplitReveal>

        <ol className="mt-16">
          {EXPERIENCES.map((exp, rowIndex) => (
            <li key={exp.company} data-exp-row className="exp-row">
              <div className="grid grid-cols-12 gap-x-6 gap-y-6 py-10 sm:py-14">
                <div className="col-span-12 md:col-span-3">
                  <p
                    className="exp-version"
                    data-exp-version
                    data-c={rowIndex === 0 ? 3 : 2}
                    aria-hidden="true"
                  >
                    {versionRange(exp.period)}
                  </p>
                  <p className="mono-label mt-4" data-exp-cell>
                    <span className="sr-only">{exp.period}. </span>
                    {exp.type}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5" data-exp-cell>
                  <h3 className="exp-company">{exp.company}</h3>
                  <p className="mt-3 text-lg font-semibold">{exp.role}</p>
                </div>
                <div className="col-span-12 md:col-span-4" data-exp-cell>
                  <ul className="space-y-3">
                    {exp.points.map((point, index) => (
                      <li key={point} className="exp-point" data-c={index % 4}>
                        <Shape type={BULLETS[index % BULLETS.length]} data-exp-bullet />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Skills">
                    {exp.skills.map((skill) => (
                      <li key={skill} className="chip">{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
