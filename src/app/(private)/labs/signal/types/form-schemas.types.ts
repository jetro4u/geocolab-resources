// src/apps/sgs/types/form-schemas.types.ts
import { z } from 'zod';

export const onboardingSchema = z.object({
  handle: z.string().min(1, 'Handle is required').regex(/^@?[a-zA-Z0-9_]+$/, 'Invalid handle format'),
  email: z.string().email('Invalid email'),
  niche: z.string().min(1, 'Niche is required'),
  goals: z.string().optional(),
});

export const actionPlanSchema = z.object({
  postsPerWeek: z.number().min(3, 'Minimum 3 posts per week'),
  commentsPerDay: z.number().min(5, 'Minimum 5 comments per day'),
  threadsPerWeek: z.number().min(1, 'Minimum 1 thread per week'),
  quoteXsPerWeek: z.number().min(2, 'Minimum 2 quote posts per week'),
  contentThemes: z.array(z.string()).min(1, 'Select at least 1 theme'),
  streakGoal: z.number().min(7, 'Minimum 7-day streak'),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
export type ActionPlanFormData = z.infer<typeof actionPlanSchema>;