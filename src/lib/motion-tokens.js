// Single source of truth for motion. Entrances ease out softly, route-level
// transitions use the heavier expo curve, UI feedback stays snappy.
export const DURATION = {
  xs: 0.35,
  sm: 0.7,
  md: 1.1,
  lg: 1.6,
}

export const EASE = {
  enter: 'out.soft',
  transition: 'expo.inout.custom',
  ui: 'power2.out',
}

export const STAGGER = {
  tight: 0.04,
  base: 0.07,
  loose: 0.1,
}

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
export const FINE_POINTER = '(hover: hover) and (pointer: fine)'
export const DESKTOP = '(min-width: 1024px)'
