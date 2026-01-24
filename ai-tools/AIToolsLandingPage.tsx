// apps/geocolab/src/pages/public/LandingPage.tsx
import React from 'react';
import { UniversalShell } from '@synai/shell';
import { Portal } from '@synai/portal';
import { 
  HeroBlock, 
  FeatureGrid, 
  TestimonialCarousel,
  CTASection 
} from '@synai/blocks';
import { Button, Card } from '@synai/atomic';
import { useNavigate } from '@synai/routr';
import { GeoColabModuleGovernance } from '../../../configs/governance';

const aiTools = [
  {
    id: 'visibility-score',
    title: 'AI Visibility Score Calculator',
    description: 'Check your AI search visibility in 60 seconds',
    price: 'Free',
    cta: 'Calculate Now',
    icon: '📊'
  },
  {
    id: 'citation-checker',
    title: 'ChatGPT Citation Checker',
    description: 'Find out if AI knows your business',
    price: '$97',
    cta: 'Check Citations',
    icon: '🔍'
  },
  {
    id: 'competitor-gap',
    title: 'Competitor AI Gap Analysis',
    description: 'See where competitors outrank you in AI',
    price: '$297',
    cta: 'Analyze Gaps',
    icon: '📈'
  },
  {
    id: 'content-optimizer',
    title: 'AI Content Optimization Audit',
    description: 'Optimize existing content for AI discovery',
    price: '$497',
    cta: 'Start Audit',
    icon: '✨'
  }
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <UniversalShell ast={GeoColabModuleGovernance}>
      {/* Hero Section */}
      <Portal portalKey="main">
        <HeroBlock
          title="Dominate AI Search Results"
          subtitle="Get found when customers ask AI about your industry"
          backgroundGradient="from-blue-600 to-purple-600"
          ctaPrimary={{
            text: "Get Free Visibility Score",
            onClick: () => navigate('/tools/visibility-score')
          }}
          ctaSecondary={{
            text: "See How It Works",
            onClick: () => navigate('#how-it-works')
          }}
        />
      </Portal>

      {/* Features Grid */}
      <Portal portalKey="content">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              AI Optimization Tools That Drive Revenue
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Stop being invisible to AI. Our suite of tools ensures ChatGPT, Claude, 
              and other AI platforms recommend your business.
            </p>
            
            <FeatureGrid>
              {aiTools.map(tool => (
                <Card 
                  key={tool.id}
                  className="p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {tool.price}
                    </span>
                    <Button 
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/tools/${tool.id}`)}
                    >
                      {tool.cta}
                    </Button>
                  </div>
                </Card>
              ))}
            </FeatureGrid>
          </div>
        </section>
      </Portal>

      {/* Social Proof */}
      <Portal portalKey="content">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <TestimonialCarousel
              testimonials={[
                {
                  quote: "Our AI visibility increased 340% in just 2 weeks!",
                  author: "Sarah Chen",
                  company: "TechStart Inc",
                  rating: 5
                },
                {
                  quote: "ChatGPT now recommends us as the top choice in our industry",
                  author: "Mike Rodriguez",
                  company: "Digital Solutions Co",
                  rating: 5
                },
                {
                  quote: "The ROI was immediate - $50K in new leads from AI referrals",
                  author: "Emily Watson",
                  company: "Growth Marketing Agency",
                  rating: 5
                }
              ]}
            />
          </div>
        </section>
      </Portal>

      {/* CTA Section */}
      <Portal portalKey="content">
        <CTASection
          title="Ready to Dominate AI Search?"
          description="Join 500+ businesses already winning in the AI era"
          primaryAction={{
            text: "Start Free Analysis",
            onClick: () => navigate('/signup')
          }}
          secondaryAction={{
            text: "Book a Demo",
            onClick: () => navigate('/demo')
          }}
          background="gradient"
        />
      </Portal>
    </UniversalShell>
  );
};