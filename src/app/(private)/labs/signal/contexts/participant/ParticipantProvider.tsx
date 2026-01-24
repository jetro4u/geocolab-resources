// src/apps/sgs/contexts/participant/ParticipantProvider.tsx
import { useState, useEffect, ReactNode } from 'react';
import { ParticipantContext } from './ParticipantContext';
import type { SignalSpamParticipant } from '../../types/participant.types';
import type { ChallengeMetrics } from '../../types/challenge.types';

interface ParticipantProviderProps {
  children: ReactNode;
}

export function ParticipantProvider({ children }: ParticipantProviderProps) {
  const [participant, setParticipant] = useState<SignalSpamParticipant | null>(null);
  const [challengeMetrics, setChallengeMetrics] = useState<ChallengeMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadParticipant();
  }, []);

  const loadParticipant = async () => {
    try {
      const response = await fetch('/api/sgs/participant/me');
      const data = await response.json();
      setParticipant(data.participant);
      setChallengeMetrics(data.metrics);
    } catch (error) {
      console.error('Failed to load participant:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const enrollParticipant = async (data: any) => {
    const response = await fetch('/api/sgs/participant/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      await loadParticipant();
    }
  };

  const updateProfile = async (updates: Partial<SignalSpamParticipant>) => {
    const response = await fetch('/api/sgs/participant/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      await loadParticipant();
    }
  };

  return (
    <ParticipantContext.Provider
      value={{
        participant,
        challengeMetrics,
        isLoading,
        enrollParticipant,
        updateProfile,
      }}
    >
      {children}
    </ParticipantContext.Provider>
  );
}