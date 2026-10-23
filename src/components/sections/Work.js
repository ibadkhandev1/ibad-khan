'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { createLens } from '@/lib/lens'
import { DESKTOP, FINE_POINTER, MOTION_OK } from '@/lib/motion-tokens'
import { PROJECTS } from '@/config/content'
import { SOCIAL_LINKS } from '@/config/personal'
import SectionLabel from '@/components/layout/SectionLabel'
import TransitionLink from '@/components/layout/TransitionLink'
import SplitReveal from '@/components/motion/SplitReveal'
import ProjectArt from './ProjectArt'

const pad = (value) => String(value).padStart(2, '0')

function ProjectCard({ project, index }) {
  return (
    <li className="work-card" data-work-card>
      <TransitionLink
        href={project.path}
        transitionLabel={project.title}
        className="group block"
        data-cursor="view"
        data-cursor-label="View"
      >
        <div className="work-art" data-work-art>
          <div className="work-art-inner" data-work-art-inner>
            <Image
              src={project.images.cover.src}
              alt={project.images.cover.alt}
              width={project.images.cover.width}
              height={project.images.cover.height}
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="work-cover"
            />
            <div className="work-xray blueprint" data-work-xray aria-hidden="true">
              <ProjectArt index={index} letter={project.title[0]} variant="xray" />
              <ul className="work-spec">
                {project.tech.map((tech) => <li key={tech}>{tech}</li>)}
                <li>/{project.repo}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mono-label mt-5 flex justify-between gap-4">
          <span className="text-accent">{pad(index + 1)}</span>
          <span>{project.tech.join(' / ')}</span>
        </div>
        <h3 className="work-title">
          {project.title}
          <span className="sr-only"> — view project</span>
        </h3>
        <p className="mt-3 max-w-[44ch] text-ink-muted">{project.description}</p>
      </TransitionLink>
    </li>
  )
}

// The reveal beat: pinned and scrubbed sideways on desktop, a plain vertical
// list on small screens and for reduced motion.
export default function Work() {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
      const track = trackRef.current
      const arts = gsap.utils.toArray('[data-work-art]')
      const distance = () => track.scrollWidth - document.documentElement.clientWidth
      const skewTo = gsap.quickTo(arts, 'skewX', { duration: 0.5, ease: 'power3' })
      const settle = gsap.delayedCall(0.12, () => skewTo(0)).pause()

      const horizontal = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(progressRef.current, { scaleX: self.progress })
            skewTo(gsap.utils.clamp(-7, 7, self.getVelocity() / -350))
            settle.restart(true)
          },
        },
      })

      gsap.utils.toArray('[data-work-card]').forEach((card) => {
        const inner = card.querySelector('[data-work-art-inner]')
        const isInFirstView = card.offsetLeft < window.innerWidth
        gsap.from(inner, {
          clipPath: 'inset(100% 0% 0% 0%)',
          scale: 1.15,
          clearProps: 'transform',
          duration: 1.3,
          scrollTrigger: isInFirstView
            ? { trigger: rootRef.current, start: 'top 55%', once: true }
            : { trigger: card, containerAnimation: horizontal, start: 'left 92%', once: true },
        })
      })
    })

    mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
      gsap.utils.toArray('[data-work-art-inner]').forEach((inner) => {
        gsap.from(inner, {
          clipPath: 'inset(100% 0% 0% 0%)',
          scale: 1.15,
          clearProps: 'transform',
          duration: 1.2,
          scrollTrigger: { trigger: inner, start: 'top 88%', once: true },
        })
      })
    })

    mm.add(`${FINE_POINTER} and ${MOTION_OK}`, () => {
      const cleanups = gsap.utils.toArray('[data-work-art]').map((art) => createLens({
        surface: art,
        layer: art.querySelector('[data-work-xray]'),
        radius: () => Math.max(art.offsetWidth * 0.32, 90),
      }))
      return () => cleanups.forEach((cleanup) => cleanup())
    })
  }, { scope: rootRef })

  return (
    <section ref={rootRef} id="work" className="work" aria-labelledby="work-title">
      <div className="work-pin">
        <div className="gutter flex flex-wrap items-end justify-between gap-6 pt-28 lg:pt-20">
          <div>
            <SectionLabel index="03">Selected work</SectionLabel>
            <SplitReveal id="work-title" className="display mt-4 text-[clamp(3rem,7vw,6.5rem)]">
              Selected work
            </SplitReveal>
          </div>
          <div className="w-full max-w-xs lg:w-64">
            <p className="mono-label flex justify-between">
              <span>{pad(PROJECTS.length)} builds</span>
              <span className="hidden lg:inline">Scroll →</span>
            </p>
            <div className="mt-3 hidden h-px bg-hairline-strong lg:block">
              <div ref={progressRef} className="h-full origin-left scale-x-0 bg-accent" />
            </div>
          </div>
        </div>

        <ul ref={trackRef} className="work-track gutter">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
          <li className="work-card work-card--end">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="work-more"
              data-cursor="view"
              data-cursor-label="GitHub ↗"
            >
              <span className="mono-label">More on GitHub</span>
              <span className="display text-[clamp(2.5rem,4vw,4rem)]">
                Everything else lives in the repos.
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
