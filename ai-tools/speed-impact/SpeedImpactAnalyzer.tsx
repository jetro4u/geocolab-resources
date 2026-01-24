// geocolab-app/src/apps/ai-tools/speed-impact/SpeedImpactAnalyzer.tsx
import React, { useState } from 'react';
import { ContentHeader } from '@framr/ui/components/Content/ContentHeader';
import { ContentFooter } from '@framr/ui/components/Content/ContentFooter';
import { FramrCard } from '@framr/ui/components/content/FramrCard';
import { Hero } from '@framr/ui/components/Hero';
import { useFetchrAction } from '@fluxr/react-sdk';
import { usePerformanceMonitor } from '@dndhub/react-sdk';

export default function SpeedImpactAnalyzer() {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const monitor = usePerformanceMonitor();

  const { execute: analyzeSpeed, data: speedData } = useFetchrAction(
    'external:api:lighthouse',
    {
      action: 'create',
      resource: 'speed-analysis',
      payload: { url, metrics: ['performance', 'ai-impact'] }
    },
    { 
      enabled: false,
      cache: true,
      cacheTtl: 300000
    }
  );

  const handleAnalyze = async () => {
    setAnalyzing(true);
    const operation = monitor.startOperation('speed-impact-analysis');
    
    try {
      await analyzeSpeed();
      operation.succeed();
    } catch (error) {
      operation.fail(error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Hero
        title="Free: Speed Impact on AI Rankings"
        subtitle="See how your site speed affects AI search visibility"
        variant="gradient"
        size="md"
        actions={
          <div className="flex items-center gap-4">
            <span className="text-lg text-white/80">100% Free Tool</span>
            <span className="text-white">→</span>
            <span className="text-lg text-white font-semibold">Leads to Trakfox</span>
          </div>
        }
      />

      <FramrCard variant="elevated" spacing="lg" className="mt-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <div className="flex gap-3">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={handleAnalyze}
                disabled={!url || analyzing}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg hover:from-primary-700 hover:to-accent-700 transition disabled:opacity-50"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Free'}
              </button>
            </div>
          </div>
        </div>
      </FramrCard>

      {speedData && (
        <div className="mt-8 space-y-6">
          {/* Speed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FramrCard 
              variant="elevated" 
              color={speedData.currentSpeed < 3 ? 'success' : speedData.currentSpeed < 5 ? 'warn' : 'error'}
            >
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {speedData.currentSpeed}s
                </div>
                <div className="text-sm opacity-75">Load Time</div>
              </div>
            </FramrCard>

            <FramrCard variant="elevated" color="error">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  -{speedData.aiPenalty}%
                </div>
                <div className="text-sm text-gray-600">AI Ranking Penalty</div>
              </div>
            </FramrCard>

            <FramrCard variant="elevated" color="success">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  +{speedData.trakfoxProjection}%
                </div>
                <div className="text-sm text-gray-600">Faster with Trakfox</div>
              </div>
            </FramrCard>
          </div>

          {/* Impact Analysis */}
          <FramrCard variant="elevated" spacing="lg">
            <h3 className="text-lg font-semibold mb-4">AI Search Impact Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span>ChatGPT Citation Likelihood</span>
                <span className="font-semibold text-red-600">
                  {speedData.impacts.chatgpt}% Lower
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span>Perplexity Crawl Frequency</span>
                <span className="font-semibold text-red-600">
                  {speedData.impacts.perplexity}% Reduced
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span>AI Knowledge Update Rate</span>
                <span className="font-semibold text-red-600">
                  {speedData.impacts.updateRate}x Slower
                </span>
              </div>
            </div>
          </FramrCard>

          {/* Trakfox CTA */}
          <FramrCard variant="gradient" spacing="lg" className="bg-gradient-to-r from-primary-600 to-accent-600 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">
                Your site could be {speedData.trakfoxProjection}% faster
              </h3>
              <p className="opacity-90 mb-6">
                Trakfox optimizes your site for both traditional and AI search engines
              </p>
              <div className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition">
                  Join Trakfox Waitlist (October 2025)
                </button>
                <button className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition">
                  Get Speed Optimization Now ($197)
                </button>
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
        <p className="text-gray-600">
          Free tool provided by GEOCoLab • Building towards Trakfox launch October 2025
        </p>
      </ContentFooter>
    </div>
  );
}