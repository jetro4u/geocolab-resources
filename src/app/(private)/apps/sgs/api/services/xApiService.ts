// src/apps/sgs/api/services/xApiService.ts
import { Client } from '@dndhub/x';
import type { PlatformMetrics } from '@dndhub/geo';

export class XApiService {
  private client: Client;
  
  constructor(bearerToken: string) {
    this.client = new XApi(bearerToken);
  }

  /**
   * Fetch comprehensive user profile + metrics
   * Maps to PlatformMetrics (from GEOMetrics.social)
   */
  async fetchParticipantProfile(handle: string): Promise<{
    profile: XUser;
    metrics: PlatformMetrics;
  }> {
    // 1. Get user object
    const user = await this.client.userByUsername(handle, {
      'user.fields': [
        'created_at',
        'description',
        'public_metrics',
        'verified',
        'verified_type'
      ]
    });

    // 2. Get recent tweets (30 days)
    const tweets = await this.client.userTimeline(user.data.id, {
      max_results: 100,
      'tweet.fields': ['public_metrics', 'created_at', 'entities'],
      exclude: ['retweets', 'replies']
    });

    // 3. Calculate engagement metrics
    const engagementMetrics = this.calculateEngagementMetrics(tweets.data);

    // 4. Analyze content quality
    const contentMetrics = this.analyzeContentQuality(tweets.data);

    // 5. Build PlatformMetrics object
    return {
      profile: user.data,
      metrics: {
        platform: 'X',
        followers: user.data.public_metrics.followers_count,
        following: user.data.public_metrics.following_count,
        posts: user.data.public_metrics.tweet_count,
        accountAge: this.calculateAccountAge(user.data.created_at),
        
        engagement: engagementMetrics,
        content: contentMetrics,
        network: await this.analyzeNetwork(user.data.id),
        verification: {
          isVerified: user.data.verified,
          verificationTier: this.mapVerificationTier(user.data.verified_type),
          verificationDate: user.data.verified ? new Date() : undefined
        }
      }
    };
  }

  /**
   * Track citations (mentions of participant)
   * Maps to SocialCitationMetrics
   */
  async trackCitations(handle: string, since: Date): Promise<CitationData[]> {
    const mentions = await this.client.search(`@${handle}`, {
      'tweet.fields': ['author_id', 'public_metrics', 'created_at'],
      start_time: since.toISOString(),
      max_results: 100
    });

    return mentions.data.map(tweet => ({
      citedBy: tweet.author_id,
      type: 'Mention',
      engagement: tweet.public_metrics.like_count,
      timestamp: tweet.created_at
    }));
  }

  /**
   * Monitor engagement velocity (first 24h)
   */
  async trackEngagementVelocity(tweetId: string): Promise<VelocityMetrics> {
    const intervals = [1, 3, 6, 12, 24]; // hours
    const snapshots = [];

    for (const hour of intervals) {
      await this.sleep(hour * 60 * 60 * 1000);
      const tweet = await this.client.singleTweet(tweetId, {
        'tweet.fields': ['public_metrics']
      });
      snapshots.push({
        hour,
        likes: tweet.data.public_metrics.like_count,
        retweets: tweet.data.public_metrics.retweet_count,
        replies: tweet.data.public_metrics.reply_count
      });
    }

    return {
      likesPerHour: snapshots[snapshots.length - 1].likes / 24,
      viralityIndex: this.calculateViralityIndex(snapshots)
    };
  }

  // Helper: Calculate signal components
  private calculateEngagementMetrics(tweets: Tweet[]): EngagementData {
    const totalLikes = tweets.reduce((sum, t) => sum + t.public_metrics.like_count, 0);
    const totalComments = tweets.reduce((sum, t) => sum + t.public_metrics.reply_count, 0);
    const totalShares = tweets.reduce((sum, t) => sum + t.public_metrics.retweet_count, 0);

    return {
      totalLikes,
      totalComments,
      totalShares,
      averagePerPost: (totalLikes + totalComments + totalShares) / tweets.length,
      engagementRate: 0, // Calculated with follower count
      peakEngagementTime: this.detectPeakTime(tweets)
    };
  }

  private analyzeContentQuality(tweets: Tweet[]): ContentData {
    return {
      avgPostLength: tweets.reduce((sum, t) => sum + t.text.length, 0) / tweets.length,
      mediaUsage: (tweets.filter(t => t.entities?.media).length / tweets.length) * 100,
      linkSharing: (tweets.filter(t => t.entities?.urls).length / tweets.length) * 100,
      threadUsage: 0, // Requires thread detection logic
      hashtagDensity: tweets.reduce((sum, t) => 
        sum + (t.entities?.hashtags?.length || 0), 0
      ) / tweets.length
    };
  }

  private async analyzeNetwork(userId: string): Promise<NetworkData> {
    const followers = await this.client.followers(userId, {
      max_results: 1000,
      'user.fields': ['verified', 'public_metrics']
    });

    const verifiedCount = followers.data.filter(f => f.verified).length;
    const influencers = followers.data.filter(f => 
      f.public_metrics.followers_count > 10000
    ).length;

    return {
      verifiedRatio: (verifiedCount / followers.data.length) * 100,
      mutualConnections: 0, // Requires following list comparison
      influencerFollowers: influencers,
      listMemberships: 0 // Requires list API calls
    };
  }
}