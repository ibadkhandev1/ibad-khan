import Hero from '@/components/sections/Hero'
import Manifesto from '@/components/sections/Manifesto'
import Work from '@/components/sections/Work'
import Principles from '@/components/sections/Principles'
import Experience from '@/components/sections/Experience'
import ServicesTeaser from '@/components/sections/ServicesTeaser'
import Stack from '@/components/sections/Stack'

// One component kit, played top to bottom: the live <Hero /> (props panel) →
// About → Work reel → Principles → Changelog → Services → Toolkit → finale.
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
