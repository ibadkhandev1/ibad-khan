export default function manifest() {
  return {
    name: 'Ibad Khan | Frontend Developer',
    short_name: 'Ibad Khan',
    description:
      'Frontend developer building modern, performant web experiences with React, Next.js, and Tailwind CSS.',
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
