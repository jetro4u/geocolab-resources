// geocolab-app/src/apps/ai-tools/gap-analysis/CompetitorGapAnalysis.tsx
import React, { useState } from 'react';
import { ContentHeader } from '@framr/ui/components/Content/ContentHeader';
import { ContentFooter } from '@framr/ui/components/Content/ContentFooter';
import { FramrCard } from '@framr/ui/components/content/FramrCard';
import { Tabs } from '@framr/ui/components/Tabs';
import { useFetchrAction } from '@fluxr/react-sdk';
import { usePerformanceMonitor, useAuditLogger } from '@dndhub/react-sdk';

export default function CompetitorGapAnalysis() {
  const [yourDomain, setYourDomain] = useState('');
  const [competitors, setCompetitors] = useState(['', '', '']);
  const [activeTab, setActiveTab] = useState('setup');
  const monitor = usePerformanceMonitor();
  const audit = useAuditLogger();

  const { execute: analyzeGaps, data: gapData, loading } = useFetchrAction(
    'external:api:perplexity',
    {
      action: 'create',
      resource: 'competitor-analysis',
      payload: { 
        domain: yourDomain, 
        competitors: competitors.filter(c => c) 
      }
    },
    { 
      enabled: false,
      cache: true,
      cacheTtl: 1800000 // 30 minutes
    }
  );

  const handleAnalyze = async () => {
    const operation = monitor.startOperation('competitor-gap-analysis');
    setActiveTab('analyzing');
    
    try {
      await analyzeGaps();
      await audit.log({
        action: 'competitor_analysis',
        domain: yourDomain,
        competitors: competitors.filter(c => c),
        timestamp: Date.now()
      });
      operation.succeed();
      setActiveTab('results');
    } catch (error) {
      operation.fail(error);
    }
  };

  const updateCompetitor = (index: number, value: string) => {
    const updated = [...competitors];
    updated[index] = value;
    setCompetitors(updated);
  };

  const tabs = [
    { id: 'setup', label: 'Setup Analysis' },
    { id: 'analyzing', label: 'Analyzing', disabled: activeTab !== 'analyzing' },
    { id: 'results', label: 'Gap Report', disabled: !gapData }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ContentHeader
        title="Competitor AI Gap Analysis"
        subtitle="Discover where competitors outrank you in AI search"
        size="lg"
        badge={{ text: 'RESEARCH REPORT', color: 'primary' }}
        actions={
          <div className="text-2xl font-bold text-primary-600">$297</div>
        }
      />

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant="underline"
        className="mb-8"
      />

      {activeTab === 'setup' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FramrCard variant="elevated" spacing="lg">
            <h3 className="text-lg font-semibold mb-4">Your Business</h3>
            <input
              type="text"
              value={yourDomain}
              onChange={(e) => setYourDomain(e.target.value)}
              placeholder="yourbusiness.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </FramrCard>

          <FramrCard variant="elevated" spacing="lg">
            <h3 className="text-lg font-semibold mb-4">Top Competitors</h3>
            <div className="space-y-3">
              {competitors.map((comp, index) => (
                <input
                  key={index}
                  type="text"
                  value={comp}
                  onChange={(e) => updateCompetitor(index, e.target.value)}
                  placeholder={`Competitor ${index + 1} domain`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              ))}
            </div>
          </FramrCard>

          <div className="lg:col-span-2">
            <button
              onClick={handleAnalyze}
              disabled={!yourDomain || competitors.filter(c => c).length === 0 || loading}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              Analyze AI Gaps - $297
            </button>
          </div>
        </div>
      )}

      {activeTab === 'analyzing' && (
        <FramrCard variant="elevated" spacing="lg">
          <div className="text-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary-200 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 bg-primary-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-2">Deep Analysis in Progress</h3>
            <p className="text-gray-600">Analyzing {competitors.filter(c => c).length} competitors across AI platforms...</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>✓ ChatGPT mentions</p>
              <p>✓ Claude knowledge</p>
              <p>✓ Gemini rankings</p>
              <p>✓ Perplexity citations</p>
            </div>
          </div>
        </FramrCard>
      )}

      {activeTab === 'results' && gapData && (
        <div className="space-y-6">
          {/* AI Visibility Comparison */}
          <FramrCard variant="elevated" spacing="lg">
            <h3 className="text-lg font-semibold mb-4">AI Visibility Comparison</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Your Business</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${gapData.yourScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold">{gapData.yourScore}%</span>
                </div>
              </div>
              
              {gapData.competitors.map((comp: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg">
                  <span>{comp.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${comp.score > gapData.yourScore ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${comp.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">{comp.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </FramrCard>

          {/* Key Gaps Identified */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FramrCard variant="elevated" color="error">
              <h4 className="font-semibold mb-3 text-red-700">Critical Gaps</h4>
              <ul className="space-y-2 text-sm">
                {gapData.criticalGaps.map((gap: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">⚠</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </FramrCard>

            <FramrCard variant="elevated" color="success">
              <h4 className="font-semibold mb-3 text-green-700">Your Advantages</h4>
              <ul className="space-y-2 text-sm">
                {gapData.advantages.map((adv: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </FramrCard>
          </div>

          {/* Action Plan */}
          <FramrCard variant="elevated" spacing="lg">
            <h3 className="text-lg font-semibold mb-4">30-Day Action Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gapData.actionPlan.map((action: any, index: number) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Week {Math.floor(index / 7) + 1}</div>
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{action.impact}</div>
                </div>
              ))}
            </div>
          </FramrCard>
        </div>
      )}

      <ContentFooter
        alignment="center"
        spacing="lg"
        borderTop
      >
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Ready to close the AI visibility gap?
          </p>
          <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
            Start Implementation Sprint ($1,497)
          </button>
        </div>
      </ContentFooter>
    </div>
  );
}