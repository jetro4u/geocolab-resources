// src/apps/sgs/components/views/ChallengeCreatorView.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChallengeConfigForm } from '../forms/ChallengeConfigForm';
import { useChallengeContext } from '../../contexts/challenge/useChallengeContext';
import type { ChallengeConfig } from '../../types/challenge.types';

/**
 * User-launched challenge creation interface
 * Allows credible users (score ≥70) to create custom challenges
 */
export function ChallengeCreatorView() {
  const navigate = useNavigate();
  const { createChallenge } = useChallengeContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (config: ChallengeConfig) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const challenge = await createChallenge(config);
      navigate(`/sgs/challenges/${challenge.challengeId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create challenge');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Launch Your Signal {'>'} Spam Challenge
        </h1>
        <p className="mt-2 text-gray-600">
          Create a custom challenge for your community. Requires credibility score ≥70.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <ChallengeConfigForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}