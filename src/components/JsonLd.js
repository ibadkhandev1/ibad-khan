import { BASE_URL } from '@/app/constants'
import { PERSONAL_INFO, SOCIAL_LINKS, ORGANIZATIONS } from '@/config/personal'

export const PERSON_ID = `${BASE_URL}/#person`
export const WEBSITE_ID = `${BASE_URL}/#website`

// Site-wide entity graph. The Person node is the one Google should match to
// searches for "Ibad Khan"; sameAs links it to the LinkedIn/GitHub/Upwork profiles.
export default function JsonLd() {
  const socialProfiles = Object.values(SOCIAL_LINKS).filter((url) => url.startsWith('http'))

  const person = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: PERSONAL_INFO.name,
    alternateName: ['Ibad Khan Dev', 'ibadkhandev'],
    url: PERSONAL_INFO.siteUrl,
    image: `${BASE_URL}/Professional-Headshot.png`,
    jobTitle: PERSONAL_INFO.jobTitle,
    description: PERSONAL_INFO.description,
    email: PERSONAL_INFO.email,
    worksFor: ORGANIZATIONS.map((org) => ({ '@type': 'Organization', name: org.name })),
    sameAs: socialProfiles,
    knowsAbout: [
      'React',
      'Next.js',
      'MERN Stack',
      'Node.js',
      'MongoDB',
      'Headless WordPress',
      'CMS Development',
      'SaaS Development',
      'React Native',
      'Mobile App Development',
      'JavaScript',
      'Tailwind CSS',
      'Web Performance',
      'Responsive Design',
      'Full-Stack Development',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PK',
      addressRegion: 'Sindh',
      addressLocality: 'Karachi',
    },
  }

  const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Ibad Khan',
    alternateName: ['Ibad Khan Dev', 'ibadkhandev', 'Ibad Khan Portfolio'],
    url: PERSONAL_INFO.siteUrl,
    description: PERSONAL_INFO.description,
    publisher: { '@id': PERSON_ID },
  }

  const graph = { '@context': 'https://schema.org', '@graph': [person, website] }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
