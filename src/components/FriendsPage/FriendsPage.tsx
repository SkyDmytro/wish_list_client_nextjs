'use client';

import { FriendResponse, UserType } from '@/types/user';

import { useCallback, useMemo, useState } from 'react';

import { Plus, X } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Button } from '../ui/button';
import { FriendPageHeaderActions } from './types/ui';
import { Friends } from './ui/Friends';
import { FriendsPageHeader } from './ui/FriendsPageHeader';
import { addFriendWithToast, deleteFriendWithToast } from './utils/helpers';

export const FriendsPage = ({
  friendsProps,
}: {
  friendsProps: FriendResponse;
}) => {
  const authUser = useSession();
  const [friends, setFriends] = useState(friendsProps.items.friends);
  const [currentList, setCurrentList] = useState<
    'friends' | 'recieved' | 'sent'
  >('friends');

  const handleAddFriend = useCallback(
    (friendId: string) => async () => {
      try {
        await addFriendWithToast(friendId, authUser.data?.user.token);
      } catch (e) {
        console.log(e);
      }
    },
    [authUser.data?.user.token],
  );

  const handleDeleteFriend = useCallback(
    (friendId: string) => async () => {
      try {
        await deleteFriendWithToast(friendId, authUser.data?.user.token);
      } catch (e) {
        console.log(e);
      }
    },
    [authUser.data?.user.token],
  );

  const getActions = useCallback(
    (friend: UserType) => {
      return (
        <>
          {currentList === 'recieved' && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handleAddFriend(friend._id)}
            >
              <Plus />
            </Button>
          )}
          <Button
            onClick={handleDeleteFriend(friend._id)}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <X />
          </Button>
        </>
      );
    },
    [currentList, handleAddFriend, handleDeleteFriend],
  );

  const headerActions: FriendPageHeaderActions = useMemo(
    () => [
      {
        name: 'Friends',
        isActive: currentList === 'friends',
        onClick: () => {
          setCurrentList('friends');
          setFriends(friendsProps.items.friends);
        },
      },
      {
        name: 'Requests Received',

        isActive: currentList === 'recieved',
        onClick: () => {
          setCurrentList('recieved');
          setFriends(friendsProps.items.friendsRequestsReceived);
        },
      },
      {
        name: 'Requests Sent',

        isActive: currentList === 'sent',
        onClick: () => {
          setCurrentList('sent');
          setFriends(friendsProps.items.friendsRequestsSent);
        },
      },
    ],
    [
      currentList,
      friendsProps.items.friends,
      friendsProps.items.friendsRequestsReceived,
      friendsProps.items.friendsRequestsSent,
    ],
  );

  return (
    <div className="text-white flex flex-col gap-4">
      <FriendsPageHeader actions={headerActions} />
      <Friends friends={friends} actions={getActions} />
    </div>
  );
};
