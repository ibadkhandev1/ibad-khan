import Markdown from 'react-markdown'
import { PERSONAL_INFO } from '@/config/personal'

// Only what a short chat reply needs. Raw HTML is never rendered (react-markdown
// default), and anything outside this list is unwrapped to its text.
const ALLOWED_ELEMENTS = ['p', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'br']

const EMAIL_PATTERN = new RegExp(
  `(?<![\\[(:/])${PERSONAL_INFO.email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
  'g',
)

// Safety net in case the model writes the email as plain text instead of a link.
const linkifyEmail = (text) =>
  text.replace(EMAIL_PATTERN, `[${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email})`)

// Links back to this site become relative so they open in place (and work in dev).
const toSameSiteHref = (href) => {
  if (!href?.startsWith(PERSONAL_INFO.siteUrl)) return href
  return href.slice(PERSONAL_INFO.siteUrl.length) || '/'
}

function ChatLink({ href, children }) {
  const resolved = toSameSiteHref(href)
  const isExternal = /^https?:\/\//.test(resolved ?? '')
  return (
    <a
      href={resolved}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
    </a>
  )
}

const COMPONENTS = { a: ChatLink }

export default function ChatMessageContent({ role, content }) {
  if (role === 'user') return content
  return (
    <div className="chat-markdown">
      <Markdown allowedElements={ALLOWED_ELEMENTS} unwrapDisallowed components={COMPONENTS}>
        {linkifyEmail(content)}
      </Markdown>
    </div>
  )
}
