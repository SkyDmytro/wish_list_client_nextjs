import {
  addFriendRequest,
  deleteFriendRequest,
} from '@/api/friendsRequests/friendsRequests';
import { UserType } from '@/types/user';
import { withToastAsync } from '@/utils/helpers';

import { SessionContextValue } from 'next-auth/react';

export const useFriendRequests = (
  user: UserType,
  authUser: SessionContextValue,
) => {
  const addFriendWithToast = withToastAsync(
    addFriendRequest,
    'Friend request sent successfully',
    'Error sending friend request',
  );

  const deleteFriendWithToast = withToastAsync(
    deleteFriendRequest,
    'Friend request deleted successfully',
    'Error deleting friend request',
  );

  const handleAddFriend = async () => {
    try {
      await addFriendWithToast(user._id, authUser?.data?.user?.token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      await deleteFriendWithToast(user._id, authUser?.data?.user?.token);
    } catch (e) {
      console.log(e);
    }
  };
  return { handleAddFriend, handleRemoveFriend };
};
