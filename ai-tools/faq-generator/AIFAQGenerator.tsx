// geocolab-app/src/apps/ai-tools/faq-generator/AIFAQGenerator.tsx
import React, { useState } from 'react';
import { ContentHeader } from '@framr/components/ContentHeader';
import { ContentFooter } from '@framr/components/ContentFooter';
import { FramrCard } from '@framr/components/FramrCard';
import { Accordion } from '@framr/components/Accordion';
import { Badge } from '@framr/components/Badge';
import { useFetchrAction } from '@fluxr/react-sdk';
import { useMLPattern, usePerformanceMonitor, useAuditLogger } from '@dndhub/react-sdk';

interface GeneratedFAQ {
  question: string;
  answer: string;
  category: string;
  searchVolume: number;
  aiRelevance: 'high' | 'medium' | 'low';
  schema: string;
}

export default function AIFAQGenerator() {
  const [inputs, setInputs] = useState({
    url: '',
    competitorUrls: '',
    industry: '',
    targetKeywords: ''
  });
  const [generating, setGenerating] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedFAQs, setEditedFAQs] = useState<GeneratedFAQ[]>([]);
  
  const monitor = usePerformanceMonitor();
  const mlPattern = useMLPattern();
  const audit = useAuditLogger();

  const { execute: generateFAQs, data: faqData } = useFetchrAction(
    'external:api:openai',
    {
      action: 'create',
      resource: 'faq-generation',
      payload: {
        ...inputs,
        competitorUrls: inputs.competitorUrls.split('\n').filter(u => u),
        targetKeywords: inputs.targetKeywords.split(',').map(k => k.trim())
      }
    },
    { 
      enabled: false,
      cache: false // Always generate fresh
    }
  );

  const handleGenerate = async () => {
    setGenerating(true);
    const operation = monitor.startOperation('faq-generation');
    
    try {
      const result = await generateFAQs();
      
      // Use ML to enhance FAQ relevance
      const enhanced = await mlPattern.enhanceFAQRelevance(result.faqs);
      result.faqs = enhanced;
      
      setEditedFAQs(result.faqs);
      
      await audit.log({
        action: 'faq_generated',
        count: result.faqs.length,
        industry: inputs.industry
      });
      
      operation.succeed();
    } catch (error) {
      operation.fail(error);
    } finally {
      setGenerating(false);
    }
  };

  const updateFAQ = (index: number, field: keyof GeneratedFAQ, value: string) => {
    const updated = [...editedFAQs];
    updated[index] = { ...updated[index], [field]: value };
    setEditedFAQs(updated);
  };

  const exportFAQs = (format: 'json' | 'html' | 'schema') => {
    const data = editMode ? editedFAQs : faqData?.faqs;
    
    switch(format) {
      case 'json':
        downloadFile('faqs.json', JSON.stringify(data, null, 2), 'application/json');
        break;
      case 'html':
        const html = generateHTMLExport(data);
        downloadFile('faqs.html', html, 'text/html');
        break;
      case 'schema':
        const schema = generateSchemaMarkup(data);
        downloadFile('faq-schema.json', schema, 'application/ld+json');
        break;
    }
  };

  const downloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  const generateHTMLExport = (faqs: GeneratedFAQ[]) => {
    return `
      <!DOCTYPE html>
      <html>
      <head><title>AI-Optimized FAQs</title></head>
      <body>
        <h1>Frequently Asked Questions</h1>
        ${faqs.map(faq => `
          <div>
            <h3>${faq.question}</h3>
            <p>${faq.answer}</p>
          </div>
        `).join('')}
      </body>
      </html>
    `;
  };

  const generateSchemaMarkup = (faqs: GeneratedFAQ[]) => {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }, null, 2);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ContentHeader
        title="AI-Powered FAQ Generator"
        subtitle="Generate AI-optimized FAQs from competitor analysis"
        size="lg"
        badge={{ text: 'CONTENT SERVICE', color: 'success' }}
        actions={
          <div className="text-2xl font-bold text-success-600">$197</div>
        }
      />

      {!faqData && !generating && (
        <FramrCard variant="elevated" spacing="lg" className="mt-8">
          <div className="space-y-6">
            <Grid cols={2} gap="md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Website URL
                </label>
                <input
                  type="url"
                  value={inputs.url}
                  onChange={(e) => setInputs({...inputs, url: e.target.value})}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-success-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry/Niche
                </label>
                <input
                  type="text"
                  value={inputs.industry}
                  onChange={(e) => setInputs({...inputs, industry: e.target.value})}
                  placeholder="e.g., Digital Marketing"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-success-500"
                />
              </div>
            </Grid>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Competitor URLs (one per line)
              </label>
              <textarea
                value={inputs.competitorUrls}
                onChange={(e) => setInputs({...inputs, competitorUrls: e.target.value})}
                placeholder="https://competitor1.com&#10;https://competitor2.com"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-success-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={inputs.targetKeywords}
                onChange={(e) => setInputs({...inputs, targetKeywords: e.target.value})}
                placeholder="AI consulting, machine learning services, data science"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-success-500"
              />
            </div>

            <FramrCard variant="soft" color="info" spacing="sm">
              <div className="text-sm">
                <strong>What you'll get:</strong>
                <ul className="mt-2 space-y-1">
                  <li>• 20-30 AI-optimized FAQ questions</li>
                  <li>• Search volume data for each question</li>
                  <li>• Schema markup for rich snippets</li>
                  <li>• Export in multiple formats</li>
                </ul>
              </div>
            </FramrCard>

            <button
              onClick={handleGenerate}
              disabled={!inputs.url || !inputs.industry}
              className="w-full px-6 py-3 bg-success-600 text-white rounded-lg hover:bg-success-700 transition disabled:opacity-50"
            >
              Generate AI-Optimized FAQs - $197
            </button>
          </div>
        </FramrCard>
      )}

      {generating && (
        <FramrCard variant="elevated" spacing="lg" className="mt-8">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-success-100 rounded-full animate-pulse mb-4">
              <svg className="w-10 h-10 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Generating AI-Optimized FAQs
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>✓ Analyzing your content</p>
              <p>✓ Researching competitor FAQs</p>
              <p>✓ Identifying search intent</p>
              <p>✓ Optimizing for AI platforms</p>
            </div>
          </div>
        </FramrCard>
      )}

      {faqData && !generating && (
        <div className="mt-8 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FramrCard variant="elevated">
              <div className="text-center">
                <div className="text-3xl font-bold">{faqData.faqs.length}</div>
                <div className="text-sm text-gray-600">FAQs Generated</div>
              </div>
            </FramrCard>

            <FramrCard variant="elevated">
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {faqData.totalSearchVolume.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Monthly Searches</div>
              </div>
            </FramrCard>

            <FramrCard variant="elevated">
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {faqData.categories.length}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </FramrCard>

            <FramrCard variant="elevated">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {faqData.aiOptimizationScore}%
                </div>
                <div className="text-sm text-gray-600">AI Optimized</div>
              </div>
            </FramrCard>
          </div>

          {/* Export Options */}
          <FramrCard variant="elevated" spacing="md">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Export Options</h4>
                <p className="text-sm text-gray-600">Download your FAQs in various formats</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => exportFAQs('json')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  JSON
                </button>
                <button 
                  onClick={() => exportFAQs('html')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  HTML
                </button>
                <button 
                  onClick={() => exportFAQs('schema')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Schema Markup
                </button>
              </div>
            </div>
          </FramrCard>

          {/* Generated FAQs */}
          <FramrCard variant="elevated" spacing="lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Generated FAQs</h3>
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition"
              >
                {editMode ? 'Save Edits' : 'Edit FAQs'}
              </button>
            </div>

            <Accordion
              items={faqData.categories.map((category: string) => {
                const categoryFAQs = (editMode ? editedFAQs : faqData.faqs)
                  .filter((faq: GeneratedFAQ) => faq.category === category);
                
                return {
                  id: category,
                  title: (
                    <div className="flex items-center justify-between">
                      <span>{category}</span>
                      <Badge color="neutral" size="sm">
                        {categoryFAQs.length} questions
                      </Badge>
                    </div>
                  ),
                  content: (
                    <div className="space-y-4">
                      {categoryFAQs.map((faq: GeneratedFAQ, index: number) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            {editMode ? (
                              <input
                                type="text"
                                value={faq.question}
                                onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                                className="flex-1 px-2 py-1 border rounded"
                              />
                            ) : (
                              <div className="font-medium">{faq.question}</div>
                            )}
                            <div className="flex items-center gap-2 ml-4">
                              <Badge 
                                color={faq.aiRelevance === 'high' ? 'success' : faq.aiRelevance === 'medium' ? 'warn' : 'neutral'}
                                size="sm"
                              >
                                {faq.aiRelevance} AI relevance
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {faq.searchVolume}/mo
                              </span>
                            </div>
                          </div>
                          {editMode ? (
                            <textarea
                              value={faq.answer}
                              onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                              rows={3}
                              className="w-full px-2 py-1 border rounded"
                            />
                          ) : (
                            <div className="text-sm text-gray-600">{faq.answer}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )
                };
              })}
              defaultExpanded={[faqData.categories[0]]}
            />
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
            Need help implementing these FAQs?
          </p>
          <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
            Get Content Implementation Help ($497)
          </button>
        </div>
      </ContentFooter>
    </div>
  );
}