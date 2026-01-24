// geocolab-app/src/apps/ai-tools/visibility-score/VisibilityCalculator.tsx
import React, { useState } from 'react';
import { ContentHeader } from '@framr/ui/components/Content/ContentHeader';
import { ContentFooter } from '@framr/ui/components/Content/ContentFooter';
import { FramrCard } from '@framr/ui/components/content/FramrCard';
import { StepIndicator } from '@framr/ui/components/StepIndicator';
import { useFetchrAction } from '@fluxr/react-sdk';
import { usePerformanceMonitor } from '@dndhub/react-sdk';

export default function VisibilityCalculator() {
  const [url, setUrl] = useState('');
  const [currentStep, setCurrentStep] = useState('input');
  const monitor = usePerformanceMonitor();

  const { execute: calculateScore, data: scoreData, loading } = useFetchrAction(
    'external:api:openai',
    {
      action: 'create',
      resource: 'visibility-analysis',
      payload: { url }
    },
    { 
      enabled: false,
      cache: true,
      cacheTtl: 300000 
    }
  );

  const steps = [
    { id: 'input', label: 'Enter Website', status: currentStep === 'input' ? 'active' : 'completed' },
    { id: 'analyzing', label: 'AI Analysis', status: currentStep === 'analyzing' ? 'active' : currentStep === 'results' ? 'completed' : 'pending' },
    { id: 'results', label: 'View Score', status: currentStep === 'results' ? 'active' : 'pending' }
  ];

  const handleAnalyze = async () => {
    setCurrentStep('analyzing');
    const operation = monitor.startOperation('visibility-score-calculation');
    
    try {
      await calculateScore();
      operation.succeed();
      setCurrentStep('results');
    } catch (error) {
      operation.fail(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ContentHeader
        title="AI Visibility Score Calculator"
        subtitle="Discover how AI search engines see your business"
        size="lg"
        actions={
          <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
            Upgrade to Pro ($297)
          </button>
        }
      />

      <StepIndicator
        steps={steps}
        activeStep={currentStep}
        color="primary"
        showNumbers
        className="my-8"
      />

      {currentStep === 'input' && (
        <FramrCard variant="elevated" spacing="lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!url || loading}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              Analyze AI Visibility
            </button>
          </div>
        </FramrCard>
      )}

      {currentStep === 'analyzing' && (
        <FramrCard variant="elevated" spacing="lg">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Analyzing Your AI Visibility</h3>
            <p className="text-gray-600">Checking presence across ChatGPT, Claude, Gemini, and Perplexity...</p>
          </div>
        </FramrCard>
      )}

      {currentStep === 'results' && scoreData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FramrCard variant="elevated" color="primary">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">
                {scoreData.overallScore}/100
              </div>
              <div className="text-sm text-gray-600 mt-2">Overall AI Visibility</div>
            </div>
          </FramrCard>

          <FramrCard variant="elevated">
            <h4 className="font-semibold mb-3">Platform Scores</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>ChatGPT</span>
                <span className="font-semibold">{scoreData.platforms.chatgpt}/100</span>
              </div>
              <div className="flex justify-between">
                <span>Claude</span>
                <span className="font-semibold">{scoreData.platforms.claude}/100</span>
              </div>
              <div className="flex justify-between">
                <span>Gemini</span>
                <span className="font-semibold">{scoreData.platforms.gemini}/100</span>
              </div>
            </div>
          </FramrCard>

          <FramrCard variant="elevated">
            <h4 className="font-semibold mb-3">Key Issues Found</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              {scoreData.issues.map((issue: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  {issue}
                </li>
              ))}
            </ul>
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
            Want a detailed report with actionable recommendations?
          </p>
          <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
            Get Full Audit Report ($297)
          </button>
        </div>
      </ContentFooter>
    </div>
  );
}