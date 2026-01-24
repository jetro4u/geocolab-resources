// src/apps/sgs/components/ui/ProgressTracker.tsx
interface Step {
    id: string;
    label: string;
    completed: boolean;
}

interface ProgressTrackerProps {
    steps: Step[];
    currentStep: number;
    className?: string;
}
  
export function ProgressTracker({ steps, currentStep, className = '' }: ProgressTrackerProps) {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step.completed ? 'bg-green-600 text-white' :
                index === currentStep ? 'bg-blue-600 text-white' :
                'bg-gray-300 text-gray-600'
              }`}>
                {step.completed ? 'âœ"' : index + 1}
              </div>
              <span className="text-xs text-gray-600 mt-2 text-center max-w-[100px]">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-1 w-16 mx-2 ${
                step.completed ? 'bg-green-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
    );
}