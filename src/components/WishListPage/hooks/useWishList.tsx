import { reserveGiftRequest } from '@/api/giftRequests/giftRequests';
import { useModal } from '@/hooks/useModal';
import { GiftType } from '@/types/types';
import { GiftItem, wishList } from '@/types/wishList';
import { withToastAsync } from '@/utils/helpers';

import { useState } from 'react';

import { User } from 'next-auth';

import { useCreateGift } from './useCreateGift';
import { useDeleteGift } from './useDeleteGift';
import { useEditGift } from './useEditGift';
import { useGifts } from './useGifts';

interface sortOptions {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export const useWishList = ({
  giftsProps,
  authUser,
  wishList,
  currentPage,
}: {
  giftsProps: GiftItem[];
  wishList: wishList;
  authUser: User;
  currentPage: number;
}) => {
  const {
    closeCreateGiftModal,
    createGift,
    isCreateGiftModalOpen,
    openCreateGiftModal,
  } = useCreateGift();

  const {
    closeDeleteModal,
    deleteRequestWithToast,
    isDeleteModalOpen,
    openDeleteModal,
    setGiftToDelete,
    giftToDelete,
  } = useDeleteGift();

  const {
    closeEditGiftModal,
    isEditGiftModalOpen,
    openEditGiftModal,
    giftToEdit,
    setGiftToEdit,
    updateGift,
  } = useEditGift();

  const {
    closeModal: closeAddUserToWishListModal,
    isOpen: isAddUserToWishListModalOpen,
    openModal: openAddUserToWishListModal,
  } = useModal();
  const [sortOptions, setSortOptions] = useState<sortOptions>({
    sortBy: 'priority',
    sortOrder: 'asc',
  });

  const reserveGiftRequestWithToast = withToastAsync(
    reserveGiftRequest,
    'Gift reserved successfully',
    'Error reserving gift',
  );

  const handleAddGift = async (gift: GiftType): Promise<void> => {
    try {
      const result = await createGift(
        gift,
        wishList._id,
        authUser?._id || '',
        authUser?.token || '',
      );
      if (gifts.length === 10) {
        setGifts((prev) => [result as GiftItem, ...prev.toSpliced(-1)]);
      } else {
        setGifts((prev) => [result as GiftItem, ...prev]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      closeCreateGiftModal();
    }
  };

  const handleUpdateGift = async (gift: GiftItem): Promise<void> => {
    try {
      const updatedGift = (await updateGift(
        gift._id,
        gift,
        wishList._id,
        authUser?._id || '',
        authUser?.token || '',
      )) as GiftItem;

      setGifts(gifts.map((g) => (g._id === updatedGift._id ? updatedGift : g)));
    } finally {
      closeEditGiftModal();
    }
  };

  const handleDeleteGift = async () => {
    if (giftToDelete) {
      try {
        await deleteRequestWithToast(giftToDelete, authUser?.token);
        setGifts((prev) => prev.filter((gift) => gift._id !== giftToDelete));
      } catch (error) {
        console.log(error);
      } finally {
        closeDeleteModal();
        setGiftToDelete(null);
      }
    }
  };

  const handleReserveGift = async (gift: GiftItem) => {
    try {
      await reserveGiftRequestWithToast(gift._id, authUser?.token);
      setGifts((prev) =>
        prev.map((item) =>
          item._id === gift._id
            ? {
                ...item,
                status: item.status === 'Available' ? 'Reserved' : 'Available',
                reservedBy:
                  item.reservedBy === authUser?._id ? null : authUser?._id,
              }
            : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const { gifts, setGifts } = useGifts(
    giftsProps,
    authUser,
    wishList,
    currentPage,
    sortOptions,
  );
  return {
    // Modals
    isCreateGiftModalOpen,
    closeCreateGiftModal,
    openCreateGiftModal,
    isDeleteModalOpen,
    closeDeleteModal,
    openDeleteModal,
    isEditGiftModalOpen,
    closeEditGiftModal,
    openEditGiftModal,
    isAddUserToWishListModalOpen,
    closeAddUserToWishListModal,
    openAddUserToWishListModal,

    // Gift Management
    gifts,
    setGifts,
    giftToDelete,
    giftToEdit,
    deleteGift: setGiftToDelete,
    editGift: setGiftToEdit,
    handleAddGift,
    handleDeleteGift,
    handleUpdateGift,
    handleReserveGift,
    setGiftToEdit,
    setGiftToDelete,

    // Sorting
    sortOptions,
    setSortOptions,

    // Other
    createGift,
    handleEditGift: openEditGiftModal,
    handleRedirectToGiftUrl: openCreateGiftModal,
  };
};
