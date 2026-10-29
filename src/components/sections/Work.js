'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { DESKTOP, EASE, MOTION_OK } from '@/lib/motion-tokens'
import { PROJECTS } from '@/config/content'
import { SOCIAL_LINKS } from '@/config/personal'
import SectionLabel from '@/components/layout/SectionLabel'
import TransitionLink from '@/components/layout/TransitionLink'
import SplitReveal from '@/components/motion/SplitReveal'
import Shape from '@/components/memphis/Shape'

const pad = (value) => String(value).padStart(2, '0')
const STICKERS = ['circle', 'triangle', 'plus', 'half', 'ring', 'square', 'arc']

function ProjectCard({ project, index }) {
  return (
    <li className="work-card" data-work-card>
      <TransitionLink
        href={project.path}
        transitionLabel={project.title}
        className="group block"
        data-cursor="view"
        data-cursor-label="Open"
      >
        <div className="work-art" data-work-art data-c={index % 4}>
          <span className="work-num" data-c={(index + 3) % 4} aria-hidden="true">
            {pad(index + 1)}
          </span>
          <div className="work-art-inner" data-work-art-inner>
            <Image
              src={project.images.cover.src}
              alt={project.images.cover.alt}
              width={project.images.cover.width}
              height={project.images.cover.height}
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="work-cover"
            />
          </div>
          <span className="work-sticker" aria-hidden="true">
            <Shape type={STICKERS[index % STICKERS.length]} />
          </span>
        </div>
        <h3 className="work-title">
          <span>{project.title}</span>
          <span className="sr-only"> — view project</span>
        </h3>
        <p className="mt-3 max-w-[44ch] text-ink-muted">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Built with">
          {project.tech.map((tech, techIndex) => (
            <li key={tech} className="chip" data-c={(index + techIndex + 1) % 4}>{tech}</li>
          ))}
        </ul>
      </TransitionLink>
    </li>
  )
}

// Pinned and scrubbed sideways on desktop; scroll velocity makes the frames
// wiggle on their pins. A plain vertical list on small screens and for
// reduced motion.
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
      const wiggleTo = gsap.quickTo(arts, 'rotation', { duration: 0.6, ease: EASE.wiggle })
      const settle = gsap.delayedCall(0.1, () => wiggleTo(0)).pause()

      const horizontal = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(progressRef.current, { scaleX: self.progress })
            wiggleTo(gsap.utils.clamp(-4, 4, self.getVelocity() / -400))
            settle.restart(true)
          },
        },
      })

      gsap.utils.toArray('[data-work-card]').forEach((card) => {
        const art = card.querySelector('[data-work-art-inner]')
        const isInFirstView = card.offsetLeft < window.innerWidth
        gsap.fromTo(art, { clipPath: 'circle(0% at 50% 50%)', scale: 1.2 }, {
          clipPath: 'circle(75% at 50% 50%)',
          scale: 1,
          clearProps: 'clipPath,transform',
          duration: 0.9,
          scrollTrigger: isInFirstView
            ? { trigger: rootRef.current, start: 'top 55%', once: true }
            : { trigger: card, containerAnimation: horizontal, start: 'left 90%', once: true },
        })
      })
    })

    mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
      gsap.utils.toArray('[data-work-art-inner]').forEach((art) => {
        gsap.fromTo(art, { clipPath: 'circle(0% at 50% 50%)', scale: 1.2 }, {
          clipPath: 'circle(75% at 50% 50%)',
          scale: 1,
          clearProps: 'clipPath,transform',
          duration: 0.9,
          scrollTrigger: { trigger: art, start: 'top 88%', once: true },
        })
      })
    })
  }, { scope: rootRef })

  return (
    <section ref={rootRef} id="work" className="work" aria-labelledby="work-title">
      <div className="work-pin">
        <div className="gutter flex flex-wrap items-end justify-between gap-6 pt-28 lg:pt-24">
          <div>
            <SectionLabel index="03" tone={1}>Selected work</SectionLabel>
            <SplitReveal id="work-title" className="display mt-4 text-[clamp(3rem,7vw,6.5rem)]">
              Things I&apos;ve shipped
            </SplitReveal>
          </div>
          <div className="w-full max-w-xs lg:w-64">
            <p className="mono-label flex justify-between text-ink">
              <span>{pad(PROJECTS.length)} builds</span>
              <span className="hidden lg:inline">Scroll →</span>
            </p>
            <div className="mt-3 hidden h-3 overflow-hidden rounded-full border-2 border-ink bg-paper lg:block">
              <div ref={progressRef} className="h-full origin-left scale-x-0 bg-c2" />
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
              rel="me noopener"
              className="work-more"
              data-cursor="view"
              data-cursor-label="GitHub ↗"
            >
              <span className="mono-label text-ink">More on GitHub ↗</span>
              <span className="work-more-title display">
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
