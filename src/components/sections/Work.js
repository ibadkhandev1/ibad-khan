'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { MOTION_OK } from '@/lib/motion-tokens'
import { PROJECTS } from '@/config/content'
import SectionLabel from '@/components/layout/SectionLabel'
import TransitionLink from '@/components/layout/TransitionLink'
import SplitReveal from '@/components/motion/SplitReveal'

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
  const autoScrollRef = useRef({ frame: null, direction: 1, position: 0 })

  const stopAutoScroll = () => {
    if (autoScrollRef.current.frame !== null) {
      cancelAnimationFrame(autoScrollRef.current.frame)
    }
    autoScrollRef.current.frame = null
  }

  const startAutoScroll = (direction, event) => {
    if (event?.pointerType === 'touch') return
    if (!window.matchMedia(MOTION_OK).matches) return
    stopAutoScroll()
    autoScrollRef.current.direction = direction
    autoScrollRef.current.position = trackRef.current?.scrollLeft ?? 0
    const tick = () => {
      const track = trackRef.current
      if (!track) return
      const maxScroll = track.scrollWidth - track.clientWidth
      if (maxScroll <= 0) {
        stopAutoScroll()
        return
      }
      const nextScroll = autoScrollRef.current.position + autoScrollRef.current.direction * 2.2
      autoScrollRef.current.position = nextScroll
      if (nextScroll <= 0 || nextScroll >= maxScroll) {
        track.scrollLeft = Math.max(0, Math.min(maxScroll, nextScroll))
        stopAutoScroll()
        return
      }
      track.scrollLeft = nextScroll
      autoScrollRef.current.frame = requestAnimationFrame(tick)
    }
    autoScrollRef.current.frame = requestAnimationFrame(tick)
  }

  const nudgeScroll = (direction) => {
    stopAutoScroll()
    trackRef.current?.scrollBy({ left: direction * 240, behavior: 'smooth' })
  }

  useEffect(() => () => stopAutoScroll(), [])

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
            <p className="mono-label flex items-center justify-between">
              <span>{pad(PROJECTS.length)} builds</span>
              <span className="work-scroll-controls hidden lg:inline-flex" aria-label="Move selected work">
                <button
                  type="button"
                  aria-label="Scroll projects left"
                  onPointerEnter={(event) => startAutoScroll(-1, event)}
                  onPointerLeave={stopAutoScroll}
                  onMouseEnter={() => startAutoScroll(-1)}
                  onMouseLeave={stopAutoScroll}
                  onFocus={() => startAutoScroll(-1)}
                  onBlur={stopAutoScroll}
                  onClick={() => nudgeScroll(-1)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 12H5m6-6-6 6 6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Scroll projects right"
                  onPointerEnter={(event) => startAutoScroll(1, event)}
                  onPointerLeave={stopAutoScroll}
                  onMouseEnter={() => startAutoScroll(1)}
                  onMouseLeave={stopAutoScroll}
                  onFocus={() => startAutoScroll(1)}
                  onBlur={stopAutoScroll}
                  onClick={() => nudgeScroll(1)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </button>
              </span>
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
