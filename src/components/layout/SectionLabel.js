// Section labels read like a component in a kit: a numbered chip plus a name.
// `tone` picks the chip's palette fill (0–3).
export default function SectionLabel({ index, children, className = '', tone = 3 }) {
  return (
    <p className={`mono-label flex items-center text-ink ${className}`}>
      <span className="label-chip" data-c={tone}>{index}</span>
      {children}
    </p>
  )
}
