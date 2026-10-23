import type { LucideIcon } from 'lucide-react';
import {
  Target,
  PenTool,
  Globe,
  TrendingUp,
  Megaphone,
  BarChart3,
  Layers,
  Compass,
} from 'lucide-react';

/* --------------------------------- Images -------------------------------- */

export const HERO_IMAGE = {
  src: '/images/hero.jpg',
  alt: "Watercolour illustration of a designer's desk with a laptop and wireframe sketchbook, overlooking terraced hills and a village",
};

export const ABOUT_IMAGE = {
  src: '/images/about.jpg',
  alt: 'Watercolour illustration of Ganesh sketching app wireframes at his desk, hills and village rooftops beyond the window',
};

/* ---------------------------------- Nav ---------------------------------- */

export const NAV_LINKS = [{ label: 'Articles', href: '#articles' }];

/* -------------------------------- Services ------------------------------- */

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    icon: Target,
    title: 'Meta Ads Scaling & Strategy',
    description: 'High-ROAS Facebook & Instagram campaigns built to scale profitably.',
  },
  {
    icon: PenTool,
    title: '100% UI/UX Product Design',
    description: 'Pixel-perfect digital interfaces backed by human-centered usability.',
  },
  {
    icon: Globe,
    title: 'High-Converting Web Design',
    description: 'Bespoke modern websites crafted for lightning speed and conversion.',
  },
  {
    icon: TrendingUp,
    title: 'SaaS Growth & Funnel Optimization',
    description: 'Maximize trial conversions, user activation, and customer lifetime value.',
  },
  {
    icon: Megaphone,
    title: 'Creative Strategy & Ad Copywriting',
    description: 'High-CTR static and motion creatives that stop the thumb.',
  },
  {
    icon: BarChart3,
    title: 'Tracking, Pixel & Conversions API',
    description: 'Accurate server-side attribution immune to browser restrictions.',
  },
  {
    icon: Layers,
    title: 'Design Systems & Component Libraries',
    description: 'Scalable visual consistency that accelerates product engineering.',
  },
  {
    icon: Compass,
    title: 'Growth Marketing & Advisory',
    description: 'Strategic leadership to scale your brand from foundation to market leader.',
  },
];

/* -------------------------------- Projects ------------------------------- */

