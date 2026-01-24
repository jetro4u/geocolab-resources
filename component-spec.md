# GEOCoLab Component Library Specifications

## Design System Foundation

### Color Palette
```css
/* Primary Colors */
--teal-50: #f0fdfa;
--teal-600: #0d9488;
--teal-900: #134e4a;

--purple-50: #faf5ff;
--purple-600: #9333ea;
--purple-900: #581c87;

/* Neutrals */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-600: #4b5563;
--gray-900: #111827;

/* Gradients */
--gradient-primary: linear-gradient(135deg, var(--teal-600), var(--purple-700));
--gradient-hero: linear-gradient(135deg, var(--teal-900), var(--purple-900), var(--teal-800));
```

### Typography
```css
/* Font Family */
--font-sans: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'Geist Mono', 'Fira Code', monospace;

/* Type Scale */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
--text-7xl: 4.5rem;    /* 72px */
```

### Spacing Scale
```css
/* Based on 4px grid */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

---

## Component Catalog

### 1. Layout Components

#### `Header.tsx`
**Purpose**: Global navigation with MegaMenu  
**Props**:
```typescript
interface HeaderProps {
  variant?: 'public' | 'private';
  sticky?: boolean;
  transparent?: boolean;
}
```
**Features**:
- Sticky positioning with scroll detection
- Multi-column dropdown menus (200ms hover delay)
- Mobile hamburger menu (< 768px)
- Search integration (Algolia/Typesense)

#### `Footer.tsx`
**Purpose**: Sitemap navigation + newsletter  
**Props**:
```typescript
interface FooterProps {
  variant?: 'minimal' | 'full';
  showNewsletter?: boolean;
}
```
**Sections**:
- Company (About, Careers, Press)
- Resources (all 11 categories)
- Products (Toolkits, Enterprise)
- Legal (Privacy, Terms, Security)
- Social icons + copyright

#### `Sidebar.tsx` (Private only)
**Purpose**: Dashboard navigation  
**Props**:
```typescript
interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}
```
**Features**:
- Collapsible (icon-only mode)
- Active route highlighting
- Nested menu support
- Keyboard shortcuts

---

### 2. Landing Page Components

#### `Hero.tsx`
**Purpose**: Main value proposition  
**Props**:
```typescript
interface HeroProps {
  title: string;
  subtitle: string;
  ctas: Array<{ label: string; href: string; variant: 'primary' | 'secondary' }>;
  showPlatformSelector?: boolean;
  backgroundImage?: string;
}
```
**Variants**:
- Gradient background (default)
- Image background with overlay
- Video background (autoplay, muted)

#### `StatsBar.tsx`
**Purpose**: Social proof metrics  
**Props**:
```typescript
interface StatsBarProps {
  stats: Array<{ value: string; label: string; icon?: React.ComponentType }>;
  animated?: boolean;
}
```
**Features**:
- CountUp animation on scroll into view
- Responsive grid (2 cols mobile, 4 desktop)

#### `FeaturesGrid.tsx`
**Purpose**: Feature highlights  
**Props**:
```typescript
interface FeaturesGridProps {
  features: Array<{
    title: string;
    description: string;
    icon: React.ComponentType;
    href?: string;
  }>;
  columns?: 2 | 3 | 4;
}
```
**Features**:
- Hover animations (scale, shadow)
- Optional link wrapping
- Icon customization

#### `ToolkitGallery.tsx`
**Purpose**: Interactive tool previews  
**Props**:
```typescript
interface ToolkitGalleryProps {
  tools: Array<{
    id: string;
    name: string;
    description: string;
    screenshot: string;
    demoUrl?: string;
  }>;
  showDemo?: boolean;
}
```
**Features**:
- Masonry grid layout
- Lightbox for screenshots
- Inline demo modal

#### `PricingMatrix.tsx`
**Purpose**: Plan comparison  
**Props**:
```typescript
interface PricingMatrixProps {
  tiers: Array<{
    name: string;
    price: string | number;
    period?: string;
    features: string[];
    cta: { label: string; href: string };
    highlighted?: boolean;
  }>;
  billingToggle?: boolean; // monthly/annual
}
```
**Features**:
- Annual/monthly toggle (20% discount)
- Feature comparison tooltips
- Highlighted tier (scale + shadow)

---

### 3. Dashboard Components

#### `MetricsChart.tsx`
**Purpose**: GEO performance visualization  
**Props**:
```typescript
interface MetricsChartProps {
  data: Array<{ date: string; value: number }>;
  metric: 'citations' | 'authority' | 'visibility';
  timeRange?: '7d' | '30d' | '90d' | 'all';
}
```
**Library**: Recharts  
**Chart Types**: Line, Bar, Area

#### `AlertsPanel.tsx`
**Purpose**: Notification feed  
**Props**:
```typescript
interface AlertsPanelProps {
  alerts: Array<{
    id: string;
    type: 'info' | 'warning' | 'success' | 'error';
    message: string;
    timestamp: Date;
    read: boolean;
  }>;
  onMarkRead?: (id: string) => void;
}
```
**Features**:
- Real-time updates (WebSocket)
- Mark as read/unread
- Filter by type

---

### 4. Lab Components

#### `PromptEditor.tsx`
**Purpose**: AI prompt input interface  
**Props**:
```typescript
interface PromptEditorProps {
  initialValue?: string;
  templates?: Array<{ name: string; prompt: string }>;
  onGenerate: (prompt: string) => Promise<void>;
  loading?: boolean;
}
```
**Features**:
- Syntax highlighting (Monaco Editor)
- Template insertion
- Token counter
- History sidebar

#### `GeneratedOutput.tsx`
**Purpose**: AI generation result display  
**Props**:
```typescript
interface GeneratedOutputProps {
  content: string;
  type: 'text' | 'code' | 'image' | 'markdown';
  onCopy?: () => void;
  onDownload?: () => void;
}
```
**Features**:
- Copy to clipboard
- Download (text/image)
- Edit mode (regenerate with tweaks)

---

### 5. Reusable Blocks

#### `ResourceCard.tsx`
**Purpose**: Resource preview card  
**Props**:
```typescript
interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  image?: string;
  href: string;
  readTime?: string;
}
```
**Variants**: Blog, Research, Case Study

#### `ToolCard.tsx`
**Purpose**: Tool listing card  
**Props**:
```typescript
interface ToolCardProps {
  name: string;
  description: string;
  icon: React.ComponentType;
  tier: 'free' | 'pro' | 'enterprise';
  demoUrl?: string;
}
```
**Features**:
- Tier badge (color-coded)
- Try Demo CTA (opens modal)

#### `TestimonialCard.tsx`
**Purpose**: Customer quote  
**Props**:
```typescript
interface TestimonialCardProps {
  quote: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    company?: string;
  };
  rating?: number; // 1-5 stars
}
```

#### `NewsletterForm.tsx`
**Purpose**: Email capture  
**Props**:
```typescript
interface NewsletterFormProps {
  variant?: 'inline' | 'modal';
  onSubmit: (email: string) => Promise<void>;
}
```
**Integration**: ConvertKit/Mailchimp API

---

## Component Development Standards

### File Structure
```
components/
├── ui/               # shadcn/ui base (40+ components)
├── layout/           # Header, Footer, Sidebar
├── landing/          # Homepage sections
├── dashboard/        # Private app UI
├── lab/              # AI Lab components
└── shared/           # Reusable blocks
```

### Naming Convention
- **PascalCase** for components: `ToolCard.tsx`
- **camelCase** for utilities: `formatDate.ts`
- **kebab-case** for CSS modules: `tool-card.module.css`

### Props Pattern
```typescript
// Always export props interface
export interface ComponentNameProps {
  // Required props first
  title: string;
  children: React.ReactNode;
  
