'use client';

import type { FriendsResponse } from '@/entities/friends';

import { useQuery } from '@tanstack/react-query';

import { friendsApi } from '../api/friends.api';

export function useFriends(
  userId: string,
  page: number = 1,
  pageSize: number = 10,
) {
  return useQuery<FriendsResponse>({
    queryKey: ['friends', userId, page, pageSize],
    queryFn: () => friendsApi.getFriends(userId, page, pageSize),
    enabled: !!userId,
  });
}
