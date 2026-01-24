// src/apps/sgs/api/models/participantFactory.ts
import type { 
  SignalSpamParticipant, 
  AutoRetrievableData, 
  AIAnalyzedData,
  ManualInputRequired 
} from '../types/participant.types';
import type { XProfileResponse } from '../types/api-responses.types';

/**
 * Transform raw X API response to participant profile
 * Combines auto-retrieved, AI-analyzed, and manual data
 */
export class ParticipantFactory {
  /**
   * Create participant from X API data + Grok analysis
   */
  static fromXProfile(
    xData: XProfileResponse,
    aiData?: AIAnalyzedData,
    manualData?: Partial<ManualInputRequired>
  ): SignalSpamParticipant {
    const autoData = this.extractAutoRetrievableData(xData);
    
    return {
      // Auto-Retrieved Identity
      handle: autoData.handle,
      profileLink: autoData.profileLink,
      accountType: autoData.accountType,
      
      // Auto-Analyzed Content (from Grok)
      primaryTopic: aiData?.primaryNiche || 'Uncategorized',
      userIntentType: this.mapIntentType(aiData?.intentDistribution),
      audienceLevel: aiData?.expertiseLevel || 'Beginner',
      languageTone: aiData?.languageTone || 'Casual',
      
      // Auto-Calculated Scores
      accountScore: this.calculateAccountScore(autoData),
      signalStrength: this.calculateSignalStrength(autoData, aiData),
      spamRisk: this.calculateSpamRisk(autoData, aiData),
      
      // Manual Challenge Tracking (defaults)
      secondTouchDone: manualData?.secondTouchDone || false,
      replyRoleUsed: manualData?.replyRoleUsed,
      replyHookType: manualData?.replyHookType,
      
      // Revenue Intelligence
      revenuePotential: manualData?.revenuePotential || 'Low',
      futurePromptTag: manualData?.futurePromptTag,
      
      // Challenge Performance (initialized)
      signalContributions: {
        highQualityComments: 0,
        thoughtfulQuoteXs: 0,
        profileOptimizationHelp: 0,
        networkIntroductions: 0,
      },
    };
  }
  
  /**
   * Extract auto-retrievable data from X API response
   */
  private static extractAutoRetrievableData(
    xData: XProfileResponse
  ): AutoRetrievableData {
    return {
      handle: xData.username,
      displayName: xData.name,
      bio: xData.description || '',
      profileLink: `https://x.com/${xData.username}`,
      
      accountType: this.detectAccountType(xData),
      verificationDate: xData.verified_type === 'blue' ? new Date() : undefined,
      
      followerCount: xData.public_metrics.followers_count,
      followingCount: xData.public_metrics.following_count,
      postCount: xData.public_metrics.tweet_count,
      accountAge: new Date(xData.created_at),
      
      // Calculated from posts (requires separate API call)
      primaryTopics: [],
      postingFrequency: 0,
      engagementRate: 0,
      averagePostLength: 0,
      hashtagUsage: 0,
      mediaUsage: 0,
      
      verifiedFollowerRatio: 0,
      mutualFollowerCount: 0,
      listMemberships: 0,
    };
  }
  
  /**
   * Detect account verification type
   */
  private static detectAccountType(
    xData: XProfileResponse
  ): 'Premium' | 'Premium+' | 'Free' {
    if (xData.verified_type === 'blue') return 'Premium';
    if (xData.verified_type === 'government' || xData.verified_type === 'business') {
      return 'Premium+';
    }
    return 'Free';
  }
  
  /**
   * Map AI-detected intent distribution to primary type
   */
  private static mapIntentType(
    distribution?: AIAnalyzedData['intentDistribution']
  ): SignalSpamParticipant['userIntentType'] {
    if (!distribution) return 'Asking Help';
    
    const entries = Object.entries(distribution);
    const [primary] = entries.sort(([, a], [, b]) => b - a);
    
    const intentMap: Record<string, SignalSpamParticipant['userIntentType']> = {
      askingHelp: 'Asking Help',
      complaining: 'Complaining',
      sharing: 'Sharing',
      teaching: 'Teaching',
      debating: 'Debating',
    };
    
    return intentMap[primary[0]] || 'Asking Help';
  }
  
