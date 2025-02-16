import { UserType } from '@/types/user';

import { User2Icon } from 'lucide-react';
import Link from 'next/link';

export const FriendsSection = ({
  friends,
  user,
}: {
  friends: UserType[];
  user: UserType;
}) => {
  return (
    <div className="rounded-lg border border-gray-800 bg-black/50 p-6 backdrop-blur-sm">
      <h3 className="mb-4 text-lg font-semibold text-white">Friends</h3>
      {friends.length === 0 && (
        <p className="text-gray-400">User has no friends yet.</p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3">
        {friends.map((friend) => (
          <Link key={friend._id} href={`/users/${friend._id}`}>
            <div
              key={friend._id}
              className="flex items-center space-x-3 rounded-lg border border-gray-800 bg-gray-900/50 p-3"
            >
              <div className="sm:h-5 sm:w-5 md:h-10 md:w-10 rounded-full bg-gray-800  overflow-hidden">
                <User2Icon className="w-full h-full" color="gray" />
              </div>
              <div>
                <p className=" md:flex text-sm font-medium text-white">
                  Friend
                </p>
                <p className="text-xs text-gray-400">{friend.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {friends.length > 0 && (
        <Link href={`/users/${user._id}/friends`}>
          <button className="mt-4 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
            View All Friends
          </button>
        </Link>
      )}
    </div>
  );
};
