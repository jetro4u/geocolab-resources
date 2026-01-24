// src/apps/sgs/lib/utils/signalAlgorithm.ts
import { SIGNAL_WEIGHTS } from '../constants/signalWeights';
import type { SignalMetrics } from '../../types/metrics.types';

export function calculateSignalStrength(metrics: Partial<SignalMetrics>): number {
  const components = {
    semanticRelevance: metrics.semanticRelevance || 0,
    contextDepth: metrics.contextDepth || 0,
    followerVerifiedRatio: metrics.followerVerifiedRatio || 0,
    citationFrequency: Math.min(100, (metrics.citationFrequency || 0) * 10),
    nicheCoherence: metrics.nicheCoherence || 0,
    dwellTime: metrics.dwellTime || 50,
    bookmarkRate: metrics.bookmarkRate || 50,
  };

  const score = Object.entries(components).reduce((sum, [key, value]) => {
    return sum + (value * (SIGNAL_WEIGHTS[key as keyof typeof SIGNAL_WEIGHTS] || 0));
  }, 0);

  return Math.round(Math.max(0, Math.min(100, score)));
}

export function applySpamPenalty(score: number, spamSignals: any): number {
  const penalties = {
    perfectTimingPatterns: -0.3,
    copyPasteDetection: -0.2,
    massFollowUnfollow: -0.4,
    emptyEngagement: -0.15,
    selfPromotionRatio: -0.1,
  };

  const penalty = Object.entries(spamSignals).reduce((total, [key, value]) => {
    return total + (value ? Math.abs(penalties[key as keyof typeof penalties] || 0) : 0);
  }, 0);

  return Math.round(score * (1 - penalty));
}