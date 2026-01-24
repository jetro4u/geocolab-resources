// src/apps/sgs/lib/constants/challengeTemplates.ts
import type { ChallengeConfig } from '../../types/challenge.types';

export const CHALLENGE_TEMPLATES: Record<string, Partial<ChallengeConfig>> = {
  'ai-content-sprint': {
    name: '30-Day AI Content Sprint',
    niche: 'ai',
    duration: 30,
    maxParticipants: 100,
    customRules: {
      entryRequirement: 'Post 3x/week minimum',
      pointSystem: {
        highQualityComment: 10,
        deliverableThread: 150,
      },
      winCondition: 'Most citations received',
    },
  },
  'geo-authority-challenge': {
    name: 'GEO Authority Challenge',
    niche: 'geo',
    duration: 14,
    maxParticipants: 50,
    customRules: {
      entryRequirement: 'GEO expertise verified',
      pointSystem: {
        citationReceived: 30,
        deliverableCaseStudy: 250,
      },
      winCondition: 'Highest signal improvement',
    },
  },
};