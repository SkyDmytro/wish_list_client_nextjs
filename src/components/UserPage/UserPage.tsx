'use client';

import { UserType } from '@/types/user';

import { useState } from 'react';

import { Calendar, Gift, Star, Users } from 'lucide-react';

export const UserPage = ({ userProps }: { userProps: UserType }) => {
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-gray-800 bg-black/50 p-4 text-center backdrop-blur-sm">
            <Users className="mx-auto h-6 w-6 text-blue-400" />
            <p className="mt-2 text-2xl font-bold text-white">128</p>
            <p className="text-sm text-gray-400">Friends</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-black/50 p-4 text-center backdrop-blur-sm">
            <Gift className="mx-auto h-6 w-6 text-purple-400" />
            <p className="mt-2 text-2xl font-bold text-white">24</p>
            <p className="text-sm text-gray-400">Wishlists</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-black/50 p-4 text-center backdrop-blur-sm">
            <Star className="mx-auto h-6 w-6 text-yellow-400" />
            <p className="mt-2 text-2xl font-bold text-white">156</p>
            <p className="text-sm text-gray-400">Favorites</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-black/50 p-4 text-center backdrop-blur-sm">
            <Calendar className="mx-auto h-6 w-6 text-green-400" />
            <p className="mt-2 text-2xl font-bold text-white">12</p>
            <p className="text-sm text-gray-400">Events</p>
          </div>
        </div>

        {/* Friends Section */}
        <div className="rounded-lg border border-gray-800 bg-black/50 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-semibold text-white">Friends</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((friend) => (
              <div
                key={friend}
                className="flex items-center space-x-3 rounded-lg border border-gray-800 bg-gray-900/50 p-3"
              >
                <div className="h-10 w-10 rounded-full bg-gray-800"></div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Friend {friend}
                  </p>
                  <p className="text-xs text-gray-400">2 mutual friends</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
            View All Friends
          </button>
        </div>

        {/* Wishlists Section */}
        <div className="rounded-lg border border-gray-800 bg-black/50 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-semibold text-white">Wishlists</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((list) => (
              <div
                key={list}
                className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/50 p-4"
              >
                <div className="flex items-center space-x-3">
                  <Gift className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      Wishlist {list}
                    </p>
                    <p className="text-xs text-gray-400">12 items</p>
                  </div>
                </div>
                <button className="rounded-lg bg-purple-500 px-3 py-1 text-xs font-medium text-white hover:bg-purple-600">
                  View
                </button>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
            View All Wishlists
          </button>
        </div>
      </div>
    </div>
  );
};
