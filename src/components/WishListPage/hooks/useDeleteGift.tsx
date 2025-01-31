import { deleteGiftRequest } from '@/api/giftRequests/giftRequests';
import { useModal } from '@/hooks/useModal';
import { withToastAsync } from '@/utils/helpers';

import { useState } from 'react';

export const useDeleteGift = () => {
  const [giftToDelete, setGiftToDelete] = useState<string | null>(null);
  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const deleteRequestWithToast = withToastAsync(
    deleteGiftRequest,
    'Gift deleted successfully',
    'Error deleting gift',
  );

  return {
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    deleteRequestWithToast,
    giftToDelete,
    setGiftToDelete,
  };
};
