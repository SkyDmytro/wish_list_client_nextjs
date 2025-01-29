'use client';

import {
  createGiftRequest,
  deleteGiftRequest,
} from '@/api/giftRequests/giftRequests';
import { useModal } from '@/hooks/useModal';
import { createGiftRequestBodyType } from '@/types/requests';
import { GiftType } from '@/types/types';
import { GiftItem, wishList } from '@/types/wishList';
import { withToastAsync } from '@/utils/helpers';

import { useState } from 'react';

import { Bookmark, Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { AddWishlistModal } from '../AddWishListModal/AddWishListModal';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { Button } from '../ui/button';
import { WishListItemsTable } from './WIshListItemsTable/WishListItemsTable';

export const WishListPage = ({
  giftsProps,
  isOwner,
  wishList,
  totalItems,
}: {
  giftsProps: GiftItem[];
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
  const [gifts, setGifts] = useState<GiftItem[]>(giftsProps);
  console.log(gifts);
  const [giftToDelete, setGiftToDelete] = useState<string | null>(null);
  const authUser = useSession().data?.user;

  const deleteRequestWithToast = withToastAsync(
    deleteGiftRequest,
    'Gift deleted successfully',
    'Error deleting gift',
  );

  const createGiftRequestWithToast = withToastAsync(
    createGiftRequest,
    'Gift added successfully',
    'Error adding gift',
  );

  //TODO: move this to server
  if (
    wishList.access === 'private' &&
    !isOwner &&
    !wishList.usersWithAccess.includes(authUser?._id || '')
  ) {
    return (
      <div className="min-h-full bg-gradient-to-b from-gray-900 to-black p-8 text-white ">
        <h1 className="text-2xl font-semibold text-white">
          No access for this wishlist
        </h1>
      </div>
    );
  }

  const handleAddGift = async (giftData: GiftType) => {
    const newGift: createGiftRequestBodyType = {
      ...giftData,
      status: 'Available',
      wishListId: wishList._id,
      userId: authUser?._id,
    };
    try {
      const result = await createGiftRequestWithToast(
        newGift,
        authUser?.token as string,
      );
      setGifts([...gifts, result as GiftItem]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteGift = async () => {
    if (giftToDelete) {
      try {
        await deleteRequestWithToast(giftToDelete, authUser?.token);
        setGifts(gifts.filter((gift) => gift._id !== giftToDelete));
      } catch (error) {
        console.log(error);
      } finally {
        closeDeleteModal();
        setGiftToDelete(null);
      }
    }
  };

  return (
    <div className="h-full  max-h-[calc(100vh-68px)] box-border bg-gradient-to-b from-gray-900 to-black p-8 text-white ">
      <AddWishlistModal
        isOpen={isOpen}
        closeModal={closeModal}
        onAddGift={handleAddGift}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={() => {
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
          gifts={gifts || []}
          isOwner={isOwner}
          deleteGift={(giftId: string) => {
            setGiftToDelete(giftId);
            openDeleteModal();
          }}
        />
      </div>
    </div>
  );
};
