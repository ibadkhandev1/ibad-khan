import { notFound } from 'next/navigation'
import { BASE_URL } from '@/app/constants'
import { PERSONAL_INFO } from '@/config/personal'
import { PROCESS, SERVICES, getService } from '@/config/services'
import Link from '@/components/layout/TransitionLink'
import SectionLabel from '@/components/layout/SectionLabel'
import SplitReveal from '@/components/motion/SplitReveal'
import BookCallButton from '@/components/booking/BookCallButton'
import ServiceList from '@/components/sections/ServiceList'

export const dynamicParams = false

export function generateStaticParams() {
  return SERVICES.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}

  const url = `${BASE_URL}/services/${slug}`
  const image = { url: `${BASE_URL}/featured-image.jpg`, alt: `${service.name} — Ibad Khan` }
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      siteName: 'Ibad Khan Portfolio',
      locale: 'en_US',
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
      images: [image.url],
    },
  }
}

const pad = (value) => String(value).padStart(2, '0')

const buildJsonLd = (service) => {
  const url = `${BASE_URL}/services/${service.slug}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      serviceType: service.name,
      description: service.metaDescription,
      url,
      areaServed: 'Worldwide',
      provider: {
        '@type': 'Person',
        name: PERSONAL_INFO.name,
        jobTitle: PERSONAL_INFO.jobTitle,
        url: BASE_URL,
        email: PERSONAL_INFO.email,
        address: { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressCountry: 'PK' },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
        { '@type': 'ListItem', position: 3, name: service.name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ]
}

export default async function ServicePage({ params }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const related = service.related.map(getService).filter(Boolean)
  const jsonLd = JSON.stringify(buildJsonLd(service)).replace(/</g, '\\u003c')

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <header className="gutter pb-16 pt-32 sm:pt-40">
        <nav aria-label="Breadcrumb">
          <ol className="mono-label flex flex-wrap gap-2">
            <li><Link href="/" className="link-draw">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/services" className="link-draw">Services</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">{service.name}</li>
          </ol>
        </nav>

        <SplitReveal
          as="h1"
          intro
          className="display mt-10 max-w-[15ch] text-[clamp(3rem,8vw,7.5rem)]"
        >
          {service.h1}
        </SplitReveal>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10">
          <p
            className="lede col-span-12 md:col-span-8"
          >
            {service.lede}
          </p>
          <div className="col-span-12 flex flex-wrap items-end gap-4 md:col-span-4 md:justify-end">
            <BookCallButton className="btn btn--solid">Book a call</BookCallButton>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="btn">Email me</a>
          </div>
        </div>
      </header>

      <div
        className="gutter section rule-top grid grid-cols-12 gap-x-6 gap-y-16"
      >
        <aside className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="mono-label">What’s included</h2>
            <ul className="mt-5 border-t border-hairline-strong">
              {service.includes.map((item, index) => (
                <li key={item} className="flex gap-4 border-b border-hairline-strong py-3.5">
                  <span className="mono-label text-accent">{pad(index + 1)}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="col-span-12 space-y-20 lg:col-span-7 lg:col-start-6">
          {service.sections.map((section) => (
            <section key={section.heading}>
              <SplitReveal className="display text-[clamp(2rem,3.6vw,3.25rem)]">
                {section.heading}
              </SplitReveal>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="mt-6 text-lg leading-relaxed text-ink-muted"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>

      <section
        className="section gutter border-t border-hairline-strong"
        aria-labelledby="process-title"
      >
        <SectionLabel index="→">Process</SectionLabel>
        <SplitReveal id="process-title" className="display mt-4 text-[clamp(2.5rem,6vw,5.5rem)]">
          How a project runs
        </SplitReveal>
        <ol className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, index) => (
            <li key={step.title} className="border-t border-hairline-strong pt-5">
              <span className="stat-value text-accent">{pad(index + 1)}</span>
              <h3 className="mt-4 text-xl font-medium">{step.title}</h3>
              <p className="mt-3 text-ink-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="faq"
        className="section gutter border-t border-hairline-strong"
        aria-labelledby="faq-title"
      >
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <SectionLabel index="?">FAQ</SectionLabel>
            <SplitReveal id="faq-title" className="display mt-4 text-[clamp(2.5rem,5vw,4.5rem)]">
              Questions people ask
            </SplitReveal>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {service.faqs.map(({ q, a }) => (
              <details key={q} className="faq-item">
                <summary>
                  <h3>{q}</h3>
                  <span className="faq-icon" aria-hidden="true" />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section
          className="section gutter border-t border-hairline-strong"
          aria-labelledby="related-title"
        >
          <h2 id="related-title" className="mono-label">Related services</h2>
          <div className="mt-8">
            <ServiceList services={related} numbered={false} />
          </div>
        </section>
      )}
    </article>
  )
}
