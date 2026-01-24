// src/apps/sgs/contexts/challenge/ChallengeContext.ts
import { createContext } from 'react';
import type { UserLaunchedChallenge, ChallengeConfig } from '../../types/challenge.types';

export interface ChallengeContextValue {
  activeChallenges: UserLaunchedChallenge[];
  currentChallenge: UserLaunchedChallenge | null;
  isLoading: boolean;
  createChallenge: (config: ChallengeConfig) => Promise<UserLaunchedChallenge>;
  joinChallenge: (challengeId: string) => Promise<void>;
  leaveChallenge: (challengeId: string) => Promise<void>;
}

export const ChallengeContext = createContext<ChallengeContextValue | undefined>(undefined);