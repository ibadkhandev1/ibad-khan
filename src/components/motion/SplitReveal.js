'use client'

import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { onIntroReady } from '@/lib/intro'
import { onPageReveal } from '@/components/layout/TransitionProvider'
import { MOTION_OK } from '@/lib/motion-tokens'

// Masked line (or char) reveal. Real text is server-rendered; the split only
// happens client-side when motion is allowed, so nothing is ever left hidden.
export default function SplitReveal({
  as: Tag = 'h2',
  children,
  className = '',
  type = 'lines',
  intro = false,
  delay = 0,
  stagger,
  start = 'top 85%',
  ...rest
}) {
  const ref = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      let played = false
      let unsubscribe
      let unsubscribeReveal

      const split = SplitText.create(ref.current, {
        type: type === 'chars' ? 'lines,chars' : 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => {
          // Re-splits on resize must not replay an entrance that already ran.
          if (played) return undefined
          const isChars = type === 'chars'
          const vars = {
            yPercent: 115,
            duration: isChars ? 1 : 1.25,
            stagger: stagger ?? (isChars ? 0.025 : 0.09),
            delay,
            onComplete: () => {
              played = true
            },
          }
          const targets = isChars ? self.chars : self.lines

          if (intro) {
            const tween = gsap.from(targets, { ...vars, paused: true })
            unsubscribe = onIntroReady(() => {
              unsubscribeReveal = onPageReveal(() => tween.play())
            })
            return tween
          }
          return gsap.from(targets, {
            ...vars,
            scrollTrigger: { trigger: ref.current, start, once: true },
          })
        },
      })

      return () => {
        unsubscribe?.()
        unsubscribeReveal?.()
        split.revert()
      }
    })
  }, { scope: ref })

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
