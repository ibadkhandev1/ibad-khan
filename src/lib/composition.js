// The hero composition is a pure function of its seed, so the server and the
// client render the same layout and Shuffle is just "pick a new seed".

// Each slot keeps its primitive for life; Shuffle moves, turns, rescales and
// recolours it. `size` is in layout units (see .shape in globals.css) and
// `depth` drives pointer parallax. Slots past MOBILE_SLOTS hide on small screens.
export const SLOTS = [
  { type: 'circle', size: 9, depth: 0.9 },
  { type: 'squiggle', size: 14, depth: 0.5 },
  { type: 'triangle', size: 9, depth: 0.7 },
  { type: 'ring', size: 10, depth: 0.4 },
  { type: 'dots', size: 9, depth: 0.25 },
  { type: 'half', size: 11, depth: 0.6 },
  { type: 'zigzag', size: 13, depth: 0.8 },
  { type: 'plus', size: 6, depth: 1 },
  { type: 'pill', size: 10, depth: 0.55 },
  { type: 'stripes', size: 8, depth: 0.3 },
  { type: 'arc', size: 9, depth: 0.65 },
  { type: 'square', size: 6.5, depth: 0.85 },
  { type: 'circle', size: 4.5, depth: 1 },
  { type: 'triangle', size: 5, depth: 0.45 },
  { type: 'squiggle', size: 9, depth: 0.75 },
  { type: 'ring', size: 5, depth: 0.95 },
  { type: 'half', size: 6, depth: 0.35 },
  { type: 'plus', size: 4, depth: 0.6 },
  { type: 'zigzag', size: 8, depth: 0.5 },
  { type: 'circle', size: 6.5, depth: 0.7 },
]

export const MOBILE_SLOTS = 12
export const INITIAL_SEED = 1982

// 6 × 4 cells for 20 slots: every layout spreads across the frame and leaves a
// few holes, which is what keeps it reading as composed rather than noisy.
const COLS = 6
const ROWS = 4

const mulberry32 = (seed) => {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const round = (value) => Math.round(value * 10) / 10

export function compose(seed) {
  const random = mulberry32(seed)
  const range = (min, max) => min + random() * (max - min)

  const cells = Array.from({ length: COLS * ROWS }, (_, index) => index)
  for (let i = cells.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    const swap = cells[i]
    cells[i] = cells[j]
    cells[j] = swap
  }

  return SLOTS.map((slot, index) => {
    const cell = cells[index]
    const col = cell % COLS
    const row = Math.floor(cell / COLS)
    const isPattern = slot.type === 'dots' || slot.type === 'stripes'
    return {
      x: round(((col + range(0.15, 0.85)) / COLS) * 100),
      y: round(((row + range(0.15, 0.85)) / ROWS) * 100),
      rotation: Math.round(isPattern ? range(-15, 15) : range(-40, 40)),
      scale: round(range(0.8, 1.2)),
      color: Math.floor(random() * 4),
    }
  })
}

export const nextSeed = () => 1000 + Math.floor(Math.random() * 9000)
