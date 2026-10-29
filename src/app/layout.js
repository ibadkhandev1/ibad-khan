import { Anybody, DM_Mono, Gabarito } from 'next/font/google'
import Script from 'next/script'
import 'lenis/dist/lenis.css'
import './globals.css'
import { BASE_URL } from './constants'
import JsonLd from '@/components/JsonLd'
import { SmoothScroll } from '@/lib/lenis'
import TransitionProvider from '@/components/layout/TransitionProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/layout/Cursor'
import Preloader from '@/components/layout/Preloader'
import ChatWidget from '@/components/chat/ChatWidget'
import { PALETTE_BOOT_SCRIPT } from '@/config/palettes'

// Anybody's wdth axis (50–150) is a live prop in the hero, so it ships variable.
const display = Anybody({
  variable: '--font-anybody',
  subsets: ['latin'],
  axes: ['wdth'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const text = Gabarito({
  variable: '--font-gabarito',
  subsets: ['latin'],
  display: 'swap',
})

const mono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

const TITLE = 'Ibad Khan | Frontend Developer'
const DESCRIPTION =
  'Frontend developer building modern, performant web experiences with React, Next.js, '
  + 'and Tailwind CSS. Based in Hyderabad.'
const OG_IMAGE = `${BASE_URL}/featured-image.jpg`

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'frontend developer',
    'react developer',
    'next.js',
    'creative developer',
    'gsap',
    'web developer',
    'portfolio',
    'ibad khan',
    'hyderabad',
  ],
  authors: [{ name: 'Ibad Khan' }],
  creator: 'Ibad Khan',
  icons: { icon: '/ibad-fav.svg' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: 'Ibad Khan Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [{ url: OG_IMAGE, alt: 'Ibad Khan portfolio preview image' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
}

export const viewport = {
  themeColor: '#f7f0e3',
  colorScheme: 'light',
}

export default function RootLayout({ children }) {
  const fontVars = `${display.variable} ${text.variable} ${mono.variable}`

  return (
    <html lang="en" className={`${fontVars} is-loading antialiased`} suppressHydrationWarning>
      <body>
        <Script id="palette-boot" strategy="beforeInteractive">
          {PALETTE_BOOT_SCRIPT}
        </Script>
        <noscript>
          <style>{'.preloader{display:none!important}html.is-loading{overflow:auto}'}</style>
        </noscript>
        <a href="#main" className="skip-link">Skip to content</a>
        <SmoothScroll />
        <TransitionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </TransitionProvider>
        <Cursor />
        <Preloader />
        <JsonLd />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YWRZDLSG2Q"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YWRZDLSG2Q');
          `}
        </Script>
      </body>
    </html>
  )
}
