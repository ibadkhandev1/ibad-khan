import { BLOG_POSTS } from '@/config/seo';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import FadeContent from '@/components/ui/FadeContent';

// Generate static params for all blog posts
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export function generateMetadata({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for does not exist.',
    };
  }

  return {
    title: `${post.title} | Ibad Khan Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
  };
}

// Blog post content templates
const BLOG_CONTENT = {
  'react-best-practices-high-performance-components': {
    content: `React has become the go-to library for building interactive user interfaces. However, knowing how to write React code and writing performant React code are two different things. In this article, we'll explore essential best practices that will help you build high-performance, maintainable React applications.

## Understanding React Render Optimization

React's virtual DOM is powerful, but understanding how it works is crucial for optimization. When a component re-renders, React compares the new virtual DOM with the previous one and updates only the necessary parts in the actual DOM.

### Key Concepts:
- **Memoization**: Use React.memo() to prevent unnecessary re-renders
- **useMemo Hook**: Cache expensive computations
- **useCallback Hook**: Memoize function references
- **Proper Key Usage**: Use unique and stable keys in lists

## Component Structure Best Practices

Breaking down your components into smaller, focused pieces is fundamental to React development. Each component should have a single responsibility and should be easy to test.

### Tips:
1. Keep components small and focused
2. Use composition over inheritance
3. Lift state only when necessary
4. Use custom hooks to share logic

## State Management

Choosing the right approach for managing state can significantly impact your application's performance and maintainability.

- Local state for component-specific data
- Context API for global state
- Consider Redux or Zustand for complex state trees

## Code Splitting and Lazy Loading

React.lazy() and Suspense enable code splitting, which can significantly reduce initial bundle sizes.

\`\`\`jsx
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
\`\`\`

## Performance Monitoring

Use React DevTools Profiler to identify performance bottlenecks. Look for components that render unnecessarily and optimize accordingly.

## Conclusion

Building performant React applications requires understanding core concepts and applying best practices consistently. Start with these fundamentals and continue to measure and optimize as your application grows.`,
  },
  'nextjs-guide-basics-advanced-patterns': {
    content: `Next.js has revolutionized the way we build React applications. With features like server-side rendering, static generation, and API routes built-in, it's the perfect framework for modern web development.

## What is Next.js?

Next.js is a React framework that enables production-grade applications with server-side rendering, static site generation, and API routes. It provides an excellent developer experience and incredible performance out of the box.

## The App Router

The App Router (introduced in Next.js 13) provides a new way to organize your application. It uses a directory-based routing system where the folder structure automatically becomes your API.

### File Organization:
\`\`\`
app/
├── page.js                 # Home page
├── layout.js              # Root layout
├── blog/
│   ├── page.js           # /blog
│   └── [slug]/
│       └── page.js       # /blog/[slug]
└── api/
    └── posts/
        └── route.js      # /api/posts
\`\`\`

## Server vs. Client Components

Next.js 13+ introduced Server Components by default, which can significantly improve performance:

- **Server Components**: Render on the server, great for data fetching
- **Client Components**: Use 'use client' directive for interactivity

## Data Fetching Patterns

Next.js supports multiple data fetching patterns:

1. **Static Generation (ISG)**: Pre-render at build time
2. **Server-Side Rendering (SSR)**: Render on each request
3. **Incremental Static Regeneration (ISR)**: Update static pages

## API Routes and Edge Functions

Create API endpoints directly in your Next.js app:

\`\`\`js
// app/api/posts/route.js
export async function GET(request) {
  return Response.json({ posts: [] });
}
\`\`\`

## Deployment and Optimization

Next.js is optimized for Vercel deployment, but works great on any Node.js hosting. Features like Image Optimization and Font Optimization are built-in.

## Advanced Patterns

- Middleware for authentication and redirects
- Dynamic imports for code splitting
- Streaming with Suspense
- Concurrent rendering features

## Conclusion

Next.js takes the guesswork out of React development by providing opinions and built-in solutions for common challenges. Whether you're building a blog, e-commerce site, or SaaS application, Next.js has you covered.`,
  },
  'advanced-tailwind-css-custom-design-systems': {
    content: `Tailwind CSS has transformed how developers approach styling. Moving beyond the basics, let's explore how to build custom design systems and optimize Tailwind for production.

## Tailwind Fundamentals

Tailwind CSS is a utility-first CSS framework that lets you build custom designs without leaving your HTML. Instead of writing CSS, you compose designs using pre-made utility classes.

## Creating Custom Components

While utilities are powerful, you can extend Tailwind with custom component classes:

\`\`\`css
@layer components {
  @apply rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-medium;
  
  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }
}
\`\`\`

## Design System Setup

Building a design system with Tailwind involves:

1. **Color System**: Define a comprehensive color palette
2. **Typography Scale**: Establish font sizes and weights
3. **Spacing Scale**: Consistent spacing values
4. **Component Library**: Create reusable component patterns

## Configuration Customization

Extend Tailwind's default configuration:

\`\`\`js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#0066cc',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
};
\`\`\`

## Performance Optimization

Tailwind purges unused styles in production, but you can optimize further:

- Use content paths correctly
- Consider using CSS variables for dynamic theming
- Implement proper dark mode strategies

## Advanced Features

- Arbitrary values: \`w-[127px]\`
- Responsive design: \`md:text-lg\`
- Dark mode: \`dark:bg-gray-900\`
- Animation utilities: \`animate-spin\`

## Conclusion

By understanding Tailwind's capabilities and customization options, you can create consistent, maintainable, and performant design systems that scale with your application.`,
  },
  'web-performance-optimization-react-apps': {
    content: `Web performance is critical for user experience and SEO. Slow websites lose users and rankings. Let's explore comprehensive strategies for optimizing React applications.

## Core Web Vitals

Google's Core Web Vitals are key metrics for measuring web performance:

1. **Largest Contentful Paint (LCP)**: How quickly the main content loads
2. **First Input Delay (FID)**: Responsiveness to user input
3. **Cumulative Layout Shift (CLS)**: Visual stability

## Code Splitting and Bundling

Large JavaScript bundles impact performance:

\`\`\`jsx
// Dynamic import for code splitting
const Dashboard = React.lazy(() => import('./Dashboard'));
\`\`\`

## Image Optimization

Images often consume the most bandwidth:

- Use Next.js Image component for automatic optimization
- Serve WebP format when available
- Implement lazy loading
- Use appropriate image sizes

## Caching Strategies

Implement proper caching:

- Browser caching with correct headers
- Service Workers for offline support
- HTTP/2 Server Push for critical resources

## Database and API Optimization

- Use pagination for large datasets
- Implement GraphQL to fetch only needed data
- Cache API responses appropriately
- Use CDNs for static content

## React-Specific Optimizations

- Avoid inline functions in render
- Use React.memo for expensive components
- Implement virtualization for long lists
- Optimize dependency arrays in hooks

## Monitoring and Measurement

- Use Lighthouse for performance audits
- Set up monitoring with tools like Sentry
- Track metrics with analytics
- Continuously measure and optimize

## Conclusion

Performance optimization is an ongoing process. By implementing these strategies systematically, you can ensure your React applications provide excellent user experiences.`,
  },
  'responsive-web-design-best-practices-modern-devices': {
    content: `Responsive web design is no longer optional—it's essential. With devices of all sizes accessing the web, building responsive websites is a fundamental skill.

## Mobile-First Approach

Start designing for mobile devices first, then enhance for larger screens:

\`\`\`css
/* Mobile first */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 4rem;
  }
}
\`\`\`

## Flexible Layouts

Use relative units and flexible layouts:

- Use percentages for widths
- Use rem/em for font sizes
- Use flexbox and CSS Grid for layouts
- Avoid fixed pixel values

## Media Queries Best Practices

Write efficient media queries:

\`\`\`css
/* Good: Mobile first */
@media (min-width: 768px) {
  /* Tablet styles */
}

/* Avoid: Desktop first approach */
@media (max-width: 1024px) {
  /* Styles */
}
\`\`\`

## Responsive Images

Images are crucial in responsive design:

- Use max-width: 100% for images
- Implement srcset for different resolutions
- Use picture element for art direction
- Compress and optimize images

## Typography Scaling

Scale typography responsively:

\`\`\`css
h1 {
  font-size: 1.5rem; /* Mobile */
}

@media (min-width: 768px) {
  h1 {
    font-size: 2.5rem; /* Desktop */
  }
}
\`\`\`

## Viewport Meta Tag

Always include the viewport meta tag:

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

## Testing Responsiveness

- Use browser developer tools
- Test on real devices
- Use responsive testing tools
- Implement automated testing

## Common Breakpoints

- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Desktop: 769px - 1024px
- Large Desktop: 1025px+

## Conclusion

Responsive web design ensures your website looks great and functions perfectly on every device. By following these best practices, you'll create inclusive, accessible web experiences.`,
  },
  'gsap-animations-smooth-professional-web-animations': {
    content: `GSAP (GreenSock Animation Platform) is the industry-standard JavaScript animation library. Let's explore how to create smooth, professional animations.

## Getting Started with GSAP

GSAP provides a simple yet powerful API for animating anything:

\`\`\`js
import gsap from 'gsap';

// Basic animation
gsap.to('.box', { duration: 1, x: 100, opacity: 0.5 });

// From animation (starting point)
gsap.from('.box', { duration: 1, opacity: 0, y: 20 });

// Combining to and from
gsap.fromTo('.box', 
  { opacity: 0, y: 20 }, 
  { opacity: 1, y: 0, duration: 1 }
);
\`\`\`

## Timeline Animations

Timelines let you sequence animations:

\`\`\`js
const tl = gsap.timeline();

tl.to('.box1', { x: 100, duration: 1 })
  .to('.box2', { x: 100, duration: 1 }, '-=0.5') // Start 0.5s before box1 ends
  .to('.box3', { x: 100, duration: 1 });
\`\`\`

## Easing Functions

Easing creates natural motion:

- ease: 'power1.inOut' (simple)
- ease: 'power4.out' (aggressive)
- ease: 'back.out' (overshoot)
- ease: 'elastic.out' (bouncy)

## Staggering Animations

Animate multiple elements with delays:

\`\`\`js
gsap.to('.item', {
  duration: 0.5,
  opacity: 1,
  y: 0,
  stagger: 0.1, // 0.1s between each animation
  ease: 'power2.out',
});
\`\`\`

## Scroll Animations

Trigger animations on scroll with ScrollTrigger:

\`\`\`js
gsap.registerPlugin(ScrollTrigger);

gsap.to('.element', {
  scrollTrigger: {
    trigger: '.element',
    start: 'top center',
    end: 'bottom center',
    scrub: 1,
  },
  rotation: 360,
  opacity: 1,
});
\`\`\`

## Performance Tips

- Use transform and opacity for best performance
- Avoid animating width/height
- Use GPU acceleration with will-change
- Throttle scroll events
- Kill animations when done

## React Integration

Use GSAP with React safely:

\`\`\`jsx
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

function AnimatedBox() {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.to(boxRef.current, { x: 100, duration: 1 });
  }, []);

  return <div ref={boxRef} className="box" />;
}
\`\`\`

## Conclusion

GSAP empowers you to create engaging, smooth animations that enhance user experience. With proper implementation, animations can make your website feel polished and professional.`,
  },
};

