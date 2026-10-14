import { SOCIAL_LINKS } from '@/config/personal'

export const LOCATION = {
  city: 'Hyderabad',
  country: 'Pakistan',
  timeZone: 'Asia/Karachi',
  zoneLabel: 'PKT',
}

// wa.me needs the number in international format without "+" or spaces.
export const WHATSAPP = { display: '+92 340 8575895', href: 'https://wa.me/923408575895' }

export const STATS = [
  { value: 2.5, decimals: 1, suffix: '+', label: 'Years shipping production UI' },
  { value: 2, pad: 2, label: 'Studios shipped with' },
  { value: 7, pad: 2, label: 'Selected builds below' },
]

export const PROJECTS = [
  {
    title: 'AI Fitness Coach',
    description:
      'Full-stack AI fitness platform — personalised plans, habit tracking, coach chat '
      + 'and progress insights.',
    tech: ['Next.js', 'MongoDB', 'AI SDK'],
    repo: 'liquad-assests',
  },
  {
    title: 'Power AI',
    description:
      'Full-screen AI product landing page with a video background, liquid-glass UI and '
      + 'an animated brand marquee.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    repo: 'power-ai',
  },
  {
    title: 'Securify',
    description:
      'Security-focused web app on a modern TypeScript frontend and production-ready '
      + 'Next.js patterns.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    repo: 'securify',
  },
  {
    title: 'Landify',
    description: 'Landing page built around smooth GSAP choreography and clean UI patterns.',
    tech: ['React', 'Tailwind', 'GSAP'],
    repo: 'Landify',
  },
  {
    title: 'heroUI',
    description: 'A kit of reusable hero sections, each with its own animation pattern.',
    tech: ['Next.js', 'Tailwind', 'Motion'],
    repo: 'heroUI',
  },
  {
    title: 'Codelace',
    description: 'Full platform redesign focused on UX, modern aesthetics and responsiveness.',
    tech: ['React', 'CSS', 'Figma'],
    repo: 'Codelace-redesign',
  },
  {
    title: 'Weather API',
    description: 'Real-time weather dashboard on the OpenWeatherMap API with dynamic theming.',
    tech: ['JavaScript', 'REST API', 'CSS'],
    repo: 'weatherAPI',
  },
].map((project) => ({ ...project, href: `${SOCIAL_LINKS.github}/${project.repo}` }))

export const EXPERIENCES = [
  {
    company: 'Nanolix Digital',
    role: 'Frontend Developer',
    type: 'Part-time · Remote',
    period: 'May 2025 — Present',
    points: [
      'High-performance, SEO-first sites on the Next.js App Router and Headless WordPress',
      'Modular React component architecture that scales across client builds',
      'Lighthouse gains through image optimisation and lazy loading',
    ],
    skills: ['Next.js', 'React', 'WordPress REST API', 'Tailwind CSS', 'Swiper', 'React Hook Form'],
  },
  {
    company: 'Techriv Solutions',
    role: 'Frontend Developer',
    type: 'Full-time · On-site',
    period: 'May 2024 — Mar 2025',
    points: [
      'Responsive pages built on modern UI/UX principles',
      'Mobile-first email templates, tested across clients',
      'Richer interactions with HTML, CSS and JavaScript',
    ],
    skills: ['JavaScript', 'Bootstrap', 'HTML/CSS', 'jQuery', 'Email templates'],
  },
]

export const STACK_GROUPS = [
  {
    title: 'Build',
    items: ['React', 'Next.js', 'JavaScript (ES6+)', 'HTML / CSS', 'Tailwind CSS', 'Bootstrap'],
  },
  { title: 'Motion', items: ['GSAP', 'Motion', 'Lenis', 'WebGL (OGL)'] },
  { title: 'Content', items: ['Headless WordPress', 'WordPress REST API', 'REST APIs', 'jQuery'] },
  { title: 'Craft', items: ['Responsive design', 'Web performance', 'Figma', 'Git / GitHub'] },
]

export const MARQUEE_PRIMARY = ['React', 'Next.js', 'JavaScript', 'Tailwind CSS', 'WordPress']
export const MARQUEE_SECONDARY = ['GSAP', 'Motion', 'Lenis', 'WebGL', 'Performance', 'Figma']

export const MENU_LINKS = [
  { label: 'Index', href: '/', note: 'Back to the top — the X-ray hero.' },
  { label: 'Work', href: '/#work', note: 'Seven selected builds, scroll sideways.' },
  { label: 'Experience', href: '/#experience', note: 'Nanolix Digital and Techriv Solutions.' },
  { label: 'Services', href: '/services', note: 'What I can build for you.' },
  { label: 'Blog', href: '/blog', note: 'Notes on React, Next.js and performance.' },
  { label: 'Contact', href: '#contact', note: 'Freelance, full-time, or a conversation.' },
]
