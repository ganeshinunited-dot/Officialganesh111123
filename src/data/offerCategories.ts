export interface SystemTier {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  badge?: string;
  priceNPR: number;
  priceUSD: number;
  timeline: string;
  summary: string;
  includedFeatures: string[];
}

export interface WebsiteCategory {
  id: string;
  name: string;
  shortDesc: string;
  badge?: string;
  recommendedFor: string;
  iconName: string;
  tiers: SystemTier[];
  standardDeliverables: string[];
}

export interface SystemAddon {
  id: string;
  name: string;
  description: string;
  priceNPR: number;
  priceUSD: number;
  recommended?: boolean;
}

export const WEBSITE_CATEGORIES: WebsiteCategory[] = [
  {
    id: 'ecommerce',
    name: 'E-Commerce & Online Store',
    shortDesc: 'Full shop with product catalog, cart, checkout, payment gateway & order manager.',
    badge: 'High Demand',
    recommendedFor: 'Fashion brands, retail stores, electronics, physical goods & D2C brands',
    iconName: 'ShoppingBag',
    standardDeliverables: [
      'Product catalog with filtering & search',
      'Shopping cart & quick checkout flow',
      'Inventory & stock management dashboard',
      'Automated order confirmation via email/WhatsApp',
      'Discount coupon & promotional code system'
    ],
    tiers: [
      {
        id: 'starter',
        name: 'Starter Shop (Up to 30 Products)',
        priceNPR: 42000,
        priceUSD: 320,
        timeline: '7 - 10 Days',
        summary: 'Ideal for launching a boutique brand or initial product line with streamlined checkout.',
        includedFeatures: ['Up to 30 products', 'eSewa / Khalti / Cash on Delivery', 'Mobile-first shopping UI', 'Basic order tracking']
      },
      {
        id: 'pro',
        name: 'Growth Store (Up to 150 Products)',
        badge: 'Most Popular',
        priceNPR: 68000,
        priceUSD: 520,
        timeline: '10 - 14 Days',
        summary: 'Complete high-converting store with advanced product variations, customer accounts, and marketing tags.',
        includedFeatures: ['Up to 150 products', 'Multiple Payment Gateways', 'Customer login & order history', 'Product variants (sizes/colors)', 'Abandoned cart recovery alerts']
      },
      {
        id: 'enterprise',
        name: 'Custom High-Volume E-Commerce',
        priceNPR: 115000,
        priceUSD: 880,
        timeline: '18 - 24 Days',
        summary: 'Large inventory, multi-vendor or wholesale portal with custom accounting and automated logistics.',
        includedFeatures: ['Unlimited products', 'Custom inventory sync & ERP', 'International Stripe / PayPal + Local', 'Advanced analytics & custom reports', 'Priority 24/7 SLA']
      }
    ]
  },
  {
    id: 'saas_system',
    name: 'SaaS Web App & Full System',
    shortDesc: 'Complete web application with user auth, backend database, dashboard & workflows.',
    badge: 'Full Software',
    recommendedFor: 'Tech startups, software platforms, client portals & automated web tools',
    iconName: 'Cpu',
    standardDeliverables: [
      'Interactive user dashboard & metrics',
      'Secure user authentication & JWT sessions',
      'PostgreSQL / Supabase / Firebase database schema',
      'Role-based access control (Admin, User, Team)',
      'Clean modern REST API / Server actions'
    ],
    tiers: [
      {
        id: 'starter',
        name: 'MVP Web App / Portal',
        priceNPR: 65000,
        priceUSD: 490,
        timeline: '12 - 16 Days',
        summary: 'Functional minimum viable product with authentication, database CRUD and sleek UI.',
        includedFeatures: ['User sign-up & login', 'Core CRUD database workflow', 'Admin management view', 'Clean responsive dashboard']
      },
      {
        id: 'pro',
        name: 'Full SaaS Application',
        badge: 'Startup Favorite',
        priceNPR: 110000,
        priceUSD: 840,
        timeline: '18 - 25 Days',
        summary: 'Comprehensive SaaS with recurring subscription billing, team management, and notification system.',
        includedFeatures: ['Stripe / Lemonsqueezy subscription tiering', 'Team collaboration & invitations', 'Custom database queries & export', 'Automated email alerts', 'Production Docker / Edge deployment']
      },
      {
        id: 'enterprise',
        name: 'Custom Enterprise Full System',
        priceNPR: 185000,
        priceUSD: 1420,
        timeline: '30 - 45 Days',
        summary: 'Complex enterprise workflow system with multi-tenancy, custom microservices, and high-security compliance.',
        includedFeatures: ['Multi-tenant architecture', 'Custom API webhooks & integrations', 'Audit logging & enterprise security', 'Dedicated staging environment', 'Full architecture documentation']
      }
    ]
  },
  {
    id: 'corporate',
    name: 'Corporate & Business Authority',
    shortDesc: 'Credible, high-authority brand website with service showcases & lead capture.',
    badge: 'Business Essential',
    recommendedFor: 'Consultancies, law firms, finance, B2B agencies, construction & corporate groups',
    iconName: 'Building2',
    standardDeliverables: [
      'Executive company presentation & brand narrative',
      'Comprehensive service breakdown pages',
      'Case study & past client portfolio showcase',
      'Interactive quote request & lead funnel',
      'Google Maps & office location integration'
    ],
    tiers: [
      {
        id: 'starter',
        name: 'Standard Business (5 Pages)',
        priceNPR: 32000,
        priceUSD: 245,
        timeline: '5 - 7 Days',
        summary: 'Professional 5-page digital presence for established businesses and service firms.',
        includedFeatures: ['5 Core Pages (Home, About, Services, Portfolio, Contact)', 'Contact forms with email notification', 'Mobile responsive typography', 'Google Search Console setup']
      },
      {
        id: 'pro',
        name: 'Executive Corporate (Up to 12 Pages)',
        badge: 'Recommended',
        priceNPR: 54000,
        priceUSD: 415,
        timeline: '8 - 12 Days',
        summary: 'Polished high-trust corporate portal with blog/newsroom, team bios, and custom case study layouts.',
        includedFeatures: ['Up to 12 custom pages', 'Content Management System (CMS) for blogs/updates', 'Lead qualification forms with CRM routing', 'Speed optimized <1s load', 'Interactive service calculators']
      },
      {
        id: 'enterprise',
        name: 'Multi-Branch Enterprise Group',
        priceNPR: 88000,
        priceUSD: 675,
        timeline: '15 - 20 Days',
        summary: 'Large multi-subsidiary enterprise portal with career application forms and investor relations.',
        includedFeatures: ['Unlimited branch/service pages', 'Career job board & resume upload', 'Multi-language toggling', 'Corporate security hardening', 'Dedicated training session']
      }
    ]
  },
  {
    id: 'real_estate',
    name: 'Real Estate & Property Portal',
    shortDesc: 'Property showcase with search filters, virtual tours, inquiry forms & agent CRM.',
    badge: 'Real Estate',
    recommendedFor: 'Property developers, real estate agencies, brokers, housing colonies & rentals',
    iconName: 'Home',
    standardDeliverables: [
      'Dynamic property listing with photo galleries',
      'Advanced search filters (location, price, BHK, area)',
      'Floor plan viewer & virtual tour embeds',
      'WhatsApp direct property inquiry button',
      'Admin dashboard to add/edit/sold properties'
    ],
    tiers: [
      {
        id: 'starter',
        name: 'Agent / Single Project Showcase',
        priceNPR: 38000,
        priceUSD: 290,
        timeline: '7 - 10 Days',
        summary: 'Dedicated showcase for a housing project, apartment building, or boutique realtor.',
        includedFeatures: ['Up to 25 active listings', 'Interactive gallery & map location', 'Instant WhatsApp inquiry trigger', 'Admin listing manager']
      },
      {
        id: 'pro',
        name: 'Full Real Estate Portal',
        badge: 'Top Choice',
        priceNPR: 65000,
        priceUSD: 495,
        timeline: '12 - 16 Days',
        summary: 'Comprehensive property marketplace with agent profiles, map integration, and search filters.',
        includedFeatures: ['Unlimited property listings', 'Multi-agent profiles & contact routing', 'Advanced filtering & mortgage estimate', 'Featured listings highlight', 'Lead capture & PDF brochure downloads']
      },
      {
        id: 'enterprise',
        name: 'Marketplace / Developer Enterprise',
        priceNPR: 120000,
        priceUSD: 920,
        timeline: '20 - 28 Days',
        summary: 'Multi-seller property marketplace with client submission portals and automated verification.',
        includedFeatures: ['User property submission portal', 'Paid listing promotion system', 'Automated CRM lead management', 'Custom SMS / WhatsApp alerts', 'Custom interactive map clustering']
      }
    ]
  },
  {
    id: 'clinic_booking',
    name: 'Healthcare & Clinic Appointment System',
    shortDesc: 'Doctor profiles, service directories, automated schedule booking & patient portal.',
    badge: 'Healthcare',
    recommendedFor: 'Dental clinics, private hospitals, diagnostic centers, wellness spas & specialists',
    iconName: 'HeartPulse',
    standardDeliverables: [
      'Doctor & specialist profiles with schedules',
      'Online appointment booking calendar',
      'Automated WhatsApp & SMS appointment notifications',
      'Health service directory & pricing transparency',
      'Patient inquiry & emergency call button'
    ],
    tiers: [
      {
        id: 'starter',
        name: 'Single Clinic / Doctor Practice',
        priceNPR: 36000,
        priceUSD: 275,
        timeline: '6 - 9 Days',
        summary: 'Streamlined online presence with direct calendar appointment booking for solo clinics.',
        includedFeatures: ['Doctor bio & qualifications', 'Online booking form with time slots', 'WhatsApp direct alert upon booking', 'Clinic photo gallery & directions']
      },
      {
        id: 'pro',
        name: 'Multi-Doctor Polyclinic System',
        badge: 'Recommended',
        priceNPR: 62000,
        priceUSD: 475,
        timeline: '10 - 15 Days',
        summary: 'Advanced clinic system with multiple departments, doctor roster management, and booking admin.',
        includedFeatures: ['Multiple departments & doctor schedules', 'Admin calendar dashboard to accept/reschedule', 'Automated email/SMS confirmation', 'Patient test report upload portal', 'Medical blog & health advice tips']
      },
      {
        id: 'enterprise',
        name: 'Hospital / Diagnostic Network',
        priceNPR: 110000,
        priceUSD: 840,
        timeline: '18 - 25 Days',
        summary: 'Full medical network with branch management, lab report lookup, and telemedicine integration.',
        includedFeatures: ['Online patient portal with lab report download', 'Telemedicine video call integration', 'Multi-branch scheduling', 'HIPAA/Privacy compliance standards', 'Staff management system']
      }
    ]
  },
  {
    id: 'travel_hotel',
    name: 'Travel, Tour & Hotel Booking System',
    shortDesc: 'Trekking & tour package builder, hotel room booking, itinerary calendar & payments.',
    badge: 'Tourism Favorite',
    recommendedFor: 'Tour operators, trekking agencies, luxury resorts, boutique hotels & travel agencies',
    iconName: 'Compass',
    standardDeliverables: [
      'Interactive tour packages with day-by-day itineraries',
      'Seasonal pricing & group discount calculations',
      'Booking date picker & traveler information collection',
      'Multi-currency price toggle (USD, EUR, NPR)',
      'Customer review showcase & TripAdvisor integration'
    ],
    tiers: [
      {
        id: 'starter',
        name: 'Trek / Boutique Tour Agency',
        priceNPR: 39000,
        priceUSD: 295,
        timeline: '7 - 10 Days',
        summary: 'Stunning visual tour showcase with detailed day-wise itinerary and direct booking inquiry.',
        includedFeatures: ['Up to 20 tour packages', 'Day-by-day itinerary tabs with maps', 'Inquiry & custom trip planner form', 'Offline booking payment instructions']
      },
      {
        id: 'pro',
        name: 'Full Travel & Booking Portal',
        badge: 'Top Choice',
        priceNPR: 69000,
        priceUSD: 530,
        timeline: '12 - 18 Days',
        summary: 'Automated booking engine with instant online payment, hotel/package availability, and custom itineraries.',
        includedFeatures: ['Online payment (Credit Card / Stripe / Himalayan Bank / Esewa)', 'Live departure date calendar', 'Custom quote builder for travelers', 'Multi-language (EN/FR/DE/ES)', 'Automated invoice generation']
      },
      {
        id: 'enterprise',
        name: 'Hotel Chain / Enterprise OTA',
        priceNPR: 125000,
        priceUSD: 960,
        timeline: '20 - 30 Days',
        summary: 'Full hospitality management with channel manager sync (Booking.com/Agoda), room inventory, and POS.',
        includedFeatures: ['Channel manager integration', 'Live room inventory & check-in/out engine', 'B2B agent commission portal', 'Multi-property management', 'Custom PDF vouchers']
      }
    ]
  },
  {
    id: 'education_lms',
    name: 'School, College & LMS Course Portal',
    shortDesc: 'Course sales, video lessons, student registration, certificates & notices.',
    badge: 'Education',
    recommendedFor: 'Training institutes, coaching centers, private schools, colleges & course creators',
    iconName: 'GraduationCap',
    standardDeliverables: [
      'Course catalog with curriculum outlines',
      'Online student admission & registration forms',
      'Digital notice board & exam results publisher',
      'Faculty directory & institutional credentials',
      'Downloadable syllabus & lecture notes'
    ],
    tiers: [
      {
        id: 'starter',
        name: 'School / Institute Information Portal',
        priceNPR: 35000,
        priceUSD: 265,
        timeline: '6 - 9 Days',
        summary: 'Authoritative educational institution website with admission forms, notices, and faculty profiles.',
        includedFeatures: ['Institutional pages & achievements', 'Online admission application form', 'Notice board & event calendar', 'Photo & event gallery']
      },
      {
        id: 'pro',
        name: 'LMS & Video Course Selling System',
        badge: 'EdTech Favorite',
        priceNPR: 72000,
        priceUSD: 550,
        timeline: '14 - 20 Days',
        summary: 'Complete eLearning platform with video course access, student accounts, and online fee payment.',
        includedFeatures: ['Student login & course dashboard', 'Secured video lesson player', 'Online fee payment gateway', 'Quiz & automated certificate generator', 'Teacher course upload backend']
      },
      {
        id: 'enterprise',
        name: 'University / Multi-Campus Enterprise',
        priceNPR: 130000,
        priceUSD: 990,
        timeline: '22 - 32 Days',
        summary: 'Large multi-department academic portal with student information system (SIS) and grade book.',
        includedFeatures: ['Multi-department academic portal', 'Student examination & grade lookup', 'Library management integration', 'Parent communication portal', 'Role-based admin privileges']
      }
    ]
  },
  {
    id: 'restaurant_food',
    name: 'Restaurant, Café & Food Delivery System',
    shortDesc: 'Digital QR menu, online food ordering, table reservations & kitchen ticket dispatch.',
    badge: 'Food & Beverage',
    recommendedFor: 'Restaurants, cafés, cloud kitchens, bakeries, bars & food catering businesses',
    iconName: 'Utensils',
    standardDeliverables: [
      'Interactive digital menu with photos & diet tags',
      'Online table reservation booking form',
      'WhatsApp direct food ordering system',
      'Location map, operating hours & events calendar',
      'Mobile-optimized QR code table ordering'
    ],
    tiers: [
      {
        id: 'starter',
        name: 'Café & Restaurant Showcase + QR Menu',
        priceNPR: 28000,
        priceUSD: 215,
        timeline: '4 - 6 Days',
        summary: 'Mouth-watering visual menu, table booking form, and QR code for in-restaurant scanning.',
        includedFeatures: ['Digital menu with categories & prices', 'Instant table reservation request', 'QR code generator for tables', 'Google Maps & contact hours']
      },
      {
        id: 'pro',
        name: 'Online Food Ordering & Delivery System',
        badge: 'Top Pick',
        priceNPR: 52000,
        priceUSD: 395,
        timeline: '9 - 13 Days',
        summary: 'Direct online food ordering platform with delivery address picker, cart, and payment/cash choice.',
        includedFeatures: ['Item customization (toppings, spice level)', 'Order alert to kitchen WhatsApp/Printer', 'eSewa / Khalti / Cash on Delivery', 'Customer address & delivery fee calculation', 'Promotional discounts & combo deals']
      },
      {
        id: 'enterprise',
        name: 'Multi-Outlet / Cloud Kitchen Franchise',
        priceNPR: 95000,
        priceUSD: 725,
        timeline: '16 - 22 Days',
        summary: 'Franchise food portal with multi-outlet ordering, live rider tracking, and POS integration.',
        includedFeatures: ['Multi-outlet location routing', 'POS & kitchen display system integration', 'Customer loyalty points program', 'Automated sales reports', 'Delivery partner dispatch interface']
      }
    ]
  },
  {
    id: 'landing_page',
    name: 'High-Converting Sales Landing Page',
    shortDesc: 'Laser-focused single page engineered for Meta/Google Ads with sub-second speed.',
    badge: 'Maximum ROI',
    recommendedFor: 'Product launches, marketing campaigns, webinar funnels, lead generation & ad scaling',
    iconName: 'Zap',
    standardDeliverables: [
      'High-converting psychological copy structure',
      'Sub-second page load speed (<0.8s TTFB)',
      'Meta Pixel + Conversion API (CAPI) installed',
      'Direct lead capture to Google Sheets / CRM',
      'Sticky WhatsApp / Phone CTA for instant closes'
    ],
    tiers: [
      {
        id: 'starter',
        name: 'Lead Generation Squeeze Page',
        priceNPR: 22000,
        priceUSD: 170,
        timeline: '3 - 5 Days',
        summary: 'Streamlined, high-speed single page designed specifically to convert ad clicks into hot leads.',
        includedFeatures: ['Clean conversion-focused single page', 'Form to email & WhatsApp', 'Mobile touch-optimized layout', 'Meta Ads Pixel standard setup']
      },
      {
        id: 'pro',
        name: 'Long-Form Sales Page & Funnel',
        badge: 'Highest Conversion',
        priceNPR: 38000,
        priceUSD: 290,
        timeline: '5 - 8 Days',
        summary: 'Comprehensive persuasion funnel with objection busters, FAQs, reviews, and tracking.',
        includedFeatures: ['Long-form persuasion hierarchy', 'Meta Pixel + CAPI Server-side tracking', 'A/B test ready layout', 'Interactive pricing / feature tables', 'CRM webhook integration']
      },
      {
        id: 'enterprise',
        name: 'Multi-Step Funnel with Upsells',
        priceNPR: 62000,
        priceUSD: 475,
        timeline: '8 - 12 Days',
        summary: 'Complete funnel system with lead magnet opt-in, one-time-offer (OTO) upsells, and payment.',
        includedFeatures: ['Multi-step sales funnel pages', '1-Click checkout / payment integration', 'Email automation sequence trigger', 'Custom heatmapping & analytics', '14-Day CRO monitoring post-launch']
      }
    ]
  },
  {
    id: 'custom_system',
    name: 'Custom System / Bespoke Enterprise',
    shortDesc: 'Any custom web application, internal workflow, ERP/CRM or tailored digital architecture.',
    badge: 'Any System Built',
    recommendedFor: 'Businesses requiring a custom, non-template software system built to their exact specs',
    iconName: 'Wrench',
    standardDeliverables: [
      '100% Custom architecture designed from scratch',
      'Tailored database design & optimized queries',
      'Custom admin dashboards & employee permission matrix',
      'Third-party software & hardware API connectivity',
      'Full source code ownership & documented handoff'
    ],
    tiers: [
      {
        id: 'starter',
        name: 'Custom Workflow Tool / Internal Portal',
        priceNPR: 68000,
        priceUSD: 520,
        timeline: '12 - 16 Days',
        summary: 'Custom internal tool to automate spreadsheets, manage company records, or track inventory.',
        includedFeatures: ['Custom data entry forms & tables', 'Role-based access (Staff vs Admin)', 'PDF invoice / report generator', 'Automated data backups']
      },
      {
        id: 'pro',
        name: 'Complete Bespoke System / CRM',
        badge: 'Enterprise Choice',
        priceNPR: 135000,
        priceUSD: 1030,
        timeline: '20 - 30 Days',
        summary: 'Full-featured enterprise operational platform built specifically around your exact business workflow.',
        includedFeatures: ['End-to-end custom operational workflow', 'Real-time notifications & activity log', 'Multi-department access controls', 'Custom automated reports & graphs', 'Secure cloud hosting architecture']
      },
      {
        id: 'enterprise',
        name: 'Large-Scale Web Platform & API',
        priceNPR: 220000,
        priceUSD: 1680,
        timeline: '35 - 50 Days',
        summary: 'High-scale web platform capable of handling tens of thousands of concurrent users with custom APIs.',
        includedFeatures: ['High-availability cloud infrastructure', 'Custom RESTful / GraphQL API for mobile apps', 'Real-time WebSocket sync', 'Automated CI/CD deployment pipeline', 'Comprehensive training & code walkthrough']
      }
    ]
  }
];

