// src/apps/sgs/contexts/challenge/useChallengeContext.ts
import { useContext } from 'react';
import { ChallengeContext } from './ChallengeContext';

export function useChallengeContext() {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallengeContext must be used within ChallengeProvider');
  }
  return context;
}