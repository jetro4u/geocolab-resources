// src/apps/sgs/contexts/participant/useParticipant.ts
import { useContext } from 'react';
import { ParticipantContext } from './ParticipantContext';

export function useParticipant() {
  const context = useContext(ParticipantContext);
  if (!context) {
    throw new Error('useParticipant must be used within ParticipantProvider');
  }
  return context;
}