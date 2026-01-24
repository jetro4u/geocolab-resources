  // src/apps/sgs/components/ui/CitationNetwork.tsx
  interface CitationNetworkProps {
    citedBy: Array<{ handle: string; count: number; followers: number }>;
    citing: Array<{ handle: string; count: number }>;
  }
    
  export function CitationNetwork({ citedBy, citing }: CitationNetworkProps) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Citation Network</h3>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Cited By */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Who Cites You</h4>
            <div className="space-y-2">
              {citedBy.map((item) => (
                <div key={item.handle} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium">@{item.handle}</span>
                  <div className="text-xs text-gray-500">
                    {item.count}x • {(item.followers / 1000).toFixed(1)}K
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* You Cite */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">You Cite</h4>
            <div className="space-y-2">
              {citing.map((item) => (
                <div key={item.handle} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium">@{item.handle}</span>
                  <span className="text-xs text-gray-500">{item.count}x</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}