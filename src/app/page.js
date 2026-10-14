import Hero from '@/components/sections/Hero'
import Manifesto from '@/components/sections/Manifesto'
import Work from '@/components/sections/Work'
import Principles from '@/components/sections/Principles'
import Experience from '@/components/sections/Experience'
import ServicesTeaser from '@/components/sections/ServicesTeaser'
import Stack from '@/components/sections/Stack'

// Narrative arc: Hook (hero X-ray) → Tension (manifesto) → Reveal (work,
// principles) → Proof (experience, services, toolkit) → Invitation (footer).
export default function Home() {
  return (
    <>
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
