'use client';

import { GiftItem, wishList } from '@/types/wishList';

import { useState } from 'react';

import { Bookmark, ChevronLeft, ChevronRight, Plus, Users } from 'lucide-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';

import { AddUserToWishListModal } from '../AddUserToWishListModal/AddUserToWishListModal';
import { AddWishlistItemModal } from '../AddWishListItemModal/AddWishListModal';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { EditGiftModal } from '../EditGiftModal/EditGiftModal';
import { Button } from '../ui/button';
import { useWishList } from './hooks/useWishList';
import { WishListItemsTable } from './ui/WIshListItemsTable/WishListItemsTable';

export const WishListPage = ({
  giftsProps,
  isOwner,
  wishList,
  totalItems,
  pagination,
}: {
  giftsProps: GiftItem[];
  wishList: wishList;
  isOwner: boolean;
  totalItems: number;
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const authUser = useSession().data?.user as User;
  const {
    // Modals
    isCreateGiftModalOpen,
    closeCreateGiftModal,
    openCreateGiftModal,
    isDeleteModalOpen,
    closeDeleteModal,
    openDeleteModal,
    isEditGiftModalOpen,
    closeEditGiftModal,
    openEditGiftModal,
    isAddUserToWishListModalOpen,
    closeAddUserToWishListModal,
    openAddUserToWishListModal,

    // Gift Management
    gifts,
    giftToEdit,
    setGiftToEdit,
    setGiftToDelete,
    handleAddGift,
    handleDeleteGift,
    handleUpdateGift,
    handleReserveGift,

    // Sorting
    setSortOptions,
  } = useWishList({
    authUser,
    currentPage,
    giftsProps,
    wishList,
  });

  return (
    <div className="h-full  max-h-[calc(100vh-68px)] box-border bg-gradient-to-b from-gray-900 to-black p-8 text-white ">
      <AddWishlistItemModal
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

      <AddUserToWishListModal
        currentWishList={wishList}
        isOpen={isAddUserToWishListModalOpen}
        onClose={() => {
          window.location.reload();
          closeAddUserToWishListModal();
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
          <div className="flex self-end gap-4 sm:flex-col md:flex-row">
            {wishList.access === 'private' && (
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={openAddUserToWishListModal}
              >
                <Users className="mr-2 h-4 w-4" />
                Add User
              </Button>
            )}
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={openCreateGiftModal}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Gift
            </Button>
          </div>
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
          sortGifts={(
            sortBy: 'price' | 'priority' | 'status',
            sortOrder: 'asc' | 'desc',
          ) => {
            setSortOptions((prev) => ({ ...prev, sortBy, sortOrder }));
          }}
          gifts={gifts || []}
          isOwner={isOwner}
          deleteGift={(giftId: string) => {
            setGiftToDelete(giftId);
            openDeleteModal();
          }}
          editGift={(gift: GiftItem) => {
            setGiftToEdit(gift);
            openEditGiftModal();
          }}
          reserveGift={(gift) => {
            handleReserveGift(gift);
          }}
        />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing {(currentPage - 1) * pagination.pageSize + 1} to{' '}
          {Math.min(currentPage * pagination.pageSize, pagination.totalItems)}{' '}
          of {pagination.totalItems} gifts
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="border-gray-800 hover:bg-gray-900 text-black hover:text-white"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            className="border-gray-800 hover:bg-gray-900 text-black hover:text-white"
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
            }}
            disabled={currentPage === pagination.totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
