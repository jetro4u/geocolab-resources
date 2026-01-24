// src/apps/sgs/components/forms/ActionPlanForm.tsx
import { useForm } from 'react-hook-form';

interface ActionPlanData {
  postsPerWeek: number;
  commentsPerDay: number;
  threadsPerWeek: number;
  quoteXsPerWeek: number;
  contentThemes: string[];
  streakGoal: number;
}

interface ActionPlanFormProps {
  onSubmit: (data: ActionPlanData) => void;
}

export function ActionPlanForm({ onSubmit }: ActionPlanFormProps) {
    const { register, handleSubmit } = useForm<ActionPlanData>({
      defaultValues: {
        postsPerWeek: 3,
        commentsPerDay: 5,
        threadsPerWeek: 1,
        quoteXsPerWeek: 2,
        streakGoal: 14,
      },
    });
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posts Per Week (min 3)
            </label>
            <input
              type="number"
              {...register('postsPerWeek', { min: 3 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comments Per Day (min 5)
            </label>
            <input
              type="number"
              {...register('commentsPerDay', { min: 5 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
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