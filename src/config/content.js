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

// Projects power the "Selected work" reel and the /work/[slug] product pages.
// Images live in /public/work/<slug>/ with fixed names (cover, desktop-01,
// desktop-02, mobile-01, mobile-02). The current files are generated demos —
// replace them with real screenshots (same names, any size; 16:10 for desktop
// and cover, 1:2 for mobile) and update the alt text below.
// Optional per project: `live` (deployed URL) and `year`.
const PROJECT_DATA = [
  {
    slug: 'ai-fitness-coach',
    title: 'AI Fitness Coach',
    description:
      'Full-stack AI fitness platform — personalised plans, habit tracking, coach chat '
      + 'and progress insights.',
    highlights: ['Personalised plans', 'Habit tracking', 'AI coach chat', 'Progress insights'],
    tech: ['Next.js', 'MongoDB', 'AI SDK'],
    repo: 'liquad-assests',
  },
  {
    slug: 'power-ai',
    title: 'Power AI',
    description:
      'Full-screen AI product landing page with a video background, liquid-glass UI and '
      + 'an animated brand marquee.',
    highlights: ['Full-screen video background', 'Liquid-glass UI', 'Animated brand marquee'],
    tech: ['React', 'TypeScript', 'Tailwind'],
    repo: 'power-ai',
  },
  {
    slug: 'securify',
    title: 'Securify',
    description:
      'Security-focused web app on a modern TypeScript frontend and production-ready '
      + 'Next.js patterns.',
    highlights: ['Security-focused product UI', 'Typed TypeScript frontend', 'Next.js patterns'],
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    repo: 'securify',
  },
  {
    slug: 'landify',
    title: 'Landify',
    description: 'Landing page built around smooth GSAP choreography and clean UI patterns.',
    highlights: ['GSAP choreography', 'Clean, reusable UI patterns'],
    tech: ['React', 'Tailwind', 'GSAP'],
    repo: 'Landify',
  },
  {
    slug: 'heroui',
    title: 'heroUI',
    description: 'A kit of reusable hero sections, each with its own animation pattern.',
    highlights: ['Reusable hero sections', 'A distinct animation pattern per hero'],
    tech: ['Next.js', 'Tailwind', 'Motion'],
    repo: 'heroUI',
  },
  {
    slug: 'codelace',
    title: 'Codelace',
    description: 'Full platform redesign focused on UX, modern aesthetics and responsiveness.',
    highlights: ['Full platform redesign', 'UX-first layouts', 'Responsive at every breakpoint'],
    tech: ['React', 'CSS', 'Figma'],
    repo: 'Codelace-redesign',
  },
  {
    slug: 'weather-api',
    title: 'Weather API',
    description: 'Real-time weather dashboard on the OpenWeatherMap API with dynamic theming.',
    highlights: ['Real-time OpenWeatherMap data', 'Theme that follows the weather'],
    tech: ['JavaScript', 'REST API', 'CSS'],
    repo: 'weatherAPI',
  },
]

const DESKTOP_SIZE = { width: 1600, height: 1000 }
const MOBILE_SIZE = { width: 750, height: 1500 }

const projectImages = ({ slug, title }) => {
  const shot = (file, label, size) => ({
    src: `/work/${slug}/${file}.webp`,
    alt: `${title} — ${label}`,
    ...size,
  })
  return {
    cover: shot('cover', 'home page', DESKTOP_SIZE),
    desktop: [
      shot('desktop-01', 'main screen', DESKTOP_SIZE),
      shot('desktop-02', 'features', DESKTOP_SIZE),
    ],
    mobile: [
      shot('mobile-01', 'mobile home', MOBILE_SIZE),
      shot('mobile-02', 'mobile list', MOBILE_SIZE),
    ],
  }
}

export const PROJECTS = PROJECT_DATA.map((project) => ({
  ...project,
  path: `/work/${project.slug}`,
  href: `${SOCIAL_LINKS.github}/${project.repo}`,
  images: projectImages(project),
}))

export const getProject = (slug) => PROJECTS.find((project) => project.slug === slug)

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
  { label: 'Index', href: '/', note: 'Back to the top — go shuffle the hero.' },
  { label: 'Work', href: '/#work', note: 'Seven selected builds, scroll sideways.' },
  { label: 'Experience', href: '/#experience', note: 'Nanolix Digital and Techriv Solutions.' },
  { label: 'Services', href: '/services', note: 'What I can build for you.' },
  { label: 'Blog', href: '/blog', note: 'Notes on React, Next.js and performance.' },
  { label: 'Contact', href: '#contact', note: 'Freelance, full-time, or a conversation.' },
]
