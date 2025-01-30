import { createGiftRequest } from '@/api/giftRequests/giftRequests';
import { useModal } from '@/hooks/useModal';
import { createGiftRequestBodyType } from '@/types/requests';
import { GiftType } from '@/types/types';
import { withToastAsync } from '@/utils/helpers';

export const useCreateGift = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const createGiftRequestWithToast = withToastAsync(
    createGiftRequest,
    'Gift added successfully',
    'Error adding gift',
  );

  const handleAddGift = async (
    giftData: GiftType,
    wishListId: string,
    userId: string,
    token: string,
  ) => {
    const newGift: createGiftRequestBodyType = {
      ...giftData,
      status: 'Available',
      wishListId: wishListId,
      userId: userId,
    };
    try {
      const result = await createGiftRequestWithToast(newGift, token as string);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    createGift: handleAddGift,
    openCreateGiftModal: openModal,
    closeCreateGiftModal: closeModal,
    isCreateGiftModalOpen: isOpen,
  };
};
