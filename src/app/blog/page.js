import { BLOG_POSTS } from '@/config/seo';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import FadeContent from '@/components/ui/FadeContent';

export const metadata = {
  title: 'Blog - Ibad Khan | Frontend Development Articles',
  description:
    'Read in-depth articles about React, Next.js, Tailwind CSS, web performance, and modern frontend development practices. Expert tips and tutorials.',
  keywords: ['blog', 'frontend', 'react', 'nextjs', 'web development', 'tutorials'],
  openGraph: {
    title: 'Blog - Ibad Khan | Frontend Development Articles',
    description: 'Expert articles on React, Next.js, and modern web development.',
    type: 'website',
  },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 pt-32">
        <div className="max-w-5xl mx-auto">
          <FadeContent blur>
            <h1 className="font-[500] text-[48px] sm:text-[56px] leading-[1.1] tracking-[-2px] mb-6 text-ink">
              Articles & Insights
            </h1>
          </FadeContent>

          <FadeContent delay={0.1} blur>
            <p className="text-[16px] text-ink-muted leading-relaxed max-w-2xl tracking-[-0.15px]">
              Deep dives into React, Next.js, web performance, and modern frontend development. Tips, tricks, and best practices to level up your skills.
            </p>
          </FadeContent>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 border-t border-hairline">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post, index) => (
              <FadeContent key={post.id} delay={index * 0.1}>
                <article className="group h-full">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="p-8 rounded-xl border border-hairline bg-surface-1 hover:bg-surface-2 transition-colors h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono text-accent-blue tracking-wider uppercase">
                          {post.category}
                        </span>
                        <span className="text-xs font-mono text-ink-muted">{post.readTime} min read</span>
                      </div>

                      <h2 className="text-[22px] font-bold leading-[1.2] tracking-[-0.8px] mb-3 text-ink group-hover:text-accent-blue transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-[15px] text-ink-muted leading-relaxed mb-6 flex-grow">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <time className="text-xs text-ink-muted font-mono">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                        <svg className="w-4 h-4 text-ink-muted group-hover:text-accent-blue group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </article>
              </FadeContent>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
