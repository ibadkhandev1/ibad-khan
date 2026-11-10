import { GoogleGenAI } from '@google/genai'
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/config/personal'
import { EXPERIENCES, LOCATION, PROJECTS, STACK_GROUPS, WHATSAPP } from '@/config/content'
import { SERVICES } from '@/config/services'
import { CAL_LINK } from '@/lib/cal'

// Tried in order; the next model is used when one is overloaded, rate limited or slow.
// Flash-lite models answer in a few seconds, which suits a chat box.
const MODELS = [
  process.env.GEMINI_MODEL,
  'gemini-3.5-flash-lite',
  'gemini-flash-lite-latest',
].filter(Boolean)
const MODEL_TIMEOUT_MS = 12000
const MODEL_COOLDOWN_MS = 5 * 60 * 1000
const RETRYABLE_STATUSES = [429, 500, 503, 504]
const MAX_MESSAGES = 20
const MAX_MESSAGE_LENGTH = 2000
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 20

const SYSTEM_PROMPT = [
  `You are the chat assistant on ${PERSONAL_INFO.name}'s portfolio site. Speak as Ibad, in`,
  'first person, friendly and concise (2-4 short sentences, or a short list).',
  'Help visitors understand what Ibad builds and move them toward a call or an email.',
  'Only use the facts below. If you do not know something (exact prices, dates,',
  'availability), say so and suggest booking a call or emailing. Never invent projects,',
  'clients or numbers. Politely decline requests unrelated to Ibad or web/app projects.',
  '',
  'Formatting (the chat renders a small subset of Markdown):',
  '- Allowed: paragraphs, "- " bullet lists, **bold**, and links. No headings, tables,',
  '  code blocks or HTML.',
  '- Every link must be a Markdown link: [label](url). Never paste a bare URL or email.',
  `- Always write the email as [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email}).`,
  '- When listing projects, use one bullet per project: **Title**, a short description,',
  '  then [Live site](live url) and [Case study](case study url).',
  '- Link LinkedIn, Upwork and WhatsApp with their URLs when you mention them.',
  '',
  `Role: ${PERSONAL_INFO.jobTitle}`,
  `About: ${PERSONAL_INFO.description}`,
  `Location: ${LOCATION.city}, ${LOCATION.country} (${LOCATION.zoneLabel})`,
  `Email: ${PERSONAL_INFO.email}`,
  `WhatsApp: ${WHATSAPP.display} (${WHATSAPP.href})`,
  `LinkedIn: ${SOCIAL_LINKS.linkedin}`,
  `Upwork: ${SOCIAL_LINKS.upwork}`,
  `Booking: a free 15-minute call at https://cal.com/${CAL_LINK} (link it as [book a call]).`,
  'Only use the URLs listed here; never make up a link.',
  '',
  'Experience:',
  ...EXPERIENCES.map(({ role, company, period, points }) =>
    `- ${role} at ${company} (${period}): ${points.join('; ')}`),
  '',
  'Services:',
  ...SERVICES.map(({ name, summary }) => `- ${name}: ${summary}`),
  '',
  `Projects (these ${PROJECTS.length} are the ones featured on the site; do not claim others):`,
  ...PROJECTS.map(({ slug, title, description, tech, live }) => [
    `- ${title}: ${description} Tech: ${tech.join(', ')}.`,
    `Live: ${live} Case study: ${PERSONAL_INFO.siteUrl}/work/${slug}`,
  ].join(' ')),
  '',
  'Stack:',
  ...STACK_GROUPS.map(({ title, items }) => `- ${title}: ${items.join(', ')}`),
].join('\n')

// A model that just timed out or was overloaded is skipped for a few minutes, so
// one busy model costs one slow reply instead of slowing down every reply.
// Like the rate limit below, this lives in memory per server instance.
const coolingDownUntil = new Map()

const getModelsToTry = () => {
  const now = Date.now()
  const healthy = MODELS.filter((model) => (coolingDownUntil.get(model) ?? 0) <= now)
  return healthy.length > 0 ? healthy : MODELS
}

// Best effort only: on serverless each instance keeps its own map.
const requestLog = new Map()

const isRateLimited = (ip) => {
  const now = Date.now()
  const entry = requestLog.get(ip)
  if (!entry || entry.resetAt <= now) {
    if (requestLog.size > 5000) requestLog.clear()
    requestLog.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > RATE_LIMIT_MAX_REQUESTS
}

const isValidMessage = (message) =>
  ['user', 'assistant'].includes(message?.role) &&
  typeof message?.content === 'string' &&
  message.content.trim().length > 0

// Gemini expects the conversation to start with a user turn, so the widget's
// greeting (an assistant message) is dropped before the first user message.
const toGeminiContents = (messages) => {
  const recent = messages.slice(-MAX_MESSAGES)
  const firstUser = recent.findIndex((message) => message.role === 'user')
  return recent.slice(firstUser).map(({ role, content }) => ({
    role: role === 'assistant' ? 'model' : 'user',
    parts: [{ text: content.slice(0, MAX_MESSAGE_LENGTH) }],
  }))
}

const errorResponse = (error, status) => Response.json({ error }, { status })

export async function POST(request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('[ai-chat]:', new Error('GEMINI_API_KEY is not set'))
    return errorResponse('Chat is not configured', 503)
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) return errorResponse('Too many messages, try again later', 429)

  let body
  try {
    body = await request.json()
  } catch (error) {
    console.error('[ai-chat]: invalid JSON body', error)
    return errorResponse('Invalid JSON', 400)
  }

  const messages = body?.messages
  if (!Array.isArray(messages) || !messages.every(isValidMessage)) {
    return errorResponse('Expected messages: [{ role, content }]', 400)
  }
  if (!messages.some((message) => message.role === 'user')) {
    return errorResponse('No user message', 400)
  }

  // SDK retries are off: a busy model would otherwise back off for 30s+ while the
  // visitor waits. Falling through to the next model is faster.
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: { timeout: MODEL_TIMEOUT_MS, retryOptions: { attempts: 1 } },
  })
  const contents = toGeminiContents(messages)

  for (const model of getModelsToTry()) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: { systemInstruction: SYSTEM_PROMPT, temperature: 0.6 },
      })
      const reply = response.text?.trim()
      if (reply) return Response.json({ reply })
      console.error('[ai-chat]:', new Error(`${model} returned an empty reply`))
    } catch (error) {
      console.error(`[ai-chat]: ${model} failed`, error?.status ?? '', error?.message)
      const isRetryable = !error?.status || RETRYABLE_STATUSES.includes(error.status)
      if (!isRetryable) return errorResponse('Chat request failed', 502)
      coolingDownUntil.set(model, Date.now() + MODEL_COOLDOWN_MS)
    }
  }
  return errorResponse('Chat is busy right now', 503)
}
