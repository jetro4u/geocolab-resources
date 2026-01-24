// src/apps/sgs/api/hooks/useSocialSignals.ts

import { useQuery } from '@tanstack/react-query';
import { xApiService } from '../services/xApiService';
import { metricsCalculator } from '../services/metricsCalculator';
import type { SocialMetrics } from '../types/metrics.types';

/**
 * Real-time social signals for a participant
 * Polls X API for latest engagement data
 */
export function useSocialSignals(
  handle: string,
  platform: 'twitter' = 'twitter',
  { enablePolling = false, pollingInterval = 60000 } = {}
) {
  return useQuery({
    queryKey: ['social-signals', handle, platform],
    queryFn: async (): Promise<SocialMetrics> => {
      // Fetch fresh data from X API
      const xProfile = await xApiService.getProfile(handle);
      const recentTweets = await xApiService.getUserTweets(xProfile.id, { maxResults: 100 });

      // Calculate all metric categories
      const platformMetrics = await metricsCalculator.calculatePlatformMetrics(
        xProfile,
        recentTweets
      );

      const signalStrength = metricsCalculator.calculateSignalStrength(
        platformMetrics,
        recentTweets
      );

      const authority = metricsCalculator.calculateAuthorityMetrics(
        xProfile,
        recentTweets
      );

      const content = metricsCalculator.calculateContentMetrics(recentTweets);

      const citations = await metricsCalculator.calculateCitationMetrics(handle, platform);

      const spamRisk = metricsCalculator.calculateSpamRisk(xProfile, recentTweets);

      // Assemble social metrics
      return {
        platforms: {
          [platform]: platformMetrics
        },
        
        overall: {
          totalFollowers: platformMetrics.followers,
          verifiedFollowerRatio: platformMetrics.network.verifiedRatio,
          crossPlatformReach: platformMetrics.followers,  // Single platform for now
          unifiedEngagementRate: platformMetrics.engagement.engagementRate
        },
        
        signalStrength,
        authority,
        content,
        citations,
        spamRisk
      };
    },
    staleTime: enablePolling ? 0 : 1000 * 60 * 5,
    refetchInterval: enablePolling ? pollingInterval : false,
  });
}

/**
 * Hook to track signal improvement over time
 */
export function useSignalHistory(handle: string, challengeId: string) {
  return useQuery({
    queryKey: ['signal-history', handle, challengeId],
    queryFn: async () => {
      // Fetch historical snapshots from Google Sheets
      const snapshots = await sheetsService.getSignalSnapshots(handle, challengeId);
      
      return {
        baseline: snapshots[0],
        current: snapshots[snapshots.length - 1],
        history: snapshots,
        improvement: {
          absolute: snapshots[snapshots.length - 1].overallSignal - snapshots[0].overallSignal,
          percentage: (
            ((snapshots[snapshots.length - 1].overallSignal - snapshots[0].overallSignal) / 
             snapshots[0].overallSignal) * 100
          ).toFixed(2)
        }
      };
    }
  });
}