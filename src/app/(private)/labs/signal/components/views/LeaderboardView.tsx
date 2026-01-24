// src/apps/sgs/components/views/LeaderboardView.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProfileBadge } from '../ui/ProfileBadge';
import type { LeaderboardEntry } from '../../types/challenge.types';

/**
 * Challenge leaderboard with niche filtering
 * Shows top performers by signal strength and points
 */
export function LeaderboardView() {
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  
  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ['leaderboard', selectedNiche],
    queryFn: async () => {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/sgs/leaderboard?niche=${selectedNiche}`);
      return response.json() as Promise<LeaderboardEntry[]>;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Challenge Leaderboard</h1>
        <p className="text-gray-600">Top performers by signal strength</p>
      </div>

      {/* Niche Filter */}
      <div className="mb-6">
        <select
          value={selectedNiche}
          onChange={(e) => setSelectedNiche(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All Niches</option>
          <option value="geo">GEO Expert</option>
          <option value="ai">AI Consultant</option>
          <option value="seo">SEO Specialist</option>
          <option value="saas">SaaS Founder</option>
        </select>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Participant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Signal Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Points
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tier
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaderboard?.map((entry, index) => (
              <tr key={entry.handle} className={index < 3 ? 'bg-yellow-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-lg font-bold">#{entry.rank}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <ProfileBadge
                      handle={entry.handle}
                      accountType={entry.accountType}
                      niche={entry.niche}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {entry.signalStrength}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {entry.improvement > 0 ? '+' : ''}{entry.improvement}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-lg font-semibold">{entry.points}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    entry.tier === 'Platinum' ? 'bg-purple-100 text-purple-800' :
                    entry.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                    entry.tier === 'Silver' ? 'bg-gray-100 text-gray-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {entry.tier}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}