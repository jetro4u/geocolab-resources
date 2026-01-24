// src/apps/sgs/route.tsx
import { RouteObject } from 'react-router-dom';
import { ChallengeProvider } from './contexts/challenge/ChallengeProvider';
import { ParticipantProvider } from './contexts/participant/ParticipantProvider';

// Lazy load views
import { lazy, Suspense } from 'react';

const ChallengeCreatorView = lazy(() => import('./components/views/ChallengeCreatorView').then(m => ({ default: m.ChallengeCreatorView })));
const OnboardingFlow = lazy(() => import('./components/views/OnboardingFlow').then(m => ({ default: m.OnboardingFlow })));
const ParticipantDashboard = lazy(() => import('./components/views/ParticipantDashboard').then(m => ({ default: m.ParticipantDashboard })));
const LeaderboardView = lazy(() => import('./components/views/LeaderboardView').then(m => ({ default: m.LeaderboardView })));
const ProfileAuditView = lazy(() => import('./components/views/ProfileAuditView').then(m => ({ default: m.ProfileAuditView })));
const AdminPanel = lazy(() => import('./components/views/AdminPanel').then(m => ({ default: m.AdminPanel })));

// Loading component
function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>
  );
}

// Route configuration
export const sgsRoutes: RouteObject = {
  path: 'sgs',
  element: (
    <ChallengeProvider>
      <ParticipantProvider>
        <Suspense fallback={<Loading />}>
          <div className="min-h-screen bg-gray-50">
            {/* Routes will render here */}
          </div>
        </Suspense>
      </ParticipantProvider>
    </ChallengeProvider>
  ),
  children: [
    {
      index: true,
      element: <ParticipantDashboard />,
    },
    {
      path: 'onboarding',
      element: <OnboardingFlow />,
    },
    {
      path: 'create-challenge',
      element: <ChallengeCreatorView />,
    },
    {
      path: 'leaderboard',
      element: <LeaderboardView />,
    },
    {
      path: 'profile-audit',
      element: <ProfileAuditView />,
    },
    {
      path: 'admin',
      element: <AdminPanel />,
    },
  ],
};

export default sgsRoutes;