// Brand logos arrive as an SVG path (Simple Icons); tools without an official
// logo use one of these line glyphs, drawn on the same 24×24 grid.
const GLYPHS = {
  wave: 'M2 12c2.5-5 5-5 7.5 0s5 5 7.5 0 3.5-3 5-3',
  scroll: 'M12 3v18M7 16l5 5 5-5M7 8l5-5 5 5',
  api: 'M4 7h16M4 12h11M4 17h7M18 15l3 3-3 3',
}

export default function ToolIcon({ path, glyph, className = '' }) {
  if (path) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
        <path d={path} fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={GLYPHS[glyph] ?? GLYPHS.api} />
    </svg>
  )
}
