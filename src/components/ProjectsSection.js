'use client';
import { motion } from 'motion/react';
import { SOCIAL_LINKS } from '@/config/personal';
import FadeContent from '@/components/ui/FadeContent';
import SpotlightCard from '@/components/ui/SpotlightCard';
import GlareHover from '@/components/ui/GlareHover';
import GradientSpotlightCard from '@/components/ui/GradientSpotlightCard';

const PROJECTS = [
  {
    title: 'AI Fitness Coach',
    description:
      'A full-stack AI fitness platform with personalized plans, habit tracking, coach chat, and progress insights.',
    tech: ['Next.js', 'MongoDB', 'AI SDK'],
    href: `${SOCIAL_LINKS.github}/liquad-assests`,
  },
  {
    title: 'Power AI',
    description:
      'A full-screen AI product landing page with a video background, liquid-glass UI, and animated brand marquee.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    href: `${SOCIAL_LINKS.github}/power-ai`,
  },
  {
    title: 'Securify',
    description:
      'A security-focused web application built with a modern TypeScript frontend and production-ready Next.js patterns.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    href: `${SOCIAL_LINKS.github}/securify`,
  },
  {
    title: 'Landify',
    description: 'A modern landing page with smooth GSAP animations and clean UI patterns.',
    tech: ['React', 'Tailwind', 'GSAP'],
    href: `${SOCIAL_LINKS.github}/Landify`,
  },
  {
    title: 'heroUI',
    description: 'Reusable hero section components with varied animation patterns for Next.js.',
    tech: ['Next.js', 'Tailwind', 'Motion'],
    href: `${SOCIAL_LINKS.github}/heroUI`,
  },
  {
    title: 'Codelace Redesign',
    description: 'Full platform redesign focused on UX, modern aesthetics, and responsiveness.',
    tech: ['React', 'CSS', 'Figma'],
    href: `${SOCIAL_LINKS.github}/Codelace-redesign`,
    gradient: true,
    gradientVariant: 'violet',
  },
  {
    title: 'Weather API App',
    description: 'Real-time weather dashboard using OpenWeatherMap API with dynamic theming.',
    tech: ['JavaScript', 'API', 'CSS'],
    href: `${SOCIAL_LINKS.github}/weatherAPI`,
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 sm:py-32 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto">
        <FadeContent blur>
          <p className="text-xs font-mono text-ink-muted tracking-[0.2em] uppercase mb-12">
            Work
          </p>
        </FadeContent>

        <div className="grid sm:grid-cols-2 gap-4">
          {PROJECTS.map((project, i) => (
            <FadeContent key={project.title} delay={i * 0.1}>
              {project.gradient ? (
                <GradientSpotlightCard variant={project.gradientVariant}>
                  <motion.a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/80 text-sm font-mono font-medium backdrop-blur-sm">
                        {project.title[0]}
                      </div>
                      <svg className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <h3 className="text-[22px] font-bold leading-[1.2] tracking-[-0.8px] mb-2 text-white group-hover:text-white/90 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-1 rounded bg-white/10 text-white/60 border border-white/10 backdrop-blur-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                </GradientSpotlightCard>
              ) : (
                <SpotlightCard className="rounded-xl border border-hairline bg-surface-1 h-full">
                  <GlareHover className="rounded-xl">
                    <motion.a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-6 sm:p-8"
                      whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center text-ink-muted text-sm font-mono font-medium">
                          {project.title[0]}
                        </div>
                        <svg className="w-4 h-4 text-ink-muted group-hover:text-accent-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <h3 className="text-[22px] font-bold leading-[1.2] tracking-[-0.8px] mb-2 text-ink group-hover:text-ink/80 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-ink-muted leading-relaxed mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span key={t} className="text-[10px] font-mono px-2 py-1 rounded bg-surface-2 text-ink-muted/70 border border-hairline">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.a>
                  </GlareHover>
                </SpotlightCard>
              )}
            </FadeContent>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <FadeContent delay={0.4}>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent-blue transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View all on GitHub
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}