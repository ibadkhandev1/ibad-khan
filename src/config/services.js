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

const SERVICE_ORDER = [
  'full-stack-web-development',
  'saas-dashboard-development',
  'nextjs-developer',
  'headless-wordpress-development',
  'react-native-mobile-apps',
  'backend-api-development',
  'ai-powered-applications',
  'web-app-bug-fixes',
  'responsive-web-design',
  'react-developer',
  'website-speed-optimization',
  'web-animation-gsap',
  'html-email-templates',
]

export const SERVICES = [
  {
    slug: 'react-developer',
    name: 'React development',
    summary: txt`Components, forms, state and API work for React apps that stay easy to
      change.`,
    metaTitle: 'React Developer for Hire | Ibad Khan',
    metaDescription: txt`Freelance React developer based in Karachi, Pakistan. Component
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
          txt`I’ve done all three. On the Wobbly Ensemble project I built the responsive studio experience,
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
        a: txt`Yes. Recent projects like Wobbly Ensemble and Offset are written in
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
            or animation on it. Wobbly Ensemble and Offset on the home page are two examples.`,
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
  {
    slug: 'full-stack-web-development',
    name: 'Full-stack web applications',
    summary: txt`Complete web products with a React or Next.js interface, secure APIs, databases,
      authentication and role-based workflows.`,
    metaTitle: 'Full-Stack Web Application Development | Ibad Khan',
    metaDescription: txt`Full-stack web application development with Next.js, React, Node.js,
      Express.js and MongoDB. Authentication, APIs, dashboards and maintainable architecture.`,
    keywords: ['full-stack web development', 'full stack developer', 'next.js web application',
      'mern stack developer', 'node.js developer', 'custom web application'],
    h1: 'Full-stack products built from the interface to the database',
    lede: txt`I build web applications across the full product surface: the interface people use,
      the APIs behind it, the database that stores the work, and the permissions that keep it
      secure.`,
    sections: [
      {
        heading: 'What I can build',
        body: [
          txt`This is a good fit for a product that needs more than a marketing site: user
            accounts, dashboards, forms, search, file uploads, team areas, or an internal tool
            that has to connect to real business data.`,
          txt`I use React and Next.js for the product interface, Node.js and Express.js for APIs,
            and MongoDB, Mongoose or Supabase where the data belongs. The exact stack follows
            the product instead of being chosen for its own sake.`,
        ],
      },
      {
        heading: 'The parts that matter',
        body: [
          txt`Authentication, validation, error states and permissions are part of the feature,
            not tasks to leave until the end. I keep the code modular so a new workflow does
            not require rewriting the whole application.`,
        ],
      },
      {
        heading: 'A practical build process',
        body: [
          txt`I start with the most important user journey, connect it to real data early, and
            share a working preview before polishing every screen. That exposes API and data
            decisions while they are still easy to change.`,
        ],
      },
    ],
    includes: [
      'React or Next.js application architecture',
      'Node.js and Express.js APIs',
      'MongoDB, Mongoose or Supabase integration',
      'Authentication and role-based access',
      'Admin and internal dashboards',
      'File uploads and third-party integrations',
      'Deployment and handover notes',
    ],
    faqs: [
      {
        q: 'Can you work with an existing backend?',
        a: txt`Yes. I can connect a Next.js or React interface to an existing API, document the
          integration points and improve the areas that need attention without replacing the
          whole backend.`,
      },
      {
        q: 'Can you build the frontend and backend together?',
        a: txt`Yes. I am comfortable taking a feature from its screen and user flow through the
          API, database model, validation and permissions.`,
      },
      {
        q: 'What do you need to start?',
        a: txt`A short description of the users, the main workflow and anything you already have:
          designs, an existing repository, API documentation or examples of products you like.`,
      },
    ],
    related: ['nextjs-developer', 'saas-dashboard-development', 'backend-api-development'],
  },
  {
    slug: 'saas-dashboard-development',
    name: 'SaaS dashboards',
    summary: txt`Role-based SaaS dashboards with user management, analytics, subscriptions and
      API-driven workflows that stay clear as the product grows.`,
    metaTitle: 'SaaS Dashboard Development | Ibad Khan',
    metaDescription: txt`SaaS dashboard development with React, Next.js, Node.js and MongoDB.
      User management, analytics, teams, subscriptions and role-based workflows.`,
    keywords: ['saas dashboard development', 'admin dashboard developer', 'react dashboard',
      'next.js dashboard', 'role-based dashboard', 'saas application developer'],
    h1: 'SaaS dashboards that make complex work feel clear',
    lede: txt`A good dashboard gives people the right information at the right moment. I build
      SaaS interfaces for teams, admins and operators, connected to the workflows that make the
      product useful.`,
    sections: [
      {
        heading: 'Beyond a collection of tables',
        body: [
          txt`Dashboards usually combine several jobs: onboarding, user management, analytics,
            team permissions, subscriptions and actions that change real records. I map those
            states before building so loading, empty, error and success states all make sense.`,
          txt`I have worked on AI-powered SaaS products, proposal management platforms and
            business applications with reusable React interfaces and API-driven workflows.`,
        ],
      },
      {
        heading: 'Structure that can grow',
        body: [
          txt`Reusable layout, navigation and data-display patterns make the next feature less
            expensive. Permissions stay explicit, forms are validated, and destructive actions
            get confirmation instead of relying on users to be careful.`,
        ],
      },
      {
        heading: 'Useful from the first preview',
        body: [
          txt`I connect an early dashboard to realistic data rather than presenting empty boxes.
            That makes feedback concrete and reveals which metrics, filters and actions the team
            actually needs.`,
        ],
      },
    ],
    includes: [
      'SaaS product interface architecture',
      'Admin and operations dashboards',
      'User, team and role management',
      'Analytics, filters and data views',
      'Subscription and account interfaces',
      'API integration and loading states',
      'Responsive and accessible workflows',
    ],
    faqs: [
      {
        q: 'Can you improve a dashboard that already exists?',
        a: txt`Yes. I can work through the current navigation, data states and most-used flows,
          then improve the highest-friction areas without forcing a full redesign.`,
      },
      {
        q: 'Do you build the API as well?',
        a: txt`Yes, when the project needs it. I can build or extend Node.js and Express.js APIs,
          connect MongoDB or Supabase, and keep the dashboard and backend changes coordinated.`,
      },
      {
        q: 'Can the dashboard work on mobile?',
        a: txt`Yes. I decide which information needs to remain visible on a small screen and turn
          dense tables and controls into usable mobile flows instead of simply shrinking them.`,
      },
    ],
    related: ['full-stack-web-development', 'react-developer', 'backend-api-development'],
  },
  {
    slug: 'react-native-mobile-apps',
    name: 'React Native mobile apps',
    summary: txt`React Native and Expo app features with authentication, API integration, bug
      fixes, Android builds and Google Play publishing support.`,
    metaTitle: 'React Native Mobile App Development | Ibad Khan',
    metaDescription: txt`React Native and Expo mobile app development for Android and iOS.
      UI, authentication, API integration, bug fixes, builds and Google Play publishing.`,
    keywords: ['react native developer', 'expo developer', 'mobile app development',
      'android app developer', 'react native bug fixes', 'google play app publishing'],
    h1: 'Mobile app features that feel at home on a phone',
    lede: txt`I build and improve React Native and Expo applications, from mobile UI and API
      integration to authentication, bug fixing, Android builds and publishing updates through
      Google Play Console.`,
    sections: [
      {
        heading: 'What I work on',
        body: [
          txt`I can add a new mobile flow, connect screens to an existing API, fix an awkward
            interaction or help an app get ready for its next Android release. I work with the
            existing product rather than treating every feature as a blank slate.`,
          txt`The work can include messaging interfaces, voice and video calling fixes,
            authentication, mobile UI improvements and release preparation.`,
        ],
      },
      {
        heading: 'Mobile-specific details',
        body: [
          txt`A mobile layout needs thumb-sized controls, clear loading states, sensible keyboard
            behavior and feedback when a network request takes time. I test the important paths
            on narrow screens and account for the differences between development and release
            builds.`,
        ],
      },
      {
        heading: 'From feature to store',
        body: [
          txt`When the feature is ready, I can help with Android builds, release checks and
            publishing updates through Google Play Console so the work does not stop at a local
            simulator.`,
        ],
      },
    ],
    includes: [
      'React Native and Expo screens',
      'Authentication and API integration',
      'Mobile UI improvements',
      'Messaging and communication flows',
      'Bug fixing and release preparation',
      'Android builds and Google Play updates',
    ],
    faqs: [
      {
        q: 'Do you work on an existing React Native app?',
        a: txt`Yes. I can start from the existing repository, reproduce the issue or flow, and
          make the smallest safe change that fits the current architecture.`,
      },
      {
        q: 'Can you publish the app for me?',
        a: txt`I can prepare Android builds and guide or assist with publishing updates through
          Google Play Console. Store ownership and release credentials remain with you.`,
      },
      {
        q: 'Do you support Flutter too?',
        a: txt`My main mobile work is React Native and Expo. I can review the scope of a Flutter
          task first and be clear about whether it fits my current workflow.`,
      },
    ],
    related: ['full-stack-web-development', 'web-app-bug-fixes', 'responsive-web-design'],
  },
  {
    slug: 'backend-api-development',
    name: 'Backend APIs and databases',
    summary: txt`Node.js APIs, authentication, CRUD workflows, database schemas, file uploads and
      integrations for products that need a dependable backend.`,
    metaTitle: 'Node.js Backend API Development | Ibad Khan',
    metaDescription: txt`Backend API development with Node.js, Express.js, MongoDB, Mongoose and
      Supabase. Authentication, CRUD, schemas, uploads and third-party integrations.`,
    keywords: ['node.js backend developer', 'express.js developer', 'rest api development',
      'mongodb developer', 'supabase developer', 'backend api development'],
    h1: 'Backend APIs that give the product a reliable foundation',
    lede: txt`I build the services behind web and mobile products: authenticated APIs, database
      schemas, CRUD workflows, file uploads and integrations that are clear enough to maintain
      after launch.`,
    sections: [
      {
        heading: 'The backend behind a real feature',
        body: [
          txt`A screen is only useful when the data behind it is consistent. I connect routes,
            validation, permissions and database operations around the user journey, then make
            the response states clear for the frontend or mobile app consuming them.`,
          txt`My usual tools include Node.js, Express.js, MongoDB, Mongoose and Supabase, along
            with JWT authentication, OAuth, file uploads and third-party API integrations.`,
        ],
      },
      {
        heading: 'Security and maintainability',
        body: [
          txt`Authentication is not just a login form. The API needs to check what a user can do,
            validate incoming data and return useful errors without leaking internal details. I
            keep those rules visible and organized so future changes do not become guesswork.`,
        ],
      },
      {
        heading: 'Fits the product you already have',
        body: [
          txt`I can build a new API, extend an existing service or connect a frontend to a backend
            that another developer owns. The first step is understanding the current data model
            and the contract the client already depends on.`,
        ],
      },
    ],
    includes: [
      'Node.js and Express.js REST APIs',
      'MongoDB and Mongoose schemas',
      'Supabase integrations',
      'JWT authentication and OAuth',
      'CRUD and role-based workflows',
      'File uploads and external APIs',
      'Frontend and mobile integration',
    ],
    faqs: [
      {
        q: 'Can you document the API too?',
        a: txt`Yes. I can leave route, payload and setup notes alongside the implementation so
          the frontend, mobile app or next developer has a clear contract to work from.`,
      },
      {
        q: 'Can you fix a broken API instead of building one?',
        a: txt`Yes. I can trace the request from the client through the route, validation and
          database operation, then fix the underlying issue rather than masking the symptom.`,
      },
      {
        q: 'Which database should my project use?',
        a: txt`That depends on the product and what you already have. I can work with MongoDB,
          Mongoose or Supabase and explain the tradeoffs before changing the data layer.`,
      },
    ],
    related: ['full-stack-web-development', 'saas-dashboard-development', 'web-app-bug-fixes'],
  },
  {
    slug: 'ai-powered-applications',
    name: 'AI-powered applications',
    summary: txt`AI features connected to real products: content generation, search interfaces,
      proposal workflows and practical automation.`,
    metaTitle: 'AI-Powered Web Application Development | Ibad Khan',
    metaDescription: txt`AI-powered web application development for content generation, search,
      proposal workflows and automation using React, Next.js and backend integrations.`,
    keywords: ['ai application developer', 'ai web app development', 'ai agent development',
      'ai saas developer', 'ai workflow automation', 'ai proposal platform'],
    h1: 'AI features connected to products people can actually use',
    lede: txt`I integrate AI into web applications where it supports a real workflow: generating
      content, searching information, assisting proposals or automating repetitive work inside a
      product your team already understands.`,
    sections: [
      {
        heading: 'Useful AI, not a disconnected demo',
        body: [
          txt`The best AI feature usually sits inside an existing journey. That might be a
            proposal editor, a search interface, a content workflow or an internal dashboard. I
            build the surrounding UI, connect the service to the backend and make the output easy
            for a person to review and act on.`,
          txt`I have worked on AI-powered SaaS products with proposal generation, a block-based
            editor, team management, analytics and integrations.`,
        ],
      },
      {
        heading: 'A responsible product surface',
        body: [
          txt`Generated output needs loading, error, empty and retry states, plus a clear way for
            users to edit or reject it. I keep AI actions visible in the interface and avoid
            pretending that generated content is automatically correct.`,
        ],
      },
      {
        heading: 'Works with your stack',
        body: [
          txt`The feature can live in a Next.js product, a React dashboard or a mobile workflow.
            I can connect it to existing APIs and data rather than asking you to rebuild the
            whole application around a new tool.`,
        ],
      },
    ],
    includes: [
      'AI service integration',
      'Content generation workflows',
      'Search and assistant interfaces',
      'Proposal and RFP workflows',
      'Review, retry and error states',
      'API and database integration',
      'Automation inside existing products',
    ],
    faqs: [
      {
        q: 'Can you add AI to an existing SaaS product?',
        a: txt`Yes. I can start with one focused workflow, connect it to your current auth and
          data model, and keep the first release small enough to evaluate with real users.`,
      },
      {
        q: 'Can the AI output be edited before it is used?',
        a: txt`It should be. I build reviewable interfaces where people can inspect, edit and
          approve generated content before it becomes part of a final workflow.`,
      },
      {
        q: 'Do you build the complete interface too?',
        a: txt`Yes. I can handle the React or Next.js interface, the API integration and the
          surrounding product states needed to make the AI feature usable.`,
      },
    ],
    related: ['saas-dashboard-development', 'full-stack-web-development', 'backend-api-development'],
  },
  {
    slug: 'web-app-bug-fixes',
    name: 'Web and mobile app fixes',
    summary: txt`Find and fix UI bugs, broken APIs, authentication issues, CMS problems, performance
      bottlenecks and mobile errors across an existing project.`,
    metaTitle: 'React, Next.js and Mobile App Bug Fixes | Ibad Khan',
    metaDescription: txt`Bug fixing for React, Next.js, WordPress, Node.js and React Native
      projects. UI bugs, broken APIs, authentication, CMS, performance and mobile issues.`,
    keywords: ['react bug fix', 'next.js bug fix', 'website bug fixes', 'node.js bug fix',
      'react native bug fix', 'wordpress bug fix'],
    h1: 'Fixes that solve the cause, not just the symptom',
    lede: txt`I investigate existing React, Next.js, WordPress, Node.js and React Native projects,
      reproduce the problem, explain what is happening and make a focused fix that fits the
      codebase.`,
    sections: [
      {
        heading: 'The problems I commonly take on',
        body: [
          txt`Broken layouts, failing API requests, authentication loops, CMS content that does
            not appear, slow pages, confusing dashboard states and mobile application errors are
            all easier to fix once the full path is visible.`,
          txt`I check the browser or device behavior, the frontend state, the network request and
            the backend or CMS response instead of changing the first line that looks suspicious.`,
        ],
      },
      {
        heading: 'A safe way to enter an existing codebase',
        body: [
          txt`I start by reading the relevant structure, reproducing the issue and identifying
            the smallest useful change. I keep the fix scoped, explain any risks and leave notes
            when the behavior is likely to matter again later.`,
        ],
      },
      {
        heading: 'After the fix',
        body: [
          txt`The goal is not only that the error disappears on my machine. I check the affected
            flow at its important breakpoints, confirm the loading and error states, and tell you
            what changed and what is worth watching next.`,
        ],
      },
    ],
    includes: [
      'React and Next.js UI bugs',
      'Broken Node.js and REST APIs',
      'Authentication and permissions issues',
      'WordPress and CMS problems',
      'Performance bottlenecks',
      'React Native and Android issues',
      'Focused fixes with handover notes',
    ],
    faqs: [
      {
        q: 'Can you investigate before I know the exact cause?',
        a: txt`Yes. A useful bug report can be as simple as what you expected, what happened
          instead and how to reproduce it. I can trace the rest from there.`,
      },
      {
        q: 'Will you rewrite the whole project?',
        a: txt`Not by default. I prefer a focused fix that respects the existing project unless
          the evidence shows that a larger change is the safer and more maintainable option.`,
      },
      {
        q: 'Can you take over ongoing maintenance?',
        a: txt`Yes. We can start with one issue, then decide whether ongoing fixes and small
          improvements make sense for the project.`,
      },
    ],
    related: ['react-developer', 'backend-api-development', 'react-native-mobile-apps'],
  },
].sort((a, b) => SERVICE_ORDER.indexOf(a.slug) - SERVICE_ORDER.indexOf(b.slug))

export const getService = (slug) => SERVICES.find((service) => service.slug === slug)