export const SYSTEM_ADDONS: SystemAddon[] = [
  {
    id: 'esewa_khalti_stripe',
    name: 'Online Payment Gateway Setup (eSewa / Khalti / Stripe)',
    description: 'Direct merchant API integration for instant automatic online payments and verification.',
    priceNPR: 8000,
    priceUSD: 60,
    recommended: true
  },
  {
    id: 'admin_cms',
    name: 'No-Code Content Management (CMS) Dashboard',
    description: 'Empower your team to edit text, photos, products, and blogs anytime without coding.',
    priceNPR: 10000,
    priceUSD: 75,
    recommended: true
  },
  {
    id: 'meta_capi_tracking',
    name: 'Meta Pixel + Conversion API (CAPI) & GA4 Tracking',
    description: 'Server-side tracking setup bypassing iOS 14+ ad-blockers for accurate ad ROAS and conversion data.',
    priceNPR: 6000,
    priceUSD: 45,
    recommended: true
  },
  {
    id: 'multilingual',
    name: 'Multi-Language Architecture (English + Nepali / other)',
    description: 'Switch between English, Nepali, or other languages seamlessly with localized content.',
    priceNPR: 7500,
    priceUSD: 55
  },
  {
    id: 'whatsapp_crm',
    name: 'Automated WhatsApp Business Bot & Lead Routing',
    description: 'Sends instant WhatsApp message alerts to your phone and auto-replies to new client leads.',
    priceNPR: 6500,
    priceUSD: 50
  },
  {
    id: 'priority_express',
    name: 'Express 7-Day Fast-Track Delivery',
    description: 'Put your project on the VIP fast lane with dedicated daily sprint commits to launch in 7 days.',
    priceNPR: 12000,
    priceUSD: 90
  }
];

export const SPECIAL_OFFER_INCLUSIONS = {
  domain: {
    name: 'Custom Domain (.com / .io / .co / .org / .net / others)',
    retailUSD: 25,
    retailNPR: 3300,
    status: '100% FREE'
  },
  hosting: {
    name: '1-Year High-Speed NVMe Cloud Edge Hosting',
    retailUSD: 180,
    retailNPR: 24000,
    status: '100% FREE'
  },
  ssl: {
    name: 'Grade A+ Automated SSL Certificate & Security Padlock',
    retailUSD: 50,
    retailNPR: 6500,
    status: '100% FREE'
  },
  dnsSetup: {
    name: 'DNS Zone Routing, Google Workspace MX & CDN Setup by Ganesh',
    retailUSD: 25,
    retailNPR: 3300,
    status: '100% FREE'
  },
  totalBonusValueUSD: 280,
  totalBonusValueNPR: 37100
};
