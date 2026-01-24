// src/apps/sgs/components/ui/ActionLog.tsx
export interface ActionLogProps {
  actions: Array<{
    timestamp: string;
    type: string;
    description: string;
    points: number;
  }>;
  maxItems?: number;
}
  
export function ActionLog({ actions, maxItems = 10 }: ActionLogProps) {
    const displayActions = actions.slice(0, maxItems);
  
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {displayActions.map((action, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{action.type}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(action.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
              <div className="text-sm font-semibold text-blue-600">
                +{action.points}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}