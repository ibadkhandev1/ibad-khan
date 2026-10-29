import { SERVICES } from '@/config/services'
import Link from '@/components/layout/TransitionLink'
import SectionLabel from '@/components/layout/SectionLabel'
import SplitReveal from '@/components/motion/SplitReveal'
import ServiceList from './ServiceList'

export default function ServicesTeaser() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="gutter">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="06" tone={1}>Services</SectionLabel>
            <SplitReveal
              id="services-title"
              className="display mt-4 max-w-[12ch] text-[clamp(3rem,8vw,7.5rem)]"
            >
              Ways I can help
            </SplitReveal>
          </div>
          <Link href="/services" transitionLabel="Services" className="btn">
            All services
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mt-16">
          <ServiceList services={SERVICES} />
        </div>
      </div>
    </section>
  )
}
