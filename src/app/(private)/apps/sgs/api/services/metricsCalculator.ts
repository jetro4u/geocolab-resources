// src/apps/sgs/api/services/metricsCalculator.ts
import type {
    GEOMetrics,
    SocialMetrics,
    SignalStrengthMetrics,
    AIVisibilityMetrics,
    ContentQualityMetrics
  } from '@dndhub/geo';
  
  export class MetricsCalculator {
    /**
     * Build complete GEOMetrics.social object
     */
    buildSocialMetrics(data: {
      xProfile: PlatformMetrics;
      grokAnalysis: GrokProfileAnalysis;
      citations: CitationData[];
      challengeData?: ChallengeMetrics;
    }): SocialMetrics {
      return {
        platforms: {
          twitter: data.xProfile
        },
        
        overall: {
          totalFollowers: data.xProfile.followers,
          verifiedFollowerRatio: data.xProfile.network.verifiedRatio,
          crossPlatformReach: data.xProfile.followers, // Expand for multi-platform
          unifiedEngagementRate: data.xProfile.engagement.engagementRate
        },
        
        signalStrength: this.calculateSignalStrength(data.xProfile, data.grokAnalysis),
        authority: this.calculateAuthority(data.grokAnalysis, data.xProfile),
        content: this.analyzeContent(data.xProfile),
        citations: this.mapCitations(data.citations),
        spamRisk: this.assessSpamRisk(data.xProfile),
        challengePerformance: data.challengeData
      };
    }
  
    /**
     * Calculate signal strength composite
     */
    private calculateSignalStrength(
      platform: PlatformMetrics,
      grok: GrokProfileAnalysis
    ): SignalStrengthMetrics {
      // Base component scores from Grok
      const components = grok.signalComponents;
  
      // Calculate high-intent signals
      const highIntentSignals = {
        bookmarks: 0, // Tracked separately via X API
        quoteTweetsWithAnalysis: platform.content.threadUsage * platform.posts,
        threadStarts: platform.content.threadUsage * platform.posts,
        profileClicks: 0, // X Analytics required
        citationsReceived: grok.citationCount || 0
      };
  
      // Engagement velocity (placeholder - requires real-time tracking)
      const velocity = {
        likesPerHour: platform.engagement.totalLikes / (24 * 30), // Avg over 30 days
        commentsPerHour: platform.engagement.totalComments / (24 * 30),
        sharesPerHour: platform.engagement.totalShares / (24 * 30),
        viralityIndex: this.calculateViralityIndex(platform)
      };
  
      // Network amplification
      const networkAmplification = {
        averageRetweetReach: platform.network.influencerFollowers * 10000, // Estimate
        influencerEngagement: platform.network.influencerFollowers,
        crossPlatformMentions: 0 // Requires external tracking
      };
  
      // Weighted composite score (0-100)
      const overallSignal = (
        components.semanticRelevance * 0.25 +
        components.contextDepth * 0.20 +
        components.conversationQuality * 0.15 +
        components.originalityScore * 0.15 +
        components.consistencyScore * 0.10 +
        (highIntentSignals.citationsReceived / 100) * 0.15 // Normalize citations
      );
  
      return {
        overallSignal,
        components,
        highIntentSignals,
        velocity,
        networkAmplification
      };
    }
  
    /**
     * Map to AIVisibilityMetrics (for GEO ecosystem)
     */
    buildAIVisibilityMetrics(social: SocialMetrics): AIVisibilityMetrics {
      return {
        aiVisibilityScore: social.signalStrength.overallSignal,
        citationCount: social.citations.citations.totalMentions,
        citationRate: social.citations.quality.expertCitations / social.citations.citations.totalMentions,
        platformBreakdown: {
          twitter: {
            visibilityScore: social.signalStrength.overallSignal,
            citationCount: social.citations.citations.totalMentions,
            averagePosition: 1 // Placeholder
          }
        },
        shareOfAIVoice: (social.citations.citations.totalMentions / 1000) * 100, // Industry baseline: 1000
        brandMentions: social.citations.citations.totalMentions,
        sentimentScore: 0.8, // Requires sentiment analysis
        responseInclusionRate: social.signalStrength.components.semanticRelevance / 100
      };
    }
  
    /**
     * Calculate churn correlation (linking poor social signals to disengagement)
     */
    calculateChurnCorrelation(social: SocialMetrics): GEOMetrics['churnCorrelation'] {
      const lowEngagement = social.signalStrength.overallSignal < 40;
      const spamFlags = social.spamRisk.spamRiskScore > 50;
  
      return {
        socialChurnIndicators: {
          lowSocialEngagement: lowEngagement ? 35 : 10, // % churned
          followUnfollowChurn: social.spamRisk.behavior.followUnfollowRatio > 0.5 ? 25 : 5,
          spamReportedChurn: spamFlags ? 60 : 0,
          socialRetentionRate: social.signalStrength.overallSignal / 100,
          communityParticipationImpact: social.challengePerformance ? 0.2 : 0 // 20% retention boost
        },
        
        // ... other churn fields (engagement, content quality, etc.)
      };
    }
}