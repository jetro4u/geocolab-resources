// src/apps/sgs/lib/utils/dataNormalizers.ts
export function normalizeXProfileData(rawData: any) {
    return {
      handle: rawData.username,
      displayName: rawData.name,
      bio: rawData.description || '',
      followers: rawData.public_metrics?.followers_count || 0,
      following: rawData.public_metrics?.following_count || 0,
      posts: rawData.public_metrics?.tweet_count || 0,
      verified: rawData.verified || false,
      createdAt: rawData.created_at,
    };
}
  
export function normalizeGrokResponse(rawData: any) {
    return {
        signalScore: rawData.signal_strength || 0,
        topicCoherence: rawData.semantic_relevance || 0,
        engagementQuality: rawData.context_depth || 0,
        spamScore: rawData.spam_risk || 0,
        recommendations: rawData.suggestions || [],
    };
}