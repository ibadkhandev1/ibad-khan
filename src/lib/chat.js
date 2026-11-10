import { PERSONAL_INFO } from '@/config/personal'
import { CAL_LINK } from '@/lib/cal'

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
  errorReply: `I can’t reply right now. Email me at
    [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email}) or
    [book a call](https://cal.com/${CAL_LINK}) and I’ll get back to you.`.replace(/\s+/g, ' '),
}

/**
 * Sends the conversation to the Gemini-backed route in app/api/ai-chat.
 *
 * Receives the full conversation as [{ role: 'user' | 'assistant', content }]
 * and resolves to the assistant's reply as a string. Throws when the route
 * fails so the widget can show CHAT_CONFIG.errorReply.
 */
export async function sendChatMessage(messages) {
  const response = await fetch('/api/ai-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })
  const data = await response.json().catch(() => null)
  if (!response.ok || !data?.reply) {
    throw new Error(`Chat API responded ${response.status}: ${data?.error ?? 'no reply'}`)
  }
  return data.reply
}
