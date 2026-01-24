import { useQuery, useMutation } from '@tanstack/react-query';
import { metricsCalculator } from '../services/metricsCalculator';
import { xApiService } from '../services/xApiService';
import { grokService } from '../services/grokService';
import type { GEOMetrics, SocialMetrics, AIVisibilityMetrics } from '../types/metrics.types';
import type { ParticipantProfile } from '../types/participant.types';

/**
 * Master hook for integrating all GEOMetrics dimensions
 * Orchestrates X API, Grok, and internal calculators
 */
export function useMetricsIntegration(handle: string, challengeId?: string) {
  // Fetch social metrics from X API
  const { data: rawSocialData, isLoading: isLoadingSocial } = useQuery({
    queryKey: ['social-raw', handle],
    queryFn: () => xApiService.getProfileMetrics(handle),
    enabled: !!handle,
    staleTime: 300000, // 5 minutes (social metrics change slowly)
  });

  // Fetch Grok AI analysis
  const { data: grokAnalysis, isLoading: isLoadingGrok } = useQuery({
    queryKey: ['grok-analysis', handle],
    queryFn: () => grokService.analyzeProfile(handle),
    enabled: !!handle && !!rawSocialData, // Wait for social data first
    staleTime: 600000, // 10 minutes (expensive API call)
  });

  // Calculate comprehensive GEOMetrics
  const { data: geoMetrics, isLoading: isCalculating } = useQuery({
    queryKey: ['geo-metrics', handle, challengeId],
    queryFn: async () => {
      if (!rawSocialData || !grokAnalysis) {
        throw new Error('Missing required data for metrics calculation');
      }

      // Aggregate all metrics
      const social = await metricsCalculator.calculateSocialMetrics(rawSocialData);
      const aiVisibility = await metricsCalculator.calculateAIVisibility(grokAnalysis);
      const content = await metricsCalculator.calculateContentQuality(grokAnalysis.posts);
      const citations = await metricsCalculator.calculateCitations(grokAnalysis.mentions);
      const engagement = metricsCalculator.calculateEngagement(rawSocialData.engagement);

      // Combine into GEOMetrics
      const metrics: Partial<GEOMetrics> = {
        social,
        visibility: aiVisibility,
        content,
        citation: citations,
        engagement,
        overallGeoScore: metricsCalculator.calculateOverallScore({
          social,
          aiVisibility,
          content,
          citations,
          engagement,
        }),
      };

      return metrics as GEOMetrics;
    },
    enabled: !!rawSocialData && !!grokAnalysis,
    staleTime: 300000,
  });

  // Mutation for triggering metrics refresh
  const refreshMetricsMutation = useMutation({
    mutationFn: async () => {
      // Force refetch all queries
      const [social, grok] = await Promise.all([
        xApiService.getProfileMetrics(handle, { forceRefresh: true }),
        grokService.analyzeProfile(handle, { forceRefresh: true }),
      ]);
      return { social, grok };
    },
  });

  return {
    // Data
    geoMetrics,
    socialMetrics: geoMetrics?.social,
    aiVisibility: geoMetrics?.visibility,
    contentQuality: geoMetrics?.content,
    citations: geoMetrics?.citation,
    engagement: geoMetrics?.engagement,
    overallScore: geoMetrics?.overallGeoScore,

    // Loading states
    isLoading: isLoadingSocial || isLoadingGrok || isCalculating,
    isLoadingDetails: {
      social: isLoadingSocial,
      grok: isLoadingGrok,
      calculating: isCalculating,
    },

    // Actions
    refreshMetrics: refreshMetricsMutation.mutate,
    isRefreshing: refreshMetricsMutation.isPending,

    // Error states
    error: refreshMetricsMutation.error,
  };
}

/**
 * Hook for tracking metrics evolution over time
 * Compares baseline vs current for challenge participants
 */
export function useMetricsEvolution(
  handle: string,
  challengeId: string,
  baselineDate?: Date
) {
  const { data: evolution } = useQuery({
    queryKey: ['metrics-evolution', handle, challengeId],
    queryFn: async () => {
      const [baseline, current] = await Promise.all([
        metricsCalculator.getHistoricalMetrics(handle, baselineDate || new Date()),
        metricsCalculator.getCurrentMetrics(handle),
      ]);

      return {
        baseline,
        current,
        delta: metricsCalculator.calculateDelta(baseline, current),
        improvement: metricsCalculator.calculateImprovement(baseline, current),
      };
    },
    enabled: !!handle && !!challengeId,
  });

  return {
    baseline: evolution?.baseline,
    current: evolution?.current,
    delta: evolution?.delta,
    improvement: evolution?.improvement,
    hasImproved: evolution?.improvement && evolution.improvement > 0,
  };
}

/**
 * Hook for real-time signal strength calculation
 * Used in leaderboards and dashboards
 */
export function useSignalStrength(handle: string) {
  const { geoMetrics } = useMetricsIntegration(handle);

  const signalStrength = geoMetrics?.social?.signalStrength?.overallSignal || 0;
  const components = geoMetrics?.social?.signalStrength?.components;

  return {
    overallSignal: signalStrength,
    semanticRelevance: components?.semanticRelevance || 0,
    contextDepth: components?.contextDepth || 0,
    conversationQuality: components?.conversationQuality || 0,
    originalityScore: components?.originalityScore || 0,
    consistencyScore: components?.consistencyScore || 0,
    tier: getSignalTier(signalStrength),
  };
}

// Helper function to categorize signal strength
function getSignalTier(signal: number): 'Bronze' | 'Silver' | 'Gold' | 'Platinum' {
  if (signal >= 80) return 'Platinum';
  if (signal >= 60) return 'Gold';
  if (signal >= 40) return 'Silver';
  return 'Bronze';
}

/**
 * Hook for spam risk monitoring
 * Alerts admins to potential gaming behavior
 */
export function useSpamRiskMonitoring(handle: string) {
  const { geoMetrics } = useMetricsIntegration(handle);

  const spamRisk = geoMetrics?.social?.spamRisk;
  const isHighRisk = spamRisk && spamRisk.spamRiskScore > 70;

  return {
    spamRiskScore: spamRisk?.spamRiskScore || 0,
    redFlags: spamRisk?.redFlags,
    isHighRisk,
    shouldFlag: isHighRisk && spamRisk?.redFlags && Object.values(spamRisk.redFlags).filter(Boolean).length >= 3,
  };
}

/**
 * Hook for challenge-specific metrics
 * Tracks points, deliverables, and challenge performance
 */
export function useChallengeMetricsIntegration(
  handle: string,
  challengeId: string
) {
  const { data: challengeMetrics } = useQuery({
    queryKey: ['challenge-metrics', handle, challengeId],
    queryFn: () => metricsCalculator.getChallengeMetrics(handle, challengeId),
    enabled: !!handle && !!challengeId,
    staleTime: 30000, // 30 seconds (live leaderboard needs fresh data)
  });

  return {
    points: challengeMetrics?.points,
    rank: challengeMetrics?.points?.rank,
    tier: challengeMetrics?.points?.tier,
    deliverables: challengeMetrics?.deliverables,
    networkGrowth: challengeMetrics?.networkGrowth,
    signalGrowth: challengeMetrics?.signalGrowth,
    completionRate: challengeMetrics?.participation?.completionRate,
  };
}