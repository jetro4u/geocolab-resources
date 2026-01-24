// src/apps/sgs/lib/utils/metricsFormatters.ts
export function formatSignalScore(score: number): string {
  return `${Math.round(score)}/100`;
}

export function formatImprovement(improvement: number): string {
  const sign = improvement >= 0 ? '+' : '';
  return `${sign}${Math.round(improvement)}`;
}

export function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function formatFollowerCount(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}