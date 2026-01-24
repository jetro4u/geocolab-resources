import type { SocialMetrics, SignalStrengthMetrics, SpamRiskMetrics } from './metrics.types';

/**
 * Core participant profile
 * Aligns with Google Sheets "Participant Tracker" tab
 */
export interface ParticipantProfile {
  // Identity
  handle: string;
  platform: 'twitter' | 'linkedin' | 'threads' | 'bluesky' | 'mastodon';
  accountType: 'Premium' | 'Premium+' | 'Free';
  displayName?: string;
  bio?: string;
  profileLink: string;
  
  // Auto-detected niche
  primaryNiche: string; // e.g., "GEO Expert"
  userIntentType: 'Asking Help' | 'Complaining' | 'Sharing' | 'Teaching' | 'Debating';
  audienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  languageTone: 'Casual' | 'Technical' | 'Emotional' | 'Direct';
  
  // Metrics
  signalStrength: SignalStrengthMetrics;
  baselineScore: number; // Day 1 snapshot
  currentScore: number; // Real-time
  improvement: number; // Delta
  spamRisk: SpamRiskMetrics;
  
  // Challenge tracking
  challengeId: string;
  status: 'Active' | 'Completed' | 'Dropped';
  enrolledAt: Date;
  lastActivityAt: Date;
  
  // Manual inputs
  secondTouchDone: boolean;
  replyRoleUsed?: 'Diagnostician' | 'Contrarian' | 'Translator' | 'Catalyst';
  replyHookType?: 'Question-Ended' | 'Contrarian' | 'Empathy-First' | 'Authority-Frame';
  revenuePotential: 'Low' | 'Med' | 'High';
  revenueNotes?: string;
  futurePromptTag?: string; // e.g., "AI Visibility Lead"
  
  // Contribution tracking (for points)
  signalContributions: {
    highQualityComments: number;
    thoughtfulQuoteTweets: number;
    profileOptimizationHelp: number;
    networkIntroductions: number;
  };
}

/**
 * Auto-retrievable data from X API
 * Maps to raw API responses
 */
export interface AutoRetrievableData {
  // Basic identity
  handle: string;
  displayName: string;
  bio: string;
  profileLink: string;
  
  // Verification
  accountType: 'Premium' | 'Premium+' | 'Free';
  verificationDate?: Date;
  
  // Follower metrics
  followerCount: number;
  followingCount: number;
  tweetCount: number;
  accountAge: Date;
  
  // Content analysis (last 100 tweets)
  primaryTopics: string[];
  postingFrequency: number; // Tweets/day avg
  engagementRate: number; // (Likes+RTs+Replies)/Followers
  averageTweetLength: number;
  hashtagUsage: number;
  mediaUsage: number; // % tweets with images/video
  
  // Network quality
  verifiedFollowerRatio: number;
  mutualFollowerCount: number;
  listMemberships: number;
}

/**
 * AI-analyzed data from Grok
 * Requires Grok API processing
 */
export interface AIAnalyzedData {
  // Content classification
  primaryNiche: string;
  nichePurity: number; // 0-1 consistency score
  expertiseLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  
  // Intent detection (last 50 tweets)
  intentDistribution: {
    askingHelp: number;
    complaining: number;
    sharing: number;
    teaching: number;
    debating: number;
  };
  
  // Tone analysis
  languageTone: 'Casual' | 'Technical' | 'Emotional' | 'Direct';
  sentimentScore: number; // -1 to 1
  professionalismIndex: number; // 0-1
  
  // Authority markers
  citationFrequency: number;
  originalContentRatio: number;
  thoughtLeadershipScore: number;
}

/**
 * Manual input requirements
 * Admin/user-provided data
 */
export interface ManualInputRequired {
  secondTouchDone: boolean;
  replyRoleUsed?: 'Diagnostician' | 'Contrarian' | 'Translator' | 'Catalyst';
  replyHookType?: 'Question-Ended' | 'Contrarian' | 'Empathy-First' | 'Authority-Frame';
  revenuePotential: 'Low' | 'Med' | 'High';
  revenueNotes?: string;
  futurePromptTag?: string;
}

/**
 * Action log entry
 * Maps to Google Sheets "Points Log" tab
 */
export interface ActionLog {
  timestamp: Date;
  handle: string;
  actionType: ActionType;
  pointsEarned: number;
  description: string;
  verifiedBy: 'Auto (Grok)' | 'Manual';
  signalImpact: number; // +/- to signal score
}

export type ActionType =
  | 'Follow'
  | 'High-Quality Comment'
  | 'Cited by Others'
  | 'Grok Bonus'
  | 'Deliverable (Thread)'
  | 'Deliverable (Article)'
  | 'Deliverable (Case Study)'
  | 'Profile Optimization'
  | 'Citation Received'
  | 'Network Introduction'
  | 'Skill Swap Completed';

/**
 * Deliverable submission
 * Maps to "Challenge Deliverables" tab
 */
export interface Deliverable {
  handle: string;
  type: 'Thread' | 'Article' | 'Case Study' | 'Tool Launch';
  url: string;
  submissionDate: Date;
  grokScore: number; // AI quality rating (0-100)
  engagement: number; // Likes + Comments + Shares
  citations: number; // Times others referenced
  bonusPoints: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  reviewNotes?: string;
}

/**
 * Leaderboard entry
 * Real-time rankings
 */
export interface LeaderboardEntry {
  rank: number;
  handle: string;
  displayName: string;
  signalStrength: number;
  improvement: number;
  totalPoints: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  deliverables: number;
  avatarUrl?: string;
}

/**
 * Citation network mapping
 * Maps to "Citation Network" tab
 */
export interface CitationRelationship {
  yourHandle: string;
  citedBy: string;
  citationType: 'Mention' | 'Quote Tweet' | 'Thread Link';
  theirFollowerCount: number;
  citationUrl: string;
  date: Date;
  youCited: string[]; // Reciprocity tracking
}