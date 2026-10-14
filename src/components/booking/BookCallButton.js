'use client'

import { openCalModal, preloadCal } from '@/lib/cal'

// Opens Cal.com's own popup. Hover or focus preloads the booking page so the
// popup appears without a loading flash.
export default function BookCallButton({ className = 'btn', children = 'Book a call', onClick }) {
  const handleClick = (event) => {
    onClick?.(event)
    try {
      openCalModal()
    } catch (error) {
      console.error('[BookCallButton]: could not open Cal.com', error)
    }
  }

  return (
    <button
      type="button"
      className={className}
      onPointerEnter={preloadCal}
      onFocus={preloadCal}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
