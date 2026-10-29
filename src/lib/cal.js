// Minimal loader for the official Cal.com embed (same contract as the snippet
// cal.com generates, without adding a dependency). Calls made before
// embed.js has loaded are queued and replayed once it arrives.
const EMBED_SRC = 'https://app.cal.com/embed/embed.js'

export const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || 'ibad-khaan/15min'
const NAMESPACE = 'intro'
const MODAL_CONFIG = { layout: 'month_view', theme: 'light' }

const queue = (target, args) => target.q.push(args)

const ensureCal = () => {
  if (window.Cal) return window.Cal
  const cal = function cal(...args) {
    if (!cal.loaded) {
      cal.ns = {}
      cal.q = cal.q ?? []
      const script = document.createElement('script')
      script.src = EMBED_SRC
      script.async = true
      document.head.appendChild(script)
      cal.loaded = true
    }
    if (args[0] === 'init') {
      const [, namespace] = args
      const api = function api(...apiArgs) {
        queue(api, apiArgs)
      }
      api.q = []
      if (typeof namespace === 'string') {
        cal.ns[namespace] = cal.ns[namespace] ?? api
        queue(cal.ns[namespace], args)
        queue(cal, ['initNamespace', namespace])
      } else {
        queue(cal, args)
      }
      return
    }
    queue(cal, args)
  }
  cal.q = []
  window.Cal = cal
  return cal
}

let api = null
let isPreloaded = false

// Loads embed.js and configures the namespace. Only ever called on intent: Cal's
// script sets a third-party cookie, so it must not load on every page view.
export const initCal = () => {
  if (api) return api
  const cal = ensureCal()
  cal('init', NAMESPACE, { origin: 'https://cal.com' })
  api = cal.ns[NAMESPACE]
  api('ui', {
    theme: 'light',
    hideEventTypeDetails: false,
    layout: 'month_view',
    cssVarsPerTheme: { light: { 'cal-brand': '#1b1a17' } },
  })
  return api
}

// Warms up the booking page in a hidden iframe so the popup opens instantly.
// Only called on intent (hover/focus of a booking button) — it is heavy.
export const preloadCal = () => {
  if (isPreloaded) return
  isPreloaded = true
  initCal()('preload', { calLink: CAL_LINK })
}

// Opens Cal.com's own popup modal.
export const openCalModal = () => {
  initCal()('modal', { calLink: CAL_LINK, config: MODAL_CONFIG })
}
