import { PERSONAL_INFO, SOCIAL_LINKS, ORGANIZATIONS } from '@/config/personal';

export default function JsonLd() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    givenName: PERSONAL_INFO.givenName,
    familyName: PERSONAL_INFO.familyName,
    url: PERSONAL_INFO.siteUrl,
    jobTitle: PERSONAL_INFO.jobTitle,
    worksFor: ORGANIZATIONS.map((org) => ({
      '@type': 'Organization',
      name: org.name,
    })),
    sameAs: Object.values(SOCIAL_LINKS),
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.jobTitle}`,
    url: PERSONAL_INFO.siteUrl,
    description: PERSONAL_INFO.description,
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
    </>
  );
}
