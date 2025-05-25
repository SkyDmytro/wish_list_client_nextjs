import { Button } from '@/components/ui/button';
import { UserType } from '@/types/user';

import { useState } from 'react';

import { UserMinus, UserPlus } from 'lucide-react';
import { SessionContextValue } from 'next-auth/react';

import { isFriends } from '../helpers/helpers';

export const FriendActions = ({
  authUser,
  user,
  onAddFriend,
  onRemoveFriend,
}: {
  authUser: SessionContextValue;
  user: UserType;
  onAddFriend: () => Promise<void>;
  onRemoveFriend: () => Promise<void>;
}) => {
  const [isFriend, setIsFriend] = useState(isFriends(authUser, user));

  const handleRemoveFriend = async () => {
    try {
      await onRemoveFriend();
      setIsFriend('not-friends');
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddFriend = async () => {
    try {
      await onAddFriend();
      setIsFriend('friends');
    } catch (e) {
      console.error(e);
    }
  };

  if (isFriend === 'friends') {
    return (
      <Button
        onClick={handleRemoveFriend}
        variant="ghost"
        className="rounded-lg border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Delete Friend
      </Button>
    );
  }

  if (isFriend === 'not-friends') {
    return (
      <Button
        onClick={handleAddFriend}
        variant="ghost"
        className="rounded-lg border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Add Friend
      </Button>
    );
  }

  if (isFriend === 'request-sent') {
    return (
      <Button
        onClick={handleRemoveFriend}
        variant="ghost"
        className="rounded-lg border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Cancel Request
      </Button>
    );
  }

  if (isFriend === 'request-received') {
    return (
      <>
        <Button
          onClick={handleAddFriend}
          variant="ghost"
          className="rounded-lg border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Accept Request
        </Button>
        <Button
          onClick={handleRemoveFriend}
          variant="ghost"
          className="rounded-lg border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <UserMinus className="mr-2 h-4 w-4" />
          Decline Request
        </Button>
      </>
    );
  }

  return null;
};
