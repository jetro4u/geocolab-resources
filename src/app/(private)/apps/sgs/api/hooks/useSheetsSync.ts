import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sheetsService } from '../services/sheetsService';
import type { ParticipantProfile, ChallengeMetrics, ActionLog } from '../types/participant.types';
import type { ChallengeConfig } from '../types/challenge.types';

/**
 * Hook for syncing participant data with Google Sheets
 * Handles read/write operations for MVP storage layer
 */
export function useSheetsSync(challengeId?: string) {
  const queryClient = useQueryClient();

  // Fetch all participants for a challenge
  const { data: participants, isLoading: isLoadingParticipants } = useQuery({
    queryKey: ['participants', challengeId],
    queryFn: () => sheetsService.getParticipants(challengeId!),
    enabled: !!challengeId,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Auto-refresh every minute
  });

  // Fetch challenge configuration
  const { data: challengeConfig } = useQuery({
    queryKey: ['challenge-config', challengeId],
    queryFn: () => sheetsService.getChallengeConfig(challengeId!),
    enabled: !!challengeId,
    staleTime: 300000, // 5 minutes (config changes rarely)
  });

  // Fetch leaderboard data
  const { data: leaderboard } = useQuery({
    queryKey: ['leaderboard', challengeId],
    queryFn: () => sheetsService.getLeaderboard(challengeId!),
    enabled: !!challengeId,
    staleTime: 30000,
    refetchInterval: 60000,
  });

  // Update participant profile
  const updateParticipantMutation = useMutation({
    mutationFn: (profile: ParticipantProfile) =>
      sheetsService.updateParticipant(challengeId!, profile),
    onSuccess: () => {
      // Invalidate related queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['participants', challengeId] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard', challengeId] });
    },
  });

  // Log action (points, deliverables, etc.)
  const logActionMutation = useMutation({
    mutationFn: (action: ActionLog) =>
      sheetsService.logAction(challengeId!, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participants', challengeId] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard', challengeId] });
    },
  });

  // Batch update for performance (e.g., nightly metrics refresh)
  const batchUpdateMutation = useMutation({
    mutationFn: (updates: ParticipantProfile[]) =>
      sheetsService.batchUpdateParticipants(challengeId!, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participants', challengeId] });
    },
  });

  // Export challenge data (for archival/reporting)
  const exportChallengeMutation = useMutation({
    mutationFn: () =>
      sheetsService.exportChallengeData(challengeId!),
    onSuccess: (data) => {
      // Trigger download
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `challenge-${challengeId}-export.json`;
      a.click();
      URL.revokeObjectURL(url);
    },
  });

  return {
    // Query data
    participants,
    challengeConfig,
    leaderboard,
    isLoading: isLoadingParticipants,

    // Mutations
    updateParticipant: updateParticipantMutation.mutate,
    logAction: logActionMutation.mutate,
    batchUpdate: batchUpdateMutation.mutate,
    exportChallenge: exportChallengeMutation.mutate,

    // Mutation states
    isUpdating: updateParticipantMutation.isPending,
    isLogging: logActionMutation.isPending,
    isBatchUpdating: batchUpdateMutation.isPending,
    isExporting: exportChallengeMutation.isPending,
  };
}

/**
 * Hook for real-time sync status monitoring
 * Tracks last sync time and pending operations
 */
export function useSheetsSyncStatus(challengeId: string) {
  const { data: syncStatus } = useQuery({
    queryKey: ['sync-status', challengeId],
    queryFn: () => sheetsService.getSyncStatus(challengeId),
    staleTime: 5000, // 5 seconds
    refetchInterval: 10000, // Check every 10 seconds
  });

  return {
    lastSyncTime: syncStatus?.lastSyncTime,
    pendingOperations: syncStatus?.pendingOperations || 0,
    syncHealth: syncStatus?.health || 'healthy',
    isSyncing: syncStatus?.isSyncing || false,
  };
}

/**
 * Hook for manual sync trigger
 * Useful for "Refresh Now" buttons
 */
export function useManualSync(challengeId: string) {
  const queryClient = useQueryClient();

  const triggerSyncMutation = useMutation({
    mutationFn: () => sheetsService.triggerManualSync(challengeId),
    onSuccess: () => {
      // Invalidate all challenge-related queries
      queryClient.invalidateQueries({ queryKey: ['participants', challengeId] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard', challengeId] });
      queryClient.invalidateQueries({ queryKey: ['sync-status', challengeId] });
    },
  });

  return {
    triggerSync: triggerSyncMutation.mutate,
    isSyncing: triggerSyncMutation.isPending,
    syncError: triggerSyncMutation.error,
  };
}