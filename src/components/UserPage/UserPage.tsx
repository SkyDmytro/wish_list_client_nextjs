'use client';

import { UserType } from '@/types/user';
import { wishList } from '@/types/wishList';

import { useState } from 'react';

import { Gift, Users } from 'lucide-react';
import Link from 'next/link';

export const UserPage = ({
  userProps,
  friends,
  wishlists,
}: {
  userProps: UserType;
  friends: UserType[];
  wishlists: wishList[];
}) => {
  const [user] = useState(userProps);

  return (
    <div
      key="user-page"
      className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-900 to-black p-8"
    >
      <div className="w-full max-w-2xl space-y-6">
        {/* Profile Card */}
        <div className="rounded-lg border border-gray-800 bg-black/50 p-6 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-gray-800"></div>
            <div>
              <h2 className="text-xl font-semibold text-white">{user.name}</h2>
              <p className="text-gray-400">
                Member since {new Date(user.createdAt).getFullYear()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-800 bg-black/50 p-4 text-center backdrop-blur-sm">
            <Users className="mx-auto h-6 w-6 text-blue-400" />
            <p className="mt-2 text-2xl font-bold text-white">
              {friends.length}
            </p>
            <p className="text-sm text-gray-400">Friends</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-black/50 p-4 text-center backdrop-blur-sm">
            <Gift className="mx-auto h-6 w-6 text-purple-400" />
            <p className="mt-2 text-2xl font-bold text-white">
              {wishlists.length}
            </p>
            <p className="text-sm text-gray-400">Wishlists</p>
          </div>
          {/* <div className="rounded-lg border border-gray-800 bg-black/50 p-4 text-center backdrop-blur-sm">
            <Star className="mx-auto h-6 w-6 text-yellow-400" />
            <p className="mt-2 text-2xl font-bold text-white">156</p>
            <p className="text-sm text-gray-400">Favorites</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-black/50 p-4 text-center backdrop-blur-sm">
            <Calendar className="mx-auto h-6 w-6 text-green-400" />
            <p className="mt-2 text-2xl font-bold text-white">12</p>
            <p className="text-sm text-gray-400">Events</p>
          </div> */}
        </div>

        {/* Friends Section */}
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
                  <p className="text-sm font-medium text-white">
                    Friend {friend.name}
                  </p>
                  <p className="text-xs text-gray-400">2 mutual friends</p>
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

        {/* Wishlists Section */}
        <div className="rounded-lg border border-gray-800 bg-black/50 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-semibold text-white">Wishlists</h3>
          {wishlists.length === 0 && (
            <p className="text-gray-400">User has no wishlists yet.</p>
          )}
          <div className="space-y-3">
            {wishlists.map((list) => (
              <div
                key={list._id}
                className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/50 p-4"
              >
                <div className="flex items-center space-x-3">
                  <Gift className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Wishlist</p>
                    <p className="text-xs text-gray-400">{list.title}</p>
                  </div>
                </div>
                <button className="rounded-lg bg-purple-500 px-3 py-1 text-xs font-medium text-white hover:bg-purple-600">
                  View
                </button>
              </div>
            ))}
          </div>
          {wishlists.length > 0 && (
            <Link href={`/users/${user._id}/wishlists`}>
              <button className="mt-4 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
                View All Wishlists
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
