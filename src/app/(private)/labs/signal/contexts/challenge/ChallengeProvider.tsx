// src/apps/sgs/contexts/challenge/ChallengeProvider.tsx
import { useState, useEffect, ReactNode } from 'react';
import { ChallengeContext } from './ChallengeContext';
import { ChallengeBuilder } from '../../api/models/challengeBuilder';
import type { UserLaunchedChallenge, ChallengeConfig } from '../../types/challenge.types';

interface ChallengeProviderProps {
  children: ReactNode;
}

export function ChallengeProvider({ children }: ChallengeProviderProps) {
  const [activeChallenges, setActiveChallenges] = useState<UserLaunchedChallenge[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<UserLaunchedChallenge | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load active challenges on mount
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      const response = await fetch('/api/sgs/challenges');
      const data = await response.json();
      setActiveChallenges(data);
    } catch (error) {
      console.error('Failed to load challenges:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createChallenge = async (config: ChallengeConfig): Promise<UserLaunchedChallenge> => {
    const response = await fetch('/api/sgs/challenges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error('Failed to create challenge');
    }

    const challenge = await response.json();
    setActiveChallenges(prev => [...prev, challenge]);
    return challenge;
  };

  const joinChallenge = async (challengeId: string) => {
    await fetch(`/api/sgs/challenges/${challengeId}/join`, { method: 'POST' });
    await loadChallenges();
  };

  const leaveChallenge = async (challengeId: string) => {
    await fetch(`/api/sgs/challenges/${challengeId}/leave`, { method: 'POST' });
    await loadChallenges();
  };

  return (
    <ChallengeContext.Provider
      value={{
        activeChallenges,
        currentChallenge,
        isLoading,
        createChallenge,
        joinChallenge,
        leaveChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}