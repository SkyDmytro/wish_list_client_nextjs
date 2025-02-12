import { Button } from '../ui/button';
import { Modal } from '../ui/modal';

export const DeleteWishListModal = ({
  isDeleteWishlistModalOpen,
  onCloseDeleteWishlistModal,
  onDeleteWishList,
}: {
  isDeleteWishlistModalOpen: boolean;
  onCloseDeleteWishlistModal: () => void;
  onDeleteWishList: () => void;
}) => {
  return (
    <Modal
      isOpen={isDeleteWishlistModalOpen}
      title="Delete Confirmation"
      onClose={onCloseDeleteWishlistModal}
      actions={
        <div className="w-full flex gap-2">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onDeleteWishList}
          >
            Delete
          </Button>
          <Button
            variant="ghost"
            onClick={onCloseDeleteWishlistModal}
            className="bg-gray-800 flex-1"
          >
            Cancel
          </Button>
        </div>
      }
    >
      <p className="text-gray-400 ">
        Are you sure you want to delete this wish list?
      </p>
    </Modal>
  );
};
