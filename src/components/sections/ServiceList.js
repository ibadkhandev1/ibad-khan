import Link from '@/components/layout/TransitionLink'

const pad = (value) => String(value).padStart(2, '0')

// Shared row list for /services, related services and the home page teaser.
// Each row floods with its own palette fill on hover.
export default function ServiceList({ services, numbered = true }) {
  return (
    <ul className="border-t-[3px] border-ink">
      {services.map((service, index) => (
        <li key={service.slug}>
          <Link
            href={`/services/${service.slug}`}
            transitionLabel={service.name}
            className="service-row group"
            data-c={index % 4}
          >
            <span className="service-row-index" aria-hidden={!numbered || undefined}>
              {numbered ? pad(index + 1) : '→'}
            </span>
            <span className="service-row-name">{service.name}</span>
            <span className="hidden max-w-[40ch] text-ink-muted group-hover:text-ink md:block">
              {service.summary}
            </span>
            <span className="service-row-arrow" aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
