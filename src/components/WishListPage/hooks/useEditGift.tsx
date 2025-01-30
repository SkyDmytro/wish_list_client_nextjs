import { updateGiftRequest } from '@/api/giftRequests/giftRequests';
import { useModal } from '@/hooks/useModal';
import { createGiftRequestBodyType } from '@/types/requests';
import { GiftItem } from '@/types/wishList';
import { withToastAsync } from '@/utils/helpers';

import { useState } from 'react';

export const useEditGift = () => {
  const [giftToEdit, setGiftToEdit] = useState<GiftItem | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const editGiftRequestWithToast = withToastAsync(
    updateGiftRequest,
    'Gift edited successfully',
    'Error editing gift',
  );

  const handleEditGift = async (
    giftId: string,
    giftData: GiftItem,
    wishListId: string,
    userId: string,
    token: string,
  ) => {
    const newGift: createGiftRequestBodyType = {
      ...giftData,
    };
    try {
      const result = await editGiftRequestWithToast(
        giftId,
        newGift,
        token as string,
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    giftToEdit,
    setGiftToEdit,
    updateGift: handleEditGift,
    openEditGiftModal: openModal,
    closeEditGiftModal: closeModal,
    isEditGiftModalOpen: isOpen,
  };
};
