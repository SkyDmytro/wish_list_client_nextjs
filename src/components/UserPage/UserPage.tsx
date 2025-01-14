'use client';

import { UserType } from '@/types/user';
import { wishList } from '@/types/wishList';

import { useState } from 'react';

import { FriendsSection } from './ui/FriendsSection';
import { ProfileCard } from './ui/ProfileCard';
import { StatsCard } from './ui/StatsCard';
import { WishListsSection } from './ui/WishListsSection';

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
        <ProfileCard
          avatar={user.avatar || ''}
          name={user.name}
          date={user.createdAt}
        />

        <StatsCard
          friendsCount={friends.length}
          wishlistsCount={wishlists.length}
        />
        <FriendsSection friends={friends} user={user} />

        <WishListsSection wishlists={wishlists} userId={user._id} />
      </div>
    </div>
  );
};
