'use client';

import { useToast } from '@/hooks/use-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { friendsApi } from '../api/friends.api';

export function useAddFriend() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: string) => friendsApi.addFriend(friendId),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Friend request sent successfully',
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Error sending friend request',
        variant: 'destructive',
        duration: 3000,
      });
    },
  });
}
