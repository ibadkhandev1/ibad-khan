// Single source of truth for motion. Persona: snap, shuffle, wiggle — short
// durations, springy overshoot, tight staggers. Route-level moves are the only
// slower beats, and even they land with a snap.
export const DURATION = {
  xs: 0.2,
  sm: 0.45,
  md: 0.8,
  lg: 1.1,
}

export const EASE = {
  enter: 'snap.out',
  pop: 'back.out(1.7)',
  wiggle: 'elastic.out(1, 0.5)',
  transition: 'snap.inout',
  ui: 'power3.out',
}

export const STAGGER = {
  tight: 0.02,
  base: 0.035,
  loose: 0.05,
}

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
export const FINE_POINTER = '(hover: hover) and (pointer: fine)'
export const DESKTOP = '(min-width: 1024px)'
