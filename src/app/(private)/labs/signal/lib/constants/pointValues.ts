// src/apps/sgs/lib/constants/pointValues.ts
export const POINT_VALUES = {
    // Basic Actions
    follow: 1,
    like: 0.5,
    comment: 3,
    repost: 2,
    bookmark: 5,
  
    // High-Quality Actions
    highQualityComment: 10, // >100 chars with insight
    thoughtfulQuoteX: 15, // >280 chars analysis
    citationReceived: 25,
  
    // Deliverables
    deliverableThread: 100, // 5+ post thread
    deliverableArticle: 150,
    deliverableCaseStudy: 200,
  
    // Profile Optimization
    profileOptimization: 50, // Implementing 3+ suggestions
    grokBonus: 50, // Content scoring >80
  
    // Network Building
    networkIntroduction: 20, // Connecting participants
    skillSwapComplete: 75,
} as const;