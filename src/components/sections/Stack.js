import {
  siBootstrap,
  siCss,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siGsap,
  siHtml5,
  siJavascript,
  siJquery,
  siMongodb,
  siNextdotjs,
  siReact,
  siReacthookform,
  siRedis,
  siSupabase,
  siSwiper,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWebgl,
  siWordpress,
} from 'simple-icons'
import { EXPERIENCES, PROJECTS, STACK_LAYERS } from '@/config/content'
import SectionLabel from '@/components/layout/SectionLabel'
import SplitReveal from '@/components/motion/SplitReveal'
import StackLayers from './StackLayers'

// Simple Icons (CC0) brand marks, resolved on the server so the library never
// ships to the browser — only the paths that are actually used.
const ICONS = {
  siBootstrap,
  siCss,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siGsap,
  siHtml5,
  siJavascript,
  siJquery,
  siMongodb,
  siNextdotjs,
  siReact,
  siReacthookform,
  siRedis,
  siSupabase,
  siSwiper,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWebgl,
  siWordpress,
}

const INK = '#ece7dc'

// Near-black brand colours (Next.js, Express, GitHub, Vercel) would disappear on
// the dark page, so they use the site's ink colour on hover instead.
const readableColor = (hex) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.12 ? INK : `#${hex}`
}

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

// How many real builds (projects + jobs) list any tool from this layer.
const countBuilds = (tools) => {
  const keys = tools.map((tool) => normalize(tool.name))
  const uses = (stack) => stack.some((entry) => {
    const other = normalize(entry)
    return keys.some((key) => other.startsWith(key) || key.startsWith(other))
  })
  const projects = PROJECTS.filter((project) => uses(project.tech)).length
  const jobs = EXPERIENCES.filter((exp) => uses(exp.skills)).length
  return projects + jobs
}

const resolveTool = (tool) => {
  const brand = tool.icon && ICONS[tool.icon]
  return {
    name: tool.name,
    glyph: tool.glyph ?? null,
    path: brand ? brand.path : null,
    color: brand ? readableColor(brand.hex) : 'var(--accent)',
  }
}

// Toolkit: the stack drawn as an exploded cross-section of a build.
export default function Stack() {
  const layers = STACK_LAYERS.map((layer) => ({
    ...layer,
    tools: layer.tools.map(resolveTool),
    builds: countBuilds(layer.tools),
  }))
  const toolCount = layers.reduce((sum, layer) => sum + layer.tools.length, 0)

  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="gutter">
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <SectionLabel index="07">Toolkit</SectionLabel>
            <SplitReveal
              id="stack-title"
              className="display mt-6 text-[clamp(3rem,7.5vw,7rem)]"
            >
              The system underneath.
            </SplitReveal>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="lede">
              Every build, cross-sectioned: the layers I work in, from the first sketch to
              the deploy.
            </p>
            <p className="mono-label mt-4">
              {String(layers.length).padStart(2, '0')} layers · {toolCount} tools
            </p>
          </div>
        </div>

        <div className="mt-16">
          <StackLayers layers={layers} />
        </div>
      </div>
    </section>
  )
}
