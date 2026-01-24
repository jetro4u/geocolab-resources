// src/apps/sgs/contexts/participant/ParticipantContext.ts
import { createContext } from 'react';
import type { SignalSpamParticipant } from '../../types/participant.types';
import type { ChallengeMetrics } from '../../types/challenge.types';

export interface ParticipantContextValue {
  participant: SignalSpamParticipant | null;
  challengeMetrics: ChallengeMetrics | null;
  isLoading: boolean;
  enrollParticipant: (data: any) => Promise<void>;
  updateProfile: (updates: Partial<SignalSpamParticipant>) => Promise<void>;
}

export const ParticipantContext = createContext<ParticipantContextValue | undefined>(undefined);