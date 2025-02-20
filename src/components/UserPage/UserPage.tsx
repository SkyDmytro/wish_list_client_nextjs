'use client';

import { UserType } from '@/types/user';
import { wishList } from '@/types/wishList';

import { useCallback, useState } from 'react';

import { UserPlus } from 'lucide-react';
import { Session } from 'next-auth';
import { SessionContextValue, useSession } from 'next-auth/react';

import { Button } from '../ui/button';
import { FriendsSection } from './ui/FriendsSection';
import { ProfileCard } from './ui/ProfileCard';
import { StatsCard } from './ui/StatsCard';
import { WishListsSection } from './ui/WishListsSection';

type isFriendsType = 'friends' | 'not-friends' | null;
const isFriends = (
  authUser: SessionContextValue | null,
  currentUser: UserType,
): isFriendsType => {
  if (!authUser) {
    return null;
  }
  if (authUser.status === 'loading') return null;
  if (authUser.status === 'unauthenticated') return null;
  if (authUser.data?.user?._id === currentUser._id) return null;

  const isFriend = currentUser.friends.some((friend) => {
    return friend._id === authUser.data?.user?._id;
  });
  if (isFriend) return 'friends';
  return 'not-friends';
};

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
  const handleAddFriend = () => {
    console.log('add friend');
  };

  const handleRemoveFriend = () => {
    console.log('remove friend');
  };

  const getRenderedItem = useCallback(() => {
    const isFriend = isFriends(authUser, user);
    if (isFriend === 'friends') {
      return (
        <Button
          onClick={handleAddFriend}
          variant="ghost"
          className="rounded-lg border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700  hover:text-white"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Delete Friend
        </Button>
      );
    } else if (isFriend === 'not-friends') {
      return (
        <Button
          onClick={handleRemoveFriend}
          variant="ghost"
          className="rounded-lg border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700  hover:text-white"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add Friend
        </Button>
      );
    }
    return null;
  }, [authUser, user]);

  return (
    <div
      key="user-page"
      className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-900 to-black p-8"
    >
      <div className="w-full max-w-2xl space-y-6">
        <ProfileCard
          renderItem={getRenderedItem}
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
