'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { FINE_POINTER, MOTION_OK } from '@/lib/motion-tokens'

const DEFAULT_LABELS = { view: 'View' }

// Lerped follower with contextual states, read from the nearest [data-cursor].
// Only mounts its behaviour on fine pointers; touch devices keep native input.
export default function Cursor() {
  const rootRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(`${FINE_POINTER} and ${MOTION_OK}`, () => {
      const root = rootRef.current
      const html = document.documentElement
      html.classList.add('has-cursor')

      const dotX = gsap.quickTo(dotRef.current, 'x', { duration: 0.12, ease: 'power3' })
      const dotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.12, ease: 'power3' })
      const ringX = gsap.quickTo(ringRef.current, 'x', { duration: 0.55, ease: 'power3' })
      const ringY = gsap.quickTo(ringRef.current, 'y', { duration: 0.55, ease: 'power3' })
      let isVisible = false

      const handleMove = (event) => {
        if (!isVisible) {
          isVisible = true
          gsap.set([dotRef.current, ringRef.current], { x: event.clientX, y: event.clientY })
          root.dataset.visible = 'true'
        }
        dotX(event.clientX)
        dotY(event.clientY)
        ringX(event.clientX)
        ringY(event.clientY)
      }

      const handleOver = (event) => {
        const target = event.target.closest?.('[data-cursor], a, button')
        const state = target?.dataset.cursor ?? (target ? 'link' : 'default')
        root.dataset.state = state
        labelRef.current.textContent = target?.dataset.cursorLabel ?? DEFAULT_LABELS[state] ?? ''
      }

      const handleLeave = () => {
        isVisible = false
        root.dataset.visible = 'false'
      }

      const handleDown = () => {
        root.dataset.pressed = 'true'
      }
      const handleUp = () => {
        root.dataset.pressed = 'false'
      }

      window.addEventListener('pointermove', handleMove, { passive: true })
      document.addEventListener('pointerover', handleOver)
      document.documentElement.addEventListener('pointerleave', handleLeave)
      window.addEventListener('pointerdown', handleDown)
      window.addEventListener('pointerup', handleUp)

      return () => {
        html.classList.remove('has-cursor')
        window.removeEventListener('pointermove', handleMove)
        document.removeEventListener('pointerover', handleOver)
        document.documentElement.removeEventListener('pointerleave', handleLeave)
        window.removeEventListener('pointerdown', handleDown)
        window.removeEventListener('pointerup', handleUp)
      }
    })
  })

  return (
    <div
      ref={rootRef}
      className="cursor"
      data-state="default"
      data-visible="false"
      aria-hidden="true"
    >
      <div ref={ringRef} className="cursor-ring">
        <div className="cursor-ring-shape" />
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
