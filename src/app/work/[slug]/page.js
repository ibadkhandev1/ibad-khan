import Image from 'next/image'
import { notFound } from 'next/navigation'
import { BASE_URL } from '@/app/constants'
import { PROJECTS, getProject } from '@/config/content'
import { PERSONAL_INFO } from '@/config/personal'
import Link from '@/components/layout/TransitionLink'
import SectionLabel from '@/components/layout/SectionLabel'
import SplitReveal from '@/components/motion/SplitReveal'
import BookCallButton from '@/components/booking/BookCallButton'
import MediaReveal from '@/components/sections/MediaReveal'

export const dynamicParams = false

export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const url = `${BASE_URL}${project.path}`
  const title = `${project.title} — ${project.tech.slice(0, 2).join(' & ')} project | Ibad Khan`
  const image = { url: `${BASE_URL}${project.images.cover.src}`, alt: project.images.cover.alt }
  return {
    title,
    description: project.description,
    keywords: [project.title, ...project.tech, 'frontend developer portfolio', 'Ibad Khan'],
    alternates: { canonical: url },
    openGraph: { title, description: project.description, url, type: 'article', images: [image] },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.description,
      images: [image.url],
    },
  }
}

const pad = (value) => String(value).padStart(2, '0')

const buildJsonLd = (project) => {
  const url = `${BASE_URL}${project.path}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      url,
      image: `${BASE_URL}${project.images.cover.src}`,
      keywords: project.tech.join(', '),
      author: { '@type': 'Person', name: PERSONAL_INFO.name, url: BASE_URL },
      ...(project.live && { sameAs: project.live }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Work', item: `${BASE_URL}/#work` },
        { '@type': 'ListItem', position: 3, name: project.title, item: url },
      ],
    },
  ]
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const index = PROJECTS.indexOf(project)
  const next = PROJECTS[(index + 1) % PROJECTS.length]
  const { cover, desktop, mobile } = project.images
  const jsonLd = JSON.stringify(buildJsonLd(project)).replace(/</g, '\\u003c')

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <header className="gutter pb-14 pt-32 sm:pt-40">
        <nav aria-label="Breadcrumb">
          <ol className="mono-label flex flex-wrap gap-2">
            <li><Link href="/" className="link-draw">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/#work" className="link-draw">Work</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">{project.title}</li>
          </ol>
        </nav>

        <SectionLabel index={`${pad(index + 1)}/${pad(PROJECTS.length)}`} className="mt-10">
          Selected work
        </SectionLabel>
        <SplitReveal as="h1" intro className="display project-title mt-5">
          {project.title}
        </SplitReveal>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10">
          <p className="lede col-span-12 lg:col-span-7">{project.description}</p>
          <dl className="project-meta col-span-12 lg:col-span-4 lg:col-start-9">
            <div>
              <dt className="mono-label">Stack</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech) => <span key={tech} className="project-tag">{tech}</span>)}
              </dd>
            </div>
            <div>
              <dt className="mono-label">Links</dt>
              <dd className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw"
                  >
                    Live site ↗
                  </a>
                )}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw"
                >
                  Source on GitHub ↗
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="gutter">
        <MediaReveal
          image={cover}
          sizes="(min-width: 1440px) 1360px, 96vw"
          parallax
          eager
          className="project-cover"
        />
      </div>

      <section className="section gutter" aria-labelledby="overview-title">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <SectionLabel index="i">Overview</SectionLabel>
            <SplitReveal
              id="overview-title"
              className="display mt-4 text-[clamp(2.5rem,5vw,4.5rem)]"
            >
              What it does
            </SplitReveal>
          </div>
          <ol className="project-highlights col-span-12 lg:col-span-7 lg:col-start-6">
            {project.highlights.map((highlight, highlightIndex) => (
              <li key={highlight}>
                <span className="mono-label text-accent">{pad(highlightIndex + 1)}</span>
                {highlight}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="gutter grid gap-y-16 pb-24" aria-label={`${project.title} screens`}>
        {desktop.map((shot, shotIndex) => (
          <MediaReveal
            key={shot.src}
            image={shot}
            sizes="(min-width: 1440px) 1360px, 96vw"
            caption={`${pad(shotIndex + 1)} — ${shot.alt}`}
          />
        ))}
        <div className="project-mobiles">
          {mobile.map((shot) => (
            <MediaReveal
              key={shot.src}
              image={shot}
              sizes="(min-width: 768px) 30vw, 46vw"
              caption={shot.alt}
              className="project-mobile"
            />
          ))}
        </div>
      </section>

      <section className="gutter pb-24 text-center" aria-label="Start a project">
        <p className="mono-label">Like what you see?</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <BookCallButton className="btn btn--solid">Book a call</BookCallButton>
          <Link href="/services" className="btn">See services</Link>
        </div>
      </section>

      <Link
        href={next.path}
        transitionLabel={next.title}
        className="project-next gutter"
        data-cursor="view"
        data-cursor-label="Next"
      >
        <span className="mono-label">Next project · {pad(PROJECTS.indexOf(next) + 1)}</span>
        <span className="project-next-row">
          <span className="display project-next-title">{next.title}</span>
          <span className="project-next-thumb">
            <Image
              src={next.images.cover.src}
              alt=""
              width={next.images.cover.width}
              height={next.images.cover.height}
              sizes="(min-width: 768px) 24vw, 40vw"
            />
          </span>
        </span>
      </Link>
    </article>
  )
}
