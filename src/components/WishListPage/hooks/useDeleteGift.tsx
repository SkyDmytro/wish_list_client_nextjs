import { deleteGiftRequest } from '@/api/giftRequests/giftRequests';
import { useModal } from '@/hooks/useModal';
import { withToastAsync } from '@/utils/helpers';

export const useDeleteGift = () => {
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
  };
};
