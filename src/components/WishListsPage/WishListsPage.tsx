'use client';

import { getRequest } from '@/api/requests';
import { useModal } from '@/hooks/useModal';
import { UserType } from '@/types/user';
import { wishList } from '@/types/wishList';
import { API_URL, wishlistUrl } from '@/utils/config';

import { useEffect, useState } from 'react';

import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { AddWishlistModal } from '../AddWishListModal/AddWishListModal';
import { Spinner } from '../Loading/Loading';
import { Button } from '../ui/button';
import { WishListPageHeader } from './ui/WishListPageHeader';
import { WishListsTable } from './ui/WishListsTable';

export const WishListsPage = ({
  wishlists,
  isUserTheOwner,
  wishListOwner,
  pagination,
}: {
  wishlists: wishList[];
  isUserTheOwner: boolean;
  wishListOwner: UserType;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}) => {
  const {
    isOpen: isAddWishlistModalOpen,
    openModal: onOpenAddWishlistModal,
    closeModal: onCloseAddWishlistModal,
  } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentWishLists, setCurrentWishLists] = useState(wishlists);
  const { data: session, status } = useSession({ required: true });

  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchWishlists = async () => {
      try {
        const newWishLists = await getRequest<{
          items: wishList[];
          meta: unknown;
        }>(
          `${API_URL}${wishlistUrl}/${wishListOwner._id}/user?page=${currentPage}&pageSize=10`,
          session?.accessToken,
        );
        setCurrentWishLists(newWishLists.items);
      } catch (error) {
        console.error('Error fetching wishlists:', error);
      }
    };

    fetchWishlists();
  }, [currentPage, session?.accessToken]);

  console.log(currentWishLists);

  if (status === 'loading') {
    return (
      <div className="h-full bg-gradient-to-b from-gray-900 to-black p-8 text-white">
        <WishListPageHeader
          wishListOwner={wishListOwner}
          isUserTheOwner={isUserTheOwner}
        />
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-900 to-black p-8 text-white ">
      <AddWishlistModal
        isOpen={isAddWishlistModalOpen}
        closeModal={onCloseAddWishlistModal}
        onAddWishList={() => {}}
      />

      <WishListPageHeader
        onOpenAddWishlistModal={onOpenAddWishlistModal}
        wishListOwner={wishListOwner}
        isUserTheOwner={isUserTheOwner}
      />

      <div className=" mt-6 rounded-lg border border-slate-800 bg-slate-900/50">
        {currentWishLists.length === 0 ||
        (!isUserTheOwner &&
          currentWishLists.every(
            (wishlist) => wishlist.access === 'private',
          )) ? (
          <div className="flex items-center justify-center space-x-2 p-6">
            <Gift className="h-5 w-5 text-purple-400" />
            <p className="text-sm font-medium text-white">
              {isUserTheOwner
                ? 'You have no wishlists yet.'
                : `User has no wishlists yet.`}
            </p>
          </div>
        ) : (
          <WishListsTable
            wishlists={currentWishLists}
            isUserTheOwner={isUserTheOwner}
          />
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing {(currentPage - 1) * pagination.pageSize + 1} to{' '}
          {Math.min(currentPage * pagination.pageSize, pagination.total)} of{' '}
          {pagination.total} wishlists
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
