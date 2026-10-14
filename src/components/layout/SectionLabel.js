export default function SectionLabel({ index, children, className = '' }) {
  return (
    <p className={`mono-label ${className}`}>
      <span className="text-accent">({index})</span> {children}
    </p>
  )
}
