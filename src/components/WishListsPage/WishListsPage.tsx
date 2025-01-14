'use client';

import { UserType } from '@/types/user';
import { wishList } from '@/types/wishList';

import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';

import { Button } from '../ui/button';
import { WishListPageHeader } from './ui/WishListPageHeader';
import { WishListsTable } from './ui/WishListsTable';

export const WishListsPage = ({
  wishlists,
  isUserTheOwner,
  wishListOwner,
}: {
  wishlists: wishList[];
  isUserTheOwner: boolean;
  wishListOwner: UserType;
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8 text-white ">
      <WishListPageHeader
        wishListOwner={wishListOwner}
        isUserTheOwner={isUserTheOwner}
      />

      <div className=" mt-6 rounded-lg border border-slate-800 bg-slate-900/50">
        {wishlists.length === 0 ||
        (!isUserTheOwner &&
          wishlists.every((wishlist) => wishlist.access === 'private')) ? (
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
            wishlists={wishlists}
            isUserTheOwner={isUserTheOwner}
          />
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        {/* <div className="text-sm text-gray-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, mockWishlists.length)} of{' '}
            {mockWishlists.length} wishlists
          </div> */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="border-gray-800 hover:bg-gray-900 text-black hover:text-white"
            onClick={() => console.log('previous')}
            // disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            className="border-gray-800 hover:bg-gray-900 text-black hover:text-white"
            onClick={() => console.log('next')}
            // disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
