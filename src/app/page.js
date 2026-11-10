import Hero from '@/components/sections/Hero'
import Manifesto from '@/components/sections/Manifesto'
import Work from '@/components/sections/Work'
import Principles from '@/components/sections/Principles'
import Experience from '@/components/sections/Experience'
import ServicesTeaser from '@/components/sections/ServicesTeaser'
import Stack from '@/components/sections/Stack'
import { PERSON_ID, WEBSITE_ID } from '@/components/JsonLd'
import { BASE_URL } from './constants'

export const metadata = {
  title: 'Ibad Khan — Full Stack Developer',
  description:
    'Ibad Khan is a full stack developer building fast web applications, '
    + 'Next.js and MERN products, CMS websites, SaaS dashboards, and mobile apps.',
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'Ibad Khan — Full Stack Developer',
    description:
      'Portfolio of Ibad Khan, a full stack developer specializing in Next.js, '
      + 'MERN, CMS websites, SaaS dashboards, and mobile apps.',
    url: BASE_URL,
    type: 'website',
  },
}

// Google's profile-page markup: tells search this URL is *about* the Person entity.
const PROFILE_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${BASE_URL}/#profilepage`,
  url: BASE_URL,
  name: 'Ibad Khan — Full Stack Developer',
  isPartOf: { '@id': WEBSITE_ID },
  mainEntity: { '@id': PERSON_ID },
}

// Narrative arc: Hook (hero X-ray) → Tension (manifesto) → Reveal (work,
// principles) → Proof (experience, services, toolkit) → Invitation (footer).
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFILE_PAGE) }}
      />
      <Hero />
      <Manifesto />
      <Work />
      <Principles />
      <Experience />
      <ServicesTeaser />
      <Stack />
    </>
  )
}
