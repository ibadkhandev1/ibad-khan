// Generated cover art: each project gets its own contour composition, drawn
// once finished (solid) and once as its blueprint (xray). No stock imagery.
const ORIGINS = [
  [90, 120], [320, 380], [200, 90], [60, 420], [340, 140], [140, 300], [280, 460],
]

const RINGS = Array.from({ length: 12 }, (_, index) => 34 + index * 34)

export default function ProjectArt({ index, letter, variant = 'solid' }) {
  const [cx, cy] = ORIGINS[index % ORIGINS.length]
  const isXray = variant === 'xray'
  const stroke = isXray ? 'var(--accent)' : 'var(--ink)'

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g fill="none" stroke={stroke} vectorEffect="non-scaling-stroke">
        {RINGS.map((r, ringIndex) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            strokeOpacity={isXray ? 0.55 : ringIndex === 3 ? 0.5 : 0.1}
            stroke={!isXray && ringIndex === 3 ? 'var(--accent)' : stroke}
            strokeDasharray={isXray && ringIndex % 2 ? '3 5' : undefined}
          />
        ))}
      </g>
      {isXray && (
        <g stroke="var(--accent)" strokeOpacity="0.8">
          <line x1={cx} y1="0" x2={cx} y2="500" />
          <line x1="0" y1={cy} x2="400" y2={cy} />
        </g>
      )}
      <text
        x="200"
        y="430"
        textAnchor="middle"
        className="project-letter"
        fill={isXray ? 'none' : 'var(--ink)'}
        stroke={isXray ? 'var(--accent)' : 'none'}
        strokeWidth={isXray ? 1.2 : 0}
      >
        {letter}
      </text>
      {isXray && (
        <text x="16" y="28" className="project-anno" fill="var(--accent)">
          {`origin(${cx}, ${cy}) · r = 34n`}
        </text>
      )}
    </svg>
  )
}
