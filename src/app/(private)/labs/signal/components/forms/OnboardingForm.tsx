// src/apps/sgs/components/forms/OnboardingForm.tsx
import { useForm } from 'react-hook-form';

interface OnboardingFormProps {
  step: 'discovery' | 'community-intro' | 'action-plan';
  onComplete: (data: any) => void;
}

export function OnboardingForm({ step, onComplete }: OnboardingFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  if (step === 'discovery') {
    return (
      <form onSubmit={handleSubmit(onComplete)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            X Handle *
          </label>
          <input
            {...register('handle', { required: 'Handle is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="@username"
          />
          {errors.handle && (
            <p className="mt-1 text-sm text-red-600">{errors.handle.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Niche *
          </label>
          <select {...register('niche', { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
            <option value="">Select...</option>
            <option value="geo">GEO Expert</option>
            <option value="ai">AI Consultant</option>
            <option value="seo">SEO Specialist</option>
            <option value="saas">SaaS Founder</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Submit Application
        </button>
      </form>
    );
  }

  if (step === 'community-intro') {
    return (
      <form onSubmit={handleSubmit(onComplete)} className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-800">
            Post your intro using this template in the community thread
          </p>
        </div>

        <textarea
          {...register('intro')}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="🏷️ Handle: @yourhandle
🎯 Niche: [Your expertise]
🎨 What I post about: [1-sentence summary]
✅ Verified: [Premium/Premium+]
🏆 Challenge Goal: [Why you joined]"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          I've Posted My Intro
        </button>
      </form>
    );
  }

  // action-plan step
  return (
    <form onSubmit={handleSubmit(onComplete)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Posts Per Week
        </label>
        <input
          type="number"
          {...register('postsPerWeek', { min: 3 })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          defaultValue={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Comments Per Day
        </label>
        <input
          type="number"
          {...register('commentsPerDay', { min: 5 })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          defaultValue={5}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Save Action Plan
      </button>
    </form>
  );
}