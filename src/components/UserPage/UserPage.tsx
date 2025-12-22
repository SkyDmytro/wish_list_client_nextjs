'use client';

import { User, UserType } from '@/entities/user/types/user';
import { FriendActions } from '@/features/friends';
import { wishList } from '@/types/wishList';
import { FriendsList } from '@/widgets/friends-list';

import { useState } from 'react';

import { User as SupabaseUser } from '@supabase/supabase-js';

import { ProfileCard } from './ui/ProfileCard';
import { StatsCard } from './ui/StatsCard';
import { WishListsSection } from './ui/WishListsSection';

export const UserPage = ({
  userProps,
  sessionUser,
  friends,
  wishlists,
}: {
  userProps: UserType;
  sessionUser: SupabaseUser | null;
  friends: { items: User[]; totalFriends: number };
  wishlists: { items: wishList[]; totalWishlists: number };
}) => {
  const [user] = useState(userProps);

  return (
    <div className="flex flex-col w-full gap-6 max-w-[70%] mx-auto">
      <ProfileCard
        renderItem={() => <FriendActions authUser={sessionUser} user={user} />}
        avatar={user.avatar || ''}
        name={user.name}
        date={user.created_at}
      />

      <StatsCard
        friendsCount={friends.totalFriends}
        wishlistsCount={wishlists.totalWishlists}
      />
      <FriendsList friends={friends.items} userId={user.id} />

      <WishListsSection wishlists={wishlists.items} userId={user.id} />
    </div>
  );
};
