import { PERSONAL_INFO, SOCIAL_LINKS, ORGANIZATIONS } from '@/config/personal';

export default function JsonLd() {
  const BASE_URL = process.env.SITE_URL || 'https://ibad-khan.vercel.app';

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    givenName: PERSONAL_INFO.givenName,
    familyName: PERSONAL_INFO.familyName,
    url: PERSONAL_INFO.siteUrl,
    jobTitle: PERSONAL_INFO.jobTitle,
    description: PERSONAL_INFO.description,
    email: PERSONAL_INFO.email,
    worksFor: ORGANIZATIONS.map((org) => ({
      '@type': 'Organization',
      name: org.name,
    })),
    sameAs: Object.values(SOCIAL_LINKS),
    knowsAbout: [
      'React',
      'Next.js',
      'JavaScript',
      'Tailwind CSS',
      'Web Performance',
      'Responsive Design',
      'Frontend Development',
    ],
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'PK',
        addressRegion: 'Sindh',
        addressLocality: 'Hyderabad',
      },
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ibad Khan | Frontend Developer',
    url: PERSONAL_INFO.siteUrl,
    description: PERSONAL_INFO.description,
    creator: {
      '@type': 'Person',
      name: PERSONAL_INFO.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: PERSONAL_INFO.name,
    url: PERSONAL_INFO.siteUrl,
    logo: `${BASE_URL}/logo.png`,
    description: PERSONAL_INFO.description,
    sameAs: Object.values(SOCIAL_LINKS),
    contact: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: PERSONAL_INFO.email,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}
