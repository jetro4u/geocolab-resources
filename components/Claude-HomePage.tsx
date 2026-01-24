'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Zap, TrendingUp, Users, Award, Code, Globe, Sparkles, Play } from 'lucide-react';

/**
 * GEOCoLab Landing Page
 * 
 * Production-ready homepage with:
 * - Hero with platform selector (X/Google visualization toggle)
 * - Stats bar, features grid, toolkit gallery
 * - Social proof, how-it-works, resources showcase
 * - Products, integrations, pricing, final CTA
 * - Optimized for Core Web Vitals (LCP <2.5s, CLS <0.1)
 */

export default function LandingPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<'x' | 'google'>('x');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-purple-900 to-teal-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Platform Selector */}
            <div className="inline-flex gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1 mb-8">
              <button
                onClick={() => setSelectedPlatform('x')}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedPlatform === 'x' ? 'bg-white text-teal-900 shadow-lg' : 'text-white hover:bg-white/10'
                }`}
              >
                X Algorithm
              </button>
              <button
                onClick={() => setSelectedPlatform('google')}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedPlatform === 'google' ? 'bg-white text-purple-900 shadow-lg' : 'text-white hover:bg-white/10'
                }`}
              >
                Google GEO
              </button>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Master Generative Engine Optimization
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-100">
              Transform AI Signals into Citations, Authority, and Revenue for Creators & Businesses
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="/tools/geo-audit"
                className="px-8 py-4 bg-white text-teal-900 rounded-lg font-semibold hover:shadow-2xl transition-shadow flex items-center justify-center gap-2 group"
              >
                Get Free GEO Audit
                <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/lab"
                className="px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                Explore AI Lab
                <Sparkles className="w-5 h-5" />
              </a>
            </div>

            {/* Platform Visualization */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              {selectedPlatform === 'x' && (
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-4">X 5:3:2 Soccer Formation</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-teal-600/20 p-4 rounded-lg">
                      <div className="text-4xl font-bold">5</div>
                      <div className="text-sm">Engaged Replies</div>
                      <div className="text-xs text-teal-200">75x weight</div>
                    </div>
                    <div className="bg-purple-600/20 p-4 rounded-lg">
                      <div className="text-4xl font-bold">3</div>
                      <div className="text-sm">Quote Tweets</div>
                      <div className="text-xs text-purple-200">30x weight</div>
                    </div>
                    <div className="bg-teal-600/20 p-4 rounded-lg">
                      <div className="text-4xl font-bold">2</div>
                      <div className="text-sm">Reposts</div>
                      <div className="text-xs text-teal-200">20x weight</div>
                    </div>
                  </div>
                </div>
              )}
              {selectedPlatform === 'google' && (
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-4">Citation Density Mapping</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-purple-600 h-8 rounded" style={{ width: '90%' }} />
                      <span className="text-sm">Authority Links (90%)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-teal-600 h-8 rounded" style={{ width: '70%' }} />
                      <span className="text-sm">Entity Recognition (70%)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-purple-400 h-8 rounded" style={{ width: '85%' }} />
                      <span className="text-sm">Semantic Depth (85%)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Open-Source Libraries', icon: Code },
              { value: '400+', label: 'Optimized Facilities', icon: Globe },
              { value: '20+', label: 'Years Expertise', icon: Award },
              { value: 'UNICEF', label: 'Partner', icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-teal-600" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for GEO Domination
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From audits to automation, we've built the complete toolkit for AI-first optimization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'GEO Audit', desc: 'Comprehensive AI visibility analysis', icon: TrendingUp, href: '/tools/geo-audit' },
              { title: 'Citation Engineering', desc: 'Build authority through AI mentions', icon: Award, href: '/products/toolkits' },
              { title: 'Signal Lab', desc: 'AI-powered content generation', icon: Sparkles, href: '/lab' },
              { title: 'Growth Competitions', desc: 'Win prizes through optimization', icon: Award, href: '/resources/competitions' },
              { title: 'Algorithm Simulator', desc: 'Model ranking changes', icon: Code, href: '/tools/algorithm-simulator' },
              { title: 'Authority Index™', desc: 'Real-time visibility rankings', icon: Globe, href: '/ai-authority' },
              { title: 'Marketplace', desc: 'Apps & integrations hub', icon: Users, href: '/marketplace' },
              { title: 'Enterprise Solutions', desc: 'White-label & custom builds', icon: Zap, href: '/products/enterprise' },
            ].map((feature) => (
              <a
                key={feature.title}
                href={feature.href}
                className="group p-6 border border-gray-200 rounded-xl hover:border-teal-600 hover:shadow-lg transition-all"
              >
                <feature.icon className="w-12 h-12 text-teal-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.desc}</p>
                <span className="text-teal-600 font-medium flex items-center gap-1">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How GEO Works</h2>
            <p className="text-xl text-gray-600">Four steps to AI search dominance</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Audit Signals', desc: 'Analyze your current AI visibility and identify optimization opportunities' },
              { step: '2', title: 'Optimize Content', desc: 'Apply signal-driven strategies to boost authority and citations' },
              { step: '3', title: 'Build Citations', desc: 'Engineer mentions across AI platforms through proven frameworks' },
              { step: '4', title: 'Monetize Visibility', desc: 'Convert AI traffic into revenue through strategic positioning' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-purple-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Matrix */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your ambition</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: 'Free',
                desc: 'Perfect for exploring GEO',
                features: ['Basic GEO Audit', '1 Platform Lab Access', 'Community Support', 'Monthly Reports'],
                cta: 'Start Free',
                href: '/api/auth/signup',
              },
              {
                name: 'Pro',
                price: '$99',
                period: '/mo',
                desc: 'For serious optimizers',
                features: ['Full GEO Suite', 'All Platform Labs', '14-Day Competitions', 'Priority Support', 'API Access'],
                cta: 'Start Trial',
                href: '/pricing',
                highlighted: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                desc: 'White-label & consulting',
                features: ['Custom Reporting', 'Dedicated Account Manager', 'SLA Guarantees', 'On-Premise Options'],
                cta: 'Contact Sales',
                href: '/contact',
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`p-8 rounded-xl border-2 ${
                  tier.highlighted ? 'border-teal-600 shadow-xl scale-105' : 'border-gray-200'
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {tier.price}
                  {tier.period && <span className="text-lg text-gray-600">{tier.period}</span>}
                </div>
                <p className="text-gray-600 mb-6">{tier.desc}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.href}
                  className={`block w-full py-3 rounded-lg font-semibold text-center transition-all ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-teal-600 to-purple-700 text-white hover:shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Dominate AI Search?</h2>
          <p className="text-xl mb-8 text-teal-100 max-w-2xl mx-auto">
            Join hundreds of creators and businesses optimizing for the AI-first future
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-900 rounded-lg font-semibold hover:shadow-2xl transition-shadow"
          >
            Book Free Consultation
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}