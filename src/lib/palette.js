'use client'

import { useSyncExternalStore } from 'react'
import { DEFAULT_PALETTE, PALETTES, PALETTE_STORAGE_KEY } from '@/config/palettes'

// The active palette lives on <html data-palette>, set before first paint by
// the inline script in layout.js. This store only mirrors and updates it.
const listeners = new Set()

const isKnown = (id) => PALETTES.some((palette) => palette.id === id)

const read = () => {
  const id = document.documentElement.dataset.palette
  return isKnown(id) ? id : DEFAULT_PALETTE
}

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const setPalette = (id) => {
  if (!isKnown(id)) return
  document.documentElement.dataset.palette = id
  try {
    window.localStorage.setItem(PALETTE_STORAGE_KEY, id)
  } catch (error) {
    // Storage can be blocked (private mode); the palette still applies for this visit.
    console.error('[palette]:', error)
  }
  listeners.forEach((listener) => listener())
}

export const usePalette = () => useSyncExternalStore(subscribe, read, () => DEFAULT_PALETTE)
