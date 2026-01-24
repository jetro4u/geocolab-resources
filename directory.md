/**
 * GEOCoLab Platform Directory Structure
 * Production-Ready Next.js 14+ App Router Architecture
 * 
 * Key Principles:
 * - Route groups for public/private separation
 * - Colocation of related components
 * - Type-safe data layer
 * - Performance-optimized assets
 */

geocolab/
├── src/
│   ├── app/
│   │   ├── (public)/                           # Marketing site (unauth)
│   │   │   ├── layout.tsx                      # Public layout: MegaMenu, Footer, SEO
│   │   │   ├── page.tsx                        # Landing: Hero → Pricing
│   │   │   │
│   │   │   ├── resources/                      # Content hub
│   │   │   │   ├── page.tsx                    # Resources overview grid
│   │   │   │   ├── definitions/                # Glossary
│   │   │   │   │   ├── page.tsx                # Definitions index
│   │   │   │   │   └── [term]/page.tsx         # Individual term (SSG)
│   │   │   │   ├── blog/
│   │   │   │   │   ├── page.tsx                # Blog index with filters
│   │   │   │   │   └── [slug]/page.tsx         # Blog post (ISR)
│   │   │   │   ├── research/
│   │   │   │   │   ├── page.tsx                # Research papers index
│   │   │   │   │   └── [id]/page.tsx           # Paper detail (SSG)
│   │   │   │   ├── case-studies/
│   │   │   │   │   └── [slug]/page.tsx         # Case study (ISR)
│   │   │   │   ├── webinars/
│   │   │   │   │   ├── page.tsx                # Webinar calendar
│   │   │   │   │   └── [event]/page.tsx        # Event detail + registration
│   │   │   │   ├── local-geo/
│   │   │   │   │   ├── page.tsx                # City selector map
│   │   │   │   │   └── [city]/page.tsx         # City-specific guide (SSG)
│   │   │   │   └── whats-new/
│   │   │   │       └── page.tsx                # Changelog + announcements
│   │   │   │
│   │   │   ├── tools/                          # Tool directory
│   │   │   │   ├── page.tsx                    # Tools grid with categories
│   │   │   │   └── [tool]/                     # Individual tool pages
│   │   │   │       ├── page.tsx                # Tool overview + demo
│   │   │   │       └── demo/page.tsx           # Interactive demo (client)
│   │   │   │
│   │   │   ├── products/                       # Product catalog
│   │   │   │   ├── page.tsx                    # Products overview
│   │   │   │   ├── toolkits/
│   │   │   │   │   └── [kit]/page.tsx          # Toolkit details
│   │   │   │   └── enterprise/
│   │   │   │       └── page.tsx                # Enterprise solutions
│   │   │   │
│   │   │   ├── integrations/                   # Partnerships
│   │   │   │   ├── page.tsx                    # Partner grid + API docs
│   │   │   │   └── [partner]/page.tsx          # Partner detail
│   │   │   │
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx                    # Pricing tiers + FAQ
│   │   │   │
│   │   │   ├── ai-authority/                   # AI Authority Index™
│   │   │   │   ├── page.tsx                    # Index explorer (interactive)
│   │   │   │   └── [category]/page.tsx         # Category breakdown
│   │   │   │
│   │   │   ├── academy/                        # Education
│   │   │   │   ├── page.tsx                    # Courses catalog
│   │   │   │   └── [course]/page.tsx           # Course detail + enrollment
│   │   │   │
│   │   │   ├── help/                           # Support
│   │   │   │   ├── page.tsx                    # Help center home
│   │   │   │   └── [topic]/page.tsx            # Topic articles
│   │   │   │
│   │   │   └── api/                            # Public APIs
│   │   │       └── geo-audit/route.ts          # Free audit endpoint
│   │   │
│   │   ├── (private)/                          # Authenticated app
│   │   │   ├── layout.tsx                      # Private layout: Sidebar, user menu
│   │   │   ├── middleware.ts                   # Auth verification
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx                    # User home: metrics, alerts
│   │   │   │
│   │   │   ├── lab/                            # AI Content Lab
│   │   │   │   ├── page.tsx                    # Lab home: recent projects
│   │   │   │   ├── social/page.tsx             # Social content generator
│   │   │   │   ├── web/page.tsx                # Web copy generator
│   │   │   │   ├── image/page.tsx              # Image generation
│   │   │   │   ├── video/page.tsx              # Video script generator
│   │   │   │   └── ads/page.tsx                # Ad copy generator
│   │   │   │
│   │   │   ├── tools/                          # Premium tools access
│   │   │   │   ├── page.tsx                    # Tools dashboard
│   │   │   │   └── [tool]/page.tsx             # Tool workspace
│   │   │   │
│   │   │   ├── marketplace/                    # App Center
│   │   │   │   ├── page.tsx                    # Marketplace browse
│   │   │   │   ├── [app]/page.tsx              # App detail + install
│   │   │   │   └── purchases/page.tsx          # User's apps
│   │   │   │
│   │   │   ├── analytics/                      # User analytics
│   │   │   │   └── page.tsx                    # GEO metrics, charts
│   │   │   │
│   │   │   ├── settings/
│   │   │   │   ├── page.tsx                    # Account settings
│   │   │   │   ├── billing/page.tsx            # Subscription management
│   │   │   │   └── integrations/page.tsx       # Connected services
│   │   │   │
│   │   │   └── api/                            # Private APIs
│   │   │       ├── user-metrics/route.ts       # User GEO data
│   │   │       └── lab/generate/route.ts       # AI generation endpoint
│   │   │
│   │   ├── api/                                # Shared APIs
│   │   │   ├── auth/[...nextauth]/route.ts     # NextAuth
│   │   │   ├── webhooks/stripe/route.ts        # Stripe webhooks
│   │   │   └── trpc/[trpc]/route.ts            # tRPC router
│   │   │
│   │   ├── globals.css                         # Tailwind + theme tokens
│   │   └── sitemap.ts                          # Dynamic sitemap gen
│   │
│   ├── components/
│   │   ├── ui/                                 # shadcn/ui base
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...                             # 40+ components
│   │   │
│   │   ├── layout/                             # Layout components
│   │   │   ├── Header.tsx                      # Public header + MegaMenu
│   │   │   ├── Footer.tsx                      # Footer with sitemap
│   │   │   ├── Sidebar.tsx                     # Private sidebar nav
│   │   │   └── UserMenu.tsx                    # Auth user dropdown
│   │   │
│   │   ├── landing/                            # Landing page sections
│   │   │   ├── Hero.tsx                        # Hero with platform selector
│   │   │   ├── StatsBar.tsx                    # Social proof numbers
│   │   │   ├── FeaturesGrid.tsx                # 4-col feature cards
│   │   │   ├── ToolkitGallery.tsx              # Interactive tool preview
│   │   │   ├── SocialProof.tsx                 # Testimonial carousel
│   │   │   ├── HowItWorks.tsx                  # Step timeline
│   │   │   ├── ResourcesShowcase.tsx           # Resources mega-section
│   │   │   ├── ProductsSpotlight.tsx           # Product cards
│   │   │   ├── IntegrationsGrid.tsx            # Partner logos
│   │   │   └── PricingMatrix.tsx               # Tier comparison table
│   │   │
│   │   ├── dashboard/                          # Private UI
│   │   │   ├── MetricsChart.tsx                # GEO metrics viz (Recharts)
│   │   │   ├── AlertsPanel.tsx                 # Notifications
│   │   │   └── RecentActivity.tsx              # Activity feed
│   │   │
│   │   ├── lab/                                # Lab components
│   │   │   ├── PromptEditor.tsx                # AI prompt input
│   │   │   ├── GeneratedOutput.tsx             # Output preview
│   │   │   └── HistoryPanel.tsx                # Generation history
│   │   │
│   │   └── shared/                             # Reusable blocks
│   │       ├── MegaMenu.tsx                    # Multi-column dropdown
│   │       ├── ResourceCard.tsx                # Resource preview card
│   │       ├── ToolCard.tsx                    # Tool card with demo CTA
│   │       ├── TestimonialCard.tsx             # Single testimonial
│   │       └── NewsletterForm.tsx              # Email capture
│   │
│   ├── lib/                                    # Utilities
│   │   ├── geo/                                # GEO-specific
│   │   │   ├── metrics.ts                      # Signal calculators
│   │   │   ├── audit.ts                        # Audit engine
│   │   │   └── scorer.ts                       # Phoenix Scorer logic
│   │   ├── auth/
│   │   │   ├── config.ts                       # NextAuth config
│   │   │   └── rbac.ts                         # Role-based access
│   │   ├── api/
│   │   │   ├── trpc.ts                         # tRPC client
│   │   │   └── fetch.ts                        # API wrapper
│   │   ├── content/
│   │   │   ├── parser.ts                       # MDX/JSON parser
│   │   │   └── validator.ts                    # Zod schemas
│   │   └── utils.ts                            # Generic helpers
│   │
│   ├── types/                                  # TypeScript definitions
│   │   ├── geo.ts                              # GEO interfaces
│   │   ├── user.ts                             # User/auth types
│   │   ├── content.ts                          # Content types
│   │   └── api.ts                              # API response types
│   │
│   ├── styles/
│   │   ├── themes/
│   │   │   ├── light.css                       # Light theme tokens
│   │   │   └── dark.css                        # Dark theme tokens
│   │   └── animations.css                      # Framer Motion presets
│   │
│   └── middleware.ts                           # Global middleware
│
├── public/
│   ├── images/
│   │   ├── hero/                               # Hero backgrounds
│   │   ├── og/                                 # OG images
│   │   ├── partners/                           # Partner logos
│   │   └── tools/                              # Tool screenshots
│   ├── fonts/
│   │   └── geist/                              # Vercel Geist font
│   └── favicon.ico
│
├── prisma/
│   ├── schema.prisma                           # DB schema
│   └── seed.ts                                 # Initial data
│
├── .env.example                                # Env template
├── next.config.js                              # Next.js config
├── tailwind.config.ts                          # Tailwind + shadcn theme
├── tsconfig.json                               # TS config
├── package.json                                # Dependencies
└── README.md                                   # Setup guide

/**
 * Key Dependencies (package.json)
 */
{
  "dependencies": {
    // Core
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    
    // UI
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-navigation-menu": "^1.1.4",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.263.1",
    
    // Data
    "@prisma/client": "^5.10.0",
    "@trpc/client": "^10.45.0",
    "@trpc/server": "^10.45.0",
    "zod": "^3.22.0",
    
    // Auth
    "next-auth": "^4.24.0",
    
    // Analytics
    "recharts": "^2.12.0",
    "@vercel/analytics": "^1.2.0",
    
    // AI
    "@ai-sdk/openai": "^0.0.10",
    
    // Payments
    "stripe": "^14.14.0",
    
    // Content
    "contentlayer": "^0.3.4",
    "next-mdx-remote": "^4.4.1"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.48",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.33",
    "prisma": "^5.10.0",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3"
  }
}