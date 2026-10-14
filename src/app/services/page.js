import { BASE_URL } from '@/app/constants'
import { PROCESS, SERVICES } from '@/config/services'
import SectionLabel from '@/components/layout/SectionLabel'
import SplitReveal from '@/components/motion/SplitReveal'
import ServiceList from '@/components/sections/ServiceList'
import BookCallButton from '@/components/booking/BookCallButton'

const TITLE = 'Frontend Development Services | Ibad Khan'
const DESCRIPTION =
  'React and Next.js development, responsive web design, website speed optimisation, GSAP '
  + 'animation, headless WordPress and HTML email templates. Freelance, based in Pakistan.'

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['frontend development services', 'freelance frontend developer',
    'react developer', 'next.js developer', 'headless wordpress', 'website speed optimization'],
  alternates: { canonical: `${BASE_URL}/services` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${BASE_URL}/services`,
    siteName: 'Ibad Khan Portfolio',
    type: 'website',
    images: [{ url: `${BASE_URL}/featured-image.jpg`, alt: 'Ibad Khan — services' }],
  },
}

const pad = (value) => String(value).padStart(2, '0')

export default function ServicesPage() {
  return (
    <>
      <header className="gutter pb-16 pt-32 sm:pt-40">
        <SectionLabel index={pad(SERVICES.length)}>Services</SectionLabel>
        <SplitReveal
          as="h1"
          intro
          className="display mt-8 max-w-[14ch] text-[clamp(3rem,9vw,8.5rem)]"
        >
          What I can build for you
        </SplitReveal>
        <p className="lede mt-10">
          I’m a frontend developer, so everything here is about the part of a website people
          actually see and use. Pick the one closest to what you need. If you’re not sure,
          just write to me and describe the problem.
        </p>
        <div className="mt-10">
          <BookCallButton className="btn btn--solid">Book a call</BookCallButton>
        </div>
      </header>

      <section className="gutter pb-24" aria-label="All services">
        <ServiceList services={SERVICES} />
      </section>

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
    </>
  )
}
