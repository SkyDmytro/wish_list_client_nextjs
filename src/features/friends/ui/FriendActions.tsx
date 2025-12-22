'use client';

import { Button } from '@/components/ui/button';
import { UserType } from '@/entities/user/types/user';
import { isFriends, useAddFriend, useRemoveFriend } from '@/features/friends';

import { useState } from 'react';

import { User } from '@supabase/supabase-js';
import { UserMinus, UserPlus } from 'lucide-react';

export function FriendActions({
  authUser,
  user,
}: {
  authUser: User | null;
  user: UserType;
}) {
  const [friendStatus, setFriendStatus] = useState(isFriends(authUser, user));
  const addFriendMutation = useAddFriend();
  const removeFriendMutation = useRemoveFriend();

  const handleRemoveFriend = async () => {
    if (!authUser) return;
    try {
      await removeFriendMutation.mutateAsync(user.id);
      setFriendStatus('not-friends');
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddFriend = async () => {
    if (!authUser) return;
    try {
      await addFriendMutation.mutateAsync(user.id);
      setFriendStatus('friends');
    } catch (e) {
      console.error(e);
    }
  };

  if (friendStatus === 'friends') {
    return (
      <Button
        onClick={handleRemoveFriend}
        variant="ghost"
        className="rounded-lg border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        disabled={removeFriendMutation.isPending}
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Delete Friend
      </Button>
    );
  }

  if (friendStatus === 'not-friends') {
    return (
      <Button
        onClick={handleAddFriend}
        variant="ghost"
        className="rounded-lg border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        disabled={addFriendMutation.isPending}
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Add Friend
      </Button>
    );
  }

  if (friendStatus === 'request-sent') {
    return (
      <Button
        onClick={handleRemoveFriend}
        variant="ghost"
        className="rounded-lg border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        disabled={removeFriendMutation.isPending}
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Cancel Request
      </Button>
    );
  }

  if (friendStatus === 'request-received') {
    return (
      <>
        <Button
          onClick={handleAddFriend}
          variant="ghost"
          className="rounded-lg border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          disabled={addFriendMutation.isPending}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Accept Request
        </Button>
        <Button
          onClick={handleRemoveFriend}
          variant="ghost"
          className="rounded-lg border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          disabled={removeFriendMutation.isPending}
        >
          <UserMinus className="mr-2 h-4 w-4" />
          Decline Request
        </Button>
      </>
    );
  }

  return null;
}
