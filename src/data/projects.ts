import { Project, Service, Testimonial, FaqItem, BlogPost } from '../types';

export const BRAND_LOGOS = [
  'META ADS MANAGER',
  'CONVERSIONS API (CAPI)',
  'ADVANTAGE+ SHOPPING',
  '100% UI/UX CRAFT',
  'FIGMA PROTOTYPING',
  'SAAS GROWTH FUNNELS',
  'REACT & TYPESCRIPT',
  'CREATIVE TESTING',
  'WEB CONVERSION CRO',
  'DYNAMIC AD CREATIVES'
];

export const PROJECTS: Project[] = [
  {
    id: 'scaleflow-meta-ads',
    title: 'ScaleFlow B2B SaaS',
    client: 'ScaleFlow Technologies',
    category: 'Meta Ads & SaaS Growth',
    year: '2025',
    tagline: 'Full-funnel Meta Ads architecture & high-converting UX trial onboarding.',
    coverGradient: 'from-blue-600/20 via-neutral-100 to-white',
    accentColor: '#2563eb',
    metrics: { label: 'Campaign Optimization', value: 'High-ROAS Meta Funnels' },
    tags: ['Meta Ads', 'SaaS', 'UI/UX', 'Framer', 'CAPI'],
    summary: 'Complete growth transformation for a B2B SaaS platform. Directed performance marketing across Facebook & Instagram Ads while rebuilding their web landing pages and user trial onboarding flow.',
    challenge: 'High customer acquisition costs (CAC) above $180, weak retargeting conversions, and a disjointed sign-up flow causing a 65% drop-off between ad click and dashboard activation.',
    solution: 'Engineered server-side Meta Conversions API (CAPI) with custom value tracking, launched high-performing dynamic creative testing (DCT), and redesigned the entire web demo funnel with frictionless 1-click booking.',
    highlights: [
      'Engineered CAPI with 9.2/10 Event Match Quality on Meta Events Manager',
      'Tested 60+ static, motion & founder-led hook creatives with sub-$45 B2B CAC',
      'Redesigned responsive SaaS dashboard and onboarding experience',
      'Generated over 3,400 qualified enterprise demo requests'
    ],
    technologies: ['Meta Ads Manager', 'Conversions API (CAPI)', 'Figma', 'Framer', 'React', 'GA4 Attribution'],
    liveUrl: 'https://scaleflow.io'
  },
  {
    id: 'velocity-ecommerce-scale',
    title: 'Velocity Apparel',
    client: 'Velocity DTC Global',
    category: 'Meta Ads & Paid Social',
    year: '2024',
    tagline: 'High-performing Meta Ads creative strategy with Advantage+ Shopping Campaigns (ASC).',
    coverGradient: 'from-amber-500/20 via-neutral-100 to-white',
    accentColor: '#d97706',
    metrics: { label: 'Campaign Optimization', value: 'Advantage+ & Creative Testing' },
    tags: ['Meta Ads', 'E-Commerce', 'Creative Strategy', 'CRO'],
    summary: 'Architected and executed Meta advertising campaigns across competitive international markets, testing dynamic video and motion creatives with high conversion rates.',
    challenge: 'Creative fatigue after attribution shifts, rising CPMs, and low conversion rate on standard product detail pages (PDPs).',
    solution: 'Restructured the ad account into consolidated Advantage+ Shopping setups, produced iterative UGC and high-contrast motion creatives, and redesigned mobile-first landing pages.',
    highlights: [
      'Engineered high-intent Advantage+ Shopping structure on Meta Ads Manager',
      'Systematic creative iteration cadence with weekly winning angle variations',
      'Implemented custom post-purchase surveys to refine attribution modeling',
      'Reduced cost per acquisition (CPA) with targeted landing page CRO'
    ],
    technologies: ['Meta Ads Manager', 'Advantage+ Campaigns', 'TripleWhale', 'Figma', 'Shopify Plus'],
    liveUrl: 'https://velocityapparel.com'
  },
  {
    id: 'metricx-saas-platform',
    title: 'MetricX Analytics',
    client: 'MetricX Software',
    category: 'SaaS UI/UX & Web Design',
    year: '2025',
    tagline: '100% End-to-end UI/UX design and design system for a next-gen data pipeline platform.',
    coverGradient: 'from-emerald-500/20 via-neutral-100 to-white',
    accentColor: '#059669',
    metrics: { label: 'User Activation & Retention', value: '+84% Day-30' },
    tags: ['SaaS', 'UI/UX', 'Figma', 'Design System', 'Web Design'],
    summary: 'Complete product design overhaul for MetricX. Designed over 80+ high-fidelity responsive screens, data visualization dashboards, dark/light modes, and a modular design system.',
    challenge: 'Legacy interface was cluttered, difficult to navigate for non-technical managers, and suffered from high churn during the initial 14-day trial period.',
    solution: 'Conducted in-depth user journey mapping, created intuitive data widget architectures, and designed a streamlined 3-step interactive onboarding flow.',
    highlights: [
      'Comprehensive design system with 250+ accessible components in Figma',
      'Real-time query builder with instant visual chart preview',
      'User onboarding time reduced from 28 minutes to 4.5 minutes',
      'Zero handoff friction with automated Figma variables and developer documentation'
    ],
    technologies: ['Figma', 'Design Systems', 'UI/UX Research', 'Tailwind Tokens', 'Prototyping'],
    liveUrl: 'https://metricx.io'
  },
  {
    id: 'synchro-cloud-leadgen',
    title: 'Synchro Cloud Solutions',
    client: 'Synchro Enterprise IT',
    category: 'Meta Ads & Lead Gen',
    year: '2024',
    tagline: 'High-ticket B2B Meta Lead Generation with qualified custom audience funnels.',
    coverGradient: 'from-violet-500/20 via-neutral-100 to-white',
    accentColor: '#7c3aed',
    metrics: { label: 'B2B Funnel Quality', value: 'High-Intent Enterprise Leads' },
    tags: ['Meta Ads', 'Lead Gen', 'Copywriting', 'Landing Page'],
    summary: 'Performance marketing campaign targeting corporate decision-makers using targeted Meta Lead Ads and interactive assessment landing pages.',
    challenge: 'Reaching corporate tech decision-makers on Instagram and Facebook without attracting unqualified low-intent consumer leads.',
    solution: 'Designed multi-step qualification forms with custom logic, paired with authoritative thought-leadership video ads and whitepaper value-exchange hooks.',
    highlights: [
      'Delivered qualified enterprise MQLs with deep pre-qualification filters',
      'Automated instant CRM syncing with Zapier and HubSpot lead scoring',
      'Low cost per qualified executive demo with clear value proposition',
      'High conversion rate from Meta Ads inbound pipeline'
    ],
    technologies: ['Meta Lead Ads', 'Instant Forms', 'HubSpot', 'Framer', 'Copywriting']
  },
  {
    id: 'nordic-fintech-web',
    title: 'Nordic Horizon Fintech',
    client: 'Nordic Horizon Capital',
    category: 'UI/UX & Web Design',
    year: '2025',
    tagline: 'Bespoke web experience with precision micro-interactions and high-converting architecture.',
    coverGradient: 'from-sky-500/20 via-neutral-100 to-white',
    accentColor: '#0284c7',
    metrics: { label: 'Page Conversion Rate', value: '8.4% (Industry Avg: 2.1%)' },
    tags: ['Web Design', 'UI/UX', 'Framer', 'Motion', 'Fintech'],
    summary: 'Designed and built a sleek, modern corporate website with editorial typography, interactive loan calculators, and responsive mobile architecture.',
    challenge: 'Stand out in a crowded fintech space with a distinctive, trustworthy aesthetic that feels premium, modern, and effortless.',
    solution: 'Leveraged high-contrast typography, mathematical spacing grids, smooth physics scrolling, and interactive financial modeling components.',
    highlights: [
      'Interactive visual rate estimator built with React & Framer Motion',
      'Sub-0.7s page load times worldwide with 100/100 Core Web Vitals',
      'Seamless mobile navigation with tactile bottom-sheet drawers',
      'Awwwards-inspired layout with clean monochrome elegance'
    ],
    technologies: ['Framer', 'React', 'Figma', 'TypeScript', 'Motion', 'Tailwind CSS']
  },
  {
    id: 'apex-growth-marketing',
    title: 'Apex AI Assistant',
    client: 'Apex Labs Inc.',
    category: 'Meta Ads & SaaS Growth',
    year: '2025',
    tagline: 'Product launch & paid user acquisition strategy with high-CTR video hooks.',
    coverGradient: 'from-rose-500/20 via-neutral-100 to-white',
    accentColor: '#e11d48',
    metrics: { label: 'Creative Performance', value: 'High-Converting Video Hooks' },
    tags: ['Meta Ads', 'SaaS', 'Mobile App', 'Growth Marketing'],
    summary: 'Go-to-market campaign and growth marketing for an AI productivity app. Spearheaded viral TikTok-style and Instagram Reels Meta Ads that captured massive organic spillover.',
    challenge: 'Standing out in a competitive AI landscape with tight margins and building sustainable user retention beyond initial download curiosity.',
    solution: 'Designed relatable problem-solution short-form video creatives showcasing exact workflow savings, retargeting engaged viewers with social-proof testimonials.',
    highlights: [
      'High-engagement creative testing across Instagram Reels and Stories',
      'Direct-to-app deep linking and optimized mobile landing pages',
      'Viral creative angle with high Click-Through Rate (CTR)',
      'Rapid organic and paid user acquisition within weeks of launch'
    ],
    technologies: ['Meta Ads Manager', 'Video Motion', 'App Attribution', 'Figma', 'CapCut']
  }
];

