import { gsap } from './gsap'

// The X-ray lens: a circular mask that follows the pointer and reveals the
// "blueprint" layer under the finished UI. Writes --lx/--ly/--lr on the
// masked layer; an optional SVG ring is drawn at the same position.
export function createLens({ surface, layer, ring, radius, auto = false }) {
  const state = { x: -9999, y: -9999, r: 0 }

  const apply = () => {
    layer.style.setProperty('--lx', `${state.x}px`)
    layer.style.setProperty('--ly', `${state.y}px`)
    layer.style.setProperty('--lr', `${state.r}px`)
    if (!ring) return
    gsap.set(ring, { x: state.x - 100, y: state.y - 100, scale: state.r / 100 })
  }

  if (auto) {
    // Touch devices have no hover, so the lens drifts on a slow Lissajous path.
    const drift = () => {
      const t = gsap.ticker.time
      state.x = surface.offsetWidth * (0.5 + 0.32 * Math.sin(t * 0.31))
      state.y = surface.offsetHeight * (0.48 + 0.22 * Math.sin(t * 0.47 + 1.2))
      apply()
    }
    gsap.ticker.add(drift)
    const grow = gsap.to(state, { r: radius(), duration: 1.2, delay: 0.6, onUpdate: apply })
    return () => {
      gsap.ticker.remove(drift)
      grow.kill()
    }
  }

  const xTo = gsap.quickTo(state, 'x', { duration: 0.55, ease: 'power3', onUpdate: apply })
  const yTo = gsap.quickTo(state, 'y', { duration: 0.55, ease: 'power3', onUpdate: apply })

  const localPoint = (event) => {
    const rect = surface.getBoundingClientRect()
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }

  const handleEnter = (event) => {
    const { x, y } = localPoint(event)
    xTo(x, x)
    yTo(y, y)
    gsap.to(state, { r: radius(), duration: 0.7, overwrite: 'auto', onUpdate: apply })
  }

  const handleMove = (event) => {
    const { x, y } = localPoint(event)
    xTo(x)
    yTo(y)
  }

  const handleLeave = () => {
    gsap.to(state, {
      r: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      overwrite: 'auto',
      onUpdate: apply,
    })
  }

  surface.addEventListener('pointerenter', handleEnter)
  surface.addEventListener('pointermove', handleMove)
  surface.addEventListener('pointerleave', handleLeave)

  return () => {
    surface.removeEventListener('pointerenter', handleEnter)
    surface.removeEventListener('pointermove', handleMove)
    surface.removeEventListener('pointerleave', handleLeave)
    gsap.killTweensOf(state)
  }
}
