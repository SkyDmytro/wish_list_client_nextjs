'use client';

import { useModal } from '@/hooks/useModal';
import { GiftItem, wishList } from '@/types/wishList';

import { Bookmark, Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { AddWishlistModal } from '../AddWishListModal/AddWishListModal';
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
  console.log(wishList);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8 text-white ">
      <AddWishlistModal
        isOpen={isOpen}
        closeModal={closeModal}
        wishlistId={wishList._id}
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
        <WishListItemsTable gifts={gifts} />
      </div>
    </div>
  );
};
