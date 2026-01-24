// src/apps/sgs/api/models/metricsAggregator.ts
import type { 
  GEOMetrics, 
  SocialMetrics, 
  SignalStrengthMetrics,
  SocialAuthorityMetrics,
  SocialContentMetrics,
  SocialCitationMetrics,
  SpamRiskMetrics,
  ChallengeMetrics
} from '../types/metrics.types';
import type { XProfileResponse, GrokAnalysisResponse } from '../types/api-responses.types';

/**
 * Aggregate metrics from multiple sources into GEOMetrics.social
 */
export class MetricsAggregator {
  /**
   * Build SocialMetrics from X API + Grok analysis
   */
  static aggregateSocialMetrics(
    xData: XProfileResponse,
    grokData: GrokAnalysisResponse,
    challengeData?: Partial<ChallengeMetrics>
  ): SocialMetrics {
    return {
      platforms: {
        x: this.buildPlatformMetrics(xData, grokData),
      },
      
      overall: this.buildOverallMetrics(xData),
      
      signalStrength: this.buildSignalStrength(xData, grokData),
      
      authority: this.buildAuthority(xData, grokData),
      
      content: this.buildContentMetrics(xData, grokData),
      
      citations: this.buildCitations(xData, grokData),
      
      spamRisk: this.buildSpamRisk(xData, grokData),
      
      challengePerformance: challengeData as ChallengeMetrics | undefined,
    };
  }
  
  /**
   * Build platform-specific metrics
   */
  private static buildPlatformMetrics(
    xData: XProfileResponse,
    grokData: GrokAnalysisResponse
  ): SocialMetrics['platforms']['x'] {
    return {
      platform: 'x',
      
      followers: xData.public_metrics.followers_count,
      following: xData.public_metrics.following_count,
      posts: xData.public_metrics.tweet_count,
      accountAge: this.calculateAccountAge(xData.created_at),
      
      engagement: {
        totalLikes: grokData.engagementMetrics?.totalLikes || 0,
        totalComments: grokData.engagementMetrics?.totalComments || 0,
        totalShares: grokData.engagementMetrics?.totalShares || 0,
        averagePerPost: grokData.engagementMetrics?.averagePerPost || 0,
        engagementRate: this.calculateEngagementRate(xData, grokData),
        peakEngagementTime: grokData.optimalTiming?.bestHours?.[0] || 'Unknown',
      },
      
      content: {
        avgPostLength: grokData.contentAnalysis?.avgPostLength || 0,
        mediaUsage: grokData.contentAnalysis?.mediaUsage || 0,
        linkSharing: grokData.contentAnalysis?.linkSharing || 0,
        threadUsage: grokData.contentAnalysis?.threadUsage || 0,
        hashtagDensity: grokData.contentAnalysis?.hashtagDensity || 0,
      },
      
      network: {
        verifiedRatio: grokData.networkMetrics?.verifiedRatio || 0,
        mutualConnections: grokData.networkMetrics?.mutualConnections || 0,
        influencerFollowers: grokData.networkMetrics?.influencerFollowers || 0,
        listMemberships: grokData.networkMetrics?.listMemberships || 0,
      },
      
      verification: {
        isVerified: xData.verified || false,
        verificationTier: this.mapVerificationTier(xData.verified_type),
        verificationDate: xData.verified ? new Date() : undefined,
      },
    };
  }
  
  /**
   * Build overall cross-platform aggregates
   */
  private static buildOverallMetrics(xData: XProfileResponse): SocialMetrics['overall'] {
    return {
      totalFollowers: xData.public_metrics.followers_count,
      verifiedFollowerRatio: 0, // Requires follower analysis
      crossPlatformReach: xData.public_metrics.followers_count,
      unifiedEngagementRate: 0, // Calculated from engagement metrics
    };
  }
  
