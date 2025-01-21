import { Modal } from '../ui/modal';

/**
 * A modal that prompts the user to create a new wishlist.
 *
 * @param {{
 *   closeModal: () => void;
 *   openModal: () => void;
 *   isOpen: boolean;
 * }} props
 * @returns {JSX.Element}
 */
export const AddWishlistModal = ({
  closeModal,
  isOpen,
}: {
  closeModal: () => void;
  isOpen: boolean;
}): JSX.Element => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Create a Gift"
      actions={null}
      key={'dsadsa'}
    >
      <div className="sosa">Privet</div>
      <div className="sosa">Privet</div>
      <div className="sosa">Privet</div>
      <div className="sosa">Privet</div>
      <div className="sosa">Privet</div>
      <div className="sosa">Privet</div>
      <div className="sosa">Privet</div>
      <div className="sosa">Privet</div>
      {/* content */}
    </Modal>
  );
};
