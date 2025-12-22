'use client';

import { FriendsResponse } from '@/entities/friends';
import { FriendsPageWidget } from '@/widgets/friends-list';

export const FriendsPage = ({
  friendsProps,
}: {
  friendsProps: FriendsResponse;
}) => {
  return <FriendsPageWidget friendsProps={friendsProps} />;
};
