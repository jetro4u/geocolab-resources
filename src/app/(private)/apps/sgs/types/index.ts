// src/apps/sgs/types/ui-state.types.ts
export interface OnboardingStep {
    id: string;
    label: string;
    completed: boolean;
  }
  
  export interface LeaderboardEntry {
    handle: string;
    accountType: 'Premium' | 'Premium+' | 'Free';
    niche: string;
    rank: number;
    signalStrength: number;
    improvement: number;
    points: number;
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  }
  
  export interface ProfileAudit {
    bioAudit: {
      clarityScore: number;
      keywordDensity: number;
      ctaPresence: boolean;
      suggestions: string[];
    };
    contentAudit: {
      topicCoherence: Array<{ date: string; value: number }>;
      gapAnalysis: string[];
    };
    networkAudit: {
      followerQuality: number;
      influencerConnections: number;
      mutualEngagement: number;
    };
}