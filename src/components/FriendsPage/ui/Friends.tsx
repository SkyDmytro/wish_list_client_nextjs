import { User, UserType } from '@/entities/user/types/user';

import { ReactNode } from 'react';

import { UserIcon } from 'lucide-react';
import Link from 'next/link';

export const Friends = ({
  friends,
}: {
  friends: User[];
  actions: (friend: UserType) => ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2 ">
      {friends.length === 0 && (
        <span className="mx-auto">There is nothing here</span>
      )}
      {friends.map((friend) => {
        const friendId = friend.id || '';
        return (
          <Link href={`/users/${friendId}`} key={friendId}>
            <div
              className="sm:w-1/2 md:w-1/3 mx-auto p-2 flex items-center justify-between bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300 rounded-full"
              key={friendId}
            >
              <div className="flex">
                <UserIcon className="w-6 h-6 mx-2" />
                <span className="text-lg">{friend.name}</span>
              </div>
              {/* <div className="flex mr-2">{actions(friend as UserType)}</div> */}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
