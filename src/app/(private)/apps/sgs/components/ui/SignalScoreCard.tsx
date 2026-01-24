// src/apps/sgs/components/ui/SignalScoreCard.tsx
interface SignalScoreCardProps {
  score: number;
  improvement: number;
  rank?: number;
  tier?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

export function SignalScoreCard({ score, improvement, rank, tier }: SignalScoreCardProps) {
  const getTierColor = (tier?: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Silver': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-orange-100 text-orange-800 border-orange-300';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Signal Strength</h3>
        <div className="text-6xl font-bold text-blue-600 mb-2">{score}</div>
        <div className="flex items-center justify-center gap-2">
          <span className={`text-sm ${improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {improvement >= 0 ? '↑' : '↓'} {Math.abs(improvement)}
          </span>
          <span className="text-sm text-gray-500">vs baseline</span>
        </div>
      </div>

      {rank && (
        <div className="text-center mb-4">
          <span className="text-2xl font-bold text-gray-900">#{rank}</span>
          <span className="text-sm text-gray-500 ml-2">Rank</span>
        </div>
      )}

      {tier && (
        <div className="flex justify-center">
          <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getTierColor(tier)}`}>
            {tier} Tier
          </span>
        </div>
      )}
    </div>
  );
}


  
  
  

