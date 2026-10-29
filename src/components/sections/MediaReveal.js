'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_OK } from '@/lib/motion-tokens'

// A product shot that wipes up into view, with an optional slow parallax.
export default function MediaReveal({
  image,
  sizes,
  className = '',
  parallax = false,
  eager = false,
  caption,
}) {
  const rootRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const frame = rootRef.current.querySelector('[data-media-frame]')
      const img = rootRef.current.querySelector('img')
      // Negative side insets keep the frame's hard shadow out of the wipe.
      gsap.fromTo(frame, { clipPath: 'inset(100% -20px -20px -20px)' }, {
        clipPath: 'inset(0% -20px -20px -20px)',
        clearProps: 'clipPath',
        duration: 0.9,
        ease: 'snap.inout',
        scrollTrigger: { trigger: rootRef.current, start: 'top 88%', once: true },
      })
      gsap.from(img, {
        scale: 1.15,
        duration: 1.2,
        scrollTrigger: { trigger: rootRef.current, start: 'top 88%', once: true },
      })
      if (!parallax) return
      gsap.fromTo(img, { yPercent: 0 }, {
        yPercent: -7,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  }, { scope: rootRef })

  return (
    <figure ref={rootRef} className={className}>
      <div className="media-frame" data-media-frame>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          className="media-img"
        />
      </div>
      {caption && <figcaption className="mono-label mt-3">{caption}</figcaption>}
    </figure>
  )
}
