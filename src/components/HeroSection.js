'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';

export default function HeroSection() {
  const containerRef = useRef(null);
  const linesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = linesRef.current?.children;
      if (lines) {
        gsap.fromTo(
          lines,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
            delay: 0.3,
          }
        );
      }

      gsap.fromTo(
        '.hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.1, stagger: 0.1, ease: 'power3.out' }
      );


    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-dvh flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 max-w-5xl mx-auto w-full pt-32 pb-16">
        <div className="space-y-6">
          <p className="hero-sub text-xs font-mono text-ink-muted tracking-[0.2em] uppercase opacity-0">
            Frontend Developer
          </p>

          <div ref={linesRef} className="space-y-1">
            <h1 className="font-sans font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-[-0.05em] text-ink opacity-0">
              Crafting digital
            </h1>
            <h1 className="font-sans font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-[-0.05em] text-ink opacity-0">
              experiences
            </h1>
            <h1 className="font-sans font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-[-0.05em] text-ink opacity-0">
              with care
            </h1>
          </div>

          <p className="hero-sub text-base sm:text-lg text-ink-muted max-w-lg leading-relaxed pt-4 tracking-[-0.01em] opacity-0">
            I build modern, performant web applications with React, Next.js, and
            Tailwind CSS. Currently at Nanolix Digital and Techriv.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
            <a
              href="#projects"
              className="hero-cta group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-ink text-black text-sm font-medium transition-all hover:opacity-90 opacity-0"
            >
              See my work
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="hero-cta inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface-1 text-ink text-sm font-medium hover:bg-surface-2 transition-all opacity-0"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.button
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-ink-muted/40 hover:text-accent-blue transition-colors"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          aria-label="Scroll down"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </motion.button>
      </div>
    </section>
  );
}