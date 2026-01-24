// geocolab-app/src/apps/ai-tools/technical-scanner/TechnicalSEOScanner.tsx
import React, { useState } from 'react';
import { ContentHeader } from '@framr/ui/components/Content/ContentHeader';
import { ContentFooter } from '@framr/ui/components/Content/ContentFooter';
import { FramrCard } from '@framr/ui/components/content/FramrCard';
import { Accordion } from '@framr/ui/components/Accordion';
import { ProgressBar } from '@framr/ui/components/ProgressBar';
import { useFetchrAction } from '@fluxr/react-sdk';
import { usePerformanceMonitor, useCache } from '@dndhub/react-sdk';

interface TechnicalIssue {
  category: string;
  severity: 'critical' | 'warning' | 'info';
  issue: string;
  solution: string;
  aiImpact: string;
}

export default function TechnicalSEOScanner() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const monitor = usePerformanceMonitor();
  const { getCached, setCached } = useCache();

  const { execute: scanWebsite, data: scanData } = useFetchrAction(
    'external:api:lighthouse',
    {
      action: 'create',
      resource: 'technical-audit',
      payload: { 
        url,
        checks: [
          'structured-data',
          'meta-tags',
          'sitemap',
          'robots-txt',
          'core-web-vitals',
          'mobile-friendly',
          'https',
          'canonicals',
          'hreflang',
          'open-graph'
        ]
      }
    },
    { 
      enabled: false,
      cache: true,
      cacheTtl: 900000 // 15 minutes
    }
  );

  const scanSteps = [
    { label: 'Checking robots.txt', progress: 10 },
    { label: 'Analyzing sitemap', progress: 20 },
    { label: 'Scanning meta tags', progress: 35 },
    { label: 'Evaluating structured data', progress: 50 },
    { label: 'Testing Core Web Vitals', progress: 65 },
    { label: 'Checking mobile compatibility', progress: 80 },
    { label: 'Analyzing AI readiness', progress: 95 },
    { label: 'Generating report', progress: 100 }
  ];

  const handleScan = async () => {
    setScanning(true);
    const operation = monitor.startOperation('technical-seo-scan');
    
    // Check cache first
    const cacheKey = `tech-scan:${url}`;
    const cached = getCached(cacheKey);
    if (cached) {
      setScanProgress(100);
      setScanning(false);
      return;
    }

    // Simulate progress
    for (const step of scanSteps) {
      setScanProgress(step.progress);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    try {
      const result = await scanWebsite();
      setCached(cacheKey, result, 900000);
      operation.succeed();
    } catch (error) {
      operation.fail(error);
    } finally {
      setScanning(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'warning': return 'warn';
      default: return 'info';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ContentHeader
        title="Technical SEO-AI Readiness Scanner"
        subtitle="Automated technical audit for AI search optimization"
        size="lg"
        badge={{ text: 'DIAGNOSTIC', color: 'info' }}
        actions={
          <div className="flex items-center gap-3">
            <span className="line-through text-gray-400">$397</span>
            <span className="text-2xl font-bold text-info-600">$197</span>
          </div>
        }
      />

      {!scanning && !scanData && (
        <FramrCard variant="elevated" spacing="lg" className="mt-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL to Scan
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-info-500"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">🔍</div>
                <div className="text-sm">Meta Analysis</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-sm">Schema Markup</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">📱</div>
                <div className="text-sm">Mobile Ready</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">🤖</div>
                <div className="text-sm">AI Crawlability</div>
              </div>
            </div>

            <button
              onClick={handleScan}
              disabled={!url}
              className="w-full px-6 py-3 bg-info-600 text-white rounded-lg hover:bg-info-700 transition disabled:opacity-50"
            >
              Start Technical Scan - $197
            </button>
          </div>
        </FramrCard>
      )}

      {scanning && (
        <FramrCard variant="elevated" spacing="lg" className="mt-8">
          <div className="space-y-6">
            <ProgressBar
              value={scanProgress}
              max={100}
              color="info"
              size="lg"
              showLabel
              animated
            />
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {scanSteps.find(s => s.progress >= scanProgress)?.label || 'Initializing...'}
              </h3>
              <p className="text-gray-600">
                Running {scanSteps.length} technical checks...
              </p>
            </div>
          </div>
        </FramrCard>
      )}

      {scanData && !scanning && (
        <div className="mt-8 space-y-6">
          {/* Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FramrCard variant="elevated" color="primary">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">
                  {scanData.overallScore}/100
                </div>
                <div className="text-sm text-gray-600">Technical Score</div>
              </div>
            </FramrCard>

            <FramrCard variant="elevated" color="error">
              <div className="text-center">
                <div className="text-3xl font-bold text-error-600">
                  {scanData.criticalIssues}
                </div>
                <div className="text-sm text-gray-600">Critical Issues</div>
              </div>
            </FramrCard>

            <FramrCard variant="elevated" color="warn">
              <div className="text-center">
                <div className="text-3xl font-bold text-warn-600">
                  {scanData.warnings}
                </div>
                <div className="text-sm text-gray-600">Warnings</div>
              </div>
            </FramrCard>

            <FramrCard variant="elevated" color="success">
              <div className="text-center">
                <div className="text-3xl font-bold text-success-600">
                  {scanData.passed}
                </div>
                <div className="text-sm text-gray-600">Passed Checks</div>
              </div>
            </FramrCard>
          </div>

          {/* AI Readiness Factors */}
          <FramrCard variant="elevated" spacing="lg">
            <h3 className="text-lg font-semibold mb-4">AI Search Readiness</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scanData.aiReadiness.map((factor: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{factor.icon}</span>
                    <span className="font-medium">{factor.name}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    factor.status === 'pass' 
                      ? 'bg-green-100 text-green-700'
                      : factor.status === 'fail'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {factor.status === 'pass' ? 'Ready' : factor.status === 'fail' ? 'Fix Required' : 'Needs Work'}
                  </span>
                </div>
              ))}
            </div>
          </FramrCard>

          {/* Issues by Category */}
          <FramrCard variant="elevated" spacing="lg">
            <h3 className="text-lg font-semibold mb-4">Technical Issues Found</h3>
            <Accordion
              items={scanData.issueCategories.map((category: any) => ({
                id: category.id,
                title: (
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <div className="flex items-center gap-2">
                      {category.critical > 0 && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                          {category.critical} critical
                        </span>
                      )}
                      {category.warnings > 0 && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                          {category.warnings} warnings
                        </span>
                      )}
                    </div>
                  </div>
                ),
                content: (
                  <div className="space-y-3">
                    {category.issues.map((issue: TechnicalIssue, idx: number) => (
                      <div key={idx} className={`p-3 rounded-lg border-l-4 ${
                        issue.severity === 'critical' 
                          ? 'bg-red-50 border-red-500'
                          : issue.severity === 'warning'
                          ? 'bg-yellow-50 border-yellow-500'
                          : 'bg-blue-50 border-blue-500'
                      }`}>
                        <div className="flex items-start gap-2">
                          <span className="text-lg">{getSeverityIcon(issue.severity)}</span>
                          <div className="flex-1">
                            <div className="font-medium mb-1">{issue.issue}</div>
                            <div className="text-sm text-gray-600 mb-2">{issue.solution}</div>
                            <div className="text-xs text-gray-500">
                              <span className="font-medium">AI Impact:</span> {issue.aiImpact}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }))}
              defaultExpanded={[scanData.issueCategories[0]?.id]}
            />
          </FramrCard>

          {/* Quick Fixes */}
          <FramrCard variant="gradient" spacing="lg" className="bg-gradient-to-r from-info-600 to-primary-600 text-white">
            <h3 className="text-lg font-semibold mb-4">5 Quick Fixes You Can Do Today</h3>
            <ol className="space-y-2">
              {scanData.quickFixes.map((fix: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm mr-3">
                    {index + 1}
                  </span>
                  <span>{fix}</span>
                </li>
              ))}
            </ol>
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
            Need help fixing these technical issues?
          </p>
          <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
            Get QuickStart Implementation ($750)
          </button>
        </div>
      </ContentFooter>
    </div>
  );
}