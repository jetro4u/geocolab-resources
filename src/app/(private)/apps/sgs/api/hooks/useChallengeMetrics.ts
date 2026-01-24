// src/apps/sgs/api/hooks/useChallengeMetrics.ts

import { useQuery } from '@tanstack/react-query';
import { sheetsService } from '../services/sheetsService';
import type { ChallengeMetrics } from '../types/metrics.types';

/**
 * Fetch challenge-specific metrics for a participant
 */
export function useChallengeMetrics(
  challengeId: string,
  participantHandle: string
) {
  return useQuery({
    queryKey: ['challenge-metrics', challengeId, participantHandle],
    queryFn: async (): Promise<ChallengeMetrics> => {
      // Fetch from Google Sheets (MVP)
      const pointsData = await sheetsService.getParticipantPoints(
        challengeId,
        participantHandle
      );

      const deliverables = await sheetsService.getDeliverables(
        challengeId,
        participantHandle
      );

      // Calculate derived metrics
      const totalEarned = pointsData.reduce((sum, p) => sum + p.points, 0);
      const breakdown = pointsData.reduce((acc, p) => {
        acc[p.actionType] = (acc[p.actionType] || 0) + p.points;
        return acc;
      }, {} as Record<string, number>);

      // Get rank from leaderboard
      const leaderboard = await sheetsService.getLeaderboard(challengeId);
      const rank = leaderboard.findIndex(p => p.handle === participantHandle) + 1;

      // Determine tier based on rank
      const tier = this.calculateTier(rank, leaderboard.length);

      return {
        challengeId,
        challengeName: await sheetsService.getChallengeName(challengeId),
        
        participation: {
          startDate: new Date(pointsData[0]?.timestamp || Date.now()),
          daysActive: this.calculateActiveDays(pointsData),
          completionRate: deliverables.filter(d => d.status === 'Approved').length / deliverables.length,
          streakDays: this.calculateStreak(pointsData)
        },
        
        points: {
          totalEarned,
          breakdown,
          rank,
          tier
        },
        
        contributions: {
          highQualityComments: breakdown['high-quality-comment'] || 0,
          thoughtfulQuoteTweets: breakdown['quote-tweet'] || 0,
          profileOptimizationHelp: breakdown['profile-help'] || 0,
          networkIntroductions: breakdown['introduction'] || 0,
          contentCreated: deliverables.length
        },
        
        networkGrowth: {
          newFollowers: 0,  // Requires delta calculation
          newMutualConnections: 0,
          challengeParticipantConnections: 0,
          influencerConnections: 0
        },
        
        signalGrowth: {
          beforeScore: 0,  // From baseline
          afterScore: 0,   // Current
          improvement: 0,
          improvementRate: 0
        },
        
        deliverables: deliverables.map(d => ({
          type: d.type,
          completionDate: new Date(d.submissionDate),
          grokScore: d.grokScore,
          engagement: d.engagement,
          citations: d.citations
        }))
      };
    },
    staleTime: 1000 * 60 * 2,  // 2 minutes (more frequent for live updates)
  });
}

// Helper functions
function calculateTier(rank: number, totalParticipants: number): 'Bronze' | 'Silver' | 'Gold' | 'Platinum' {
  const percentile = (rank / totalParticipants) * 100;
  
  if (percentile <= 5) return 'Platinum';
  if (percentile <= 20) return 'Gold';
  if (percentile <= 50) return 'Silver';
  return 'Bronze';
}

function calculateActiveDays(points: Array<{ timestamp: string }>): number {
  const uniqueDays = new Set(
    points.map(p => new Date(p.timestamp).toDateString())
  );
  return uniqueDays.size;
}

function calculateStreak(points: Array<{ timestamp: string }>): number {
  if (points.length === 0) return 0;

  const sortedDates = points
    .map(p => new Date(p.timestamp))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 1;
  let currentDate = sortedDates[0];

  for (let i = 1; i < sortedDates.length; i++) {
    const daysDiff = Math.floor(
      (currentDate.getTime() - sortedDates[i].getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 1) {
      streak++;
      currentDate = sortedDates[i];
    } else if (daysDiff > 1) {
      break;
    }
  }

  return streak;
}