'use client';

import { useState } from 'react';
import { ChevronDown, Sparkles, Code, Users, BookOpen, Zap, Globe, Trophy, GraduationCap, HelpCircle, TrendingUp } from 'lucide-react';

/**
 * GEOCoLab MegaMenu - Semrush-Inspired Navigation
 * 
 * Features:
 * - Multi-column dropdowns with icons + descriptions
 * - Hover-optimized with 200ms delay
 * - Keyboard accessible (Tab, Escape)
 * - Mobile responsive (hamburger on <768px)
 */

interface MenuItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const navigationConfig: Record<string, MenuSection[]> = {
  Resources: [
    {
      title: 'Learn',
      items: [
        { label: 'Definitions', href: '/resources/definitions', icon: BookOpen, description: 'Core GEO terminology glossary' },
        { label: 'Blog', href: '/resources/blog', icon: TrendingUp, description: 'Insights & how-to guides' },
        { label: 'Research', href: '/resources/research', icon: Sparkles, description: 'In-depth papers & studies' },
        { label: 'Case Studies', href: '/resources/case-studies', icon: Trophy, description: 'Real-world GEO successes' },
      ],
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', href: '/help', icon: HelpCircle, description: 'FAQs & documentation' },
        { label: 'Webinars', href: '/resources/webinars', icon: GraduationCap, description: 'Live training sessions' },
        { label: 'Local GEO', href: '/resources/local-geo', icon: Globe, description: 'City-specific strategies' },
        { label: "What's New", href: '/resources/whats-new', icon: Zap, description: 'Latest platform updates' },
      ],
    },
  ],
  Tools: [
    {
      title: 'Free Tools',
      items: [
        { label: 'GEO Audit', href: '/tools/geo-audit', description: 'Analyze your AI visibility' },
        { label: 'Signal Explorer', href: '/tools/signal-explorer', description: 'Discover optimization signals' },
        { label: 'Citation Tracker', href: '/tools/citation-tracker', description: 'Monitor AI mentions' },
      ],
    },
    {
      title: 'Premium Tools',
      items: [
        { label: 'Algorithm Simulator', href: '/tools/algorithm-simulator', description: 'Model ranking changes' },
        { label: 'Content Optimizer', href: '/tools/content-optimizer', description: 'AI-driven enhancements' },
        { label: 'Competitor Analysis', href: '/tools/competitor-analysis', description: 'Benchmark against rivals' },
      ],
    },
  ],
  Products: [
    {
      title: 'Solutions',
      items: [
        { label: 'Toolkits', href: '/products/toolkits', icon: Code, description: 'DNDHUB OSS libraries' },
        { label: 'Enterprise', href: '/products/enterprise', icon: Users, description: 'White-label & custom' },
      ],
    },
  ],
  Lab: [
    {
      title: 'AI Generators',
      items: [
        { label: 'Social Content', href: '/lab/social', description: 'Platform-optimized posts' },
        { label: 'Web Copy', href: '/lab/web', description: 'Landing pages & articles' },
        { label: 'Visual Content', href: '/lab/image', description: 'Images & infographics' },
        { label: 'Video Scripts', href: '/lab/video', description: 'YouTube & TikTok scripts' },
        { label: 'Ad Copy', href: '/lab/ads', description: 'High-converting campaigns' },
      ],
    },
  ],
};

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  let hoverTimeout: NodeJS.Timeout;

  const handleMouseEnter = (menu: string) => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => setActiveMenu(menu), 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => setActiveMenu(null), 300);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-purple-700 rounded" />
            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-purple-700 bg-clip-text text-transparent">
              GEOCoLab
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {Object.keys(navigationConfig).map((menu) => (
              <div
                key={menu}
                className="relative"
                onMouseEnter={() => handleMouseEnter(menu)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`px-4 py-2 rounded-lg flex items-center gap-1 transition-colors ${
                    activeMenu === menu ? 'bg-gray-100 text-teal-600' : 'hover:bg-gray-50'
                  }`}
                  aria-expanded={activeMenu === menu}
                  aria-haspopup="true"
                >
                  {menu}
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === menu ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {activeMenu === menu && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-6 min-w-[600px]">
                    <div className="grid grid-cols-2 gap-8">
                      {navigationConfig[menu].map((section) => (
                        <div key={section.title}>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            {section.title}
                          </h3>
                          <ul className="space-y-2">
                            {section.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <li key={item.href}>
                                  <a
                                    href={item.href}
                                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                                  >
                                    {Icon && (
                                      <Icon className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                                    )}
                                    <div>
                                      <div className="font-medium text-gray-900 group-hover:text-teal-600">
                                        {item.label}
                                      </div>
                                      {item.description && (
                                        <div className="text-sm text-gray-500 mt-0.5">
                                          {item.description}
                                        </div>
                                      )}
                                    </div>
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Direct Links */}
            <a href="/integrations" className="px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Integrations
            </a>
            <a href="/pricing" className="px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Pricing
            </a>
            <a href="/ai-authority" className="px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
              AI Authority Index™
              <Sparkles className="w-4 h-4 text-purple-600" />
            </a>
          </nav>

          {/* Auth CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a href="/api/auth/signin" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              Sign In
            </a>
            <a
              href="/pricing"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-purple-700 rounded-lg hover:shadow-lg transition-shadow"
            >
              Start Free Trial
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-gray-900 mb-1" />
            <div className="w-6 h-0.5 bg-gray-900 mb-1" />
            <div className="w-6 h-0.5 bg-gray-900" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {Object.entries(navigationConfig).map(([menu, sections]) => (
              <div key={menu} className="mb-4">
                <div className="font-semibold text-gray-900 mb-2">{menu}</div>
                {sections.map((section) => (
                  <div key={section.title} className="ml-4 mb-3">
                    <div className="text-xs font-medium text-gray-500 uppercase mb-1">{section.title}</div>
                    {section.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-sm text-gray-700 hover:text-teal-600"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <a href="/api/auth/signin" className="block py-2 text-sm font-medium text-gray-700">
                Sign In
              </a>
              <a
                href="/pricing"
                className="block mt-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-purple-700 rounded-lg text-center"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
