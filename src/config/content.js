export const LOCATION = {
  city: 'Hyderabad',
  country: 'Pakistan',
  timeZone: 'Asia/Karachi',
  zoneLabel: 'PKT',
}

export const WHATSAPP = { display: '+92 340 8575895', href: 'https://wa.me/923408575895' }

export const STATS = [
  { value: 2.5, decimals: 1, suffix: '+', label: 'Years shipping production UI' },
  { value: 2, pad: 2, label: 'Studios shipped with' },
  { value: 3, pad: 2, label: 'Selected builds below' },
]

// These are the latest real desktop and iPhone captures supplied for each site.
const PROJECT_DATA = [
  {
    slug: 'wobbly',
    title: 'Wobbly Ensemble',
    description: 'A lively brand and web studio site built around playful motion, bold shapes, and a tactile visual system.',
    highlights: ['Playful visual identity', 'Responsive studio experience', 'Interactive shape system'],
    tech: ['Next.js', 'GSAP', 'CSS'],
    live: 'https://wobbly-ensemble.vercel.app/',
    imageDir: 'wobbly',
    imageFiles: {
      cover: 'wobbly-cover-mockup.png',
      desktop: ['wobbly-case-studies.png', 'wobbly-cover.png'],
      mobile: ['wobbly-mobile-home.png', 'wobbly-mobile-case.png'],
    },
  },
  {
    slug: 'hone',
    title: 'Hone Barbers',
    description: 'A cinematic barbershop website with a dark editorial palette, tactile typography, and a focused booking journey.',
    highlights: ['Editorial art direction', 'Responsive barbershop experience', 'Booking-first interface'],
    tech: ['Next.js', 'JavaScript', 'CSS'],
    live: 'https://hone-babers-cut.vercel.app/',
    imageDir: 'horn',
    imageFiles: {
      cover: 'hone-cover-mockup.png',
      desktop: ['hone-ritual.png', 'hone-babers-cut.vercel.app_ (5).png'],
      mobile: ['hone-mobile-home.png', 'hone-mobile-ritual.png'],
    },
  },
  {
    slug: 'offset',
    title: 'Offset',
    description: 'An experimental design journal that turns misregistration, typography, and scroll into the editorial experience.',
    highlights: ['Experimental editorial layout', 'Typographic interaction', 'Responsive journal experience'],
    tech: ['Next.js', 'Motion', 'CSS'],
    live: 'https://offset-brown.vercel.app/',
    imageDir: 'offset',
    imageFiles: {
      cover: 'offset-cover-mockup.png',
      desktop: ['offset-register.png', 'offset-editorial.png'],
      mobile: ['offset-mobile-home.png', 'offset-mobile-register.png'],
    },
  },
]

const IMAGE_SIZES = {
  'wobbly-cover-mockup.png': { width: 1536, height: 1024 },
  'wobbly-cover.png': { width: 1903, height: 1185 },
  'wobbly-case-studies.png': { width: 1906, height: 1199 },
  'wobbly-studio-screen.png': { width: 1905, height: 1199 },
  'wobbly-mobile-home.png': { width: 1320, height: 2868 },
  'wobbly-mobile-case.png': { width: 1320, height: 2868 },
  'hone-cover-mockup.png': { width: 1536, height: 1024 },
  'hone-ritual.png': { width: 3740, height: 2036 },
  'hone-babers-cut.vercel.app_ (5).png': { width: 3740, height: 2036 },
  'hone-menu-screen.png': { width: 3740, height: 2036 },
  'hone-mobile-home.png': { width: 1320, height: 2868 },
  'hone-mobile-ritual.png': { width: 1320, height: 2868 },
  'offset-cover-mockup.png': { width: 1536, height: 1024 },
  'offset-register.png': { width: 3740, height: 2036 },
  'offset-editorial.png': { width: 3740, height: 2036 },
  'offset-mobile-home.png': { width: 1320, height: 2868 },
  'offset-mobile-register.png': { width: 1320, height: 2868 },
}

const projectImages = ({ title, imageDir, imageFiles }) => {
  const shot = (file, label) => ({
    src: `/work/${imageDir}/${file}`,
    alt: `${title} — ${label}`,
    ...IMAGE_SIZES[file],
  })

  return {
    cover: shot(imageFiles.cover, 'home page'),
    desktop: imageFiles.desktop.map((file, index) => shot(file, index ? 'secondary screen' : 'main screen')),
    mobile: imageFiles.mobile.map((file, index) => shot(file, index ? 'responsive screen' : 'mobile home screen')),
  }
}

export const PROJECTS = PROJECT_DATA.map((project) => ({
  ...project,
  path: `/work/${project.slug}`,
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
  { title: 'Build', items: ['React', 'Next.js', 'JavaScript (ES6+)', 'HTML / CSS', 'Tailwind CSS', 'Bootstrap'] },
  { title: 'Motion', items: ['GSAP', 'Motion', 'Lenis', 'WebGL (OGL)'] },
  { title: 'Content', items: ['Headless WordPress', 'WordPress REST API', 'REST APIs', 'jQuery'] },
  { title: 'Craft', items: ['Responsive design', 'Web performance', 'Figma', 'Git'] },
]

export const MARQUEE_PRIMARY = ['React', 'Next.js', 'JavaScript', 'Tailwind CSS', 'WordPress']
export const MARQUEE_SECONDARY = ['GSAP', 'Motion', 'Lenis', 'WebGL', 'Performance', 'Figma']

export const MENU_LINKS = [
  { label: 'Index', href: '/', note: 'Back to the top — go shuffle the hero.' },
  { label: 'Work', href: '/#work', note: 'Three selected builds, scroll sideways.' },
  { label: 'Experience', href: '/#experience', note: 'Nanolix Digital and Techriv Solutions.' },
  { label: 'Services', href: '/services', note: 'What I can build for you.' },
  { label: 'Blog', href: '/blog', note: 'Notes on React, Next.js and performance.' },
  { label: 'Contact', href: '#contact', note: 'Freelance, full-time, or a conversation.' },
]