export const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Meta Ads Scaling & Strategy',
    tagline: 'High-ROAS Facebook & Instagram campaigns built to scale profitably.',
    description: 'Deep performance marketing with advanced account architecture. From Advantage+ Shopping Campaigns (ASC) and custom audience funnels to high-spend scaling, I turn ad spend into predictable revenue.',
    deliverables: [
      'Full Meta Ads account structure & scaling strategy',
      'Audience segmentation, Lookalikes & Retargeting funnels',
      'Budget pacing & bid strategy optimization (CBO/ABO)',
      'Weekly performance reporting & ROAS optimization'
    ],
    tools: ['Meta Ads Manager', 'Conversions API (CAPI)', 'Pixel Tracking', 'TripleWhale']
  },
  {
    number: '02',
    title: '100% UI/UX Product Design',
    tagline: 'Pixel-perfect digital interfaces backed by human-centered usability.',
    description: 'I handle 100% of both UI and UX: research, user personas, wireframing, interactive prototyping, and polished modern interfaces that solve complex workflows effortlessly.',
    deliverables: [
      'End-to-end SaaS and web application UI/UX design',
      'User journey mapping, wireframes & high-fidelity mockups',
      'Interactive Figma prototypes with realistic micro-animations',
      'Usability testing, heuristic audits & CRO reviews'
    ],
    tools: ['Figma', 'Prototyping', 'Design Systems', 'Miro', 'Tokens']
  },
  {
    number: '03',
    title: 'High-Converting Web Design',
    tagline: 'Bespoke modern websites crafted for lightning speed and conversion.',
    description: 'Expert web design combining editorial aesthetics with engineering excellence. Websites built in Framer and modern React frameworks that captivate visitors and convert them into clients.',
    deliverables: [
      'Custom website & landing page design and development',
      'Free 1-Year Custom Domain (.com / .io) + Fast Cloud Hosting & SSL ($280 Value)',
      'Seamless responsiveness across all mobile, tablet & retina screens',
      'Dynamic CMS architecture for fast, hassle-free content updates',
      '99+ Google PageSpeed performance & technical SEO optimization'
    ],
    tools: ['Framer', 'React', 'Tailwind CSS', 'TypeScript', 'Figma']
  },
  {
    number: '04',
    title: 'SaaS Growth & Funnel Optimization',
    tagline: 'Maximize trial conversions, user activation, and customer lifetime value.',
    description: 'Specialized SaaS growth engineering. I analyze drop-off points across sign-up flows, pricing tables, and onboarding tours to boost activation rates and lower customer acquisition costs.',
    deliverables: [
      'SaaS onboarding flow redesign & time-to-value acceleration',
      'High-converting pricing page & checkout flow optimization',
      'Conversion Rate Optimization (CRO) audit and implementation',
      'Product analytics & cohort retention analysis'
    ],
    tools: ['Mixpanel', 'Hotjar', 'Google Analytics 4', 'Stripe Integration']
  },
  {
    number: '05',
    title: 'Creative Strategy & Ad Copywriting',
    tagline: 'High-CTR static and motion creatives that stop the thumb.',
    description: 'The secret to winning on Meta today is creative excellence. I write persuasive, benefit-driven ad copy and design high-contrast visual hooks that cut through feed noise.',
    deliverables: [
      'Ad creative ideation with weekly fresh hook angles',
      'High-converting static carousels, infographics & quote cards',
      'Direct-response ad copywriting tailored to target psychology',
      'Structured A/B creative testing matrix'
    ],
    tools: ['Figma', 'Photoshop', 'CapCut', 'Direct Response Copy']
  },
  {
    number: '06',
    title: 'Tracking, Pixel & Conversions API',
    tagline: 'Accurate server-side attribution immune to browser restrictions.',
    description: 'Fix attribution gaps and feed Meta algorithms clean conversion signals. I implement server-side Meta Conversions API (CAPI), custom offline event tracking, and GA4 setups.',
    deliverables: [
      'Meta Conversions API (CAPI) server-side implementation',
      'Custom event tracking (Lead, Schedule, Purchase, InitiateCheckout)',
      'Domain verification & Aggregated Event Measurement setup',
      'Google Tag Manager & Google Analytics 4 integration'
    ],
    tools: ['Meta Pixel', 'CAPI Gateway', 'Google Tag Manager', 'Stape']
  },
  {
    number: '07',
    title: 'Design Systems & Component Libraries',
    tagline: 'Scalable visual consistency that accelerates product engineering.',
    description: 'Establish unified design languages that bridge the gap between design and code. Reusable components, color tokens, and typographic hierarchies built for rapid team expansion.',
    deliverables: [
      'Complete Figma design systems with auto-layout & variables',
      'Design tokens for colors, typography, spacing, and elevation',
      'Accessible WCAG-compliant UI patterns',
      'Developer handoff documentation and specs'
    ],
    tools: ['Figma Variables', 'Tailwind Tokens', 'Component Library']
  },
  {
    number: '08',
    title: 'Growth Marketing & Advisory',
    tagline: 'Strategic leadership to scale your brand from foundation to market leader.',
    description: 'Holistic growth advisory combining paid acquisition, product-led growth, and brand positioning. Clear roadmaps and actionable tactics that drive measurable bottom-line revenue.',
    deliverables: [
      'Full go-to-market (GTM) growth strategy and roadmap',
      'Unit economics & CAC vs. LTV modeling',
      'Competitor intelligence and positioning teardowns',
      'Bi-weekly strategic reviews and leadership syncs'
    ],
    tools: ['Growth Roadmaps', 'Attribution Models', 'Unit Economics']
  }
];

