'use client';

import { deleteGiftRequest } from '@/api/giftRequests/giftRequests';
import { toast } from '@/hooks/use-toast';
import { useModal } from '@/hooks/useModal';
import { GiftItem, wishList } from '@/types/wishList';

import { useState } from 'react';

import { Bookmark, Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { AddWishlistModal } from '../AddWishListModal/AddWishListModal';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { Button } from '../ui/button';
import { WishListItemsTable } from './WIshListItemsTable/WishListItemsTable';

export const WishListPage = ({
  gifts,
  isOwner,
  wishList,
  totalItems,
}: {
  gifts: GiftItem[];
  wishList: wishList;
  isOwner: boolean;
  totalItems: number;
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
  const [giftToDelete, setGiftToDelete] = useState<string | null>(null);
  const authUser = useSession().data?.user;
  //TODO: move this to server
  if (
    wishList.access === 'private' &&
    !isOwner &&
    !wishList.usersWithAccess.includes(authUser?._id || '')
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8 text-white ">
        <h1 className="text-2xl font-semibold text-white">
          No access for this wishlist
        </h1>
      </div>
    );
  }

  const handleDeleteGift = async () => {
    if (giftToDelete) {
      console.log(`Deleting gift with ID: ${giftToDelete}`);
      // TODO: Add server-side deletion logic here
      try {
        await deleteGiftRequest(giftToDelete, authUser?.token);
        toast({
          title: 'Gift deleted successfully',
          description: 'The gift has been deleted successfully.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error deleting gift',
          description: `There was an error deleting the gift. ${error.message || ''}`,
        });
        console.error('Error deleting gift:', error);
      } finally {
        window.location.reload();
        setGiftToDelete(null);
        closeDeleteModal();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8 text-white ">
      <AddWishlistModal
        isOpen={isOpen}
        closeModal={closeModal}
        wishlistId={wishList._id}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={() => {
          console.log('delete');
          handleDeleteGift();
        }}
      />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            {wishList.title}
          </h2>
          <p className="text-slate-400 mt-2">
            {totalItems} items •{' '}
            {new Intl.DateTimeFormat('en-GB', {
              dateStyle: 'medium',
            }).format(new Date(wishList.createdAt || ''))}
          </p>
        </div>
        {isOwner ? (
          <>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={openModal}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Gift
            </Button>
          </>
        ) : (
          <>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Bookmark className="mr-2 h-4 w-4" />
              Add to Favorites
            </Button>
          </>
        )}
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/50">
        <WishListItemsTable
          gifts={gifts}
          isOwner={isOwner}
          deleteGift={(giftId: string) => {
            console.log('delete', giftId);
            setGiftToDelete(giftId);
            openDeleteModal();
          }}
        />
      </div>
    </div>
  );
};
