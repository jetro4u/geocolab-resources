// src/apps/sgs/components/views/OnboardingFlow.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingForm } from '../forms/OnboardingForm';
import { ProgressTracker } from '../ui/ProgressTracker';
import { useParticipant } from '../../contexts/participant/useParticipant';
import type { OnboardingStep } from '../../types';

const ONBOARDING_STEPS: OnboardingStep[] = [
  { id: 'discovery', label: 'Discovery & Application', completed: false },
  { id: 'profile-analysis', label: 'Profile Analysis', completed: false },
  { id: 'onboarding-video', label: 'Onboarding Overview', completed: false },
  { id: 'community-intro', label: 'Community Introduction', completed: false },
  { id: 'action-plan', label: 'Create Action Plan', completed: false },
  { id: 'welcome-package', label: 'Welcome Package', completed: false },
];

/**
 * Multi-step onboarding flow for new participants
 * Days -7 to -1 before challenge start
 */
export function OnboardingFlow() {
  const navigate = useNavigate();
  const { enrollParticipant } = useParticipant();
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(ONBOARDING_STEPS);

  const handleStepComplete = async (stepData: any) => {
    // Mark current step as completed
    const updatedSteps = [...steps];
    updatedSteps[currentStep].completed = true;
    setSteps(updatedSteps);

    // Save step data
    await enrollParticipant(stepData);

    // Move to next step or finish
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/sgs/dashboard');
    }
  };

  const currentStepId = steps[currentStep].id;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to Signal &gt; Spam Challenge
        </h1>
        <p className="mt-2 text-gray-600">
          Complete these steps to prepare for the challenge
        </p>
      </div>

      <ProgressTracker
        steps={steps}
        currentStep={currentStep}
        className="mb-8"
      />

      <div className="bg-white rounded-lg shadow-lg p-6">
        {currentStepId === 'discovery' && (
          <OnboardingForm
            step="discovery"
            onComplete={handleStepComplete}
          />
        )}
        
        {currentStepId === 'profile-analysis' && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Analyzing your profile with Grok AI...</p>
          </div>
        )}
        
        {currentStepId === 'onboarding-video' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Watch Onboarding Video</h2>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Video Player Placeholder</p>
            </div>
            <button
              onClick={() => handleStepComplete({})}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        )}
        
        {currentStepId === 'community-intro' && (
          <OnboardingForm
            step="community-intro"
            onComplete={handleStepComplete}
          />
        )}
        
        {currentStepId === 'action-plan' && (
          <OnboardingForm
            step="action-plan"
            onComplete={handleStepComplete}
          />
        )}
        
        {currentStepId === 'welcome-package' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Welcome Package</h2>
            <div className="grid gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold">📋 Challenge Checklist</h3>
                <p className="text-sm text-gray-600">Daily tasks and milestones</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold">📚 Template Library</h3>
                <p className="text-sm text-gray-600">Grok-optimized post templates</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold">🎯 Point Tracker</h3>
                <p className="text-sm text-gray-600">Real-time score monitoring</p>
              </div>
            </div>
            <button
              onClick={() => handleStepComplete({})}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Start Challenge
            </button>
          </div>
        )}
      </div>
    </div>
  );
}