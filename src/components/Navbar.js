'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const navItems = [
  { label: 'Work', href: '/#projects' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-6 backdrop-blur-sm bg-canvas/70"
    >
      <Link href="/" className="font-mono text-sm tracking-tight text-ink-muted hover:text-ink transition-colors">
        ibad khan
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-sm text-ink-muted hover:text-ink transition-colors relative group"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent-blue transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>

      <Link
        href="/#contact"
        className="text-sm px-5 py-2.5 rounded-full bg-ink text-black font-medium hover:opacity-90 transition-opacity"
      >
        Reach out
      </Link>
    </nav>
  );
}