  /**
   * Calculate account score (1-5)
   * Based on follower count, verification, and engagement
   */
  private static calculateAccountScore(data: AutoRetrievableData): 1 | 2 | 3 | 4 | 5 {
    let score = 0;
    
    // Follower tiers
    if (data.followerCount > 10000) score += 2;
    else if (data.followerCount > 1000) score += 1;
    
    // Verification bonus
    if (data.accountType !== 'Free') score += 1;
    
    // Engagement rate (if available)
    if (data.engagementRate > 5) score += 1;
    if (data.engagementRate > 10) score += 1;
    
    return Math.max(1, Math.min(5, score)) as 1 | 2 | 3 | 4 | 5;
  }
  
  /**
   * Calculate signal strength (0-100)
   * Composite score from content quality, network, and behavior
   */
  private static calculateSignalStrength(
    autoData: AutoRetrievableData,
    aiData?: AIAnalyzedData
  ): number {
    const weights = {
      semanticRelevance: 0.25,
      contextDepth: 0.20,
      followerVerifiedRatio: 0.15,
      citationFrequency: 0.15,
      nicheCoherence: 0.10,
      dwellTime: 0.10,
      bookmarkRate: 0.05,
    };
    
    const metrics = {
      semanticRelevance: (aiData?.nichePurity || 0) * 100,
      contextDepth: (aiData?.thoughtLeadershipScore || 0) * 100,
      followerVerifiedRatio: autoData.verifiedFollowerRatio * 100,
      citationFrequency: Math.min(100, (aiData?.citationFrequency || 0) * 10),
      nicheCoherence: (aiData?.nichePurity || 0) * 100,
      dwellTime: 50, // Default (requires tracking)
      bookmarkRate: 50, // Default (requires tracking)
    };
    
    const score = Object.entries(metrics).reduce((sum, [key, value]) => {
      return sum + (value * (weights[key as keyof typeof weights] || 0));
    }, 0);
    
    return Math.round(Math.max(0, Math.min(100, score)));
  }
  
  /**
   * Calculate spam risk (0-100, lower is better)
   */
  private static calculateSpamRisk(
    autoData: AutoRetrievableData,
    aiData?: AIAnalyzedData
  ): number {
    let risk = 0;
    
    // Follow/following ratio (churn indicator)
    const followRatio = autoData.followingCount / Math.max(1, autoData.followerCount);
    if (followRatio > 5) risk += 30;
    else if (followRatio > 2) risk += 15;
    
    // Low niche purity
    if (aiData?.nichePurity && aiData.nichePurity < 0.5) risk += 20;
    
    // Low original content
    if (aiData?.originalContentRatio && aiData.originalContentRatio < 0.3) risk += 25;
    
    // High self-promotion (if detectable)
    // Placeholder: would need post analysis
    
    return Math.round(Math.max(0, Math.min(100, risk)));
  }
  
  /**
   * Update participant with challenge progress
   */
  static updateChallengeProgress(
    participant: SignalSpamParticipant,
    updates: Partial<SignalSpamParticipant['signalContributions']>
  ): SignalSpamParticipant {
    return {
      ...participant,
      signalContributions: {
        ...participant.signalContributions,
        ...updates,
      },
    };
  }
  
  /**
   * Recalculate signal strength after challenge activities
   */
  static recalculateSignal(
    participant: SignalSpamParticipant,
    newMetrics: Partial<AutoRetrievableData & AIAnalyzedData>
  ): number {
    // Merge existing data with updates
    const updatedAuto: Partial<AutoRetrievableData> = {
      followerCount: participant.accountScore * 200, // Reverse estimate
      ...newMetrics,
    };
    
    const updatedAI: Partial<AIAnalyzedData> = {
      nichePurity: participant.signalStrength / 100,
      ...newMetrics,
    };
    
    return this.calculateSignalStrength(
      updatedAuto as AutoRetrievableData,
      updatedAI as AIAnalyzedData
    );
  }
}