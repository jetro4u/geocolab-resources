// src/apps/sgs/components/ui/ProfileBadge.tsx
interface ProfileBadgeProps {
    handle: string;
    accountType: 'Premium' | 'Premium+' | 'Free';
    niche: string;
  }
  
  export function ProfileBadge({ handle, accountType, niche }: ProfileBadgeProps) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          {handle.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">@{handle}</span>
            {accountType !== 'Free' && (
              <span className={`text-xs ${
                accountType === 'Premium+' ? 'text-yellow-600' : 'text-blue-600'
              }`}>
                âœ"
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500">{niche}</div>
        </div>
      </div>
    );
}