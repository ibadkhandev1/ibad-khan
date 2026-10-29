// The kit: every decorative mark on the site is one of these primitives.
// Fills use currentColor (set from the active palette); outlines are ink and
// keep the same weight at any size.
const OUTLINE = {
  stroke: 'var(--ink)',
  strokeWidth: 3,
  vectorEffect: 'non-scaling-stroke',
  strokeLinejoin: 'round',
}

const LINE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 10,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const DOTS = Array.from({ length: 16 }, (_, index) => [
  14 + (index % 4) * 24,
  14 + Math.floor(index / 4) * 24,
])

const STRIPES = [8, 26, 44, 62, 80]

const PRIMITIVES = {
  circle: <circle cx="50" cy="50" r="44" fill="currentColor" {...OUTLINE} />,
  ring: (
    <path
      d="M6 50a44 44 0 1 0 88 0a44 44 0 1 0-88 0ZM29 50a21 21 0 1 0 42 0a21 21 0 1 0-42 0Z"
      fill="currentColor"
      fillRule="evenodd"
      {...OUTLINE}
    />
  ),
  triangle: <path d="M50 7 94 88H6Z" fill="currentColor" {...OUTLINE} />,
  half: <path d="M6 72a44 44 0 0 1 88 0Z" fill="currentColor" {...OUTLINE} />,
  square: <rect x="12" y="12" width="76" height="76" fill="currentColor" {...OUTLINE} />,
  pill: <rect x="4" y="31" width="92" height="38" rx="19" fill="currentColor" {...OUTLINE} />,
  plus: (
    <path
      d="M38 6h24v32h32v24H62v32H38V62H6V38h32Z"
      fill="currentColor"
      {...OUTLINE}
    />
  ),
  arc: <path d="M8 92a84 84 0 0 1 84-84v30a54 54 0 0 0-54 54Z" fill="currentColor" {...OUTLINE} />,
  squiggle: <path d="M6 50q11-24 22 0t22 0 22 0 22 0" {...LINE} />,
  zigzag: <path d="M5 66 21 34l16 32 16-32 16 32 16-32 11 22" {...LINE} />,
  dots: (
    <g fill="var(--ink)">
      {DOTS.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />)}
    </g>
  ),
  stripes: (
    <g stroke="var(--ink)" strokeWidth="7" strokeLinecap="round">
      {STRIPES.map((offset) => <path key={offset} d={`M${offset} 92 ${offset + 18} 8`} />)}
    </g>
  ),
}

// Ink-only patterns read as texture, not objects, so they skip the drop shadow.
export const isPattern = (type) => type === 'dots' || type === 'stripes'

export default function Shape({ type, className = '', style, ...rest }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
      overflow="visible"
      {...rest}
    >
      {PRIMITIVES[type]}
    </svg>
  )
}
