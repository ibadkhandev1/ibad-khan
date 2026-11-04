export default function manifest() {
  return {
    name: 'Ibad Khan | Full Stack Developer',
    short_name: 'Ibad Khan',
    description:
      'Full Stack Developer building web applications, CMS-powered websites, SaaS dashboards, and mobile apps.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/ibad-fav.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
