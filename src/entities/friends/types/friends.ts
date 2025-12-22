import { User } from '@/entities/user/types/user';
import { Tables } from '@/types/database.types';

export type FriendRequest = Tables<'friend_requests'>;

export type FriendStatus =
  | 'friends'
  | 'not-friends'
  | 'request-sent'
  | 'request-received'
  | null;

export type FriendsResponse = {
  items: {
    friends: User[];
    requestsReceived: User[];
    requestsSent: User[];
  };
  total: number;
};

export type FriendRequestResponse = {
  message: string;
};
