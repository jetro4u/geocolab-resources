// src/apps/sgs/components/views/ProfileAuditView.tsx
import { useState } from 'react';
import { useGrokAnalysis } from '../../api/hooks/useGrokAnalysis';
import { MetricsChart } from '../ui/MetricsChart';
import type { ProfileAudit } from '../../types/challenge.types';

/**
 * AI-powered profile review and optimization suggestions
 * Uses Grok API for content analysis and recommendations
 */
export function ProfileAuditView() {
  const [handle, setHandle] = useState('');
  const { analyzeProfile, isAnalyzing } = useGrokAnalysis();
  const [audit, setAudit] = useState<ProfileAudit | null>(null);

  const handleAnalyze = async () => {
    if (!handle) return;
    const result = await analyzeProfile(handle);
    setAudit(result);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Audit</h1>
        <p className="text-gray-600">Get AI-powered optimization suggestions</p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="@username"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !handle}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Profile'}
          </button>
        </div>
      </div>

      {/* Audit Results */}
      {audit && (
        <div className="space-y-6">
          {/* Bio Audit */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Bio Audit</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {audit.bioAudit.clarityScore}%
                </div>
                <div className="text-sm text-gray-600">Clarity</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {audit.bioAudit.keywordDensity}%
                </div>
                <div className="text-sm text-gray-600">Keyword Density</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">
                  {audit.bioAudit.ctaPresence ? 'âœ"' : 'âœ—'}
                </div>
                <div className="text-sm text-gray-600">Call-to-Action</div>
              </div>
            </div>
            
            {audit.bioAudit.suggestions.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Suggestions:</h3>
                <ul className="space-y-2">
                  {audit.bioAudit.suggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Content Audit */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Content Audit</h2>
            <MetricsChart
              data={audit.contentAudit.topicCoherence}
              title="Topic Coherence Over Time"
            />
            
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Gap Analysis:</h3>
              <ul className="space-y-2">
                {audit.contentAudit.gapAnalysis.map((gap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow-600">⚠</span>
                    <span className="text-gray-700">{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Network Audit */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Network Audit</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {audit.networkAudit.followerQuality}%
                </div>
                <div className="text-sm text-gray-600">Follower Quality</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {audit.networkAudit.influencerConnections}
                </div>
                <div className="text-sm text-gray-600">Influencer Connections</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">
                  {audit.networkAudit.mutualEngagement}%
                </div>
                <div className="text-sm text-gray-600">Mutual Engagement</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}