'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { getLenis } from '@/lib/lenis'
import { LOCATION } from '@/config/content'
import { RESUME } from '@/config/personal'
import TransitionLink from './TransitionLink'
import Menu from './Menu'

const NAV = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
]

const formatTime = () => new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: LOCATION.timeZone,
}).format(new Date())

export default function Header() {
  const headerRef = useRef(null)
  const clockRef = useRef(null)
  const buttonRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const openMenu = () => {
    getLenis()?.stop()
    setIsOpen(true)
  }

  const closeMenu = ({ restoreFocus = true } = {}) => {
    getLenis()?.start()
    setIsOpen(false)
    if (restoreFocus) buttonRef.current?.focus()
  }

  useEffect(() => {
    const tick = () => {
      if (clockRef.current) clockRef.current.textContent = formatTime()
    }
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined
    const handleKey = (event) => {
      if (event.key !== 'Escape') return
      getLenis()?.start()
      setIsOpen(false)
      buttonRef.current?.focus()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen])

  // Hide on scroll down, return on scroll up.
  useGSAP(() => {
    let isHidden = false
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const shouldHide = self.direction === 1 && self.scroll() > 240
        if (shouldHide === isHidden) return
        isHidden = shouldHide
        gsap.to(headerRef.current, {
          yPercent: shouldHide ? -120 : 0,
          duration: 0.6,
          ease: shouldHide ? 'power2.in' : 'snap.out',
        })
      },
    })
  }, { scope: headerRef })

  return (
    <>
      <header ref={headerRef} className="site-header">
        <div className="gutter flex h-24 items-center justify-between gap-4">
          <TransitionLink
            href="/"
            transitionLabel="Ibad Khan"
            className="header-pill header-logo font-display text-base font-extrabold"
          >
            <span className="logo-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            Ibad Khan
          </TransitionLink>

          <p className="header-pill mono-label hidden text-ink xl:inline-flex">
            {LOCATION.city}, PK · <time ref={clockRef} suppressHydrationWarning>--:--</time>{' '}
            {LOCATION.zoneLabel}
          </p>

          <div className="flex items-center gap-3">
            <nav aria-label="Primary" className="header-pill header-nav hidden px-1.5 lg:inline-flex">
              <ul className="flex gap-0.5 text-sm font-semibold">
                {NAV.map((item) => (
                  <li key={item.label}>
                    <TransitionLink href={item.href}>{item.label}</TransitionLink>
                  </li>
                ))}
                <li>
                  <a href={RESUME.href} download={RESUME.fileName}>Resume ↓</a>
                </li>
              </ul>
            </nav>
            <button
              ref={buttonRef}
              type="button"
              className="menu-toggle"
              aria-expanded={isOpen}
              aria-controls="site-menu"
              onClick={() => (isOpen ? closeMenu() : openMenu())}
            >
              <span className="menu-toggle-labels" data-open={isOpen} aria-hidden="true">
                <span>Menu</span>
                <span>Close</span>
              </span>
              <span className="menu-toggle-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
                  <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="3"
                    strokeLinecap="round" />
                </svg>
              </span>
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>
      </header>
      <Menu isOpen={isOpen} onNavigate={() => closeMenu({ restoreFocus: false })} />
    </>
  )
}
