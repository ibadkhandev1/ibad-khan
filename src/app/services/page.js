import Link from 'next/link';
import Navbar from '@/components/Navbar';
import FadeContent from '@/components/ui/FadeContent';

export const metadata = {
  title: 'Services - Ibad Khan | Frontend Development Services',
  description:
    'Professional frontend development services including React, Next.js, responsive design, performance optimization, and custom web solutions.',
  keywords: ['frontend services', 'react development', 'next.js', 'web design', 'custom development'],
};

const SERVICES = [
  {
    title: 'React Development',
    description: 'Build interactive, dynamic user interfaces with React. From component design to state management, I create scalable React applications.',
    features: ['Custom Components', 'State Management', 'Performance Optimization', 'Testing'],
  },
  {
    title: 'Next.js Applications',
    description: 'Full-stack applications with server-side rendering, static generation, and API routes. Perfect for SEO and performance.',
    features: ['App Router', 'Server Components', 'API Routes', 'Deployment'],
  },
  {
    title: 'Responsive Design',
    description: 'Beautiful, mobile-first designs that work perfectly on all devices. Pixel-perfect implementations using Tailwind CSS.',
    features: ['Mobile-First', 'Tailwind CSS', 'Cross-Browser', 'Accessibility'],
  },
  {
    title: 'Web Performance',
    description: 'Optimize your website for speed and Core Web Vitals. Reduce load times and improve user experience significantly.',
    features: ['Bundle Analysis', 'Code Splitting', 'Image Optimization', 'Monitoring'],
  },
  {
    title: 'Animations & Interactions',
    description: 'Smooth, professional animations using GSAP and Motion. Create engaging experiences that delight users.',
    features: ['GSAP', 'Motion Library', 'Scroll Effects', 'Transitions'],
  },
  {
    title: 'WordPress Integration',
    description: 'Headless WordPress with React/Next.js frontends. Modern CMS with flexible, performant interfaces.',
    features: ['Headless CMS', 'REST API', 'Custom Blocks', 'SEO Optimization'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      {/* Hero */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 pt-32">
        <div className="max-w-5xl mx-auto">
          <FadeContent blur>
            <h1 className="font-[500] text-[48px] sm:text-[56px] leading-[1.1] tracking-[-2px] mb-6 text-ink">
              Services
            </h1>
          </FadeContent>

          <FadeContent delay={0.1} blur>
            <p className="text-[16px] text-ink-muted leading-relaxed max-w-2xl tracking-[-0.15px]">
              Comprehensive frontend development services to bring your digital vision to life. Whether you need a complete redesign, performance optimization, or custom feature development.
            </p>
          </FadeContent>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 border-t border-hairline">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-8">
            {SERVICES.map((service, index) => (
              <FadeContent key={service.title} delay={index * 0.1}>
                <div className="p-8 rounded-xl border border-hairline bg-surface-1 hover:bg-surface-2 transition-colors">
                  <h2 className="text-[22px] font-bold leading-[1.2] tracking-[-0.8px] mb-3 text-ink">
                    {service.title}
                  </h2>

                  <p className="text-[15px] text-ink-muted leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-surface-2 text-ink-muted border border-hairline"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeContent>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 border-t border-hairline">
        <div className="max-w-5xl mx-auto">
          <FadeContent blur>
            <h2 className="font-[500] text-[32px] sm:text-[40px] leading-[1.2] tracking-[-1px] mb-12 text-ink">
              Technology Stack
            </h2>
          </FadeContent>

          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <FadeContent delay={0.1}>
                <h3 className="font-bold text-ink mb-4">Frontend</h3>
                <ul className="space-y-2 text-ink-muted text-sm">
                  <li>• React & React Hooks</li>
                  <li>• Next.js (App Router)</li>
                  <li>• JavaScript/ES6+</li>
                  <li>• TypeScript</li>
                </ul>
              </FadeContent>
            </div>

            <div>
              <FadeContent delay={0.2}>
                <h3 className="font-bold text-ink mb-4">Styling & Design</h3>
                <ul className="space-y-2 text-ink-muted text-sm">
                  <li>• Tailwind CSS</li>
                  <li>• Bootstrap</li>
                  <li>• CSS-in-JS Solutions</li>
                  <li>• Responsive Design</li>
                </ul>
              </FadeContent>
            </div>

            <div>
              <FadeContent delay={0.3}>
                <h3 className="font-bold text-ink mb-4">Tools & Libraries</h3>
                <ul className="space-y-2 text-ink-muted text-sm">
                  <li>• GSAP Animations</li>
                  <li>• Motion Library</li>
                  <li>• Git & GitHub</li>
                  <li>• Web Performance Tools</li>
                </ul>
              </FadeContent>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 border-t border-hairline bg-surface-1">
        <div className="max-w-3xl mx-auto text-center">
          <FadeContent blur>
            <h2 className="text-[28px] sm:text-[32px] font-bold leading-[1.2] tracking-[-0.8px] mb-6 text-ink">
              Ready to start your project?
            </h2>
          </FadeContent>

          <FadeContent delay={0.1} blur>
            <p className="text-[15px] text-ink-muted leading-relaxed mb-8">
              Let's discuss your project requirements and how I can help bring your vision to life.
            </p>
          </FadeContent>

          <FadeContent delay={0.2}>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-black text-sm font-medium hover:opacity-90 transition-all"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </FadeContent>
        </div>
      </section>
    </>
  );
}
