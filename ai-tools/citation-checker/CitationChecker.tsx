// geocolab-app/src/apps/ai-tools/citation-checker/CitationChecker.tsx
import React, { useState } from 'react';
import { ContentHeader } from '@framr/ui/components/Content/ContentHeader';
import { ContentFooter } from '@framr/ui/components/Content/ContentFooter';
import { FramrCard } from '@framr/ui/components/content/FramrCard';
import { StepIndicator } from '@framr/ui/components/StepIndicator';
import { useFetchrAction } from '@fluxr/react-sdk';
import { usePerformanceMonitor, useCache } from '@dndhub/react-sdk';

export default function CitationChecker() {
  const [domain, setDomain] = useState('');
  const [keywords, setKeywords] = useState('');
  const [currentStep, setCurrentStep] = useState('input');
  const monitor = usePerformanceMonitor();
  const { getCached, setCached } = useCache();

  const { execute: checkCitations, data: citationData, loading } = useFetchrAction(
    'external:api:openai',
    {
      action: 'create',
      resource: 'citation-analysis',
      payload: { domain, keywords: keywords.split(',').map(k => k.trim()) }
    },
    { 
      enabled: false,
      cache: true,
      cacheTtl: 600000 // 10 minutes
    }
  );

  const steps = [
    { id: 'input', label: 'Enter Details', status: currentStep === 'input' ? 'active' : 'completed' },
    { id: 'checking', label: 'Checking Citations', status: currentStep === 'checking' ? 'active' : currentStep === 'results' ? 'completed' : 'pending' },
    { id: 'results', label: 'View Report', status: currentStep === 'results' ? 'active' : 'pending' }
  ];

  const handleCheck = async () => {
    setCurrentStep('checking');
    const operation = monitor.startOperation('citation-check');
    
    try {
      const cacheKey = `citations:${domain}:${keywords}`;
      const cached = getCached(cacheKey);
      
      if (cached) {
        setCurrentStep('results');
        return;
      }
      
      const result = await checkCitations();
      setCached(cacheKey, result, 600000);
      operation.succeed();
      setCurrentStep('results');
    } catch (error) {
      operation.fail(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ContentHeader
        title="ChatGPT Citation Checker"
        subtitle="Does ChatGPT know your business exists?"
        size="lg"
        badge={{ text: 'QUICK FIX', color: 'success' }}
        actions={
          <div className="flex items-center gap-2">
            <span className="line-through text-gray-400">$197</span>
            <span className="text-2xl font-bold text-success-600">$97</span>
          </div>
        }
      />

      <StepIndicator
        steps={steps}
        activeStep={currentStep}
        color="success"
        variant="numbered"
        className="my-8"
      />

      {currentStep === 'input' && (
        <FramrCard variant="elevated" spacing="lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Domain
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-success-500 focus:border-success-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry Keywords (comma-separated)
              </label>
              <textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="AI consulting, SEO optimization, digital marketing"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-success-500 focus:border-success-500"
              />
            </div>
            
            <button
              onClick={handleCheck}
              disabled={!domain || !keywords || loading}
              className="w-full px-6 py-3 bg-success-600 text-white rounded-lg hover:bg-success-700 transition disabled:opacity-50"
            >
              Check My Citations - Only $97
            </button>
          </div>
        </FramrCard>
      )}

      {currentStep === 'checking' && (
        <FramrCard variant="elevated" spacing="lg">
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="h-16 w-16 bg-success-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Querying ChatGPT...</h3>
            <p className="text-gray-600">Testing {keywords.split(',').length} keywords for citations</p>
          </div>
        </FramrCard>
      )}

      {currentStep === 'results' && citationData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FramrCard variant="elevated" color={citationData.citationScore > 50 ? 'success' : 'error'}>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">
                  {citationData.citationScore}%
                </div>
                <div className="text-sm opacity-75">Citation Frequency</div>
              </div>
            </FramrCard>

            <FramrCard variant="elevated">
              <h4 className="font-semibold mb-3">Keywords Mentioned</h4>
              <div className="space-y-2">
                {citationData.keywordMentions.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.keyword}</span>
                    <span className={`font-semibold ${item.mentioned ? 'text-success-600' : 'text-red-500'}`}>
                      {item.mentioned ? '✓ Found' : '✗ Missing'}
                    </span>
                  </div>
                ))}
              </div>
            </FramrCard>
          </div>

          <FramrCard variant="elevated" spacing="lg">
            <h4 className="font-semibold mb-3">3 Immediate Optimization Tips</h4>
            <ol className="space-y-3">
              {citationData.quickFixes.map((fix: string, index: number) => (
                <li key={index} className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-success-100 text-success-700 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{fix}</span>
                </li>
              ))}
            </ol>
          </FramrCard>
        </>
      )}

      <ContentFooter
        alignment="center"
        spacing="lg"
        borderTop
      >
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Want to improve your ChatGPT visibility?
          </p>
          <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
            Get QuickStart Package ($750)
          </button>
        </div>
      </ContentFooter>
    </div>
  );
}