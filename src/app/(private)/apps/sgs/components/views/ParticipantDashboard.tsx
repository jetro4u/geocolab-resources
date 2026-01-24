// src/apps/sgs/components/views/ParticipantDashboard.tsx
import { useParticipant } from '../../contexts/participant/useParticipant';
import { SignalScoreCard } from '../ui/SignalScoreCard';
import { MetricsChart } from '../ui/MetricsChart';
import { ActionLog } from '../ui/ActionLog';
import { ProgressTracker } from '../ui/ProgressTracker';

/**
 * Individual participant dashboard
 * Shows real-time metrics, points, and challenge progress
 */
export function ParticipantDashboard() {
  const { participant, challengeMetrics, isLoading } = useParticipant();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!participant) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">No participant data found. Please complete onboarding.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, @{participant.handle}
        </h1>
        <p className="text-gray-600">
          {challengeMetrics?.daysActive || 0} days active • Rank #{challengeMetrics?.rank || 0}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Signal Score */}
        <div className="lg:col-span-1">
          <SignalScoreCard
            score={participant.signalStrength}
            improvement={challengeMetrics?.improvement || 0}
            rank={challengeMetrics?.rank}
            tier={challengeMetrics?.tier}
          />
        </div>

        {/* Middle Column - Metrics */}
        <div className="lg:col-span-2 space-y-6">
          <MetricsChart
            data={challengeMetrics?.signalHistory || []}
            title="Signal Strength Trend"
          />
          
          <ProgressTracker
            steps={challengeMetrics?.milestones || []}
            currentStep={challengeMetrics?.currentMilestone || 0}
          />
        </div>
      </div>

      {/* Bottom Section - Activity Log */}
      <div className="mt-6">
        <ActionLog
          actions={challengeMetrics?.recentActions || []}
          maxItems={10}
        />
      </div>
    </div>
  );
}