// src/apps/sgs/api/services/signalScorer.ts

import type {
    SignalStrengthMetrics,
    PlatformMetrics,
    SpamRiskMetrics,
    SocialAuthorityMetrics,
    SocialContentMetrics,
    SocialCitationMetrics
  } from '@dndhub/geo';
  
  /**
   * Signal Scorer Service
   * Implements the Signal > Spam mathematical model for X algorithm optimization
   * 
   * Based on framework formula:
   * Signal Score = (Weighted Components) * (1 - Spam Penalty)
   * 
   * Component Weights:
   * - Semantic Relevance: 25%
   * - Context Depth: 20%
   * - Network Quality: 15%
   * - Citation Frequency: 15%
   * - Consistency: 10%
   * - Dwell Time: 10%
   * - Bookmark Rate: 5%
   */
  
  interface SignalWeights {
    semanticRelevance: number;
    contextDepth: number;
    followerVerifiedRatio: number;
    citationFrequency: number;
    nicheCoherence: number;
    dwellTime: number;
    bookmarkRate: number;
  }
  
  interface SpamPenalties {
    perfectTimingPatterns: number;
    copyPasteDetection: number;
    massFollowUnfollow: number;
    emptyEngagement: number;
    selfPromotionRatio: number;
  }
  
  // Default weights from framework document
  const DEFAULT_WEIGHTS: SignalWeights = {
    semanticRelevance: 0.25,
    contextDepth: 0.20,
    followerVerifiedRatio: 0.15,
    citationFrequency: 0.15,
    nicheCoherence: 0.10,
    dwellTime: 0.10,
    bookmarkRate: 0.05
  };
  
  const SPAM_PENALTIES: SpamPenalties = {
    perfectTimingPatterns: -0.30,
    copyPasteDetection: -0.20,
    massFollowUnfollow: -0.40,
    emptyEngagement: -0.15,
    selfPromotionRatio: -0.10
  };
  
  export class SignalScorerService {
    /**
     * Calculate overall signal strength score (0-100)
     */
    calculateSignalScore(
      platformMetrics: PlatformMetrics,
      authorityMetrics: SocialAuthorityMetrics,
      contentMetrics: SocialContentMetrics,
      citationMetrics: SocialCitationMetrics,
      spamRisk: SpamRiskMetrics,
      customWeights?: Partial<SignalWeights>
    ): SignalStrengthMetrics {
      const weights = { ...DEFAULT_WEIGHTS, ...customWeights };
  
      // 1. Calculate individual component scores (0-100)
      const components = {
        semanticRelevance: this.calculateSemanticRelevance(authorityMetrics),
        contextDepth: this.calculateContextDepth(contentMetrics),
        conversationQuality: this.calculateConversationQuality(contentMetrics),
        originalityScore: this.calculateOriginality(contentMetrics),
        consistencyScore: this.calculateConsistency(platformMetrics)
      };
  
      // 2. Calculate weighted base score
      const baseScore = (
        components.semanticRelevance * weights.semanticRelevance +
        components.contextDepth * weights.contextDepth +
        (platformMetrics.network.verifiedRatio * 100) * weights.followerVerifiedRatio +
        this.normalizeCitations(citationMetrics) * weights.citationFrequency +
        components.consistencyScore * weights.nicheCoherence
      );
  
      // 3. Calculate spam penalty multiplier
      const spamPenalty = this.calculateSpamPenalty(spamRisk);
  
      // 4. Apply penalty to get final score
      const overallSignal = Math.round(baseScore * spamPenalty);
  
      // 5. Extract high-intent signals from platform metrics
      const highIntentSignals = this.extractHighIntentSignals(platformMetrics, citationMetrics);
  
      // 6. Calculate engagement velocity
      const velocity = this.calculateVelocity(platformMetrics);
  
      // 7. Calculate network amplification
      const networkAmplification = this.calculateNetworkAmplification(
        platformMetrics,
        citationMetrics
      );
  
      return {
        overallSignal: Math.min(100, Math.max(0, overallSignal)),
        components,
        highIntentSignals,
        velocity,
        networkAmplification
      };
    }
  
    /**
     * Semantic Relevance: Topic coherence score
     * Based on niche purity from authority metrics
     */
    private calculateSemanticRelevance(authority: SocialAuthorityMetrics): number {
      return authority.expertise.nichePurity;
    }
  
    /**
     * Context Depth: Engagement quality score
     * Weighted by comment length, thread depth, and value-add
     */
    private calculateContextDepth(content: SocialContentMetrics): number {
      const avgEngagement = content.performance.averageEngagement;
      const threadUsage = content.formatEffectiveness.find(f => f.format === 'Thread')?.successRate || 0;
      const educationalRatio = content.contentBreakdown.educational;
  
      // Higher engagement + more threads + more educational = better depth
      return (
        (avgEngagement / 1000) * 0.4 +  // Normalize avg engagement (assuming max ~1000)
        threadUsage * 0.3 +
        educationalRatio * 0.3
      ) * 100;
    }
  
    /**
     * Conversation Quality: Reply depth and multi-turn dialogue
     */
    private calculateConversationQuality(content: SocialContentMetrics): number {
      const conversationalRatio = content.contentBreakdown.conversational;
      const threadSuccess = content.formatEffectiveness.find(f => f.format === 'Thread')?.avgEngagement || 0;
  
      return (conversationalRatio * 0.6 + (threadSuccess / 1000) * 0.4) * 100;
    }
  
    /**
     * Originality: Unique insights vs echoing
     */
    private calculateOriginality(content: SocialContentMetrics): number {
      const curatedRatio = content.contentBreakdown.curated;
      // High curated ratio = low originality
      return (1 - curatedRatio) * 100;
    }
  
    /**
     * Consistency: Posting regularity
     */
    private calculateConsistency(platform: PlatformMetrics): number {
      // Assume "good" cadence is 1-3 posts/day
      const postsPerDay = platform.posts / (platform.accountAge || 1);
      const optimalRange = { min: 1, max: 3 };
  
      if (postsPerDay >= optimalRange.min && postsPerDay <= optimalRange.max) {
        return 100;
      } else if (postsPerDay < optimalRange.min) {
        return (postsPerDay / optimalRange.min) * 100;
      } else {
        // Penalize excessive posting
        return Math.max(0, 100 - ((postsPerDay - optimalRange.max) * 10));
      }
    }
  
    /**
     * Normalize citation count to 0-100 scale
     */
    private normalizeCitations(citations: SocialCitationMetrics): number {
      const total = citations.citations.totalMentions;
      // Assume 100+ citations = max score
      return Math.min(100, (total / 100) * 100);
    }
  
    /**
     * Calculate spam penalty multiplier (0-1)
     */
    private calculateSpamPenalty(spamRisk: SpamRiskMetrics): number {
      let penalty = 1.0;
  
      // Apply each penalty flag
      if (spamRisk.redFlags.perfectTimingPatterns) {
        penalty += SPAM_PENALTIES.perfectTimingPatterns;
      }
      if (spamRisk.redFlags.copyPasteDetection > 0.2) {  // >20% duplicates
        penalty += SPAM_PENALTIES.copyPasteDetection;
      }
      if (spamRisk.redFlags.massFollowUnfollow > 0.5) {  // >50% churn
        penalty += SPAM_PENALTIES.massFollowUnfollow;
      }
      if (spamRisk.redFlags.emptyEngagement > 0.3) {  // >30% generic comments
        penalty += SPAM_PENALTIES.emptyEngagement;
      }
      if (spamRisk.redFlags.selfPromotionRatio > 0.4) {  // >40% promotional
        penalty += SPAM_PENALTIES.selfPromotionRatio;
      }
  
      return Math.max(0, penalty);  // Floor at 0 (total penalty)
    }
  
    /**
     * Extract high-intent signals from platform data
     */
    private extractHighIntentSignals(
      platform: PlatformMetrics,
      citations: SocialCitationMetrics
    ) {
      // Estimated from engagement metrics (would need X API for exact data)
      const totalEngagement = platform.engagement.totalLikes + 
                             platform.engagement.totalComments + 
                             platform.engagement.totalShares;
  
      return {
        bookmarks: Math.round(totalEngagement * 0.05),  // Estimate 5% bookmark rate
        quoteTweetsWithAnalysis: citations.citations.quoteRetweetsInbound,
        threadStarts: Math.round(platform.posts * platform.content.threadUsage),
        profileClicks: Math.round(platform.followers * 0.02),  // Estimate 2% CTR
        citationsReceived: citations.citations.totalMentions
      };
    }
  
    /**
     * Calculate engagement velocity (first 24h metrics)
     */
    private calculateVelocity(platform: PlatformMetrics) {
      // Estimate based on average engagement
      const avgPerPost = platform.engagement.averagePerPost;
      
      return {
        likesPerHour: avgPerPost * 0.5 / 24,  // Assume 50% likes
        commentsPerHour: avgPerPost * 0.3 / 24,  // 30% comments
        sharesPerHour: avgPerPost * 0.2 / 24,  // 20% shares
        viralityIndex: this.calculateViralityIndex(platform)
      };
    }
  
    /**
     * Virality Index: Exponential growth rate
     */
    private calculateViralityIndex(platform: PlatformMetrics): number {
      const engagementRate = platform.engagement.engagementRate;
      // Virality occurs when engagement rate > follower count growth
      // Simplified: high engagement rate = higher virality potential
      return Math.min(10, engagementRate / 10);  // Scale 0-10
    }
  
    /**
     * Calculate network amplification effects
     */
    private calculateNetworkAmplification(
      platform: PlatformMetrics,
      citations: SocialCitationMetrics
    ) {
      return {
        averageRetweetReach: citations.quality.averageCiterFollowers,
        influencerEngagement: citations.quality.expertCitations,
        crossPlatformMentions: citations.citations.externalCitations
      };
    }
  
    /**
     * Calculate improvement delta between two signal scores
     */
    calculateImprovement(
      beforeScore: SignalStrengthMetrics,
      afterScore: SignalStrengthMetrics
    ): {
      overallDelta: number;
      componentDeltas: Record<string, number>;
      percentChange: number;
    } {
      const overallDelta = afterScore.overallSignal - beforeScore.overallSignal;
  
      const componentDeltas: Record<string, number> = {};
      for (const key in beforeScore.components) {
        componentDeltas[key] = 
          afterScore.components[key as keyof typeof afterScore.components] - 
          beforeScore.components[key as keyof typeof beforeScore.components];
      }
  
      const percentChange = beforeScore.overallSignal > 0
        ? (overallDelta / beforeScore.overallSignal) * 100
        : 0;
  
      return {
        overallDelta,
        componentDeltas,
        percentChange
      };
    }
  
    /**
     * Recommend actions to improve signal score
     */
    generateRecommendations(
      currentScore: SignalStrengthMetrics,
      spamRisk: SpamRiskMetrics
    ): string[] {
      const recommendations: string[] = [];
  
      // Check each component for improvement opportunities
      if (currentScore.components.semanticRelevance < 70) {
        recommendations.push("Focus posts on your primary niche to increase topic coherence");
      }
  
      if (currentScore.components.contextDepth < 60) {
        recommendations.push("Write longer, more analytical comments (aim for 200+ characters)");
      }
  
      if (currentScore.components.conversationQuality < 50) {
        recommendations.push("Engage in multi-turn conversations (3+ reply threads)");
      }
  
      if (currentScore.components.originalityScore < 65) {
        recommendations.push("Share more original insights vs retweets (target 70% original)");
      }
  
      if (currentScore.components.consistencyScore < 75) {
        recommendations.push("Post 1-3 times daily for optimal consistency");
      }
  
      // Address spam risks
      if (spamRisk.redFlags.perfectTimingPatterns) {
        recommendations.push("Vary posting times to avoid robotic patterns");
      }
  
      if (spamRisk.redFlags.copyPasteDetection > 0.2) {
        recommendations.push("Write unique comments for each post you engage with");
      }
  
      if (spamRisk.redFlags.emptyEngagement > 0.3) {
        recommendations.push("Add specific insights in comments (avoid generic 'Great post!')");
      }
  
      return recommendations;
    }
}

export const signalScorer = new SignalScorerService();