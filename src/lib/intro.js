// Tiny pub/sub so the hero can start its entrance on the exact frame the
// preloader begins to lift — one continuous move instead of a hard cut.
let isReady = false
const listeners = new Set()

export const markIntroReady = () => {
  if (isReady) return
  isReady = true
  listeners.forEach((listener) => listener())
  listeners.clear()
}

export const onIntroReady = (listener) => {
  if (isReady) {
    listener()
    return () => {}
  }
  listeners.add(listener)
  return () => listeners.delete(listener)
}
