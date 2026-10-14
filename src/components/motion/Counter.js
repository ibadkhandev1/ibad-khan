'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_OK } from '@/lib/motion-tokens'

const format = (value, decimals, pad) => {
  const fixed = value.toFixed(decimals)
  return pad ? fixed.padStart(pad, '0') : fixed
}

export default function Counter({ value, decimals = 0, pad = 0, suffix = '', className = '' }) {
  const ref = useRef(null)
  const finalText = `${format(value, decimals, pad)}${suffix}`

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const el = ref.current
      const counter = { value: 0 }
      const render = () => {
        el.textContent = `${format(counter.value, decimals, pad)}${suffix}`
      }
      render()
      gsap.to(counter, {
        value,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: render,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
      return () => {
        el.textContent = finalText
      }
    })
  }, { scope: ref })

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">{finalText}</span>
      <span className="sr-only">{finalText}</span>
    </span>
  )
}
