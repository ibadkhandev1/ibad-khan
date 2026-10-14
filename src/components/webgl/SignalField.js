'use client'

import { useEffect, useRef } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import { gsap } from '@/lib/gsap'
import { onIntroReady } from '@/lib/intro'
import { REDUCED_MOTION } from '@/lib/motion-tokens'

const VERTEX = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

// Topographic contour field: domain-warped fbm sliced into thin iso-lines.
// Lines bend toward the cursor and pick up the signal accent near it.
const FRAGMENT = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uIntensity;
varying vec2 vUv;

const vec3 BG = vec3(0.043, 0.043, 0.039);
const vec3 INK = vec3(0.925, 0.906, 0.863);
const vec3 ACCENT = vec3(1.0, 0.357, 0.122);

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < OCTAVES; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(vUv.x * aspect, vUv.y);
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);
  float t = uTime * 0.035;

  float pull = exp(-distance(p, m) * 3.4);
  vec2 q = vec2(fbm(p * 1.3 + t), fbm(p * 1.3 - t + 4.7));
  vec2 warp = (p - m) * pull * 0.35;
  float f = fbm(p * 1.6 + q * 1.4 + vec2(0.0, uScroll * 0.35) - warp);

  float bands = f * 14.0;
  float edge = abs(fract(bands) - 0.5);
  float width = 0.035 + pull * 0.025;
  float contour = smoothstep(0.5 - width, 0.5, edge);

  vec3 col = BG;
  col = mix(col, INK, contour * 0.09 * uIntensity);
  col = mix(col, ACCENT, contour * pull * 0.8 * uIntensity);
  col += ACCENT * pull * 0.045 * uIntensity;

  float vignette = smoothstep(1.2, 0.25, distance(vUv, vec2(0.5)));
  col *= mix(0.65, 1.0, vignette);
  gl_FragColor = vec4(col, 1.0);
}
`

const RENDER_SCALE = { coarse: 0.5, fine: 0.75 }
const COARSE_FRAME_MS = 1000 / 30

// Builds the WebGL field inside `container` and returns its teardown.
function mountField(container) {
  const isCoarse = window.matchMedia('(pointer: coarse)').matches
  const isReduced = window.matchMedia(REDUCED_MOTION).matches

  let renderer
  try {
    // The contours are soft, so rendering below native resolution is invisible
    // but cuts fragment work by 2–4×.
    renderer = new Renderer({
      dpr: isCoarse ? RENDER_SCALE.coarse : RENDER_SCALE.fine,
      antialias: false,
      powerPreference: 'high-performance',
    })
  } catch (error) {
    console.error('[SignalField]: WebGL unavailable', error)
    return undefined
  }

  const { gl } = renderer
  const uniforms = {
    uTime: { value: 0 },
    uRes: { value: [1, 1] },
    uMouse: { value: [0.5, 0.45] },
    uScroll: { value: 0 },
    uIntensity: { value: isReduced ? 1 : 0 },
  }
  const program = new Program(gl, {
    vertex: VERTEX,
    fragment: `#define OCTAVES ${isCoarse ? 4 : 5}
${FRAGMENT}`,
    uniforms,
  })
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
  gl.canvas.className = 'signal-canvas'
  container.appendChild(gl.canvas)

  const mouse = { x: 0.5, y: 0.45, tx: 0.5, ty: 0.45 }
  let frameId = 0
  let lastFrame = 0
  let isVisible = true
  let isPageVisible = !document.hidden

  const render = (time = 0) => {
    uniforms.uTime.value = time * 0.001
    mouse.x += (mouse.tx - mouse.x) * 0.05
    mouse.y += (mouse.ty - mouse.y) * 0.05
    uniforms.uMouse.value = [mouse.x, mouse.y]
    uniforms.uScroll.value = window.scrollY / window.innerHeight
    renderer.render({ scene: mesh })
  }

  const loop = (time) => {
    frameId = requestAnimationFrame(loop)
    if (isCoarse && time - lastFrame < COARSE_FRAME_MS) return
    lastFrame = time
    render(time)
  }

  const start = () => {
    if (isReduced || frameId || !isVisible || !isPageVisible) return
    frameId = requestAnimationFrame(loop)
  }

  const stop = () => {
    cancelAnimationFrame(frameId)
    frameId = 0
  }

  const resize = () => {
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    uniforms.uRes.value = [gl.canvas.width, gl.canvas.height]
    if (isReduced) render()
  }

  const handlePointer = (event) => {
    const rect = container.getBoundingClientRect()
    mouse.tx = (event.clientX - rect.left) / rect.width
    mouse.ty = 1 - (event.clientY - rect.top) / rect.height
  }

  const handleVisibility = () => {
    isPageVisible = !document.hidden
    if (isPageVisible) start()
    else stop()
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting
    if (isVisible) start()
    else stop()
  })
  intersectionObserver.observe(container)
  window.addEventListener('pointermove', handlePointer, { passive: true })
  document.addEventListener('visibilitychange', handleVisibility)

  resize()
  render()
  requestAnimationFrame(() => gl.canvas.classList.add('is-ready'))
  start()
  gsap.to(uniforms.uIntensity, { value: 1, duration: 2.4, ease: 'power2.out' })

  return () => {
    stop()
    gsap.killTweensOf(uniforms.uIntensity)
    resizeObserver.disconnect()
    intersectionObserver.disconnect()
    window.removeEventListener('pointermove', handlePointer)
    document.removeEventListener('visibilitychange', handleVisibility)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    gl.canvas.remove()
  }
}

// Atmosphere, not spectacle: renders behind the hero only, starts once the
// intro has begun and the main thread is idle (never competing with first
// paint), pauses off-screen or in hidden tabs, and draws a single frame when
// the visitor prefers reduced motion.
export default function SignalField({ className = '' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const scheduleIdle = window.requestIdleCallback ?? ((callback) => setTimeout(callback, 200))
    const cancelIdle = window.cancelIdleCallback ?? clearTimeout
    let idleId
    let teardown

    const unsubscribe = onIntroReady(() => {
      idleId = scheduleIdle(() => {
        teardown = mountField(container)
      }, { timeout: 1200 })
    })

    return () => {
      unsubscribe()
      cancelIdle(idleId)
      teardown?.()
    }
  }, [])

  return <div ref={containerRef} className={className} aria-hidden="true" />
}
