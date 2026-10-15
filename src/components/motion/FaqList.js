'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { EASE, MOTION_OK, REDUCED_MOTION } from '@/lib/motion-tokens'

// Animated accordion on top of native <details>, so keyboard, screen-reader
// and no-JS behaviour stay exactly as the browser provides them.
export default function FaqList({ items }) {
  const rootRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.from('[data-faq-item]', {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.08,
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%', once: true },
      })
    })
  }, { scope: rootRef })

  const handleToggle = (event) => {
    const details = event.currentTarget.parentElement
    if (window.matchMedia(REDUCED_MOTION).matches) {
      details.dataset.state = details.open ? 'closed' : 'open'
      return
    }

    event.preventDefault()
    const answer = details.querySelector('[data-faq-answer]')
    const text = answer.firstElementChild
    const isOpening = details.dataset.state !== 'open'
    details.dataset.state = isOpening ? 'open' : 'closed'
    gsap.killTweensOf([answer, text])

    if (isOpening) {
      details.open = true
      gsap.fromTo(answer, { height: 0 }, {
        height: 'auto',
        duration: 0.6,
        ease: EASE.enter,
        clearProps: 'height',
      })
      gsap.fromTo(text, { y: -10, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        delay: 0.1,
        clearProps: 'all',
      })
      return
    }

    gsap.to(text, { autoAlpha: 0, y: -6, duration: 0.25, ease: 'power2.in' })
    gsap.to(answer, {
      height: 0,
      duration: 0.45,
      ease: 'power3.inOut',
      onComplete: () => {
        details.open = false
        gsap.set([answer, text], { clearProps: 'all' })
      },
    })
  }

  return (
    <div ref={rootRef}>
      {items.map(({ q, a }) => (
        <details key={q} className="faq-item" data-faq-item data-state="closed">
          <summary onClick={handleToggle}>
            <h3>{q}</h3>
            <span className="faq-icon" aria-hidden="true" />
          </summary>
          <div className="faq-answer" data-faq-answer>
            <p>{a}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
