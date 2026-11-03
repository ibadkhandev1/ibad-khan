'use client'

import { useEffect, useRef, useState } from 'react'

export default function CodeBlock({ children }) {
  const codeRef = useRef(null)
  const timerRef = useRef(null)
  const [status, setStatus] = useState('Copy')

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const copyCode = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(codeRef.current?.textContent ?? '')
      setStatus('Copied!')
    } catch {
      setStatus('Copy failed')
    }
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setStatus('Copy'), 2500)
  }

  return (
    <div className="relative mb-6 rounded-lg bg-surface-1">
      <button
        type="button"
        onClick={copyCode}
        className="absolute right-3 top-3 z-10 rounded border border-hairline-strong bg-surface-1 px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={status === 'Copy' ? 'Copy code to clipboard' : status}
      >
        <span aria-live="polite">{status}</span>
      </button>
      <pre ref={codeRef} className="overflow-x-auto p-4 pt-14 font-mono text-sm leading-6 text-ink">{children}</pre>
    </div>
  )
}
