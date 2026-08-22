'use client';
import FadeContent from '@/components/ui/FadeContent';

const infoRows = [
  { label: 'Based in', value: 'Hyderabad, Pakistan' },
  { label: 'Experience', value: '2.5+ years' },
  { label: 'Currently at', value: 'Nanolix Digital & Techriv' },
  { label: 'Email', value: 'ibadkhan.dev@gmail.com' },
  { label: 'Phone', value: '+92 340 8575895' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <FadeContent blur>
              <p className="text-xs font-mono text-ink-muted tracking-[0.2em] uppercase mb-6">
                About
              </p>
            </FadeContent>

            <FadeContent delay={0.1} blur>
              <p className="text-[15px] text-ink leading-relaxed mb-5 tracking-[-0.15px]">
                I&apos;m a frontend developer who cares about how things look, how they feel,
                and how fast they load. I turn designs into polished, responsive web
                experiences using React, Next.js, and Tailwind CSS.
              </p>
            </FadeContent>

            <FadeContent delay={0.2} blur>
              <p className="text-[15px] text-ink leading-relaxed mb-5 tracking-[-0.15px]">
                Right now I&apos;m at <span className="font-medium">Nanolix Digital</span> building
                high-performance websites with Next.js and Headless WordPress. Before that,
                I was at <span className="font-medium">Techriv Solutions</span> working on responsive
                pages and email templates.
              </p>
            </FadeContent>

            <FadeContent delay={0.3} blur>
              <p className="text-[15px] text-ink leading-relaxed tracking-[-0.15px]">
                My toolkit: React, Next.js, JavaScript, Tailwind CSS, Bootstrap, WordPress,
                GSAP, and a focus on clean, maintainable code.
              </p>
            </FadeContent>
          </div>

          <div className="border-t lg:border-t-0 lg:border-l border-hairline pl-0 lg:pl-12 pt-8 lg:pt-0 space-y-4">
            <FadeContent blur>
              <p className="text-xs font-mono text-ink-muted tracking-[0.2em] uppercase mb-4">
                Details
              </p>
            </FadeContent>
            {infoRows.map((row, i) => (
              <FadeContent key={row.label} delay={0.1 + i * 0.05}>
                <div className="flex items-baseline gap-4">
                  <span className="text-[13px] font-mono text-ink-muted/50 w-24 shrink-0 uppercase tracking-wider font-medium">
                    {row.label}
                  </span>
                  <span className="text-[14px] text-ink-muted tracking-[-0.14px]">{row.value}</span>
                </div>
              </FadeContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}