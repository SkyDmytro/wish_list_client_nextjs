import { DropDownUserSearch } from '@/features/DropDownUserSearch/components/DropDownUserSearch';
import { wishList } from '@/types/wishList';

import { Modal } from '../ui/modal';

export const AddUserToWishListModal = ({
  currentWishList,
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  currentWishList: wishList;
  onClose: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      title="Add User to private WishList"
      onClose={onClose}
    >
      <DropDownUserSearch currentWishList={currentWishList} />
    </Modal>
  );
};
