// src/apps/sgs/hooks/useMetricsPolling.ts
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export function useMetricsPolling(participantHandle: string, interval = 60000) {
  const { data, refetch } = useQuery({
    queryKey: ['participant-metrics', participantHandle],
    queryFn: async () => {
      const response = await fetch(`/api/sgs/metrics/${participantHandle}`);
      return response.json();
    },
    refetchInterval: interval,
  });

  return { metrics: data, refetch };
}