  /**
   * Build signal strength metrics
   */
  private static buildSignalStrength(
    xData: XProfileResponse,
    grokData: GrokAnalysisResponse
  ): SignalStrengthMetrics {
    return {
      overallSignal: grokData.signalScore || 0,
      
      components: {
        semanticRelevance: grokData.topicCoherence || 0,
        contextDepth: grokData.engagementQuality || 0,
        conversationQuality: grokData.replyDepth || 0,
        originalityScore: grokData.originalityScore || 0,
        consistencyScore: grokData.postingCadence || 0,
      },
      
      highIntentSignals: {
        bookmarks: grokData.highIntentActions?.bookmarks || 0,
        quoteXsWithAnalysis: grokData.highIntentActions?.quoteXsWithAnalysis || 0,
        threadStarts: grokData.highIntentActions?.threadStarts || 0,
        profileClicks: grokData.highIntentActions?.profileClicks || 0,
        citationsReceived: grokData.highIntentActions?.citationsReceived || 0,
      },
      
      velocity: {
        likesPerHour: grokData.velocity?.likesPerHour || 0,
        commentsPerHour: grokData.velocity?.commentsPerHour || 0,
        sharesPerHour: grokData.velocity?.sharesPerHour || 0,
        viralityIndex: grokData.velocity?.viralityIndex || 0,
      },
      
      networkAmplification: {
        averageRepostReach: grokData.amplification?.averageRepostReach || 0,
        influencerEngagement: grokData.amplification?.influencerEngagement || 0,
        crossPlatformMentions: grokData.amplification?.crossPlatformMentions || 0,
      },
    };
  }
  
  /**
   * Build authority metrics
   */
  private static buildAuthority(
    xData: XProfileResponse,
    grokData: GrokAnalysisResponse
  ): SocialAuthorityMetrics {
    return {
      authorityScore: grokData.authorityScore || 0,
      
      expertise: {
        primaryNiche: grokData.niche || 'Uncategorized',
        nichePurity: grokData.topicCoherence || 0,
        expertiseLevel: this.mapExpertiseLevel(grokData.expertiseScore),
        topicTags: grokData.topicTags || [],
      },
      
      thoughtLeadership: {
        originalContentRatio: grokData.originalContentRatio || 0,
        longFormPosts: grokData.threadCount || 0,
        researchCitations: grokData.researchCitations || 0,
        caseStudiesShared: grokData.caseStudies || 0,
        frameworksCreated: grokData.frameworks || 0,
      },
      
      influence: {
        followerGrowthRate: 0, // Requires historical data
        mentionFrequency: grokData.mentionFrequency || 0,
        listInclusions: grokData.listInclusions || 0,
        guestAppearances: grokData.guestAppearances || 0,
      },
      
      trust: {
        accountLongevity: this.calculateAccountAge(xData.created_at) / 365,
        consistentActivity: grokData.activeDay || 0,
        brandPartnerships: grokData.brandPartnerships || 0,
        mediaFeatures: grokData.mediaFeatures || 0,
      },
    };
  }
  
  /**
   * Build content metrics
   */
  private static buildContentMetrics(
    xData: XProfileResponse,
    grokData: GrokAnalysisResponse
  ): SocialContentMetrics {
    return {
      performance: {
        topPerformingPosts: grokData.topPosts || [],
        averageImpressions: grokData.avgImpressions || 0,
        averageEngagement: grokData.avgEngagement || 0,
        viralPosts: grokData.viralPosts || 0,
      },
      
      contentBreakdown: {
        educational: grokData.contentMix?.educational || 0,
        promotional: grokData.contentMix?.promotional || 0,
        conversational: grokData.contentMix?.conversational || 0,
        curated: grokData.contentMix?.curated || 0,
      },
      
      formatEffectiveness: grokData.formatAnalysis || [],
      
      topicResonance: grokData.topicPerformance || [],
      
      optimalTiming: {
        bestDays: grokData.optimalTiming?.bestDays || [],
        bestHours: grokData.optimalTiming?.bestHours || [],
        worstTimes: grokData.optimalTiming?.worstTimes || [],
      },
    };
  }
  
  /**
   * Build citation metrics
   */
  private static buildCitations(
    xData: XProfileResponse,
    grokData: GrokAnalysisResponse
  ): SocialCitationMetrics {
    return {
      citations: {
        totalMentions: grokData.mentions || 0,
        quoteXsInbound: grokData.quoteXs || 0,
        threadLinks: grokData.threadLinks || 0,
        externalCitations: grokData.externalCitations || 0,
      },
      
      network: {
        citedBy: grokData.citedBy || [],
        citing: grokData.citing || [],
      },
      
      quality: {
        averageCiterFollowers: grokData.avgCiterFollowers || 0,
        expertCitations: grokData.expertCitations || 0,
        crossPlatformCitations: grokData.crossPlatformCitations || 0,
      },
      
      influence: {
        citationReach: grokData.citationReach || 0,
        citationVirality: grokData.citationVirality || 0,
        secondaryMentions: grokData.secondaryMentions || 0,
      },
      
      reciprocity: {
        mutualCitations: grokData.mutualCitations || 0,
        oneWayCitationsIn: grokData.oneWayCitationsIn || 0,
        oneWayCitationsOut: grokData.oneWayCitationsOut || 0,
        reciprocityRate: this.calculateReciprocityRate(grokData),
      },
    };
  }
  
