'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { FINE_POINTER, MOTION_OK } from '@/lib/motion-tokens'

// Pulls its child toward the pointer. An element marked data-magnetic-inner
// travels further than the shell, so label and background separate slightly.
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(`${FINE_POINTER} and ${MOTION_OK}`, () => {
      const el = ref.current
      const inner = el.querySelector('[data-magnetic-inner]')
      const ease = 'elastic.out(1, 0.45)'
      const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease })
      const ixTo = inner && gsap.quickTo(inner, 'x', { duration: 0.9, ease })
      const iyTo = inner && gsap.quickTo(inner, 'y', { duration: 0.9, ease })
      let rect = null

      const handleEnter = () => {
        rect = el.getBoundingClientRect()
      }
      const handleMove = (event) => {
        if (!rect) return
        const dx = event.clientX - (rect.left + rect.width / 2)
        const dy = event.clientY - (rect.top + rect.height / 2)
        xTo(dx * strength)
        yTo(dy * strength)
        ixTo?.(dx * strength * 0.45)
        iyTo?.(dy * strength * 0.45)
      }
      const handleLeave = () => {
        rect = null
        xTo(0)
        yTo(0)
        ixTo?.(0)
        iyTo?.(0)
      }

      el.addEventListener('pointerenter', handleEnter)
      el.addEventListener('pointermove', handleMove)
      el.addEventListener('pointerleave', handleLeave)
      return () => {
        el.removeEventListener('pointerenter', handleEnter)
        el.removeEventListener('pointermove', handleMove)
        el.removeEventListener('pointerleave', handleLeave)
      }
    })
  }, { scope: ref })

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  )
}
