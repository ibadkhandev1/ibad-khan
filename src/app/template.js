'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { transitionState } from '@/components/layout/TransitionProvider'

// Re-mounts on route change. During a tile transition the incoming page rises
// as the tiles pop away, so it arrives with the move, not after it.
// Skipped on first load — a transform here would skew ScrollTrigger measurements.
export default function Template({ children }) {
  const ref = useRef(null)

  useGSAP(() => {
    if (transitionState.phase !== 'covered') return
    gsap.from(ref.current, {
      y: 60,
      duration: 0.8,
      delay: 0.25,
      clearProps: 'transform',
      onComplete: () => ScrollTrigger.refresh(),
    })
  }, { scope: ref })

  return <div ref={ref}>{children}</div>
}
