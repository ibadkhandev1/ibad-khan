'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { DESKTOP, MOTION_OK } from '@/lib/motion-tokens'
import ToolIcon from './ToolIcon'

const pad = (value) => String(value).padStart(2, '0')

// An exploded view of the stack. The layers start pressed together like a closed
// stack of blueprint sheets; scrolling pulls them apart into the full diagram.
export default function StackLayers({ layers }) {
  const rootRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    // Desktop: the whole stack is visible at once, so it can open like an
    // exploded drawing.
    mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
      const slabs = gsap.utils.toArray('[data-layer]')
      const first = slabs[0]
      const scrollTrigger = {
        trigger: rootRef.current,
        start: 'top 85%',
        end: 'center 55%',
        scrub: 0.6,
        invalidateOnRefresh: true,
      }

      // Each sheet starts collapsed onto the one above it, slightly smaller,
      // then settles into place as the section scrolls in.
      slabs.forEach((slab, index) => {
        gsap.fromTo(slab, {
          y: () => (first.offsetTop - slab.offsetTop) * 0.92 + index * 10,
          scale: 1 - index * 0.025,
        }, { y: 0, scale: 1, ease: 'none', scrollTrigger })
      })

      gsap.fromTo('[data-layer-link]', { scaleY: 0 }, {
        scaleY: 1,
        ease: 'none',
        stagger: 0.05,
        scrollTrigger,
      })

      gsap.from('[data-layer-detail]', {
        autoAlpha: 0,
        y: 12,
        duration: 0.8,
        stagger: 0.05,
        scrollTrigger: { trigger: rootRef.current, start: 'center 70%', once: true },
      })
    })

    // Small screens: the stack is taller than the viewport, so a collapsed stack
    // would hide titles. Each layer simply rises into place as it arrives.
    mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
      gsap.utils.toArray('[data-layer]').forEach((slab) => {
        gsap.from(slab, {
          y: 48,
          autoAlpha: 0,
          duration: 0.9,
          scrollTrigger: { trigger: slab, start: 'top 92%', once: true },
        })
      })
      gsap.utils.toArray('[data-layer-link]').forEach((link) => {
        gsap.from(link, {
          scaleY: 0,
          duration: 0.6,
          scrollTrigger: { trigger: link, start: 'top 90%', once: true },
        })
      })
    })
  }, { scope: rootRef })

  return (
    <ol ref={rootRef} className="stack-layers">
      {layers.map((layer, index) => (
        <li
          key={layer.name}
          data-layer
          className="stack-layer"
          style={{ zIndex: layers.length - index }}
        >
          <span className="stack-layer-index">{pad(index + 1)}</span>
          <div className="stack-layer-head">
            <h3 className="stack-layer-name">{layer.name}</h3>
            <p className="stack-layer-note" data-layer-detail>{layer.note}</p>
          </div>
          <ul className="stack-tools" aria-label={`${layer.name} tools`}>
            {layer.tools.map((tool) => (
              <li key={tool.name} className="stack-tool" style={{ '--brand': tool.color }}>
                <ToolIcon path={tool.path} glyph={tool.glyph} className="stack-tool-icon" />
                {tool.name}
              </li>
            ))}
          </ul>
          <p className="stack-layer-meta mono-label" data-layer-detail>
            {pad(layer.tools.length)} {layer.tools.length === 1 ? 'tool' : 'tools'}
            {layer.builds > 0 && (
              <span className="block text-accent">
                in {layer.builds} {layer.builds === 1 ? 'build' : 'builds'}
              </span>
            )}
          </p>
          {index < layers.length - 1 && (
            <span className="stack-layer-link" data-layer-link aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>
  )
}
