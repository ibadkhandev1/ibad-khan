'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { markIntroReady } from '@/lib/intro'
import { getLenis } from '@/lib/lenis'
import { EASE, REDUCED_MOTION } from '@/lib/motion-tokens'
import Shape from '@/components/memphis/Shape'

const SESSION_KEY = 'ik-visited'
const PIECES = ['circle', 'triangle', 'square', 'half']
const MAX_WAIT_MS = 4000

const readVisited = () => {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

const writeVisited = () => {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    // Storage can be blocked (private mode); the preloader just runs again.
  }
}

const waitForFonts = async () => {
  try {
    await document.fonts?.ready
  } catch (error) {
    console.error('[Preloader]:', error)
  }
}

const waitForLoad = () => new Promise((resolve) => {
  if (document.readyState === 'complete') {
    resolve()
    return
  }
  window.addEventListener('load', resolve, { once: true })
})

const withTimeout = (promise) => Promise.race([
  promise,
  new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS)),
])

// Counts real progress (fonts + window load). Each quarter pops one primitive
// into place; at 100% the kit is complete and the panel snaps away while the
// hero assembles underneath — one continuous move.
export default function Preloader() {
  const rootRef = useRef(null)
  const countRef = useRef(null)

  useGSAP(() => {
    const root = rootRef.current
    const pieces = root.querySelectorAll('[data-piece]')
    const finish = () => {
      root.style.display = 'none'
      document.documentElement.classList.remove('is-loading')
      getLenis()?.start()
      writeVisited()
    }

    if (window.matchMedia(REDUCED_MOTION).matches) {
      markIntroReady()
      gsap.to(root, { autoAlpha: 0, duration: 0.3, onComplete: finish })
      return
    }

    getLenis()?.stop()
    gsap.set(pieces, { scale: 0, rotation: -120 })
    const isRepeat = readVisited()
    const progress = { value: 0 }
    let shown = 0
    const render = () => {
      countRef.current.textContent = String(Math.round(progress.value)).padStart(3, '0')
      const due = Math.min(pieces.length, Math.floor(progress.value / 25))
      while (shown < due) {
        gsap.to(pieces[shown], { scale: 1, rotation: 0, duration: 0.5, ease: EASE.pop })
        shown += 1
      }
    }

    const tasks = [waitForFonts(), waitForLoad()].map(withTimeout)
    let settled = 0
    const creepTo = (value) => gsap.to(progress, {
      value,
      duration: isRepeat ? 0.3 : 0.7,
      ease: 'power2.out',
      overwrite: true,
      onUpdate: render,
    })
    creepTo(isRepeat ? 60 : 30)
    tasks.forEach((task) => task.then(() => {
      settled += 1
      creepTo(30 + (settled / tasks.length) * 60)
    }))

    const minTime = new Promise((resolve) => setTimeout(resolve, isRepeat ? 350 : 900))
    let exit
    Promise.all([...tasks, minTime]).then(() => {
      exit = gsap.timeline({ onComplete: finish })
        .to(progress, { value: 100, duration: 0.35, ease: 'power2.inOut', onUpdate: render })
        .to(pieces, {
          y: () => gsap.utils.random(-80, -30),
          rotation: () => gsap.utils.random(-200, 200),
          scale: 0,
          duration: 0.45,
          ease: 'back.in(2)',
          stagger: { each: 0.04, from: 'random' },
        }, '+=0.2')
        .to(root.querySelectorAll('[data-fade]'), { autoAlpha: 0, duration: 0.2 }, '<')
        .add(markIntroReady, '-=0.15')
        .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.7, ease: EASE.transition }, '<')
    })

    return () => exit?.kill()
  })

  return (
    <div ref={rootRef} className="preloader" role="status" aria-label="Loading">
      <div className="gutter flex h-full flex-col justify-between py-8">
        <p className="mono-label flex justify-between text-ink" data-fade>
          <span>Ibad Khan — Portfolio</span>
          <span>Unpacking the kit</span>
        </p>
        <div className="preloader-shapes self-center" aria-hidden="true">
          {PIECES.map((type, index) => (
            <span key={type} data-piece data-c={index} className="preloader-shape">
              <Shape type={type} />
            </span>
          ))}
        </div>
        <p className="preloader-count flex justify-between" data-fade>
          <span>&lt;Portfolio loading /&gt;</span>
          <span><span ref={countRef}>000</span>%</span>
        </p>
      </div>
    </div>
  )
}
