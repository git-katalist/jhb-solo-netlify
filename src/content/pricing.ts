export type ServiceSlug = 'marketing' | 'ecommerce' | 'blogging'
export type TierSlug = 'starter' | 'growth' | 'pro'

export type TierPrice = {
  onceOffZar: number
  note: string
}

export type Tier = {
  slug: TierSlug
  name: string
  bestFor: string
  timeline: string
  price: TierPrice
  highlights: string[]
  includes: string[]
  excludes: string[]
}

export type AddOn = {
  name: string
  description: string
  fromZar: number
}

export type Service = {
  slug: ServiceSlug
  name: string
  summary: string
  tiers: Tier[]
  addOns: AddOn[]
  finePrint: string[]
}

// Notes on ranges:
// These are positioned in the middle of common 2026 SA market ranges for professional solo/freelance builds.
// Keep them easy to understand: once-off build cost, with optional recurring care.
export const services: Service[] = [
  {
    slug: 'marketing',
    name: 'Marketing Website',
    summary:
      'A conversion-focused site for service businesses that need leads, trust, and clean SEO foundations.',
    tiers: [
      {
        slug: 'starter',
        name: 'Starter',
        bestFor: 'New businesses needing a credible online presence fast.',
        timeline: '7 to 10 working days',
        price: {
          onceOffZar: 9500,
          note: 'Once-off build (ex VAT). Domain/hosting billed separately.',
        },
        highlights: [
          'Up to 5 pages',
          'Mobile-first design',
          'Contact + WhatsApp CTA',
          'Basic on-page SEO',
        ],
        includes: [
          'Design + build (React or CMS where appropriate)',
          'Responsive layout and accessibility basics',
          'Contact form with spam protection',
          'Basic analytics setup',
          'Launch checklist and handover',
        ],
        excludes: [
          'Copywriting (can be added)',
          'Ongoing SEO and content',
          'Paid ads management',
        ],
      },
      {
        slug: 'growth',
        name: 'Growth',
        bestFor: 'SMEs that need stronger structure, content sections, and SEO-ready pages.',
        timeline: '2 to 3 weeks',
        price: {
          onceOffZar: 18500,
          note: 'Once-off build (ex VAT). Domain/hosting billed separately.',
        },
        highlights: [
          'Up to 10 pages',
          'Lead-gen landing section',
          'Local SEO foundations',
          'Blog ready (optional)',
        ],
        includes: [
          'Everything in Starter',
          'Improved information architecture',
          'Reusable sections (testimonials, FAQs, service blocks)',
          'Local SEO setup (metadata + basic schema)',
          'Performance pass (core pages)',
        ],
        excludes: [
          'Photography/video production',
          'Monthly SEO retainer',
          'CRM automations (can be added)',
        ],
      },
      {
        slug: 'pro',
        name: 'Pro',
        bestFor: 'Competitive niches that need UX polish, scalable content, and deeper tracking.',
        timeline: '3 to 5 weeks',
        price: {
          onceOffZar: 32000,
          note: 'Once-off build (ex VAT). Domain/hosting billed separately.',
        },
        highlights: [
          'Up to 20 pages',
          'Conversion-focused UX',
          'Advanced tracking',
          'SEO content structure',
        ],
        includes: [
          'Everything in Growth',
          'Conversion audit of key pages (above-the-fold, CTA, forms)',
          'Advanced analytics events (key actions)',
          'Technical SEO baseline (sitemaps, robots, structured data)',
          'Component library for consistent pages',
        ],
        excludes: [
          'Long-form SEO copywriting',
          'Ongoing experimentation (A/B testing)',
          'Paid ads management',
        ],
      },
    ],
    addOns: [
      {
        name: 'Copywriting',
        description: 'Messaging, page copy, and CTA refinement for 3 to 10 pages.',
        fromZar: 4500,
      },
      {
        name: 'Brand Refresh',
        description: 'Colour/typography system and light logo tidy-up (no full rebrand).',
        fromZar: 3500,
      },
      {
        name: 'SEO Starter Pack',
        description: 'Keyword mapping, page titles, internal linking plan, and 1 SEO landing page.',
        fromZar: 6500,
      },
      {
        name: 'Care Plan (Monthly)',
        description: 'Updates, backups, monitoring, small content tweaks, and priority support.',
        fromZar: 1200,
      },
    ],
    finePrint: [
      'Prices are typical for the Johannesburg/South Africa market and depend on scope and content readiness.',
      'Content, images, and approvals affect timelines. Rush work may incur an additional fee.',
    ],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce Store',
    summary:
      'A store built for real checkout flows, payment gateways, and the operational reality of running online sales.',
    tiers: [
      {
        slug: 'starter',
        name: 'Starter',
        bestFor: 'Small product catalogues and a clean, trustworthy checkout experience.',
        timeline: '3 to 4 weeks',
        price: {
          onceOffZar: 28000,
          note: 'Once-off build (ex VAT). Payment gateway fees excluded.',
        },
        highlights: [
          'Up to 25 products loaded',
          'Checkout + payments setup',
          'Shipping rules (basic)',
          'Mobile checkout optimisation',
        ],
        includes: [
          'Theme + store design system',
          'Product/category structure',
          'Payment gateway integration (e.g. PayFast/Ozow/Yoco)',
          'Transactional emails basics',
          'Launch + handover training (recorded)',
        ],
        excludes: [
          'Product photography',
          'Advanced integrations (ERP, POS, accounting)',
          'Marketplace sync (Takealot, etc.)',
        ],
      },
      {
        slug: 'growth',
        name: 'Growth',
        bestFor: 'Growing stores needing better merchandising, content, and operational tooling.',
        timeline: '4 to 6 weeks',
        price: {
          onceOffZar: 52000,
          note: 'Once-off build (ex VAT). Payment gateway fees excluded.',
        },
        highlights: [
          'Up to 75 products loaded',
          'Collections + filters',
          'Abandoned cart baseline',
          'Courier integration (common)',
        ],
        includes: [
          'Everything in Starter',
          'Improved product page UX (trust blocks, FAQs, upsells)',
          'Basic automations (order status, fulfilment steps)',
          'Courier integration where supported by platform/plugins',
          'Analytics events for product and checkout funnel',
        ],
        excludes: [
          'Complex custom pricing rules',
          'Subscription billing',
          'Multi-warehouse inventory logic',
        ],
      },
      {
        slug: 'pro',
        name: 'Pro',
        bestFor: 'Stores with serious catalogue needs, custom flows, and performance constraints.',
        timeline: '6 to 10 weeks',
        price: {
          onceOffZar: 95000,
          note: 'Once-off build (ex VAT). Payment gateway fees excluded.',
        },
        highlights: [
          'Up to 200 products loaded',
          'Custom sections and templates',
          'Speed and conversion pass',
          'Integrations planning',
        ],
        includes: [
          'Everything in Growth',
          'Custom templates for key product types',
          'Performance work for storefront and images',
          'Integration architecture (CRM/ERP/email) with clear handover',
          'Checkout friction review (forms, address, payment steps)',
        ],
        excludes: [
          'Bespoke app development beyond agreed scope',
          'Ongoing CRO/retention programs',
          'Paid ads management',
        ],
      },
    ],
    addOns: [
      {
        name: 'Product Upload Pack',
        description: 'Additional products loaded (images, variants, SEO titles) beyond included.',
        fromZar: 1800,
      },
      {
        name: 'Email Marketing Setup',
        description: 'Basic flows: welcome, abandoned cart, post-purchase, review request.',
        fromZar: 5500,
      },
      {
        name: 'Reviews + UGC',
        description: 'Customer reviews widget and light styling to match your brand.',
        fromZar: 2500,
      },
      {
        name: 'Care Plan (Monthly)',
        description: 'Updates, backups, monitoring, small content tweaks, and priority support.',
        fromZar: 1800,
      },
    ],
    finePrint: [
      'Product count, variants, and integrations affect cost. Gateways and courier tools may require separate subscriptions.',
      'A staging review phase is included; additional rounds beyond the plan may add cost.',
    ],
  },
  {
    slug: 'blogging',
    name: 'Blogging / Content Site',
    summary:
      'A publishing-focused build for creators and SMEs who need clean writing UX, speed, and content workflow.',
    tiers: [
      {
        slug: 'starter',
        name: 'Starter',
        bestFor: 'Personal brands and small teams publishing occasionally with a clean design.',
        timeline: '2 to 3 weeks',
        price: {
          onceOffZar: 13500,
          note: 'Once-off build (ex VAT). Domain/hosting billed separately.',
        },
        highlights: [
          'Blog setup + categories',
          'Newsletter capture',
          'SEO-friendly templates',
          'Fast reading experience',
        ],
        includes: [
          'Homepage + blog index + post template',
          'CMS setup (or git-based workflow, depending on preference)',
          'RSS feed + sitemap',
          'Newsletter form embed',
          'Launch checklist and handover',
        ],
        excludes: ['Editorial calendar', 'Ongoing content production', 'Custom integrations'],
      },
      {
        slug: 'growth',
        name: 'Growth',
        bestFor: 'Businesses using content marketing and needing better structure and conversion paths.',
        timeline: '3 to 5 weeks',
        price: {
          onceOffZar: 26000,
          note: 'Once-off build (ex VAT). Domain/hosting billed separately.',
        },
        highlights: [
          'Content clusters',
          'Author pages',
          'Lead magnets',
          'Better internal linking',
        ],
        includes: [
          'Everything in Starter',
          'Topic/category architecture',
          'Reusable callouts (CTA, pull-quotes, related posts)',
          'Lead magnet landing page',
          'Analytics events for content funnel',
        ],
        excludes: ['Long-form SEO copywriting', 'PR/distribution', 'Paid ads management'],
      },
      {
        slug: 'pro',
        name: 'Pro',
        bestFor: 'High-volume publishers that need serious performance, templates, and editorial tooling.',
        timeline: '5 to 8 weeks',
        price: {
          onceOffZar: 48000,
          note: 'Once-off build (ex VAT). Domain/hosting billed separately.',
        },
        highlights: [
          'Multiple templates',
          'Performance hardening',
          'Advanced SEO structure',
          'Scalable components',
        ],
        includes: [
          'Everything in Growth',
          'Multiple post templates (reviews, guides, announcements)',
          'Performance work (images, caching strategy, page weight)',
          'Structured data setup for articles',
          'Editorial QA checklist and workflow guidance',
        ],
        excludes: ['Custom CMS development', 'Ongoing content ops', 'Team training beyond handover'],
      },
    ],
    addOns: [
      {
        name: 'Content Migration',
        description: 'Move posts from an existing site (up to agreed volume) with URL mapping.',
        fromZar: 4500,
      },
      {
        name: 'Editorial Templates',
        description: 'A set of writing templates for consistent intros, headings, CTAs and FAQs.',
        fromZar: 2200,
      },
      {
        name: 'SEO Content Pack',
        description: 'Keyword mapping + brief templates for 6 posts and 2 pillar pages.',
        fromZar: 8500,
      },
      {
        name: 'Care Plan (Monthly)',
        description: 'Updates, backups, monitoring, small content tweaks, and priority support.',
        fromZar: 1200,
      },
    ],
    finePrint: [
      'CMS choice affects ongoing workflow; we can tailor for WordPress, headless, or a git-based setup.',
      'If you already have brand assets and content, delivery is faster and cheaper.',
    ],
  },
]

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getTier(service: Service, tierSlug: string): Tier | undefined {
  return service.tiers.find((t) => t.slug === tierSlug)
}

