'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { onIntroReady } from '@/lib/intro'
import { setPalette, usePalette } from '@/lib/palette'
import { compose, INITIAL_SEED, MOBILE_SLOTS, nextSeed, SLOTS } from '@/lib/composition'
import { EASE, FINE_POINTER, MOTION_OK, REDUCED_MOTION } from '@/lib/motion-tokens'
import { LOCATION } from '@/config/content'
import { PALETTES } from '@/config/palettes'
import { RESUME } from '@/config/personal'
import TransitionLink from '@/components/layout/TransitionLink'
import { onPageReveal } from '@/components/layout/TransitionProvider'
import Shape, { isPattern } from '@/components/memphis/Shape'

const NAME_LINES = ['Ibad', 'Khan']
const WDTH = { min: 60, max: 150, initial: 120 }
// The server-rendered layout. Every later layout is applied as a transform
// offset from these anchors, so shapes never animate layout properties.
const ANCHOR = compose(INITIAL_SEED)

const isTyping = (target) => target.closest?.('input, textarea, select, [contenteditable="true"]')

function Die() {
  return (
    <svg viewBox="0 0 24 24" className="die" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor"
        strokeWidth="2" />
      <g fill="currentColor">
        <circle cx="8.5" cy="8.5" r="1.6" />
        <circle cx="15.5" cy="15.5" r="1.6" />
        <circle cx="12" cy="12" r="1.6" />
        <circle cx="15.5" cy="8.5" r="1.6" />
        <circle cx="8.5" cy="15.5" r="1.6" />
      </g>
    </svg>
  )
}

function ShapeField({ fieldRef }) {
  return (
    <div ref={fieldRef} className="shape-field" aria-hidden="true">
      {SLOTS.map((slot, index) => {
        const anchor = ANCHOR[index]
        const classes = [
          'shape',
          isPattern(slot.type) && 'shape--pattern',
          index >= MOBILE_SLOTS && 'shape--extra',
        ].filter(Boolean).join(' ')
        return (
          <span
            key={`${slot.type}-${index}`}
            data-shape
            data-c={anchor.color}
            className={classes}
            style={{ '--x': anchor.x, '--y': anchor.y, '--s': slot.size }}
          >
            <span className="shape-move">
              <Shape
                type={slot.type}
                className="shape-svg"
                style={{ transform: `rotate(${anchor.rotation}deg) scale(${anchor.scale})` }}
              />
            </span>
          </span>
        )
      })}
    </div>
  )
}

