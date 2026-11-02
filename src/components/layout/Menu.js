'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { EASE, REDUCED_MOTION } from '@/lib/motion-tokens'
import { MENU_LINKS } from '@/config/content'
import { PERSONAL_INFO, RESUME, SOCIAL_LINKS } from '@/config/personal'
import TransitionLink from './TransitionLink'

export default function Menu({ isOpen, onNavigate }) {
  const rootRef = useRef(null)
  const hasOpened = useRef(false)
  const [active, setActive] = useState(0)

  useGSAP(() => {
    const root = rootRef.current
    const links = root.querySelectorAll('[data-menu-link]')
    const fades = root.querySelectorAll('[data-menu-fade]')
    const isReduced = window.matchMedia(REDUCED_MOTION).matches

    if (isOpen) {
      hasOpened.current = true
      const tl = gsap.timeline()
      tl.set(root, { visibility: 'visible' })
        .fromTo(root, { clipPath: 'inset(0% 0% 100% 0%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: isReduced ? 0 : 0.9,
          ease: EASE.transition,
        })
        .fromTo(links, { yPercent: isReduced ? 0 : 110 }, {
          yPercent: 0,
          duration: isReduced ? 0 : 1,
          stagger: 0.05,
          onStart: () => links[0]?.focus({ preventScroll: true }),
        }, isReduced ? 0 : '-=0.45')
        .fromTo(fades, { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.08 }, '<0.2')
      return
    }

    if (!hasOpened.current) return
    gsap.timeline({ onComplete: () => gsap.set(root, { visibility: 'hidden' }) })
      .to(links, {
        yPercent: -110,
        duration: isReduced ? 0 : 0.45,
        stagger: 0.03,
        ease: 'power2.in',
      })
      .to(root, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: isReduced ? 0 : 0.8,
        ease: EASE.transition,
      }, isReduced ? 0 : '-=0.25')
  }, { dependencies: [isOpen], scope: rootRef })

  const activeLink = MENU_LINKS[active]

  return (
    <div
      ref={rootRef}
      id="site-menu"
      className="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!isOpen}
    >
      <div className="gutter grid h-full grid-cols-12 gap-x-6 pb-10 pt-28">
        <nav aria-label="Menu" className="col-span-12 lg:col-span-8">
          <ul className="flex flex-col">
            {MENU_LINKS.map((link, index) => (
              <li key={link.label} className="overflow-hidden">
                <TransitionLink
                  href={link.href}
                  data-menu-link
                  data-cursor="link"
                  className="menu-link"
                  data-active={active === index}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={onNavigate}
                  transitionLabel={link.href === '/' ? 'Ibad Khan' : link.label}
                >
                  <span className="menu-link-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="menu-link-text">{link.label}</span>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        <aside
          className="col-span-4 hidden flex-col justify-between lg:flex"
          aria-hidden="true"
          data-menu-fade
        >
          <span className="font-display text-[clamp(8rem,16vw,15rem)] leading-[0.8] text-outline">
            {String(active + 1).padStart(2, '0')}
          </span>
          <p key={activeLink.label} className="menu-note max-w-[26ch] text-xl text-ink-muted">
            {activeLink.note}
          </p>
        </aside>

        <div
          className="col-span-12 mt-auto flex flex-wrap items-end justify-between gap-6"
          data-menu-fade
        >
          <a href={`mailto:${PERSONAL_INFO.email}`} className="link-draw text-lg">
            {PERSONAL_INFO.email}
          </a>
          <ul className="mono-label flex gap-6">
            <li>
              <a href={RESUME.href} download={RESUME.fileName} className="link-draw">
                Resume ↓
              </a>
            </li>
            <li>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="me noopener"
                className="link-draw">GitHub</a>
            </li>
            <li>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="me noopener"
                className="link-draw">LinkedIn</a>
            </li>
            <li>
              <a href={SOCIAL_LINKS.upwork} target="_blank" rel="me noopener"
                className="link-draw">Upwork</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
