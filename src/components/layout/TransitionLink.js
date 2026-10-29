'use client'

import Link from 'next/link'
import { usePageTransition } from './TransitionProvider'

// Drop-in replacement for next/link that plays the tile transition on
// internal navigation and smooth-scrolls same-page anchors.
export default function TransitionLink({ href, onClick, transitionLabel, children, ...rest }) {
  const { navigate } = usePageTransition()

  const handleClick = (event) => {
    onClick?.(event)
    const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    if (event.defaultPrevented || isModified || event.button !== 0) return
    if (rest.target === '_blank') return
    event.preventDefault()
    const path = typeof href === 'string' ? href : href.pathname
    // Going home always shows the name on the tiles.
    const label = path === '/'
      ? 'Ibad Khan'
      : transitionLabel ?? (typeof children === 'string' ? children : '')
    navigate(path, label)
  }

  // A hash-only href ("#contact") points at the current page; prefetching it
  // would re-request this route (and 404 on the not-found page).
  const isHashOnly = typeof href === 'string' && href.startsWith('#')

  return (
    <Link href={href} onClick={handleClick} prefetch={isHashOnly ? false : undefined} {...rest}>
      {children}
    </Link>
  )
}
