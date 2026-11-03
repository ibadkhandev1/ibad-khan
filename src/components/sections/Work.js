'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { createLens } from '@/lib/lens'
import { FINE_POINTER, MOTION_OK } from '@/lib/motion-tokens'
import { PROJECTS } from '@/config/content'
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
              draggable={false}
            />
            <div className="work-xray blueprint" data-work-xray aria-hidden="true">
              <ProjectArt index={index} letter={project.title[0]} variant="xray" />
              <ul className="work-spec">
                {project.tech.map((tech) => <li key={tech}>{tech}</li>)}
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

export default function Work() {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: false })

  const handlePointerDown = (event) => {
    if (event.pointerType !== 'mouse') return
    const track = trackRef.current
    dragRef.current = { active: true, startX: event.clientX, startScroll: track.scrollLeft, moved: false }
  }

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return
    const track = trackRef.current
    const drag = dragRef.current
    if (!drag.active) return
    const delta = event.clientX - drag.startX
    if (Math.abs(delta) > 6) drag.moved = true
    track.scrollLeft = drag.startScroll - delta
  }

  const handlePointerUp = (event) => {
    if (event.pointerType !== 'mouse') return
    dragRef.current.active = false
  }

  const handleClick = (event) => {
    if (!dragRef.current.moved) return
    event.preventDefault()
    event.stopPropagation()
    dragRef.current.moved = false
  }

  useGSAP(() => {
    const mm = gsap.matchMedia()

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
          </div>
        </div>

        <ul
          ref={trackRef}
          className="work-track gutter"
          aria-label="Selected work projects"
          onPointerDownCapture={handlePointerDown}
          onPointerMoveCapture={handlePointerMove}
          onPointerUpCapture={handlePointerUp}
          onPointerCancelCapture={handlePointerUp}
          onClickCapture={handleClick}
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}
