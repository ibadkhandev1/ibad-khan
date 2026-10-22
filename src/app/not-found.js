import NotFound from '@/components/sections/NotFound'

// Next.js serves this with a real 404 status for any unknown route.
export const metadata = {
  title: 'Page not found | Ibad Khan',
  description: 'This page doesn’t exist. Find your way back to the work, services or blog.',
  robots: { index: false, follow: true },
}

export default function NotFoundPage() {
  return <NotFound />
}
