import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { FriendPageHeaderActions } from '../types/ui';

export const FriendsPageHeader = ({
  actions,
}: {
  actions: FriendPageHeaderActions;
}) => {
  return (
    <div className="flex justify-between container mx-auto">
      {actions.map((action, idx) => (
        <Button
          key={idx}
          className={cn(
            'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300 rounded-full',
            action.isActive && 'bg-slate-500 text-white',
          )}
          onClick={action.onClick}
        >
          {action.name}
        </Button>
      ))}
    </div>
  );
};
