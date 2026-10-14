// Content for /services and /services/[slug]. Written in first person, grounded
// in real work (Nanolix Digital, Techriv Solutions, the projects on the home page).
// `txt` collapses the line breaks used here to keep lines short.
const txt = (strings, ...values) => String.raw({ raw: strings }, ...values)
  .replace(/\s+/g, ' ')
  .trim()

export const PROCESS = [
  {
    title: 'A short call or message',
    text: txt`You tell me what you need and send whatever you have: a design, a link, a
      rough idea. I ask questions until I understand what the page or app is for.`,
  },
  {
    title: 'Scope and estimate',
    text: txt`I write down what I’ll build, what I won’t, and how long I expect it to take.
      You know what you’re getting before any work starts.`,
  },
  {
    title: 'Build with previews',
    text: txt`You get a preview link early and see progress as it happens, so feedback comes
      in while it’s still cheap to act on.`,
  },
  {
    title: 'Launch and handover',
    text: txt`I help get it live, then hand over the code with short notes on how the pieces
      fit together, so the next person isn’t left guessing.`,
  },
]

export const SERVICES = [
  {
    slug: 'react-developer',
    name: 'React development',
    summary: txt`Components, forms, state and API work for React apps that stay easy to
      change.`,
    metaTitle: 'React Developer for Hire | Ibad Khan',
    metaDescription: txt`Freelance React developer based in Hyderabad, Pakistan. Component
      work, state, forms and API integration for apps that stay fast and easy to change.`,
    keywords: ['react developer', 'hire react developer', 'freelance react developer',
      'react development services', 'react js developer pakistan'],
    h1: 'React development that stays easy to change',
    lede: txt`I build React interfaces for startups, agencies and small teams. The goal is
      simple: the screen should feel quick today, and the code should still make sense to
      whoever opens it six months from now.`,
    sections: [
      {
        heading: 'What I usually get hired for',
        body: [
          txt`Most of the React work I take on falls into one of three buckets. A team has a
            design in Figma and needs it turned into real components. An existing app has
            grown messy and every small change breaks something else. Or a product needs a
            few hard pieces built properly: a multi-step form, a dashboard with filters, a
            chat panel.`,
          txt`I’ve done all three. On the AI Fitness Coach project I built the plan views,
            habit tracking and coach chat in React on top of Next.js. At Nanolix Digital I
            write components that get reused across client sites, so I think about props
            and naming before I write the first line.`,
        ],
      },
      {
        heading: 'How I write React',
        body: [
          txt`Small components with one job. State kept close to where it’s used, and lifted
            only when two parts of the screen actually need it. I start with plain React and
            context; a library like Zustand comes in when the app clearly needs it, not by
            default.`,
          txt`Forms get real validation (I like React Hook Form). Loading and error states get
            designed instead of forgotten. Anything a keyboard user can’t reach gets fixed
            before it ships.`,
        ],
      },
      {
        heading: 'Working together',
        body: [
          txt`You’ll see a running preview early and get updates as features land. I explain
            decisions in plain language, and I leave short notes in the repo so the next
            developer doesn’t have to reverse-engineer my thinking.`,
        ],
      },
    ],
    includes: [
      'Figma to React components',
      'Cleanup and refactoring of existing code',
      'Forms with validation',
      'REST API integration',
      'State management (context, Zustand)',
      'Accessibility fixes',
      'Handover notes',
    ],
    faqs: [
      {
        q: 'Do you work with TypeScript?',
        a: txt`Yes. Some of my recent projects, like Power AI and Securify, are written in
          TypeScript. If your codebase is plain JavaScript I’ll match it instead of pushing a
          migration you didn’t ask for.`,
      },
      {
        q: 'Can you join a project that’s already underway?',
        a: txt`Yes, that’s common. I spend the first day or two reading the code and asking
          questions before I change anything.`,
      },
      {
        q: 'Do you only do frontend?',
        a: txt`Mostly. I’m comfortable wiring up REST APIs and working with a CMS, but if you
          need a complex backend built from scratch, pair me with a backend developer.`,
      },
      {
        q: 'What time zone are you in?',
        a: txt`Pakistan Standard Time (UTC+5). That overlaps well with Europe and the Gulf,
          and I can shift some hours for teams in the US.`,
      },
    ],
    related: ['nextjs-developer', 'website-speed-optimization'],
  },
  {
    slug: 'nextjs-developer',
    name: 'Next.js development',
    summary: txt`Fast, search-friendly sites and apps on the App Router, deployed cleanly to
      Vercel.`,
    metaTitle: 'Next.js Developer for Hire | Ibad Khan',
    metaDescription: txt`Next.js developer building fast, SEO-friendly sites and web apps on
      the App Router. Server components, per-page metadata and clean Vercel deploys.`,
    keywords: ['next.js developer', 'hire next.js developer', 'next.js development services',
      'next.js app router', 'next.js seo'],
    h1: 'Next.js sites that load fast and rank',
    lede: txt`Next.js is what I work in most days. I build marketing sites, product sites and
      small web apps on the App Router, with the SEO basics done properly from the start
      instead of patched on later.`,
    sections: [
      {
        heading: 'Why Next.js, and when not',
        body: [
          txt`If search traffic matters to you, or you want pages that show up almost
            instantly, Next.js is a good fit. Pages can be rendered ahead of time, metadata
            lives right next to the page it describes, and images get resized for you.`,
          txt`It isn’t always the answer. A small internal tool behind a login probably doesn’t
            need it, and if that’s your situation I’ll say so.`,
        ],
      },
      {
        heading: 'What a Next.js build with me includes',
        body: [
          txt`I set up the App Router structure, decide which parts render on the server and
            which need to run in the browser, and keep the JavaScript sent to visitors as
            small as I can. Every page gets its own title, description, canonical URL and
            social image. Sitemaps and robots files are generated from code, not edited by
            hand.`,
          txt`At Nanolix Digital most of my work is Next.js on the front with WordPress behind
            it. This portfolio runs on Next.js 16 as well, so you can click around and see
            how it behaves.`,
        ],
      },
      {
        heading: 'Moving an older site to Next.js',
        body: [
          txt`I can move a site over from plain React, Gatsby or a WordPress theme. The part
            people forget is URLs. I keep them the same where I can and add redirects where
            they have to change, so you don’t throw away rankings you’ve already earned.`,
        ],
      },
    ],
    includes: [
      'App Router setup',
      'Server and client component split',
      'Per-page metadata and Open Graph images',
      'Sitemap, robots and structured data',
      'Image and font optimisation',
      'Vercel deployment',
      'Migrations with redirects',
    ],
    faqs: [
      {
        q: 'Pages Router or App Router?',
        a: txt`New projects go on the App Router. If you have a Pages Router app that works
          fine, I won’t rewrite it just for the sake of it.`,
      },
      {
        q: 'Where will the site be hosted?',
        a: txt`Vercel is the easiest option and the one I use most. Netlify or your own
          server work too.`,
      },
      {
        q: 'Will the site be good for SEO?',
        a: txt`The technical side, yes: fast pages, clean markup, proper metadata and
          sitemaps. Rankings also depend on your content and the links pointing to you,
          which code alone can’t fix.`,
      },
    ],
    related: ['headless-wordpress-development', 'website-speed-optimization'],
  },
  {
    slug: 'responsive-web-design',
    name: 'Responsive web design',
    summary: txt`Mobile-first websites and landing pages that look intentional on every
      screen size.`,
    metaTitle: 'Responsive Web Design & Landing Pages | Ibad Khan',
    metaDescription: txt`Responsive websites and landing pages that look right on every
      screen, from a small Android phone to a wide monitor. Tailwind CSS and clean HTML.`,
    keywords: ['responsive web design', 'landing page developer', 'mobile first website',
      'figma to html', 'tailwind css developer'],
    h1: 'Responsive websites that hold up on every screen',
    lede: txt`Most of your visitors are on a phone. I build pages mobile-first, then make sure
      they still look deliberate on tablets and big monitors instead of just stretching to
      fill the space.`,
    sections: [
      {
        heading: 'What responsive actually means',
        body: [
          txt`It’s more than columns stacking on small screens. Text has to stay readable
            without zooming. Buttons need to be big enough for a thumb. Images shouldn’t ship
            at desktop size to someone on mobile data. And nothing should scroll sideways by
            accident.`,
          txt`I check every page at the common breakpoints and on real phones, not only in
            the browser’s device mode.`,
        ],
      },
      {
        heading: 'Landing pages',
        body: [
          txt`A lot of my work is single landing pages: product launches, service pages,
            campaign pages. I keep each one focused on a single action, build the sections so
            you can reorder them later, and make sure the page stays quick even with video
            or animation on it. Power AI and Landify on the home page are two examples.`,
        ],
      },
      {
        heading: 'Tools I use',
        body: [
          txt`Tailwind CSS for most new builds, Bootstrap when a project already uses it, and
            plain CSS when that’s simpler. I spent most of a year at Techriv Solutions
            building responsive pages and email templates, which is a good way to meet
            nearly every layout bug a browser can produce.`,
        ],
      },
    ],
    includes: [
      'Mobile-first layouts',
      'Landing pages',
      'Figma to HTML or Tailwind',
      'Cross-browser testing',
      'Accessible markup',
      'Optimised images',
    ],
    faqs: [
      {
        q: 'Can you work from my Figma file?',
        a: txt`Yes, that’s the usual starting point. If something in the design won’t work
          well on mobile, I’ll point it out and suggest an option rather than guess.`,
      },
      {
        q: 'Do you do the design as well?',
        a: txt`I can make small design calls and tidy up layouts, but for a full brand or
          visual design I do my best work from a designer’s files.`,
      },
      {
        q: 'Which browsers do you support?',
        a: txt`Current Chrome, Safari, Firefox and Edge, including Safari on iPhone, which is
          where most layout surprises come from.`,
      },
    ],
    related: ['web-animation-gsap', 'react-developer'],
  },
  {
    slug: 'website-speed-optimization',
    name: 'Website speed optimisation',
    summary: txt`Find what’s slowing your site down and fix it. Better Core Web Vitals, with
      before and after numbers.`,
    metaTitle: 'Website Speed & Core Web Vitals Optimization | Ibad Khan',
    metaDescription: txt`Slow website? I find what’s holding it back and fix it: images,
      JavaScript, fonts and layout shift. Better Core Web Vitals for React, Next.js and
      WordPress.`,
    keywords: ['website speed optimization', 'core web vitals', 'improve lighthouse score',
      'page speed optimization', 'next.js performance'],
    h1: 'Make your website load faster',
    lede: txt`A slow page loses people before they read a word. I look at what your site is
      actually doing while it loads, fix the parts that cost the most, and show you the
      numbers before and after.`,
    sections: [
      {
        heading: 'Where the time usually goes',
        body: [
          txt`It’s rarely one big thing. More often it’s a hero image four times larger than
            it needs to be, three fonts loading in full, a slider library used on one page
            but shipped to every page, and a cookie banner that shoves the layout down after
            it appears.`,
          txt`Each of those is fixable. Together they’re often the difference between a page
            that feels instant and one that feels broken on a mid-range phone.`,
        ],
      },
      {
        heading: 'How I approach it',
        body: [
          txt`First I measure, using Lighthouse, PageSpeed Insights and the Chrome performance
            panel, plus real visitor data from Search Console if you have it. Then I list the
            problems in order of impact, so you can see where the effort goes. Then I fix
            them one at a time and measure again after each change.`,
          txt`Improving Lighthouse scores has been a regular part of my work at Nanolix
            Digital, mostly through image optimisation, lazy loading and cutting down what
            loads up front.`,
        ],
      },
      {
        heading: 'Core Web Vitals, in plain terms',
        body: [
          txt`LCP is how long it takes for the main content to show up. INP is how quickly the
            page responds when someone taps or clicks. CLS is how much things jump around
            while the page loads. Google uses all three as ranking signals, and your
            visitors feel all three even if they’ve never heard the names.`,
        ],
      },
    ],
    includes: [
      'Performance audit, ranked by impact',
      'Image and video optimisation',
      'JavaScript and bundle trimming',
      'Font loading fixes',
      'Layout shift fixes',
      'Before and after report',
    ],
    faqs: [
      {
        q: 'Can you guarantee a perfect Lighthouse score?',
        a: txt`No, and be careful with anyone who promises one. Third-party scripts like
          analytics, ads and chat widgets cost points you sometimes can’t remove. After the
          audit I’ll tell you what’s realistic for your site.`,
      },
      {
        q: 'Do you work on WordPress sites?',
        a: txt`Yes, both regular themes and headless setups. Sites with lots of plugins tend
          to have the most room to improve.`,
      },
      {
        q: 'How long does it take?',
        a: txt`It depends on the size of the site and what the audit turns up. You’ll get a
          time estimate together with the audit, before any fixes start.`,
      },
    ],
    related: ['nextjs-developer', 'headless-wordpress-development'],
  },
  {
    slug: 'web-animation-gsap',
    name: 'Web animation (GSAP)',
    summary: txt`Scroll animation, page transitions and interactive details that stay smooth
      on ordinary phones.`,
    metaTitle: 'GSAP Web Animation & Interactive Websites | Ibad Khan',
    metaDescription: txt`Scroll animations, page transitions and interactive details built
      with GSAP, Motion and WebGL. Smooth on phones and respectful of reduced-motion
      settings.`,
    keywords: ['gsap developer', 'web animation', 'scroll animation website',
      'interactive website developer', 'creative developer'],
    h1: 'Web animation that feels smooth, not showy',
    lede: txt`Good motion helps people follow a page: where something came from, what
      changed, where to look next. I build scroll animation, transitions and small
      interactive details with GSAP and Motion, and I keep them smooth on ordinary phones.`,
    sections: [
      {
        heading: 'What I build',
        body: [
          txt`Text that reveals line by line as you scroll. Sections that pin in place while
            content moves sideways. Page transitions that cover the jump between routes.
            Buttons that lean toward the cursor. Now and then a WebGL background, when a
            brand needs something more atmospheric. This site uses most of these, so it
            doubles as a demo.`,
        ],
      },
      {
        heading: 'Keeping it fast',
        body: [
          txt`Animation is where a lot of sites start to stutter. I stick to properties the
            browser can animate cheaply, mainly transform and opacity, clean up every scroll
            trigger when you leave a page, and pause anything that’s running off-screen. If
            an effect can’t hold a steady frame rate on a mid-range Android phone, it gets
            simplified.`,
        ],
      },
      {
        heading: 'Motion and accessibility',
        body: [
          txt`Heavy scroll effects make some people feel sick. Everything I build checks the
            reduced-motion setting and falls back to a calm version where all the content is
            still readable. Nothing important is ever locked behind an animation.`,
        ],
      },
    ],
    includes: [
      'Scroll-triggered animation',
      'Pinned and horizontal scroll sections',
      'Page transitions',
      'Text reveals',
      'Smooth scrolling with Lenis',
      'Micro-interactions',
      'WebGL backgrounds',
      'Reduced-motion fallbacks',
    ],
    faqs: [
      {
        q: 'GSAP or Motion?',
        a: txt`GSAP for anything tied to scrolling or longer sequences, Motion for small state
          changes inside React components. I don’t run both on the same element.`,
      },
      {
        q: 'Will animation hurt my SEO?',
        a: txt`Not when it’s done properly. Text stays as real HTML that search engines can
          read, and the animation code loads after the content that matters.`,
      },
      {
        q: 'Can you add animation to a site I already have?',
        a: txt`Yes. I can add it section by section without rebuilding everything, as long as
          the existing markup is reasonably clean.`,
      },
    ],
    related: ['responsive-web-design', 'react-developer'],
  },
  {
    slug: 'headless-wordpress-development',
    name: 'Headless WordPress',
    summary: txt`Keep WordPress for editing, get a fast Next.js front end for visitors.`,
    metaTitle: 'Headless WordPress Development with Next.js | Ibad Khan',
    metaDescription: txt`Keep WordPress as your CMS and get a fast Next.js front end. I
      connect the WordPress REST API to a modern React site your team can still edit
      easily.`,
    keywords: ['headless wordpress', 'headless wordpress developer', 'wordpress next.js',
      'wordpress rest api', 'headless cms development'],
    h1: 'Headless WordPress with a Next.js front end',
    lede: txt`Your team already knows WordPress. Going headless lets them keep it for writing
      and editing, while the public site runs on Next.js and loads far faster than a
      typical theme.`,
    sections: [
      {
        heading: 'How it works',
        body: [
          txt`WordPress stays where it is, but only as the place content gets written. The
            site visitors see is a separate Next.js app that pulls posts, pages and custom
            fields through the WordPress REST API and turns them into fast pages.`,
          txt`This is my day-to-day work at Nanolix Digital, so the setup, the edge cases and
            the editor complaints are all familiar ground.`,
        ],
      },
      {
        heading: 'Is it right for you?',
        body: [
          txt`It’s a good fit if speed and SEO matter, if you want a custom design without
            fighting a theme, or if your WordPress site has slowed down under too many
            plugins. For a five-page brochure site that rarely changes it’s probably
            overkill, and a simple theme or static site may be the better call.`,
        ],
      },
      {
        heading: 'The details I take care of',
        body: [
          txt`Previews, so editors can check drafts before publishing. Pages that refresh when
            content changes, without redeploying the whole site. Menus, SEO fields and forms
            carried over from WordPress so nothing gets lost. Sensible image handling, so a
            huge upload doesn’t slow down the front end.`,
        ],
      },
    ],
    includes: [
      'WordPress REST API integration',
      'Custom post types and fields',
      'Draft previews',
      'On-demand revalidation',
      'SEO fields pulled from WordPress',
      'Forms with React Hook Form',
      'Migration from an existing theme',
    ],
    faqs: [
      {
        q: 'Will my editors need to learn something new?',
        a: txt`Hardly anything. They keep using the WordPress dashboard they already know.`,
      },
      {
        q: 'What happens to my plugins?',
        a: txt`Plugins that change what visitors see, like page builders and sliders, won’t
          carry over by themselves. Plugins that manage content or SEO fields usually keep
          working through the API.`,
      },
      {
        q: 'REST API or GraphQL?',
        a: txt`I mostly use the REST API because it ships with WordPress. WPGraphQL is fine
          too if your project already uses it.`,
      },
    ],
    related: ['nextjs-developer', 'website-speed-optimization'],
  },
  {
    slug: 'html-email-templates',
    name: 'HTML email templates',
    summary: txt`Hand-coded responsive emails that render properly in Gmail, Outlook and
      Apple Mail.`,
    metaTitle: 'HTML Email Template Development | Ibad Khan',
    metaDescription: txt`Responsive HTML email templates that render properly in Gmail,
      Outlook and Apple Mail. Hand-coded, mobile-first and tested before you hit send.`,
    keywords: ['html email template developer', 'responsive email templates',
      'email template coding', 'outlook email fix', 'mailchimp template developer'],
    h1: 'HTML email templates that don’t break in Outlook',
    lede: txt`Email is still built the way websites were twenty years ago: tables, inline
      styles and a lot of testing. I hand-code responsive email templates and check them in
      the inboxes your subscribers actually use.`,
    sections: [
      {
        heading: 'Why email is its own job',
        body: [
          txt`Every email client reads HTML differently. Gmail strips some styles, Outlook on
            Windows renders with Microsoft Word’s engine, and dark mode can flip your colours
            in strange ways. A template that looks perfect in a browser can fall apart in
            someone’s inbox.`,
          txt`I built and tested mobile-first email templates for most of a year at Techriv
            Solutions, so I know where the traps are.`,
        ],
      },
      {
        heading: 'What you get',
        body: [
          txt`Table-based layouts that hold together in Outlook, styles inlined where they
            need to be, alt text for when images are blocked, and a layout that drops to a
            single column on phones. I can set templates up for Mailchimp, Klaviyo or
            HubSpot, or hand over plain HTML for your own system.`,
        ],
      },
    ],
    includes: [
      'Responsive, mobile-first templates',
      'Outlook and Gmail fixes',
      'Dark mode checks',
      'Reusable content blocks',
      'Setup in Mailchimp, Klaviyo or HubSpot',
    ],
    faqs: [
      {
        q: 'Can you turn my design into an email?',
        a: txt`Yes. Send the Figma or Photoshop file and I’ll flag anything that won’t work
          well in email before I start coding.`,
      },
      {
        q: 'Do you test the templates?',
        a: txt`Yes, across the main desktop, web and mobile clients, including Outlook on
          Windows and dark mode.`,
      },
    ],
    related: ['responsive-web-design', 'website-speed-optimization'],
  },
]

export const getService = (slug) => SERVICES.find((service) => service.slug === slug)
