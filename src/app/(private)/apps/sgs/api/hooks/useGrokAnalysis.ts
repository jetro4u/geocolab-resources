// src/apps/sgs/api/hooks/useGrokAnalysis.ts

import { useQuery, useMutation } from '@tanstack/react-query';
import { grokService } from '../services/grokService';
import type { GrokContentAnalysis, GrokProfileAudit } from '../types/grok.types';

/**
 * Analyze content quality using Grok AI
 */
export function useGrokContentAnalysis(content: string) {
  return useMutation({
    mutationFn: async (): Promise<GrokContentAnalysis> => {
      const analysis = await grokService.analyzeContent(content);
      
      return {
        grokScore: analysis.score,
        improvements: analysis.suggestions,
        predictedEngagement: analysis.engagementForecast,
        bestPostTime: analysis.optimalTiming,
        sentiment: analysis.sentimentScore,
        topicRelevance: analysis.topicCoherence
      };
    }
  });
}

/**
 * Get AI-powered profile audit
 */
export function useGrokProfileAudit(handle: string) {
  return useQuery({
    queryKey: ['grok-audit', handle],
    queryFn: async (): Promise<GrokProfileAudit> => {
      const audit = await grokService.auditProfile(handle);
      
      return {
        bioAudit: {
          clarityScore: audit.bio.clarity,
          keywordDensity: audit.bio.keywords,
          ctaPresence: audit.bio.hasCTA,
          suggestions: audit.bio.recommendations
        },
        
        contentAudit: {
          topicCoherence: audit.content.coherence,
          engagementPatterns: {
            bestPostingTimes: audit.content.optimalTimes,
            highPerformingFormats: audit.content.topFormats
          },
          gapAnalysis: audit.content.gaps
        },
        
        networkAudit: {
          followerQuality: audit.network.quality,
          influencerConnections: audit.network.influencers,
          mutualEngagement: audit.network.mutuals
        }
      };
    },
    staleTime: 1000 * 60 * 60,  // 1 hour (expensive operation)
  });
}

/**
 * Generate AI-optimized tweet from template
 */
export function useGrokTweetGenerator() {
  return useMutation({
    mutationFn: async ({
      templateName,
      variables
    }: {
      templateName: string;
      variables: Record<string, string>;
    }) => {
      return await grokService.generateTweet(templateName, variables);
    }
  });
}