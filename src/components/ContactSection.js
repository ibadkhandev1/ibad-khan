'use client';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/config/personal';
import FadeContent from '@/components/ui/FadeContent';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-lg">
          <FadeContent blur>
            <p className="text-xs font-mono text-ink-muted tracking-[0.2em] uppercase mb-6">
              Contact
            </p>
          </FadeContent>

          <FadeContent delay={0.1} blur>
            <h2 className="font-[500] text-[40px] sm:text-[48px] leading-[1.13] tracking-[-1px] mb-6 text-ink">
              Let&apos;s build something together
            </h2>
          </FadeContent>

          <FadeContent delay={0.2} blur>
            <p className="text-[15px] text-ink-muted leading-relaxed mb-8 tracking-[-0.15px]">
              I&apos;m open to freelance projects, full-time roles, or just a conversation
              about frontend development. No pitches, no pressure.
            </p>
          </FadeContent>

          <FadeContent delay={0.3}>
            <div className="space-y-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="group inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-ink text-black text-sm font-medium transition-all hover:opacity-90"
              >
                Send a message
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </FadeContent>

          <FadeContent delay={0.4}>
            <div className="flex items-center gap-5 mt-10">
              {[
                { href: SOCIAL_LINKS.github, label: 'GitHub' },
                { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
                { href: SOCIAL_LINKS.email, label: 'Email' },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-ink-muted hover:text-ink transition-colors font-mono tracking-wider uppercase font-medium"
                >
                  {label}
                </a>
              ))}
            </div>
          </FadeContent>
        </div>

        <FadeContent delay={0.5}>
          <div className="mt-20 pt-8 border-t border-hairline">
            <p className="text-[12px] text-ink-muted/40 font-mono">
              &copy; {new Date().getFullYear()} Ibad Khan
            </p>
          </div>
        </FadeContent>
      </div>
    </section>
  );
}