import { UserType } from '@/types/user';

import { ReactNode } from 'react';

import { UserIcon } from 'lucide-react';

export const Friends = ({
  friends,
  actions,
}: {
  friends: UserType[];
  actions: (friend: UserType) => ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2 ">
      {friends.length === 0 && (
        <span className="mx-auto">There is nothing here</span>
      )}
      {friends.map((friend) => (
        <div
          className="sm:w-1/2 md:w-1/3 mx-auto h-10 flex items-center justify-between bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300 rounded-full"
          key={friend._id}
        >
          <div className="flex">
            <UserIcon className="w-6 h-6 mx-2" />
            <span className="text-lg">{friend.name}</span>
          </div>
          <div className="flex mr-2">{actions(friend)}</div>
        </div>
      ))}
    </div>
  );
};
