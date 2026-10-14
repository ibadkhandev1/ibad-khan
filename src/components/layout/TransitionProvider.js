'use client'

import { createContext, use, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from '@/lib/gsap'
import { getLenis, scrollToTarget } from '@/lib/lenis'
import { EASE, REDUCED_MOTION } from '@/lib/motion-tokens'

const TransitionContext = createContext({ navigate: () => {} })

export const usePageTransition = () => use(TransitionContext)

// Module-level so the route template can tell a real transition from a first load.
export const transitionState = { phase: 'idle' }

// Entrance animations on the incoming page wait for the curtain to start lifting;
// otherwise they finish unseen behind it. Outside a transition, runs immediately.
const revealListeners = new Set()

export const onPageReveal = (listener) => {
  const isTransitioning = ['covering', 'covered'].includes(transitionState.phase)
  if (!isTransitioning) {
    listener()
    return () => {}
  }
  revealListeners.add(listener)
  return () => revealListeners.delete(listener)
}

const flushReveal = () => {
  revealListeners.forEach((listener) => listener())
  revealListeners.clear()
}

const jumpToHash = (hash) => {
  if (!hash || !document.querySelector(hash)) {
    scrollToTarget(0, { immediate: true, force: true })
    return
  }
  scrollToTarget(hash, { immediate: true, force: true })
}

// Route transitions: OUT (curtain covers) → router.push → IN (curtain lifts
// once the new pathname has committed).
export default function TransitionProvider({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const curtainRef = useRef(null)
  const labelRef = useRef(null)
  const pendingHash = useRef('')

  useEffect(() => {
    if (transitionState.phase !== 'covered') return
    const curtain = curtainRef.current
    const panels = curtain.querySelectorAll('[data-panel]')

    jumpToHash(pendingHash.current)
    transitionState.phase = 'revealing'
    gsap.timeline({
      onComplete: () => {
        gsap.set(curtain, { visibility: 'hidden' })
        transitionState.phase = 'idle'
      },
    })
      .to(labelRef.current, { yPercent: -110, duration: 0.45, ease: 'power2.in' }, 0.15)
      .to([...panels].reverse(), {
        scaleY: 0,
        transformOrigin: '50% 0%',
        duration: 0.9,
        ease: EASE.transition,
        stagger: 0.08,
      }, 0.35)
      .add(flushReveal, 0.5)
  }, [pathname])

  const navigate = (href, label = '') => {
    const url = new URL(href, window.location.href)
    if (url.origin !== window.location.origin) {
      window.location.assign(url.href)
      return
    }
    if (url.pathname === window.location.pathname) {
      scrollToTarget(url.hash && document.querySelector(url.hash) ? url.hash : 0)
      return
    }
    if (transitionState.phase !== 'idle') return

    const target = `${url.pathname}${url.search}${url.hash}`
    if (window.matchMedia(REDUCED_MOTION).matches) {
      router.push(target)
      return
    }

    const curtain = curtainRef.current
    const panels = curtain.querySelectorAll('[data-panel]')
    labelRef.current.textContent = label
    pendingHash.current = url.hash
    transitionState.phase = 'covering'
    getLenis()?.stop()

    gsap.timeline({
      onComplete: () => {
        transitionState.phase = 'covered'
        getLenis()?.start()
        router.push(target, { scroll: !url.hash })
      },
    })
      .set(curtain, { visibility: 'visible' })
      .fromTo(panels, { scaleY: 0, transformOrigin: '50% 100%' }, {
        scaleY: 1,
        duration: 0.75,
        ease: EASE.transition,
        stagger: 0.08,
      })
      .fromTo(labelRef.current, { yPercent: 110 }, { yPercent: 0, duration: 0.5 }, '-=0.35')
  }

  return (
    <TransitionContext value={{ navigate }}>
      {children}
      <div ref={curtainRef} className="curtain" aria-hidden="true">
        <div data-panel className="curtain-panel bg-accent" />
        <div data-panel className="curtain-panel bg-surface-1">
          <span className="curtain-label-mask">
            <span ref={labelRef} className="curtain-label" />
          </span>
        </div>
      </div>
    </TransitionContext>
  )
}
