'use client';

import { UserType } from '@/types/user';
import { wishList } from '@/types/wishList';

import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';

import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { TableRowComponent } from './ui/TableRow';

export const WishListPage = ({
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
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            {isUserTheOwner
              ? 'My Wishlists'
              : `Wishlists of ${wishListOwner.name}`}
          </h1>
          {isUserTheOwner && (
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Gift className="mr-2 h-4 w-4" />
              Create Wishlist
            </Button>
          )}
        </div>

        <div className="rounded-lg border border-gray-800 bg-[#0F1521]">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400 text-right">
                  Items
                </TableHead>
                <TableHead className="text-gray-400">Created</TableHead>
                <TableHead className="text-gray-400">Last Updated</TableHead>
                <TableHead className="text-gray-400 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wishlists.map((wishlist) => (
                <TableRowComponent wishlist={wishlist} key={wishlist._id} />
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
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
    </div>
  );
};
