// src/apps/sgs/hooks/useSignalCalculator.ts
import { useMemo } from 'react';
import type { SignalMetrics } from '../../types/metrics.types';

export function useSignalCalculator(metrics: SignalMetrics) {
  const calculateScore = useMemo(() => {
    if (!metrics) return 0;

    const weights = {
      semanticRelevance: 0.25,
      contextDepth: 0.20,
      followerVerifiedRatio: 0.15,
      citationFrequency: 0.15,
      nicheCoherence: 0.10,
      dwellTime: 0.10,
      bookmarkRate: 0.05,
    };

    return Object.entries(metrics.components).reduce((score, [key, value]) => {
      return score + (value * (weights[key as keyof typeof weights] || 0));
    }, 0);
  }, [metrics]);

  return { score: Math.round(calculateScore) };
}