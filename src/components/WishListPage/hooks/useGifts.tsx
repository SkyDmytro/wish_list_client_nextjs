import { getGifts } from '@/api/giftRequests/giftRequests';
import { GiftItem, wishList } from '@/types/wishList';

import { useEffect, useState } from 'react';

import { User } from 'next-auth';

export const useGifts = (
  giftsProps: GiftItem[],
  authUser: User,
  wishList: wishList,
  currentPage: number,
  sortOptions: { sortBy: string; sortOrder: 'asc' | 'desc' },
) => {
  const [gifts, setGifts] = useState<GiftItem[]>(giftsProps);

  useEffect(() => {
    let isMounted = true;

    const fetchNextGifts = async () => {
      if (!isMounted) return;
      if (!authUser) return;

      try {
        const response = await getGifts(
          wishList._id,
          authUser?.token,
          currentPage,
          10,
          sortOptions.sortBy,
          sortOptions.sortOrder,
        );
        setGifts(response.items);
      } catch (error) {
        console.error('Error fetching next page:', error);
      }
    };

    if (currentPage >= 1) {
      fetchNextGifts();
    }

    return () => {
      isMounted = false;
    };
  }, [currentPage, wishList._id, sortOptions]);
  return {
    gifts,
    setGifts,
  };
};
