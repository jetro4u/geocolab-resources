// src/apps/sgs/hooks/useChallengeTiming.ts
import { useState, useEffect } from 'react';

export function useChallengeTiming(startDate: Date, duration: number) {
  const [currentDay, setCurrentDay] = useState(0);
  const [daysRemaining, setDaysRemaining] = useState(duration);

  useEffect(() => {
    const calculateDays = () => {
      const now = new Date();
      const start = new Date(startDate);
      const diffTime = now.getTime() - start.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      setCurrentDay(Math.max(0, diffDays));
      setDaysRemaining(Math.max(0, duration - diffDays));
    };

    calculateDays();
    const interval = setInterval(calculateDays, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [startDate, duration]);

  return {
    currentDay,
    daysRemaining,
    isActive: daysRemaining > 0,
    percentComplete: (currentDay / duration) * 100,
  };
}