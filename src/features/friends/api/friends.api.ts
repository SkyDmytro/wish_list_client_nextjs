import type {
  FriendRequestResponse,
  FriendsResponse,
} from '@/entities/friends';
import { api } from '@/lib/ApiClient';

export const friendsApi = {
  getFriends: async (
    userId: string,
    page?: number,
    pageSize?: number,
  ): Promise<FriendsResponse> => {
    return api.get<FriendsResponse>(`/api/users/${userId}/friends`, {
      params: { page, pageSize },
    });
  },

  addFriend: async (friendId: string): Promise<FriendRequestResponse> => {
    return api.post<FriendRequestResponse, unknown>(
      `/api/users/${friendId}/friends`,
    );
  },

  removeFriend: async (friendId: string): Promise<FriendRequestResponse> => {
    return api.delete<FriendRequestResponse>(`/api/users/${friendId}/friends`);
  },
};
