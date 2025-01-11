import { UserType } from '@/types/user';

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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {friends.map((friend) => (
          <div
            key={friend._id}
            className="flex items-center space-x-3 rounded-lg border border-gray-800 bg-gray-900/50 p-3"
          >
            <div className="h-10 w-10 rounded-full bg-gray-800"></div>
            <div>
              <p className="text-sm font-medium text-white">Friend</p>
              <p className="text-xs text-gray-400">{friend.name}</p>
            </div>
          </div>
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
