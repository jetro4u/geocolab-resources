// src/apps/sgs/components/forms/ChallengeConfigForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { ChallengeConfig } from '../../types/challenge.types';

const challengeSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters'),
  niche: z.string().min(1, 'Niche is required'),
  duration: z.number().min(7).max(90),
  maxParticipants: z.number().min(10).max(1000),
  entryRequirement: z.string().optional(),
  winCondition: z.string().min(1, 'Win condition is required'),
  grokAssistance: z.object({
    profileAudits: z.boolean(),
    contentSuggestions: z.boolean(),
    performanceTracking: z.boolean(),
  }),
});

interface ChallengeConfigFormProps {
  onSubmit: (config: ChallengeConfig) => void;
  isSubmitting: boolean;
}

export function ChallengeConfigForm({ onSubmit, isSubmitting }: ChallengeConfigFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ChallengeConfig>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      duration: 14,
      maxParticipants: 100,
      grokAssistance: {
        profileAudits: true,
        contentSuggestions: true,
        performanceTracking: true,
      },
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Challenge Name *
        </label>
        <input
          {...register('name')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="30-Day AI Content Sprint"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Niche *
        </label>
        <select {...register('niche')} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
          <option value="">Select a niche...</option>
          <option value="geo">GEO Expert</option>
          <option value="ai">AI Consultant</option>
          <option value="seo">SEO Specialist</option>
          <option value="saas">SaaS Founder</option>
        </select>
        {errors.niche && (
          <p className="mt-1 text-sm text-red-600">{errors.niche.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (days)
          </label>
          <input
            type="number"
            {...register('duration', { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.duration && (
            <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Participants
          </label>
          <input
            type="number"
            {...register('maxParticipants', { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.maxParticipants && (
            <p className="mt-1 text-sm text-red-600">{errors.maxParticipants.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Grok AI Assistance
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" {...register('grokAssistance.profileAudits')} className="mr-2" />
            <span className="text-sm">Profile Audits</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" {...register('grokAssistance.contentSuggestions')} className="mr-2" />
            <span className="text-sm">Content Suggestions</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" {...register('grokAssistance.performanceTracking')} className="mr-2" />
            <span className="text-sm">Performance Tracking</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSubmitting ? 'Creating Challenge...' : 'Create Challenge'}
      </button>
    </form>
  );
}