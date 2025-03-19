import { UserType } from '@/types/user';

import { SessionContextValue } from 'next-auth/react';

type isFriendsType =
  | 'friends'
  | 'not-friends'
  | 'request-sent'
  | 'request-received'
  | null;
export const isFriends = (
  authUser: SessionContextValue,
  currentUser: UserType,
): isFriendsType => {
  if (!authUser) {
    return null;
  }
  console.log(currentUser);
  if (authUser.status === 'loading') return null;
  if (authUser.status === 'unauthenticated') return null;
  if (authUser.data?.user?._id === currentUser._id) return null;

  const isFriend = currentUser.friends.includes(authUser.data?.user?._id || '');
  if (isFriend) return 'friends';
  if (currentUser.friendsRequestsSent.includes(authUser.data?.user?._id || ''))
    return 'request-received';
  if (
    currentUser.friendsRequestsReceived.includes(authUser.data?.user?._id || '')
  )
    return 'request-sent';

  return 'not-friends';
};
