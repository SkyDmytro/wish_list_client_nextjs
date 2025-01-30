'use client';

import { GiftType } from '@/types/types';
import { GiftItem, wishList } from '@/types/wishList';

import { useState } from 'react';

import { Bookmark, Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { AddWishlistModal } from '../AddWishListModal/AddWishListModal';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { EditGiftModal } from '../EditGiftModal/EditGiftModal';
import { Button } from '../ui/button';
import { WishListItemsTable } from './WIshListItemsTable/WishListItemsTable';
import { useCreateGift } from './hooks/useCreateGift';
import { useDeleteGift } from './hooks/useDeleteGift';
import { useEditGift } from './hooks/useEditGift';

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
  const {
    closeCreateGiftModal,
    openCreateGiftModal,
    createGift,
    isCreateGiftModalOpen,
  } = useCreateGift();

  const {
    closeDeleteModal,
    deleteRequestWithToast,
    isDeleteModalOpen,
    openDeleteModal,
  } = useDeleteGift();

  const {
    closeEditGiftModal,
    isEditGiftModalOpen,
    openEditGiftModal,
    giftToEdit,
    setGiftToEdit,
    updateGift,
  } = useEditGift();

  const [gifts, setGifts] = useState<GiftItem[]>(giftsProps);
  const [giftToDelete, setGiftToDelete] = useState<string | null>(null);
  const authUser = useSession().data?.user;

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
  const handleAddGift = async (gift: GiftType): Promise<void> => {
    try {
      const result = await createGift(
        gift,
        wishList._id,
        authUser?._id || '',
        authUser?.token || '',
      );
      setGifts((prev) => [...prev, result as GiftItem]);
    } catch (error) {
      console.log(error);
    } finally {
      closeCreateGiftModal();
    }
  };

  const handleUpdateGift = async (gift: GiftItem): Promise<void> => {
    try {
      const updatedGift = (await updateGift(
        gift._id,
        gift,
        wishList._id,
        authUser?._id || '',
        authUser?.token || '',
      )) as GiftItem;

      setGifts(gifts.map((g) => (g._id === updatedGift._id ? updatedGift : g)));
    } finally {
      closeEditGiftModal();
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
        isOpen={isCreateGiftModalOpen}
        closeModal={closeCreateGiftModal}
        onAddGift={handleAddGift}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={() => {
          handleDeleteGift();
        }}
      />
      <EditGiftModal
        CurrentGiftData={giftToEdit || ({} as GiftItem)}
        isOpen={isEditGiftModalOpen}
        closeModal={closeEditGiftModal}
        onEditGift={handleUpdateGift}
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
              onClick={openCreateGiftModal}
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
          editGift={(gift: GiftItem) => {
            console.log(gift);
            setGiftToEdit(gift);
            openEditGiftModal();
          }}
        />
      </div>
    </div>
  );
};