export default function BlogPostPage({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <section className="py-24 sm:py-32 px-6 sm:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-ink">Article Not Found</h1>
          <p className="text-ink-muted mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog" className="text-accent-blue hover:text-accent-blue/80 transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  const content = BLOG_CONTENT[post.slug];

  return (
    <>
      <Navbar />
      {/* Article Header */}
      <article className="py-24 sm:py-32 px-6 sm:px-12 pt-32 border-b border-hairline">
        <div className="max-w-3xl mx-auto">
          <FadeContent blur>
            <Link href="/blog" className="text-sm text-accent-blue hover:text-accent-blue/80 transition-colors mb-6 inline-block">
              ← Back to Blog
            </Link>
          </FadeContent>

          <FadeContent delay={0.1} blur>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-mono text-accent-blue tracking-wider uppercase">
                {post.category}
              </span>
              <time className="text-xs text-ink-muted font-mono">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </FadeContent>

          <FadeContent delay={0.2} blur>
            <h1 className="font-[500] text-[40px] sm:text-[48px] leading-[1.2] tracking-[-1px] mb-6 text-ink">
              {post.title}
            </h1>
          </FadeContent>

          <FadeContent delay={0.3} blur>
            <p className="text-[16px] text-ink-muted leading-relaxed mb-4">
              {post.excerpt}
            </p>
            <p className="text-xs text-ink-muted font-mono">{post.readTime} min read</p>
          </FadeContent>
        </div>
      </article>

      {/* Article Content */}
      <section className="py-12 sm:py-16 px-6 sm:px-12">
        <div className="max-w-3xl mx-auto prose prose-invert max-w-none">
          <div className="text-ink leading-relaxed whitespace-pre-wrap">
            {content?.content || 'Content coming soon...'}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 border-t border-hairline bg-surface-1">
        <div className="max-w-3xl mx-auto text-center">
          <FadeContent blur>
            <h2 className="text-[28px] sm:text-[32px] font-bold leading-[1.2] tracking-[-0.8px] mb-6 text-ink">
              Want to work together?
            </h2>
          </FadeContent>

          <FadeContent delay={0.1} blur>
            <p className="text-[15px] text-ink-muted leading-relaxed mb-8">
              If you're interested in discussing web development, design, or want to collaborate on a project, let's connect.
            </p>
          </FadeContent>

          <FadeContent delay={0.2}>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-black text-sm font-medium hover:opacity-90 transition-all"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </FadeContent>
        </div>
      </section>
    </>
  );
}