export const BIG_NUMBERS = [
  { value: '100%', label: 'UI & UX Design Ownership', description: 'End-to-end design craft: research, wireframing, component design systems, and responsive interactive prototypes.' },
  { value: 'Meta', label: 'Advertising & Marketing Knowledge', description: 'Advanced campaign architecture, dynamic creative testing, Advantage+ setups, and server-side CAPI tracking.' },
  { value: 'SaaS', label: 'Growth & Funnel Optimization', description: 'Dedicated strategies to acquire users, streamline trial onboarding, and improve customer retention.' },
  { value: 'Web', label: 'High-Converting Clean Design', description: 'Fast, responsive, modern digital web experiences built to maximize engagement and conversion rates.' }
];

export const FOUNDER_QUOTE = {
  quote: 'Scaling a modern digital product requires the perfect union of strategic Meta advertising and thoughtful UI/UX design. When targeted traffic and intuitive user experiences align, sustainable growth follows.',
  author: 'Ganesh Karki',
  role: 'Meta Ads & Web Design'
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do you approach Meta Ads management and scaling?',
    answer: 'I use a proven, data-driven methodology: 1) Account consolidation and server-side Conversions API (CAPI) setup for rock-solid tracking; 2) Continuous dynamic creative testing (DCT) to find breakout hooks and angles; 3) Systematic budget pacing using Advantage+ and bid caps; 4) Ongoing landing page CRO to maximize conversion rates from every paid click.'
  },
  {
    id: 'faq-2',
    question: 'What does 100% UI/UX design mean in your workflow?',
    answer: 'It means I take full ownership of both user experience and user interface. From user research, customer journeys, and wireframes to high-fidelity visual design, interactive prototypes, design systems, and responsive layouts in Figma, nothing is left to chance.'
  },
  {
    id: 'faq-3',
    question: 'Can you work on both Meta Ads and Web/UI Design together?',
    answer: 'Yes, this is my biggest superpower. Most businesses struggle because their media buyer blames the landing page and the web designer blames the ads. By having one expert manage both the traffic and the conversion experience, your cost per acquisition drops dramatically and campaigns scale faster.'
  },
  {
    id: 'faq-4',
    question: 'How does your project pricing and engagement work?',
    answer: 'I offer flexible, transparent options: fixed-price sprints for UI/UX design and website builds, monthly performance retainers for Meta Ads management, or an all-in-one growth partnership covering ads, continuous CRO, and UI/UX design.'
  },
  {
    id: 'faq-5',
    question: 'What stages and budgets do you work with for Meta Ads?',
    answer: 'I work with businesses across different growth phases—from emerging SaaS startups launching their first campaigns to established brands looking to scale their paid acquisition and improve ROAS. Campaigns are structured for maximum efficiency and capital return.'
  },
  {
    id: 'faq-6',
    question: 'Do you design the ad creatives and write copy as well?',
    answer: 'Yes! Creative is the #1 lever for Meta Ads in 2026. I write persuasive, direct-response ad copy and design high-impact static and motion graphics optimized for mobile feed and story placements.'
  },
  {
    id: 'faq-7',
    question: 'How long does a typical UI/UX or web design project take?',
    answer: 'A high-converting landing page or website redesign usually takes 2 to 4 weeks. A full SaaS product UI/UX design typically takes 4 to 8 weeks, with structured weekly milestones and live interactive Figma prototypes.'
  },
  {
    id: 'faq-8',
    question: 'Do I own all the designs, files, and ad campaign assets?',
    answer: 'Absolutely. You retain 100% full ownership of all Figma files, design systems, website code, Meta Ads account assets, and pixel data. Everything is set up directly in your accounts.'
  },
  {
    id: 'faq-offer',
    question: 'Is the Free Domain and Cloud Hosting offer really 100% free?',
    answer: 'Yes, 100%! Every new web design, SaaS overhaul, or growth marketing plan includes 1 full year of a custom domain name (.com, .io, etc.) and ultra-fast NVMe cloud hosting with automated SSL certificates ($280 value) at zero additional charge. We register and configure everything under your name, giving you 100% ownership with zero lock-in.'
  }
];

export { BLOG_POSTS } from './blogPosts';

export const TESTIMONIALS: Testimonial[] = [];
