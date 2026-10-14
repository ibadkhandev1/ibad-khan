'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { markIntroReady } from '@/lib/intro'
import { getLenis } from '@/lib/lenis'
import { EASE, REDUCED_MOTION } from '@/lib/motion-tokens'

const SESSION_KEY = 'ik-visited'
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

// Counts real progress (fonts + window load), then lifts away while the hero
// starts rising underneath it — one continuous move.
export default function Preloader() {
  const rootRef = useRef(null)
  const countRef = useRef(null)
  const barRef = useRef(null)

  useGSAP(() => {
    const root = rootRef.current
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
    const isRepeat = readVisited()
    const progress = { value: 0 }
    const render = () => {
      countRef.current.textContent = String(Math.round(progress.value)).padStart(3, '0')
      gsap.set(barRef.current, { scaleX: progress.value / 100 })
    }

    const tasks = [waitForFonts(), waitForLoad()].map(withTimeout)
    let settled = 0
    const creepTo = (value) => gsap.to(progress, {
      value,
      duration: isRepeat ? 0.4 : 0.9,
      ease: 'power2.out',
      overwrite: true,
      onUpdate: render,
    })
    creepTo(isRepeat ? 60 : 24)
    tasks.forEach((task) => task.then(() => {
      settled += 1
      creepTo(24 + (settled / tasks.length) * 66)
    }))

    const minTime = new Promise((resolve) => setTimeout(resolve, isRepeat ? 400 : 1000))
    let exit
    Promise.all([...tasks, minTime]).then(() => {
      exit = gsap.timeline({ onComplete: finish })
        .to(progress, { value: 100, duration: 0.5, ease: 'power2.inOut', onUpdate: render })
        .to(countRef.current, { yPercent: -105, duration: 0.6, ease: 'power3.in' }, '+=0.05')
        .to(root.querySelectorAll('[data-fade]'), { opacity: 0, duration: 0.3 }, '<')
        .add(markIntroReady, '-=0.1')
        .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: EASE.transition }, '<')
    })

    return () => exit?.kill()
  })

  return (
    <div ref={rootRef} className="preloader" role="status" aria-label="Loading">
      <div className="gutter flex h-full flex-col justify-between py-8">
        <p className="mono-label flex justify-between" data-fade>
          <span>Ibad Khan — Portfolio</span>
          <span>Compiling interface</span>
        </p>
        <div>
          <div className="overflow-hidden">
            <span ref={countRef} className="preloader-count" aria-hidden="true">000</span>
          </div>
          <div className="preloader-track" data-fade>
            <div ref={barRef} className="preloader-bar" />
          </div>
        </div>
      </div>
    </div>
  )
}