export interface Project {
  title: string;
  client: string;
  category: string;
  year: string;
  tagline: string;
  tags: string[];
  image: string;
  imageAlt: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'ScaleFlow B2B SaaS',
    client: 'ScaleFlow Technologies',
    category: 'Meta Ads & SaaS Growth',
    year: '2025',
    tagline: 'Full-funnel Meta Ads architecture & high-converting UX trial onboarding.',
    tags: ['Meta Ads', 'SaaS', 'UI/UX', 'Framer', 'CAPI'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Analytics dashboard with charts on a screen',
  },
  {
    title: 'Velocity Apparel',
    client: 'Velocity DTC Global',
    category: 'Meta Ads & Paid Social',
    year: '2024',
    tagline: 'High-performing Meta Ads creative strategy with Advantage+ Shopping Campaigns (ASC).',
    tags: ['Meta Ads', 'E-Commerce', 'Creative Strategy', 'CRO'],
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Smartphone showing social media marketing engagement',
  },
  {
    title: 'MetricX Analytics',
    client: 'MetricX Software',
    category: 'SaaS UI/UX & Design System',
    year: '2025',
    tagline: '100% End-to-end UI/UX design and design system for a next-gen data pipeline platform.',
    tags: ['SaaS', 'UI/UX', 'Figma', 'Design System', 'Web Design'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Laptop displaying growth charts and analytics',
  },
  {
    title: 'Synchro Cloud Solutions',
    client: 'Synchro Enterprise IT',
    category: 'Meta Ads Lead Generation',
    year: '2024',
    tagline: 'High-ticket B2B Meta Lead Generation with qualified custom audience funnels.',
    tags: ['Meta Ads', 'Lead Gen', 'Copywriting', 'Landing Page'],
    image:
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Smartphone displaying business charts',
  },
  {
    title: 'Nordic Horizon Fintech',
    client: 'Nordic Horizon Capital',
    category: 'Web Design & Fintech UX',
    year: '2025',
    tagline: 'Bespoke web experience with precision micro-interactions and high-converting architecture.',
    tags: ['Web Design', 'UI/UX', 'Framer', 'Motion', 'Fintech'],
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Code editor open on a MacBook',
  },
  {
    title: 'Apex AI Assistant',
    client: 'Apex Labs Inc.',
    category: 'Mobile App Growth Marketing',
    year: '2025',
    tagline: 'Product launch & paid user acquisition strategy with high-CTR video hooks.',
    tags: ['Meta Ads', 'SaaS', 'Mobile App', 'Growth Marketing'],
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Team collaborating around laptops at a table',
  },
];

/* --------------------------------- About --------------------------------- */

export const FOUNDER_QUOTE =
  'Scaling a modern digital product requires the perfect union of strategic Meta advertising and thoughtful UI/UX design. When targeted traffic and intuitive user experiences align, sustainable growth follows.';

export interface Strength {
  title: string;
  description: string;
}

export const STRENGTHS: Strength[] = [
  {
    title: 'UI & UX Design Ownership',
    description:
      'End-to-end design craft: research, wireframing, component design systems, and responsive interactive prototypes.',
  },
  {
    title: 'Advertising & Marketing Knowledge',
    description:
      'Advanced campaign architecture, dynamic creative testing, Advantage+ setups, and server-side CAPI tracking.',
  },
  {
    title: 'Growth & Funnel Optimization',
    description:
      'Dedicated strategies to acquire users, streamline trial onboarding, and improve customer retention.',
  },
  {
    title: 'High-Converting Clean Design',
    description:
      'Fast, responsive, modern digital web experiences built to maximize engagement and conversion rates.',
  },
];

/* -------------------------------- Articles ------------------------------- */

export interface Article {
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  author?: string;
}

export const ARTICLES: Article[] = [
  {
    date: 'Oct 23, 2026',
    readTime: '6 min read',
    title: 'After AdSense Approval: The PIN, Tax Form and Payout Steps Nobody Mentions',
    author: 'Ganesh Karki',
    excerpt:
      'Approval is only the halfway mark. The tax form, the PIN card that arrives by ordinary post, and the payout threshold still standing between you and your first payment — plus the two page fixes to make before you apply.',
  },
  {
    date: 'Sep 18, 2026',
    readTime: '6 min read',
    title: 'How to Scale Meta Ads to $50K a Month Without Burning Capital',
    excerpt:
      'Why ad sets collapse when you increase the budget, how server-side tracking preserves your data, and how to divide your capital across three simple campaigns.',
  },
  {
    date: 'Sep 14, 2026',
    readTime: '5 min read',
    title: 'SaaS Conversion Heuristics and UI/UX Architecture',
    excerpt:
      'Why trial users abandon software within five minutes, how cognitive friction kills conversions, and how to structure a pricing page that customers understand immediately.',
  },
  {
    date: 'Sep 9, 2026',
    readTime: '5 min read',
    title: 'The High-ROAS Creative Framework and How to Produce Winning Ad Hooks',
    excerpt:
      'Why people scroll past your video in the first two seconds, how to capture genuine attention without gimmicks, and how to generate thirty ad variations quickly.',
  },
  {
    date: 'Sep 2, 2026',
    readTime: '6 min read',
    title: 'Building Fast Websites That Never Feel Sluggish or Overloaded',
    excerpt:
      'Why bloated websites lose customer trust, how smooth performance shapes your brand reputation, and simple rules for building fast responsive experiences.',
  },
];

/* ---------------------------------- FAQ ---------------------------------- */

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: 'How do you approach Meta Ads management and scaling?',
    answer:
      'I use a proven, data-driven methodology: 1) Account consolidation and server-side Conversions API (CAPI) setup for rock-solid tracking; 2) Continuous dynamic creative testing (DCT) to find breakout hooks and angles; 3) Systematic budget pacing using Advantage+ and bid caps; 4) Ongoing landing page CRO to maximize conversion rates from every paid click.',
  },
  {
    question: 'What does 100% UI/UX design mean in your workflow?',
    answer:
      'It means I take full ownership of both user experience and user interface. From user research, customer journeys, and wireframes to high-fidelity visual design, interactive prototypes, design systems, and responsive layouts in Figma, nothing is left to chance.',
  },
  {
    question: 'Can you work on both Meta Ads and Web/UI Design together?',
    answer:
      'Yes, this is my biggest superpower. Most businesses struggle because their media buyer blames the landing page and the web designer blames the ads. By having one expert manage both the traffic and the conversion experience, your cost per acquisition drops dramatically and campaigns scale faster.',
  },
  {
    question: 'How does your project pricing and engagement work?',
    answer:
      'I offer flexible, transparent options: fixed-price sprints for UI/UX design and website builds, monthly performance retainers for Meta Ads management, or an all-in-one growth partnership covering ads, continuous CRO, and UI/UX design.',
  },
  {
    question: 'What stages and budgets do you work with for Meta Ads?',
    answer:
      'I work with businesses across different growth phases—from emerging SaaS startups launching their first campaigns to established brands looking to scale their paid acquisition and improve ROAS. Campaigns are structured for maximum efficiency and capital return.',
  },
];

/* -------------------------------- Contact -------------------------------- */

export const CONTACT = {
  whatsappUrl: 'https://wa.me/9779842902535',
  phoneDisplay: '+977 9842902535',
  phoneHref: 'tel:+9779842902535',
};
