'use client'

import { createContext, use, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from '@/lib/gsap'
import { getLenis, scrollToTarget } from '@/lib/lenis'
import { EASE, REDUCED_MOTION } from '@/lib/motion-tokens'
import Shape from '@/components/memphis/Shape'

const TransitionContext = createContext({ navigate: () => {} })

export const usePageTransition = () => use(TransitionContext)

// Module-level so the route template can tell a real transition from a first load.
export const transitionState = { phase: 'idle' }

// Entrance animations on the incoming page wait for the tiles to start clearing;
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

// 24 tiles (6 × 4, or 4 × 6 on phones). Every fourth carries a primitive so the
// cover reads as the kit itself snapping over the page, not a plain wipe.
const TILES = Array.from({ length: 24 }, (_, index) => ({
  color: (index * 3 + Math.floor(index / 6)) % 4,
  shape: index % 4 === 1 ? ['circle', 'triangle', 'plus', 'half'][(index >> 2) % 4] : null,
}))

const jumpToHash = (hash) => {
  if (!hash || !document.querySelector(hash)) {
    scrollToTarget(0, { immediate: true, force: true })
    return
  }
  scrollToTarget(hash, { immediate: true, force: true })
}

// Route transitions: OUT (palette tiles pop over the page) → router.push → IN (tiles pop away
// once the new pathname has committed).
export default function TransitionProvider({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const curtainRef = useRef(null)
  const labelRef = useRef(null)
  const labelWrapRef = useRef(null)
  const pendingHash = useRef('')

  useEffect(() => {
    if (transitionState.phase !== 'covered') return
    const curtain = curtainRef.current
    const tiles = curtain.querySelectorAll('[data-tile]')

    jumpToHash(pendingHash.current)
    transitionState.phase = 'revealing'
    gsap.timeline({
      onComplete: () => {
        gsap.set([curtain, labelWrapRef.current], { visibility: 'hidden' })
        transitionState.phase = 'idle'
      },
    })
      .to(labelRef.current, { scale: 0, rotation: 12, duration: 0.3, ease: 'back.in(2)' }, 0.1)
      .to(tiles, {
        scale: 0,
        rotation: 45,
        duration: 0.45,
        ease: 'back.in(1.6)',
        stagger: { grid: 'auto', from: 'edges', amount: 0.35 },
      }, 0.2)
      .add(flushReveal, 0.4)
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
    const tiles = curtain.querySelectorAll('[data-tile]')
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
      .set([curtain, labelWrapRef.current], { visibility: 'visible' })
      .fromTo(tiles, { scale: 0, rotation: -45 }, {
        scale: 1,
        rotation: 0,
        duration: 0.45,
        ease: EASE.pop,
        stagger: { grid: 'auto', from: 'center', amount: 0.3 },
      })
      .fromTo(labelRef.current, { scale: 0, rotation: -12 }, {
        scale: 1,
        rotation: -3,
        duration: 0.45,
        ease: EASE.pop,
      }, '-=0.25')
  }

  return (
    <TransitionContext value={{ navigate }}>
      {children}
      <div ref={curtainRef} className="curtain" aria-hidden="true">
        {TILES.map((tile, index) => (
          <div key={index} data-tile data-c={tile.color} className="curtain-tile">
            {tile.shape && <Shape type={tile.shape} />}
          </div>
        ))}
      </div>
      <div ref={labelWrapRef} className="curtain-label-wrap" aria-hidden="true">
        <span ref={labelRef} className="curtain-label" />
      </div>
    </TransitionContext>
  )
}