  /**
   * Build spam risk metrics
   */
  private static buildSpamRisk(
    xData: XProfileResponse,
    grokData: GrokAnalysisResponse
  ): SpamRiskMetrics {
    return {
      spamRiskScore: grokData.spamScore || 0,
      
      redFlags: {
        perfectTimingPatterns: grokData.roboticSchedule || false,
        copyPasteDetection: grokData.duplicateComments || 0,
        massFollowUnfollow: this.calculateChurnRate(xData),
        emptyEngagement: grokData.genericComments || 0,
        selfPromotionRatio: grokData.selfPromotion || 0,
        accountPurchaseSuspicion: grokData.followerSpike || 0,
      },
      
      behavior: {
        followUnfollowRatio: this.calculateFollowRatio(xData),
        followBackRate: 0, // Requires follower analysis
        engagementConsistency: grokData.engagementVariance || 0,
        commentQuality: grokData.avgCommentLength || 0,
      },
      
      automation: {
        botLikelihood: grokData.botScore || 0,
        suspiciousPatterns: grokData.suspiciousPatterns || [],
        humanVerification: false, // Manual flag
      },
      
      history: {
        previousViolations: 0, // External source
        shadowBanHistory: false, // External source
        accountRestrictions: 0, // External source
        reportedByUsers: 0, // External source
      },
    };
  }
  
  // Helper methods
  private static calculateAccountAge(createdAt: string): number {
    const created = new Date(createdAt);
    const now = new Date();
    return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  }
  
  private static mapVerificationTier(type?: string): 'Free' | 'Premium' | 'Premium+' | 'Organization' {
    if (type === 'blue') return 'Premium';
    if (type === 'government' || type === 'business') return 'Organization';
    return 'Free';
  }
  
  private static mapExpertiseLevel(score?: number): 'Beginner' | 'Intermediate' | 'Advanced' | 'Thought Leader' {
    if (!score) return 'Beginner';
    if (score > 80) return 'Thought Leader';
    if (score > 60) return 'Advanced';
    if (score > 40) return 'Intermediate';
    return 'Beginner';
  }
  
  private static calculateEngagementRate(
    xData: XProfileResponse,
    grokData: GrokAnalysisResponse
  ): number {
    const totalEngagement = 
      (grokData.engagementMetrics?.totalLikes || 0) +
      (grokData.engagementMetrics?.totalComments || 0) +
      (grokData.engagementMetrics?.totalShares || 0);
    
    const followers = xData.public_metrics.followers_count || 1;
    return (totalEngagement / followers) * 100;
  }
  
  private static calculateChurnRate(xData: XProfileResponse): number {
    // Placeholder: would need historical data
    const following = xData.public_metrics.following_count;
    const followers = xData.public_metrics.followers_count;
    return Math.abs(following - followers) / Math.max(1, followers);
  }
  
  private static calculateFollowRatio(xData: XProfileResponse): number {
    return xData.public_metrics.following_count / Math.max(1, xData.public_metrics.followers_count);
  }
  
  private static calculateReciprocityRate(grokData: GrokAnalysisResponse): number {
    const mutual = grokData.mutualCitations || 0;
    const total = (grokData.mutualCitations || 0) + 
                  (grokData.oneWayCitationsIn || 0) + 
                  (grokData.oneWayCitationsOut || 0);
    return total > 0 ? mutual / total : 0;
  }
  
  /**
   * Merge GEOMetrics.social with existing GEOMetrics
   */
  static mergeWithGEOMetrics(
    baseMetrics: Partial<GEOMetrics>,
    socialMetrics: SocialMetrics
  ): GEOMetrics {
    return {
      ...baseMetrics,
      social: socialMetrics,
    } as GEOMetrics;
  }
}