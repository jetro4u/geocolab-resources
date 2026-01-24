// src/apps/sgs/lib/constants/signalWeights.ts
export const SIGNAL_WEIGHTS = {
    semanticRelevance: 0.25,
    contextDepth: 0.20,
    followerVerifiedRatio: 0.15,
    citationFrequency: 0.15,
    nicheCoherence: 0.10,
    dwellTime: 0.10,
    bookmarkRate: 0.05,
} as const;