/**
 * User-launched challenge configuration
 * Supports custom rules and parameters
 */
export interface ChallengeConfig {
  // Identity
  challengeId: string;
  challengeName: string;
  creator: {
    handle: string;
    verificationLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
    credibilityScore: number;
  };
  
  // Configuration
  niche: string; // e.g., "AI Marketing"
  duration: number; // Days
  maxParticipants: number;
  startDate: Date;
  endDate: Date;
  status: 'Draft' | 'Active' | 'Completed' | 'Cancelled';
  
  // Custom rules
  customRules: {
    entryRequirement: string;
    pointSystem: Record<string, number>; // {follows: 1, comments: 10}
    winCondition: string;
  };
  
  // Grok collaboration
  grokAssistance: {
    profileAudits: boolean;
    contentSuggestions: boolean;
    performanceTracking: boolean;
  };
  
  // GEOCoLab support package
  geoColabPackage: 'DIY' | 'Managed' | 'White-Label';
  
  // Deliverables validation
  deliverables: Array<{
    type: 'Thread' | 'Article' | 'Case Study' | 'Tool Launch';
    minQuality: number; // 0-100 Grok score
    deadline: Date;
    reward: number; // Points
  }>;
  
  // Pricing (for creator revenue sharing)
  pricing?: {
    setupFee: number;
    perParticipant: number;
    managementMonthly: number;
  };
}

/**
 * Challenge participation record
 * Links participant to challenge
 */
export interface ChallengeParticipation {
  challengeId: string;
  handle: string;
  enrolledAt: Date;
  status: 'Active' | 'Completed' | 'Dropped';
  daysActive: number;
  completionRate: number; // % deliverables done
  streakDays: number; // Consecutive active days
}

/**
 * Challenge performance metrics
 * Admin dashboard data
 */
export interface ChallengeMetrics {
  challengeId: string;
  
  // Participation health
  signUpRate: number; // % invited who joined
  completionRate: number; // % finished all deliverables
  dropOffPoints: string[]; // Where people quit
  
  // Signal quality
  avgSignalIncrease: number;
  spamIncidents: number;
  highQualityOutputs: number;
  
  // Network effects
  totalCitations: number;
  externalAmplification: number; // Non-participants sharing
  influencerNotices: number; // >10K followers engaging
  
  // Business impact (GEOCoLab)
  leadConversions: number;
  contentRepurposing: number;
  communityRetention: number; // % staying active post-challenge
  
  // Grok effectiveness
  predictionAccuracy: number;
  suggestionAdoptionRate: number;
  automationTimesSaved: number; // Hours
}

/**
 * Weekly content sprint theme
 * For collaborative content creation
 */
export interface ContentSprint {
  week: number;
  theme: string; // e.g., "AI Citation Strategies"
  challenge: {
    format: 'Thread' | 'Article' | 'Video' | 'Case Study';
    minLength: number; // 5-tweet thread minimum
    mustInclude: string[]; // ["data", "examples", "tools"]
  };
  rewards: {
    topContributor: number; // +200 points
    mostCited: number; // +150 if others link/quote you
    communityVote: number; // +100 for best peer-voted
  };
}

/**
 * Skill swap marketplace entry
 * Expertise exchange between participants
 */
export interface SkillSwap {
  offerer: string; // @handle
  skill: string; // "SEO audit"
  wants: string; // "AI chatbot setup"
  commitment: 'Quick Call' | '30-Min Session' | 'Async Review';
  completedSwaps: number;
  rating: number; // 1-5 stars
}