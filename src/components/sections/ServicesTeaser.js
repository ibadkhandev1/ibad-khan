import { SERVICES } from '@/config/services'
import Link from '@/components/layout/TransitionLink'
import SectionLabel from '@/components/layout/SectionLabel'
import SplitReveal from '@/components/motion/SplitReveal'
import ServiceList from './ServiceList'

const FEATURED_SERVICES = SERVICES.slice(0, 4)

export default function ServicesTeaser() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="gutter">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="06">Services</SectionLabel>
            <SplitReveal
              id="services-title"
              className="display mt-4 max-w-[12ch] text-[clamp(3rem,8vw,7.5rem)]"
            >
              Ways I can help
            </SplitReveal>
          </div>
        </div>
        <div className="mt-16">
          <ServiceList services={FEATURED_SERVICES} />
          <div className="mt-10 flex justify-center">
            <Link href="/services" transitionLabel="Services" className="btn">
              Show all services
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
