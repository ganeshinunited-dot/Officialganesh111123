export interface AnalyzedScope {
  tierName: string;
  tierBadge: string;
  tagline: string;
  timelineWeeks: string;
  directSupport: string;
  metaAdsTasks: string[];
  designTasks: string[];
  trackingTasks: string[];
  keyDeliverables: string[];
  expectedImpact: string;
  recommendedAdSpendRange?: string;
}

export type FocusArea = 'all' | 'ads' | 'design';

export function analyzeBudget(budget: number, focus: FocusArea = 'all'): AnalyzedScope {
  // 1. Starter Tier ($500 - $1,199)
  if (budget < 1200) {
    if (focus === 'ads') {
      return {
        tierName: 'Meta Ads Quickstart & Testing',
        tierBadge: 'Starter Validation',
        tagline: 'Rapid ad account setup and initial creative validation to test your market offer with minimum risk.',
        timelineWeeks: '1–2 Weeks',
        directSupport: 'WhatsApp Direct Support',
        metaAdsTasks: [
          'Meta Business Manager & Ad Account configuration audit',
          '1 Core testing campaign with Advantage+ audience structure',
          '5 High-converting static ad creatives with direct-response hooks',
          '3 Persuasive ad copy variations (Hook, Body, CTA)',
          'Initial audience testing and negative audience exclusion'
        ],
        designTasks: [
          'Audit of current landing page conversion drop-off points',
          'Headline and CTA visual alignment for ad message consistency'
        ],
        trackingTasks: [
          'Meta Pixel setup and verification in Events Manager',
          'Standard conversion event configuration (Lead / ViewContent)'
        ],
        keyDeliverables: [
          '1x Meta Testing Campaign Setup',
          '5x High-Contrast Ad Creative Graphics',
          '3x Tested Ad Copy Variations',
          'Meta Pixel Event Verification',
          'Launch Strategy Handoff Document'
        ],
        expectedImpact: 'Quickly validate ad angles, find early winners, and stop wasting budget on misconfigured campaigns.'
      };
    }

    if (focus === 'design') {
      return {
        tierName: 'Single-Page UX Polish & Redesign',
        tierBadge: 'Starter Validation',
        tagline: 'Focused UX refinement and visual upgrade to eliminate friction and improve page conversion rate.',
        timelineWeeks: '1–2 Weeks',
        directSupport: 'WhatsApp Direct Support',
        metaAdsTasks: [
          'Traffic intake recommendations for your new design'
        ],
        designTasks: [
          'Comprehensive single landing page UI/UX redesign in Figma',
          'Clear visual hierarchy: Hero, Social Proof, Features, CTA',
          'Mobile-first responsive layout adaptation',
          'Export-ready web design assets with typography tokens'
        ],
        trackingTasks: [
          'Basic event click and form submit UX trigger points'
        ],
        keyDeliverables: [
          '1x Complete Landing Page Design in Figma',
          'Mobile & Desktop Responsive Wireframes',
          'High-Contrast CTA & Section Hierarchy',
          'Full Typography & Component Assets',
          '🎁 1-Year Free Domain & Fast Hosting Setup ($280 Value)'
        ],
        expectedImpact: 'A clean, professional page that builds immediate visitor trust and boosts conversion action.'
      };
    }

    // Default 'all'
    return {
      tierName: 'Brand Kickstart & Rapid Setup',
      tierBadge: 'Starter Validation',
      tagline: 'A lean, high-impact combination of initial Meta ad testing and essential landing page conversion fixes.',
      timelineWeeks: '1–2 Weeks',
      directSupport: 'WhatsApp Direct Support',
      metaAdsTasks: [
        'Meta Business Manager & Ad Account audit',
        '1 Core Advantage+ testing campaign setup',
        '4 Direct-response static ad creative graphics',
        'Persuasive copy angles tested against key objections'
      ],
      designTasks: [
        'Landing page conversion rate quick-wins audit',
        'Mobile UX fixes and call-to-action refinement'
      ],
      trackingTasks: [
        'Meta Pixel setup & basic conversion event tracking'
      ],
      keyDeliverables: [
        '1x Structured Meta Campaign',
        '4x Custom Ad Creative Graphics',
        'Landing Page CRO Action Plan',
        'Verified Meta Pixel Tracking'
      ],
      expectedImpact: 'Validate your offer with real market traffic without burning capital.'
    };
  }

  // 2. Growth Tier ($1,200 - $3,199)
  if (budget < 3200) {
    if (focus === 'ads') {
      return {
        tierName: 'Meta Ads Growth Engine',
        tierBadge: 'Growth Accelerator',
        tagline: 'Full-funnel campaign architecture with dynamic creative testing and server-side Conversions API (CAPI).',
        timelineWeeks: '2–3 Weeks',
        directSupport: 'Direct WhatsApp + Slack Channel',
        metaAdsTasks: [
          'Complete ad account restructuring (Cold Prospecting + Retargeting)',
          'Advantage+ Shopping / Leads campaign implementation',
          'Dynamic Creative Testing (DCT) with 10+ visual variations',
          'Motion graphics and video hook testing for mobile feeds',
          'Audience segmentation, exclusion rules, and bid pacing'
        ],
        designTasks: [
          'Ad-to-landing-page message matching audit and CRO guidance',
          'High-converting ad thumbnail & banner asset library'
        ],
        trackingTasks: [
          'Server-side Meta Conversions API (CAPI) implementation',
          '8+ Event Match Quality optimization',
          'Custom event deduplication & standard purchase/lead tracking'
        ],
        keyDeliverables: [
          'Consolidated 2-Tier Meta Funnel',
          '10x Custom High-Impact Ad Creatives (Static + Motion)',
          'Full Meta Conversions API (CAPI) Integration',
          'Dynamic Creative Testing (DCT) Matrix',
          'Bi-Weekly Strategy & Performance Calls'
        ],
        expectedImpact: 'Lower cost per acquisition (CPA), higher return on ad spend, and clean server-side data.'
      };
    }

    if (focus === 'design') {
      return {
        tierName: 'Full-Stack High-Converting Web Experience',
        tierBadge: 'Growth Accelerator',
        tagline: 'End-to-end bespoke website design and production coding engineered for speed, beauty, and conversions.',
        timelineWeeks: '2–3 Weeks',
        directSupport: 'Direct WhatsApp + Slack Channel',
        metaAdsTasks: [
          'Conversion-focused user journey mapping for paid visitors'
        ],
        designTasks: [
          'Full bespoke landing page & secondary pages designed in Figma',
          'Modern design system: typography, color palette, custom UI components',
          'Production-grade responsive web engineering in React / Framer',
          'Interactive micro-animations & smooth transitions'
        ],
        trackingTasks: [
          'Core Web Vitals 95+ optimization (sub-second loading speed)',
          'Integrated analytics tracking tags (GA4, Pixel)'
        ],
        keyDeliverables: [
          'Figma Design File with 100% Client Ownership',
          'Production-Ready Responsive Website Code',
          '🎁 1-Year Free Custom Domain (.com / .io)',
          '🎁 1-Year Ultra-Fast Cloud NVMe Hosting + SSL',
          'Custom UI Component Library',
          'Lighthouse 95+ Speed & SEO Optimization'
        ],
        expectedImpact: 'A stunning, high-credibility digital storefront that converts visitors into active buyers.'
      };
    }

    // Default 'all'
    return {
      tierName: 'Growth & Acquisition Accelerator',
      tierBadge: 'Most Popular',
      tagline: 'The complete growth duo: structured Meta ad testing coupled with a custom high-converting landing page.',
      timelineWeeks: '2–3 Weeks',
      directSupport: 'Direct WhatsApp + Slack Channel',
      metaAdsTasks: [
        'Full Meta Ads account restructuring (Cold testing + warm retargeting)',
        'Advantage+ campaign architecture with manual bid caps',
        '8 Custom ad creatives (high-contrast static + short-form motion hooks)',
        'Direct-response ad copywriting focused on clear value proposition'
      ],
      designTasks: [
        'Bespoke high-converting landing page designed in Figma',
        'Clean responsive development in Framer or modern React/Tailwind',
        'Free Custom Domain (.com) & NVMe Cloud Hosting configuration',
        'Mobile checkout / lead submission UX friction reduction'
      ],
      trackingTasks: [
        'Meta Conversions API (CAPI) server-side integration',
        'Custom conversion tracking and Google Analytics 4 sync'
      ],
      keyDeliverables: [
        'Full-Funnel Meta Ad Account Structure',
        '8x Custom Ad Assets (Static & Motion)',
        '1x Custom Designed & Built Landing Page',
        '🎁 1-Year Free Custom Domain (.com / .io)',
        '🎁 1-Year Ultra-Fast Cloud NVMe Hosting + SSL',
        'Server-Side Conversions API (CAPI)',
        'Dedicated WhatsApp & Slack Growth Channel'
      ],
      expectedImpact: 'A complete customer acquisition machine that turns paid clicks into profitable customers.'
    };
  }

  // 3. Scale Tier ($3,200 - $6,999)
  if (budget < 7000) {
    return {
      tierName: 'Full-Funnel Scale Engine',
      tierBadge: 'High-Growth Scale',
      tagline: 'Aggressive multi-tier Meta acquisition, continuous creative iterations, and complete UI/UX web systems.',
      timelineWeeks: '3–4 Weeks',
      directSupport: 'Priority WhatsApp + Dedicated Slack Channel',
      metaAdsTasks: [
        'Multi-tier campaign architecture (Top, Middle, Bottom funnel)',
        'Continuous dynamic creative testing (16+ ad variations)',
        'Video hook testing (short-form UGC styles + motion graphics)',
        'Advantage+ Shopping & lookalike audience scaling',
        'Automated bid rules & budget scaling cadence'
      ],
      designTasks: [
        'Multi-page SaaS or Brand website redesign in Figma',
        'Comprehensive UI/UX Design System with reusable components',
        'Production web deployment with sub-second page loads',
        'Interactive product previews, calculators, and qualification flows'
      ],
      trackingTasks: [
        'Server-side CAPI + GA4 multi-touch attribution modeling',
        'Post-click heatmapping & conversion drop-off analysis',
        'Custom CRM / lead webhook automation (Zapier/HubSpot)'
      ],
      keyDeliverables: [
        'Multi-Tier Meta Campaign Architecture',
        '16x Production-Grade Ad Assets (Static + Motion)',
        'Multi-Page Web/SaaS Experience in Figma & Code',
        '🎁 1-Year Free Custom Domain & Enterprise Cloud Hosting',
        'Complete Figma Design System & Style Guide',
        'Server-Side CAPI + Multi-Touch Attribution',
        'Weekly Strategy Calls & Optimization Sprints'
      ],
      expectedImpact: 'Predictable, scalable revenue growth backed by creative dominance and enterprise-grade design.'
    };
  }

  // 4. Enterprise / Partnership Tier ($7,000+)
  return {
    tierName: 'Dedicated Growth & Design Partnership',
    tierBadge: 'Full Partnership',
    tagline: 'Dedicated month-over-month growth partnership: continuous high-volume ad scaling, daily CRO, and product design.',
    timelineWeeks: 'Ongoing Sprints / Monthly Retainer',
    directSupport: 'VIP WhatsApp Hotline & Dedicated Slack Workspace',
    metaAdsTasks: [
      'Full Meta ad spend management and international scaling',
      'Continuous creative engine: 25+ new creative assets per month',
      'Competitor intelligence & deep angle research',
      'Advanced manual cost caps, target CPA, and Advantage+ scaling',
      'Daily campaign monitoring and real-time budget adjustments'
    ],
    designTasks: [
      'Complete SaaS Product UI/UX Suite (Dashboard, Onboarding, Settings)',
      'High-performance web architecture with modern animations',
      'Continuous A/B landing page testing & user experience experiments',
      'Figma design system with full component tokens'
    ],
    trackingTasks: [
      'Enterprise data pipeline: CAPI, GA4, Custom BI Attribution',
      'Conversion funnel drop-off analytics & user session review',
      'Automated marketing & CRM integration pipeline'
    ],
    keyDeliverables: [
      'Dedicated Performance & Creative Director (Ganesh)',
      '25+ Custom High-Impact Ad Creatives Monthly',
      'Full SaaS / Brand Product UI/UX Suite',
      '🎁 1-Year Free Domain & High-Performance Cloud Architecture',
      'Continuous A/B Conversion Rate Optimization',
      'Enterprise Server-Side Attribution Architecture',
      'VIP WhatsApp Hotline with Same-Day Turnaround'
    ],
    expectedImpact: 'Market leadership, maximized advertising efficiency, and a world-class digital product experience.'
  };
}
