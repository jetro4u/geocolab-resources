// src/apps/sgs/api/models/challengeBuilder.ts
import type { 
    UserLaunchedChallenge, 
    ChallengeConfig, 
    GrokAssistance 
  } from '../types/challenge.types';
  import type { SignalSpamParticipant } from '../types/participant.types';
  
  /**
   * Build challenge configurations for user-launched challenges
   * Validates creator credentials and sets up automation
   */
  export const challengeBuilder = {
    /**
     * Create challenge from user input
     */
    async createChallenge(
      creator: SignalSpamParticipant,
      config: Partial<ChallengeConfig>
    ): Promise<UserLaunchedChallenge> {
      // Validate creator credentials
      if (creator.signalStrength < 70) {
        throw new Error('Creator must have signal strength ≥70 to launch challenges');
      }
  
      return {
        creator: {
          handle: creator.handle,
          verificationLevel: this.determineVerificationLevel(creator),
          credibilityScore: creator.signalStrength
        },
        
        config: {
          name: config.name || 'Unnamed Challenge',
          niche: config.niche || creator.primaryTopic,
          duration: config.duration || 14,
          maxParticipants: config.maxParticipants || 100,
          
          customRules: {
            entryRequirement: config.customRules?.entryRequirement || 'Post 3x/week minimum',
            pointSystem: config.customRules?.pointSystem || this.getDefaultPointSystem(),
            winCondition: config.customRules?.winCondition || 'Highest signal strength improvement'
          }
        },
        
        grokAssistance: {
          profileAudits: config.grokAssistance?.profileAudits ?? true,
          contentSuggestions: config.grokAssistance?.contentSuggestions ?? true,
          performanceTracking: config.grokAssistance?.performanceTracking ?? true
        },
        
        geoColabPackage: config.geoColabPackage || 'DIY',
        
        deliverables: config.deliverables || [
          {
            type: 'Thread',
            minQuality: 70,
            deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            reward: 100
          }
        ]
      };
    },
  
  /**
   * Validate challenge configuration
   */
  validateChallenge(challenge: UserLaunchedChallenge): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    if (challenge.config.duration < 7 || challenge.config.duration > 90) {
      errors.push('Duration must be between 7 and 90 days');
    }
    
    if (challenge.config.maxParticipants < 10 || challenge.config.maxParticipants > 1000) {
      errors.push('Max participants must be between 10 and 1000');
    }
    
    if (!challenge.config.name || challenge.config.name.length < 5) {
      errors.push('Challenge name must be at least 5 characters');
    }
    
    if (challenge.creator.credibilityScore < 70 && challenge.geoColabPackage === 'DIY') {
      errors.push('Credibility score must be ≥70 to launch DIY challenge');
    }
    
    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Determine creator verification level based on metrics
   */
  determineVerificationLevel(
    creator: SignalSpamParticipant
  ): 'Bronze' | 'Silver' | 'Gold' | 'Platinum' {
    const score = creator.signalStrength;
    if (score >= 90) return 'Platinum';
    if (score >= 80) return 'Gold';
    if (score >= 70) return 'Silver';
    return 'Bronze';
  },

  /**
   * Default point system for new challenges
   */
  getDefaultPointSystem(): Record<string, number> {
    return {
      follow: 1,
      like: 0.5,
      comment: 3,
      highQualityComment: 10,
      repost: 2,
      bookmark: 5,
      citationReceived: 25,
      deliverableThread: 100,
      deliverableArticle: 150,
      deliverableCaseStudy: 200,
      profileOptimization: 50,
      grokBonus: 50,
    };
  },

  /**
   * Generate challenge templates for quick setup
   */
  getChallengeTemplates(): Array<{
    name: string;
    description: string;
    config: Partial<ChallengeConfig>;
  }> {
    return [
      {
        name: '14-Day Content Sprint',
        description: 'Build authority through consistent high-quality content',
        config: {
          duration: 14,
          niche: 'AI Marketing',
          customRules: {
            entryRequirement: 'Post daily + 5 high-quality comments',
            pointSystem: {
              post: 5,
              highQualityComment: 10,
              thread: 25,
              citationReceived: 50
            },
            winCondition: 'Most citations received'
          },
          deliverables: [
            { type: 'Thread', minQuality: 80, reward: 150, deadline: new Date() },
            { type: 'Case Study', minQuality: 85, reward: 200, deadline: new Date() }
          ]
        }
      },
      {
        name: 'Niche Authority Builder',
        description: 'Establish expertise in a specific niche',
        config: {
          duration: 30,
          customRules: {
            entryRequirement: 'All content must be on-niche',
            pointSystem: {
              onNichePost: 10,
              offNichePost: -5,
              thoughtLeadershipPost: 25,
              expertCitation: 75
            },
            winCondition: 'Highest niche purity + authority score'
          },
          grokAssistance: {
            profileAudits: true,
            contentSuggestions: true,
            performanceTracking: true
          }
        }
      }
    ];
  },
  
  /**
   * Calculate challenge progress
   */
  calculateProgress(
    deliverables: UserLaunchedChallenge['deliverables'],
    completed: number
  ): number {
    return deliverables.length > 0 
      ? (completed / deliverables.length) * 100 
      : 0;
  }
};