  // Optional props with ?
  variant?: 'primary' | 'secondary';
  className?: string;
  
  // Event handlers
  onClick?: () => void;
  onSubmit?: (data: FormData) => Promise<void>;
}

// Use FC type
export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  children,
  variant = 'primary',
  className,
  onClick,
}) => {
  // Implementation
};
```

### Accessibility Requirements
- **ARIA labels** on all interactive elements
- **Keyboard navigation** (Tab, Enter, Escape)
- **Focus indicators** (visible outline)
- **Screen reader text** for icons
- **Color contrast** WCAG 2.2 AA (4.5:1 normal, 3:1 large)

### Performance Targets
- **Component load**: <100ms
- **Bundle size**: <50KB (minified + gzipped)
- **Lighthouse score**: 90+ (Performance, Accessibility, Best Practices, SEO)

### Testing Strategy
- **Unit tests**: Jest + React Testing Library
- **Integration tests**: Playwright
- **Visual regression**: Percy/Chromatic
- **A11y audits**: axe-core

---

## Implementation Checklist

- [ ] Install dependencies (`shadcn-ui`, `framer-motion`, `recharts`)
- [ ] Setup Tailwind theme with design tokens
- [ ] Build base `ui/` components (Button, Card, Input, etc.)
- [ ] Implement layout components (Header, Footer, Sidebar)
- [ ] Create landing page sections (Hero → Pricing)
- [ ] Develop dashboard components (Charts, Alerts)
- [ ] Build Lab UI (PromptEditor, Output)
- [ ] Add accessibility audits (axe-core in CI)
- [ ] Performance testing (Lighthouse CI)
- [ ] Storybook documentation

---

## Reference Links

- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)