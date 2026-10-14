import Link from '@/components/layout/TransitionLink'

const pad = (value) => String(value).padStart(2, '0')

// Shared row list for /services, related services and the home page teaser.
export default function ServiceList({ services, numbered = true }) {
  return (
    <ul className="border-t border-hairline-strong">
      {services.map((service, index) => (
        <li key={service.slug}>
          <Link
            href={`/services/${service.slug}`}
            transitionLabel={service.name}
            className="service-row group"
          >
            <span className="mono-label text-accent">{numbered ? pad(index + 1) : '→'}</span>
            <span className="service-row-name">{service.name}</span>
            <span className="hidden max-w-[40ch] text-ink-muted md:block">
              {service.summary}
            </span>
            <span className="service-row-arrow" aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