// The signature: the hero is a live component. Its props panel re-renders the
// Memphis composition (seed), stretches the name (wdth) and re-skins the whole
// site (palette, via the --c1…--c4 tokens).
export default function Hero() {
  const rootRef = useRef(null)
  const fieldRef = useRef(null)
  const nameRef = useRef(null)
  const layoutRef = useRef(ANCHOR)
  const [seed, setSeed] = useState(INITIAL_SEED)
  const [wdth, setWdth] = useState(WDTH.initial)
  const [announcement, setAnnouncement] = useState('')
  const palette = usePalette()

  const offsetsFor = (layout) => {
    const { offsetWidth: width, offsetHeight: height } = fieldRef.current
    return layout.map((target, index) => {
      const anchor = ANCHOR[index]
      return {
        x: ((target.x - anchor.x) / 100) * width,
        y: ((target.y - anchor.y) / 100) * height,
        rotation: target.rotation - anchor.rotation,
        scale: target.scale / anchor.scale,
      }
    })
  }

  // Shuffle and the wdth tween are created inside the GSAP context (so they are
  // reverted on unmount) and handed to the event handlers through refs.
  const shuffleRef = useRef(null)
  const tweenWdthRef = useRef(null)

  useGSAP((context, contextSafe) => {
    const mm = gsap.matchMedia()
    const shapes = () => gsap.utils.toArray('[data-shape]', fieldRef.current)

    // Shapes are placed as offsets from their anchors in px, so a resize has
    // to re-measure them against the new field size.
    const observer = new ResizeObserver(() => {
      if (layoutRef.current === ANCHOR) return
      const offsets = offsetsFor(layoutRef.current)
      shapes().forEach((el, index) => gsap.set(el.firstElementChild, offsets[index]))
    })
    observer.observe(fieldRef.current)

    mm.add(MOTION_OK, () => {
      const lines = gsap.utils.toArray('.hero-line-inner')
      const pops = gsap.utils.toArray('[data-hero-pop]')
      const rises = gsap.utils.toArray('[data-hero-rise]')
      // The intro copy stays painted (LCP candidate); it only travels.
      gsap.set(lines, { yPercent: 108 })
      gsap.set(shapes(), { scale: 0 })
      gsap.set(pops, { autoAlpha: 0, scale: 0.7, rotation: -6 })
      gsap.set(rises, { y: 60 })

      const intro = gsap.timeline({ paused: true })
        .to(lines, { yPercent: 0, duration: 0.9, ease: EASE.enter, stagger: 0.09 })
        .to(shapes(), {
          scale: 1,
          duration: 0.6,
          ease: EASE.pop,
          stagger: { each: 0.03, from: 'random' },
        }, 0.15)
        .to(rises, { y: 0, duration: 0.8 }, 0.25)
        .to(pops, {
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: EASE.pop,
          stagger: 0.08,
        }, 0.45)

      // First load waits for the preloader; a route change waits for the tiles.
      let unsubscribeReveal
      const unsubscribe = onIntroReady(() => {
        unsubscribeReveal = onPageReveal(() => intro.play())
      })

      const scrollOut = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
        .to(fieldRef.current, { yPercent: -22, ease: 'none' }, 0)
        .to('.hero-line-0', { xPercent: -10, ease: 'none' }, 0)
        .to('.hero-line-1', { xPercent: 10, ease: 'none' }, 0)

      return () => {
        unsubscribe()
        unsubscribeReveal?.()
        intro.kill()
        scrollOut.kill()
      }
    })

    // Pointer parallax: each shape drifts by its own depth, so the pile reads
    // as layered cut paper rather than a flat print.
    mm.add(`${FINE_POINTER} and ${MOTION_OK}`, () => {
      const root = rootRef.current
      const movers = shapes().map((el, index) => ({
        depth: SLOTS[index].depth,
        x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3' }),
      }))
      const handleMove = (event) => {
        const dx = event.clientX / window.innerWidth - 0.5
        const dy = event.clientY / window.innerHeight - 0.5
        movers.forEach(({ depth, x, y }) => {
          x(dx * depth * -36)
          y(dy * depth * -28)
        })
      }
      root.addEventListener('pointermove', handleMove)
      return () => root.removeEventListener('pointermove', handleMove)
    })

    const tweenWdth = contextSafe((value, vars = {}) => {
      gsap.to(nameRef.current, {
        '--wdth': value,
        duration: 0.35,
        ease: EASE.ui,
        overwrite: true,
        ...vars,
      })
    })

    const shuffle = contextSafe(() => {
      const newSeed = nextSeed()
      const layout = compose(newSeed)
      const offsets = offsetsFor(layout)
      const newWdth = gsap.utils.snap(5, gsap.utils.random(WDTH.min + 10, WDTH.max))
      const all = shapes()
      layoutRef.current = layout
      setSeed(newSeed)
      setWdth(newWdth)
      setAnnouncement(`Shuffled. New layout ${newSeed}, width ${newWdth}.`)

      if (window.matchMedia(REDUCED_MOTION).matches) {
        all.forEach((el, index) => {
          el.dataset.c = String(layout[index].color)
          gsap.set(el.firstElementChild, offsets[index])
        })
        gsap.set(nameRef.current, { '--wdth': newWdth })
        return
      }

      // Squash, swap colour while it's small, then snap to the new spot.
      const order = gsap.utils.shuffle(all.map((_, index) => index))
      const tl = gsap.timeline()
      order.forEach((index, position) => {
        const el = all[index]
        const mover = el.firstElementChild
        const at = position * 0.022
        tl.to(mover, {
          scale: Number(gsap.getProperty(mover, 'scale')) * 0.35,
          duration: 0.13,
          ease: 'power2.in',
          overwrite: true,
        }, at)
          .call(() => {
            el.dataset.c = String(layout[index].color)
          }, null, at + 0.13)
          .to(mover, { ...offsets[index], duration: 0.62, ease: EASE.pop }, at + 0.13)
      })
      tweenWdth(newWdth, { duration: 1, ease: EASE.wiggle })
    })

    shuffleRef.current = shuffle
    tweenWdthRef.current = tweenWdth

    const handleKey = (event) => {
      const isShortcut = event.key?.toLowerCase() === 's'
      if (!isShortcut || event.metaKey || event.ctrlKey || event.altKey) return
      if (isTyping(event.target)) return
      // Only while the hero is on screen, so S never yanks focus elsewhere.
      if (rootRef.current.getBoundingClientRect().bottom < 0) return
      event.preventDefault()
      shuffle()
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      observer.disconnect()
      window.removeEventListener('keydown', handleKey)
    }
  }, { scope: rootRef })

  const handleShuffle = () => shuffleRef.current?.()

  const handleWdth = (event) => {
    const value = Number(event.target.value)
    setWdth(value)
    tweenWdthRef.current?.(value)
  }

  return (
    <section
      ref={rootRef}
      id="top"
      className="hero gutter pb-24 pt-24 sm:pt-28 lg:pb-28"
      aria-labelledby="hero-title"
    >
      <ShapeField fieldRef={fieldRef} />

      <div className="hero-top" data-hero-pop>
        <p className="hero-badge mono-label text-ink">
          <span className="status-dot" aria-hidden="true" />
          Open to freelance &amp; full-time
        </p>
        <p className="hero-badge mono-label hidden text-ink sm:inline-flex">
          Frontend developer — {LOCATION.city}, {LOCATION.country}
        </p>
      </div>

      <h1 id="hero-title" ref={nameRef} className="hero-name">
        <span className="sr-only">Ibad Khan, frontend developer</span>
        {NAME_LINES.map((line, index) => (
          <span key={line} className={`hero-line hero-line-${index}`} aria-hidden="true">
            <span className="hero-line-inner">{line}</span>
          </span>
        ))}
      </h1>

      <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
        <div className="col-span-12 md:col-span-6 lg:col-span-5" data-hero-rise>
          <div className="hero-intro-wrap inline-block">
            <p className="hero-intro">
              I build interfaces out of small, moving parts — React, Next.js and motion,
              shipped to production.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <TransitionLink href="/#work" className="btn btn--solid">
              See the work
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M12 4v16M5 13l7 7 7-7" fill="none" stroke="currentColor"
                  strokeWidth="2.5" />
              </svg>
            </TransitionLink>
            <a href={RESUME.href} download={RESUME.fileName} className="btn">
              Resume
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div
          className="col-span-12 md:col-span-6 md:justify-self-end lg:col-span-4 lg:col-start-9"
          data-hero-pop
        >
          <form className="props" aria-labelledby="props-title" onSubmit={(e) => e.preventDefault()}>
            <p className="props-head">
              <span id="props-title">
                <span className="sr-only">Play with the hero’s props: </span>
                &lt;Hero /&gt; props
              </span>
              <span className="props-head-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </p>
            <div className="props-body">
              <fieldset className="props-row">
                <legend className="sr-only">Palette for the whole site</legend>
                <span className="props-key" aria-hidden="true">palette</span>
                <span className="swatches">
                  {PALETTES.map((option) => (
                    <label
                      key={option.id}
                      className="swatch"
                      title={`${option.label} — ${option.note}`}
                      data-cursor="link"
                    >
                      <input
                        type="radio"
                        name="palette"
                        value={option.id}
                        checked={palette === option.id}
                        onChange={() => setPalette(option.id)}
                        aria-label={`${option.label} (${option.note})`}
                      />
                      {option.colors.map((color) => (
                        <span key={color} style={{ background: color }} />
                      ))}
                    </label>
                  ))}
                </span>
              </fieldset>

              <div className="props-row">
                <label htmlFor="prop-wdth" className="props-key">wdth</label>
                <span className="range">
                  <input
                    id="prop-wdth"
                    type="range"
                    min={WDTH.min}
                    max={WDTH.max}
                    value={wdth}
                    onChange={handleWdth}
                    aria-describedby="prop-wdth-hint"
                  />
                  <output htmlFor="prop-wdth">{wdth}</output>
                </span>
                <span id="prop-wdth-hint" className="sr-only">
                  Stretches the width of the name, from condensed to extra wide.
                </span>
              </div>

              <div className="props-row">
                <span className="props-key" aria-hidden="true">seed</span>
                <span className="flex items-center justify-between gap-2">
                  <span className="tabular-nums" aria-hidden="true">{seed}</span>
                  <button
                    type="button"
                    className="btn btn--small"
                    onClick={handleShuffle}
                    aria-keyshortcuts="S"
                  >
                    <Die />
                    Shuffle
                    <span className="kbd" aria-hidden="true">S</span>
                  </button>
                </span>
              </div>
            </div>
            <code className="props-code" aria-hidden="true">
              {'<Hero palette='}
              <b>{`"${palette}"`}</b>
              {' wdth='}
              <b>{`{${wdth}}`}</b>
              {' seed='}
              <b key={seed} className="props-flash">{`{${seed}}`}</b>
              {' />'}
            </code>
            <p className="sr-only" aria-live="polite">{announcement}</p>
          </form>
        </div>
      </div>
    </section>
  )
}
