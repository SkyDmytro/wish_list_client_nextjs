'use client';

import { getGifts } from '@/api/giftRequests/giftRequests';
import { GiftType } from '@/types/types';
import { GiftItem, wishList } from '@/types/wishList';

import { useEffect, useState } from 'react';

import { Bookmark, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { AddWishlistModal } from '../AddWishListModal/AddWishListModal';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { EditGiftModal } from '../EditGiftModal/EditGiftModal';
import { Button } from '../ui/button';
import { WishListItemsTable } from './WIshListItemsTable/WishListItemsTable';
import { useCreateGift } from './hooks/useCreateGift';
import { useDeleteGift } from './hooks/useDeleteGift';
import { useEditGift } from './hooks/useEditGift';

interface sortOptions {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

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
  const {
    closeCreateGiftModal,
    createGift,
    isCreateGiftModalOpen,
    openCreateGiftModal,
  } = useCreateGift();

  const {
    closeDeleteModal,
    deleteRequestWithToast,
    isDeleteModalOpen,
    openDeleteModal,
    setGiftToDelete,
    giftToDelete,
  } = useDeleteGift();

  const {
    closeEditGiftModal,
    isEditGiftModalOpen,
    openEditGiftModal,
    giftToEdit,
    setGiftToEdit,
    updateGift,
  } = useEditGift();

  const [currentPage, setCurrentPage] = useState(1);
  const [gifts, setGifts] = useState<GiftItem[]>(giftsProps);
  const [sortOptions, setSortOptions] = useState<sortOptions>({
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const authUser = useSession().data?.user;

  useEffect(() => {
    let isMounted = true;

    const fetchNextGifts = async () => {
      if (!isMounted) return;

      console.log('fetching next page', sortOptions);
      try {
        const response = await getGifts(
          wishList._id,
          authUser?.token,
          currentPage,
          10,
          sortOptions.sortBy,
          sortOptions.sortOrder,
        );
        setGifts(response.items);
      } catch (error) {
        console.error('Error fetching next page:', error);
      }
    };

    if (currentPage >= 1) {
      fetchNextGifts();
    }

    return () => {
      isMounted = false;
    };
  }, [currentPage, wishList._id, sortOptions]);

  //TODO: move this to server
  // if (
  //   wishList.access === 'private' &&
  //   !isOwner &&
  //   !wishList.usersWithAccess.includes(authUser?._id || '')
  // ) {
  //   return (
  //     <div className="min-h-full bg-gradient-to-b from-gray-900 to-black p-8 text-white ">
  //       <h1 className="text-2xl font-semibold text-white">
  //         No access for this wishlist
  //       </h1>
  //     </div>
  //   );
  // }

  const handleAddGift = async (gift: GiftType): Promise<void> => {
    try {
      const result = await createGift(
        gift,
        wishList._id,
        authUser?._id || '',
        authUser?.token || '',
      );
      if (gifts.length === 10) {
        setGifts((prev) => [result as GiftItem, ...prev.toSpliced(-1)]);
      } else {
        setGifts((prev) => [result as GiftItem, ...prev]);
      }
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
        setGifts((prev) => prev.filter((gift) => gift._id !== giftToDelete));
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
            console.log(gift);
            setGiftToEdit(gift);
            openEditGiftModal();
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
