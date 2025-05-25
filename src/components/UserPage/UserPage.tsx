'use client';

import { UserType } from '@/types/user';
import { wishList } from '@/types/wishList';

import { useState } from 'react';

import { useSession } from 'next-auth/react';

import { useFriendRequests } from './hooks/useFriendRequests';
import { FriendActions } from './ui/FriendActions';
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
  friends: { items: UserType[]; totalFriends: number };
  wishlists: { items: wishList[]; totalWishlists: number };
}) => {
  const [user] = useState(userProps);
  const authUser = useSession();
  const { handleAddFriend, handleRemoveFriend } = useFriendRequests(
    user,
    authUser,
  );

  return (
    <div
      key="user-page"
      className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-900 to-black p-8"
    >
      <div className="w-full max-w-2xl space-y-6">
        <ProfileCard
          renderItem={() => (
            <FriendActions
              authUser={authUser}
              user={user}
              onAddFriend={handleAddFriend}
              onRemoveFriend={handleRemoveFriend}
            />
          )}
          avatar={user.avatar || ''}
          name={user.name}
          date={user.createdAt}
        />

        <StatsCard
          friendsCount={friends.totalFriends}
          wishlistsCount={wishlists.totalWishlists}
        />
        <FriendsSection friends={friends.items} user={user} />

        <WishListsSection wishlists={wishlists.items} userId={user._id} />
      </div>
    </div>
  );
};
