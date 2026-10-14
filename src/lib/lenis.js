'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'
import { gsap, ScrollTrigger } from './gsap'
import { REDUCED_MOTION } from './motion-tokens'

let instance = null

export const getLenis = () => instance

export const scrollToTarget = (target, options = {}) => {
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, ...options })
    return
  }
  const top = typeof target === 'number'
    ? target
    : (document.querySelector(target)?.getBoundingClientRect().top ?? 0) + window.scrollY
  window.scrollTo({ top, behavior: options.immediate ? 'auto' : 'smooth' })
}

const refreshAfterFonts = async () => {
  try {
    await document.fonts?.ready
    ScrollTrigger.refresh()
  } catch (error) {
    console.error('[SmoothScroll]:', error)
  }
}

// The only smooth-scroll engine on the site. Driven by the GSAP ticker so
// Lenis and ScrollTrigger always agree on the scroll position.
export function SmoothScroll() {
  // The footer and header live in the shared layout, so their triggers outlive
  // route changes. Re-measure whenever the document height changes (new page,
  // late images) so nothing stays hidden at a stale position.
  useEffect(() => {
    let timer
    const observer = new ResizeObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(() => ScrollTrigger.refresh(), 150)
    })
    observer.observe(document.body)
    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    refreshAfterFonts()
    if (window.matchMedia(REDUCED_MOTION).matches) return

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false })
    instance = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      instance = null
    }
  }, [])

  return null
}
