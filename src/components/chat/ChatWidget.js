'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { REDUCED_MOTION } from '@/lib/motion-tokens'
import { CHAT_CONFIG, sendChatMessage } from '@/lib/chat'
import { openCalModal, preloadCal } from '@/lib/cal'

const createMessage = (role, content) => ({ id: crypto.randomUUID(), role, content })

// Floating chat. UI only: the reply comes from sendChatMessage() in lib/chat.js,
// which is the single place to plug in a real backend.
export default function ChatWidget() {
  const rootRef = useRef(null)
  const panelRef = useRef(null)
  const launcherRef = useRef(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const hasOpened = useRef(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState(() => [
    createMessage('assistant', CHAT_CONFIG.greeting),
  ])

  const close = () => {
    setIsOpen(false)
    launcherRef.current?.focus()
  }

  useGSAP(() => {
    const panel = panelRef.current
    const isReduced = window.matchMedia(REDUCED_MOTION).matches
    const duration = isReduced ? 0 : 0.55

    if (isOpen) {
      hasOpened.current = true
      gsap.timeline()
        .set(panel, { visibility: 'visible' })
        .fromTo(panel, { clipPath: 'inset(100% 0% 0% 0% round 1.25rem)', y: 24 }, {
          clipPath: 'inset(0% 0% 0% 0% round 1.25rem)',
          y: 0,
          duration,
          ease: 'expo.inout.custom',
          onComplete: () => inputRef.current?.focus({ preventScroll: true }),
        })
        .from(panel.querySelectorAll('[data-chat-fade]'), {
          autoAlpha: 0,
          y: 12,
          duration: isReduced ? 0 : 0.4,
          stagger: 0.05,
        }, '-=0.2')
      return
    }

    if (!hasOpened.current) return
    gsap.to(panel, {
      clipPath: 'inset(100% 0% 0% 0% round 1.25rem)',
      y: 24,
      duration: isReduced ? 0 : 0.45,
      ease: 'power2.in',
      onComplete: () => gsap.set(panel, { visibility: 'hidden' }),
    })
  }, { dependencies: [isOpen], scope: rootRef })

  useEffect(() => {
    if (!isOpen) return undefined
    const handleKey = (event) => {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      launcherRef.current?.focus()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen])

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' })
  }, [messages, isSending])

  const send = async (text) => {
    const content = text.trim()
    if (!content || isSending) return
    const next = [...messages, createMessage('user', content)]
    setMessages(next)
    setDraft('')
    setIsSending(true)
    try {
      const history = next.map(({ role, content: body }) => ({ role, content: body }))
      const reply = await sendChatMessage(history)
      setMessages((current) => [...current, createMessage('assistant', reply)])
    } catch (error) {
      console.error('[ChatWidget]:', error)
      setMessages((current) => [
        ...current,
        createMessage('assistant', 'Something went wrong sending that. Please try again.'),
      ])
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' || event.shiftKey) return
    event.preventDefault()
    send(draft)
  }

  const hasUserMessage = messages.some((message) => message.role === 'user')

  return (
    <div ref={rootRef} className="chat">
      <section
        ref={panelRef}
        id="chat-panel"
        className="chat-panel"
        role="dialog"
        aria-label={CHAT_CONFIG.title}
        inert={!isOpen}
      >
        <header className="chat-header" data-chat-fade>
          <span className="chat-avatar" aria-hidden="true">IK</span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-semibold leading-tight">
              {CHAT_CONFIG.title}
            </h2>
            <p className="truncate text-sm text-ink-muted">{CHAT_CONFIG.subtitle}</p>
          </div>
          <button type="button" className="chat-icon-button" onClick={close}>
            <span className="sr-only">Close chat</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </header>

        <ol ref={listRef} className="chat-messages" aria-live="polite" data-lenis-prevent>
          {messages.map((message) => (
            <li key={message.id} className="chat-message" data-role={message.role}>
              {message.content}
            </li>
          ))}
          {isSending && (
            <li className="chat-message chat-typing" data-role="assistant">
              <span className="sr-only">Ibad is typing</span>
              <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
            </li>
          )}
        </ol>

        {!hasUserMessage && (
          <div className="chat-suggestions" data-chat-fade>
            {CHAT_CONFIG.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="chat-chip"
                onClick={() => send(suggestion)}
              >
                {suggestion}
              </button>
            ))}
            <button
              type="button"
              className="chat-chip chat-chip--accent"
              onPointerEnter={preloadCal}
              onFocus={preloadCal}
              onClick={() => {
                close()
                openCalModal()
              }}
            >
              Book a call instead
            </button>
          </div>
        )}

        <form
          className="chat-form"
          data-chat-fade
          onSubmit={(event) => {
            event.preventDefault()
            send(draft)
          }}
        >
          <label htmlFor="chat-input" className="sr-only">Message</label>
          <textarea
            ref={inputRef}
            id="chat-input"
            rows={1}
            value={draft}
            placeholder="Write a message…"
            className="chat-input"
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="chat-send"
            disabled={!draft.trim() || isSending}
          >
            <span className="sr-only">Send</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </form>
      </section>

      <button
        ref={launcherRef}
        type="button"
        className="chat-launcher"
        aria-expanded={isOpen}
        aria-controls="chat-panel"
        data-open={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <svg viewBox="0 0 24 24" className="chat-launcher-icon" aria-hidden="true">
          <path
            d="M4 5h16v11H9l-5 4V5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        <span className="chat-launcher-label">{isOpen ? 'Close' : 'Ask me'}</span>
        <span className="sr-only">{isOpen ? ' — close chat' : ' — open chat'}</span>
      </button>
    </div>
  )
}
