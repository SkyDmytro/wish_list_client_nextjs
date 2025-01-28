import { Button } from '../ui/button';
import { Modal } from '../ui/modal';

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Confirmation"
      actions={
        <div className="w-full flex gap-2">
          <Button variant="destructive" className="flex-1" onClick={onDelete}>
            Delete
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
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
