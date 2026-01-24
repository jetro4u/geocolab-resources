// src/apps/sgs/components/views/AdminPanel.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ChallengeMetrics } from '../../types/challenge.types';

/**
 * Challenge management and moderation interface
 * Admin-only view for monitoring and intervention
 */
export function AdminPanel() {
  const [selectedChallenge, setSelectedChallenge] = useState<string>('');
  
  const { data: challenges } = useQuery({
    queryKey: ['admin-challenges'],
    queryFn: async () => {
      const response = await fetch('/api/sgs/admin/challenges');
      return response.json();
    },
  });

  const { data: metrics } = useQuery({
    queryKey: ['challenge-metrics', selectedChallenge],
    queryFn: async () => {
      if (!selectedChallenge) return null;
      const response = await fetch(`/api/sgs/admin/challenges/${selectedChallenge}/metrics`);
      return response.json() as Promise<ChallengeMetrics>;
    },
    enabled: !!selectedChallenge,
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600">Challenge management and moderation</p>
      </div>

      {/* Challenge Selector */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Challenge
        </label>
        <select
          value={selectedChallenge}
          onChange={(e) => setSelectedChallenge(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Choose a challenge...</option>
          {challenges?.map((challenge: any) => (
            <option key={challenge.id} value={challenge.id}>
              {challenge.name} ({challenge.participants} participants)
            </option>
          ))}
        </select>
      </div>

      {/* Metrics Dashboard */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Sign Up Rate</h3>
            <p className="text-3xl font-bold text-blue-600">{metrics.signUpRate}%</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
            <p className="text-3xl font-bold text-green-600">{metrics.completionRate}%</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Avg Signal Increase</h3>
            <p className="text-3xl font-bold text-purple-600">+{metrics.avgSignalIncrease}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Spam Incidents</h3>
            <p className="text-3xl font-bold text-red-600">{metrics.spamIncidents}</p>
          </div>
        </div>
      )}
    </div>
  );
}