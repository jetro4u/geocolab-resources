// geocolab-app/src/apps/ai-tools/query-simulator/AIQuerySimulator.tsx
import React, { useState } from 'react';
import { ContentHeader } from '@framr/ui/components/Content/ContentHeader';
import { ContentFooter } from '@framr/ui/components/Content/ContentFooter';
import { FramrCard } from '@framr/ui/components/content/FramrCard';
import { Tabs } from '@framr/ui/components/Tabs';
import { Badge } from '@framr/ui/components/Badge';
import { useFetchrAction } from '@fluxr/react-sdk';
import { usePerformanceMonitor, useDistributedCache } from '@dndhub/react-sdk';

interface PlatformResult {
  platform: string;
  response: string;
  mentions: boolean;
  position?: number;
  competitors: string[];
}

export default function AIQuerySimulator() {
  const [industry, setIndustry] = useState('');
  const [queries, setQueries] = useState(['', '', '']);
  const [activeTab, setActiveTab] = useState('setup');
  const monitor = usePerformanceMonitor();
  const distributedCache = useDistributedCache();

  const { execute: simulateQueries, data: simulationData, loading } = useFetchrAction(
    'internal:api:ai-simulator',
    {
      action: 'create',
      resource: 'query-simulation',
      payload: {
        industry,
        queries: queries.filter(q => q),
        platforms: ['chatgpt', 'claude', 'gemini', 'perplexity']
      }
    },
    { 
      enabled: false,
      cache: false // Always fresh simulations
    }
  );

  const handleSimulate = async () => {
    setActiveTab('simulating');
    const operation = monitor.startOperation('ai-query-simulation');
    
    try {
      // Use distributed cache for multi-region query testing
      const cacheKey = `simulation:${industry}:${queries.join(',')}`;
      const cached = await distributedCache.get(cacheKey);
      
      if (cached) {
        setActiveTab('results');
        return;
      }
      
      const result = await simulateQueries();
      await distributedCache.set(cacheKey, result, { ttl: 3600000 });
      
      operation.succeed();
      setActiveTab('results');
    } catch (error) {
      operation.fail(error);
    }
  };

  const updateQuery = (index: number, value: string) => {
    const updated = [...queries];
    updated[index] = value;
    setQueries(updated);
  };

  const platforms = [
    { id: 'chatgpt', name: 'ChatGPT', icon: '🤖', color: 'green' },
    { id: 'claude', name: 'Claude', icon: '🧠', color: 'purple' },
    { id: 'gemini', name: 'Gemini', icon: '✨', color: 'blue' },
    { id: 'perplexity', name: 'Perplexity', icon: '🔍', color: 'orange' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ContentHeader
        title="AI Search Query Simulator"
        subtitle="See exactly what AI says about your industry"
        size="lg"
        badge={{ text: 'QUICK REPORT', color: 'secondary' }}
        actions={
          <div className="text-2xl font-bold text-secondary-600">$147</div>
        }
      />

      <Tabs
        tabs={[
          { id: 'setup', label: 'Setup Queries' },
          { id: 'simulating', label: 'Simulating', disabled: activeTab !== 'simulating' },
          { id: 'results', label: 'Results', disabled: !simulationData }
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant="pills"
        className="mb-8"
      />

      {activeTab === 'setup' && (
        <FramrCard variant="elevated" spacing="lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Industry/Niche
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g., AI consulting, SaaS marketing, E-commerce"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Queries (What your customers ask AI)
              </label>
              <div className="space-y-3">
                {queries.map((query, index) => (
                  <input
                    key={index}
                    type="text"
                    value={query}
                    onChange={(e) => updateQuery(index, e.target.value)}
                    placeholder={`Query ${index + 1}: e.g., "Best ${industry} services"`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500"
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {platforms.map((platform) => (
                <div key={platform.id} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-1">{platform.icon}</div>
                  <div className="text-sm font-medium">{platform.name}</div>
                  <Badge color={platform.color as any} size="sm" className="mt-1">
                    Testing
                  </Badge>
                </div>
              ))}
            </div>

            <button
              onClick={handleSimulate}
              disabled={!industry || queries.filter(q => q).length === 0 || loading}
              className="w-full px-6 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition disabled:opacity-50"
            >
              Simulate AI Queries - $147
            </button>
          </div>
        </FramrCard>
      )}

      {activeTab === 'simulating' && (
        <FramrCard variant="elevated" spacing="lg">
          <div className="text-center py-12">
            <div className="flex justify-center gap-4 mb-6">
              {platforms.map((platform, index) => (
                <div
                  key={platform.id}
                  className="relative"
                  style={{
                    animation: `pulse 1.5s ease-in-out ${index * 0.2}s infinite`
                  }}
                >
                  <div className="text-4xl">{platform.icon}</div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-2 bg-secondary-600 rounded-full animate-ping"></div>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Querying AI Platforms...
            </h3>
            <p className="text-gray-600">
              Testing {queries.filter(q => q).length} queries across {platforms.length} AI platforms
            </p>
          </div>
        </FramrCard>
      )}

      {activeTab === 'results' && simulationData && (
        <div className="space-y-6">
          {/* Platform Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platforms.map((platform) => {
              const data = simulationData.platforms[platform.id];
              return (
                <FramrCard 
                  key={platform.id}
                  variant="elevated" 
                  color={data.mentionRate > 50 ? 'success' : data.mentionRate > 25 ? 'warn' : 'error'}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{platform.icon}</div>
                    <div className="font-semibold">{platform.name}</div>
                    <div className="text-2xl font-bold mt-2">
                      {data.mentionRate}%
                    </div>
                    <div className="text-sm text-gray-600">Mention Rate</div>
                  </div>
                </FramrCard>
              );
            })}
          </div>

          {/* Query Results */}
          {queries.filter(q => q).map((query, queryIndex) => (
            <FramrCard key={queryIndex} variant="elevated" spacing="lg">
              <h3 className="text-lg font-semibold mb-4">
                Query: "{query}"
              </h3>
              <div className="space-y-4">
                {platforms.map((platform) => {
                  const result = simulationData.queryResults[queryIndex][platform.id];
                  return (
                    <div key={platform.id} className="border-l-4 border-gray-200 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{platform.icon}</span>
                          <span className="font-medium">{platform.name}</span>
                        </div>
                        <Badge 
                          color={result.mentions ? 'success' : 'error'} 
                          size="sm"
                        >
                          {result.mentions ? 'Mentioned' : 'Not Found'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        "{result.snippet}"
                      </div>
                      {result.competitors.length > 0 && (
                        <div className="text-xs text-gray-500">
                          Competitors mentioned: {result.competitors.join(', ')}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </FramrCard>
          ))}

          {/* Insights */}
          <FramrCard variant="elevated" spacing="lg">
            <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2 text-green-700">Strengths</h4>
                <ul className="space-y-1 text-sm">
                  {simulationData.insights.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-red-700">Opportunities</h4>
                <ul className="space-y-1 text-sm">
                  {simulationData.insights.opportunities.map((opp: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">!</span>
                      {opp}
                    </li>
                  ))}
                </ul>
              </div>
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
            Want to improve your AI search presence?
          </p>
          <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
            Get Full Optimization Audit ($297)
          </button>
        </div>
      </ContentFooter>
    </div>
  );
}