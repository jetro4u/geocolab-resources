// src/apps/sgs/api/services/useParticipantProfile.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { xApiService } from '../services/xApiService';
import { metricsCalculator } from '../services/metricsCalculator';
import { signalScorer } from '../services/signalScorer';
import type { ParticipantProfile, UpdateProfilePayload } from '../types/participant.types';

/**
 * Fetch participant profile with calculated metrics
 */
export function useParticipantProfile(handle: string, platform: 'twitter' = 'twitter') {
  return useQuery({
    queryKey: ['participant', handle, platform],
    queryFn: async (): Promise<ParticipantProfile> => {
      // 1. Fetch X profile data
      const xProfile = await xApiService.getProfile(handle);

      // 2. Fetch recent tweets for content analysis
      const recentTweets = await xApiService.getUserTweets(xProfile.id, { maxResults: 100 });

      // 3. Calculate all metrics
      const platformMetrics = await metricsCalculator.calculatePlatformMetrics(
        xProfile,
        recentTweets
      );

      const authorityMetrics = metricsCalculator.calculateAuthorityMetrics(
        xProfile,
        recentTweets
      );

      const contentMetrics = metricsCalculator.calculateContentMetrics(recentTweets);

      const citationMetrics = await metricsCalculator.calculateCitationMetrics(
        handle,
        platform
      );

      const spamRisk = metricsCalculator.calculateSpamRisk(xProfile, recentTweets);

      // 4. Calculate signal strength
      const signalStrength = signalScorer.calculateSignalScore(
        platformMetrics,
        authorityMetrics,
        contentMetrics,
        citationMetrics,
        spamRisk
      );

      // 5. Assemble full profile
      return {
        handle,
        profileLink: xProfile.url,
        accountType: xProfile.verified ? 'Premium' : 'Free',
        
        primaryTopic: authorityMetrics.expertise.primaryNiche,
        userIntentType: this.determineIntent(contentMetrics),
        audienceLevel: authorityMetrics.expertise.expertiseLevel,
        languageTone: this.determineTone(contentMetrics),
        
        accountScore: this.calculateAccountScore(signalStrength),
        signalStrength: signalStrength.overallSignal,
        spamRisk: spamRisk.spamRiskScore,
        
        // Challenge tracking (defaults)
        secondTouchDone: false,
        revenuePotential: 'Low',
        
        signalContributions: {
          highQualityComments: 0,
          thoughtfulQuoteTweets: 0,
          profileOptimizationHelp: 0,
          networkIntroductions: 0
        }
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30,   // 30 minutes
  });
}

/**
 * Update participant manual fields (challenge tracking)
 */
export function useUpdateParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      // In MVP: Update Google Sheets
      // Post-MVP: Update PostgreSQL via Fluxr
      // Placeholder for now
      return payload;
    },
    onSuccess: (data) => {
      // Invalidate participant query to refetch
      queryClient.invalidateQueries({ 
        queryKey: ['participant', data.handle] 
      });
    }
  });
}

// Helper functions
function determineIntent(content: SocialContentMetrics): ParticipantProfile['userIntentType'] {
  const { educational, promotional, conversational, curated } = content.contentBreakdown;
  
  if (educational > 0.4) return 'Teaching';
  if (promotional > 0.4) return 'Sharing';
  if (conversational > 0.4) return 'Debating';
  if (curated > 0.5) return 'Sharing';
  
  // Default if no clear pattern
  return educational > conversational ? 'Teaching' : 'Asking Help';
}

function determineTone(content: SocialContentMetrics): ParticipantProfile['languageTone'] {
  // Placeholder - would need NLP analysis for real implementation
  // For MVP, infer from content mix
  const { educational, conversational } = content.contentBreakdown;
  
  if (educational > 0.5) return 'Technical';
  if (conversational > 0.5) return 'Casual';
  return 'Direct';
}

function calculateAccountScore(signal: SignalStrengthMetrics): 1 | 2 | 3 | 4 | 5 {
  const score = signal.overallSignal;
  
  if (score >= 80) return 5;
  if (score >= 60) return 4;
  if (score >= 40) return 3;
  if (score >= 20) return 2;
  return 1;
}