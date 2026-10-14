import { PERSONAL_INFO } from '@/config/personal'

export const CHAT_CONFIG = {
  title: 'Ask Ibad',
  subtitle: 'Questions about a project? Start here.',
  greeting: `Hi, I’m Ibad. Tell me a bit about what you’re building and I’ll point you in the
    right direction.`.replace(/\s+/g, ' '),
  suggestions: [
    'I need a Next.js website',
    'Can you make my site faster?',
    'Are you available for freelance?',
  ],
}

const FALLBACK_REPLY = `The chat isn’t connected yet. For now, email me at
  ${PERSONAL_INFO.email} or book a call and I’ll get back to you.`.replace(/\s+/g, ' ')

/**
 * Integration point for the chat backend.
 *
 * Receives the full conversation as [{ role: 'user' | 'assistant', content }]
 * and must resolve to the assistant's reply as a string. Replace the body with
 * a call to your own API route, e.g.:
 *
 *   const response = await fetch('/api/chat', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ messages }),
 *   })
 *   if (!response.ok) throw new Error(`Chat API responded ${response.status}`)
 *   const { reply } = await response.json()
 *   return reply
 */
export async function sendChatMessage(messages) {
  await new Promise((resolve) => setTimeout(resolve, 700 + messages.length * 40))
  return FALLBACK_REPLY
}
