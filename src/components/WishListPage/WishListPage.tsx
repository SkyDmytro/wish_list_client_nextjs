'use client';

import { useModal } from '@/hooks/useModal';
import { GiftItem, wishList } from '@/types/wishList';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ExternalLink, Gift, Menu, Plus } from 'lucide-react';
import Link from 'next/link';

import { AddWishlistModal } from '../AddWishListModal/AddWishListModal';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

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
        {isOwner && (
          <>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={openModal}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Gift
            </Button>
          </>
        )}
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/50">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-slate-400">Gift Name</TableHead>
              <TableHead className="text-slate-400">Price</TableHead>
              <TableHead className="text-slate-400">Priority</TableHead>
              <TableHead className="text-slate-400">Status</TableHead>
              <TableHead className="text-right text-slate-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gifts.map((gift, index) => (
              <TableRow
                key={index}
                className="border-slate-800 hover:bg-slate-900"
              >
                <TableCell className="font-medium text-slate-300">
                  {gift.name}
                </TableCell>
                <TableCell className="text-slate-300">
                  ${gift.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      gift.priority === 'High'
                        ? 'bg-red-500/10 text-red-500'
                        : gift.priority === 'Medium'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-blue-500/10 text-blue-500'
                    }`}
                  >
                    {gift.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      gift.status === 'Available'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-purple-500/10 text-purple-500'
                    }`}
                  >
                    {gift.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300"
                      >
                        <Menu className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 bg-slate-900 border border-slate-800 rounded-md"
                    >
                      <DropdownMenuItem asChild>
                        <Link href={gift.url} className="focus:outline-none">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-400 hover:text-slate-300 hover:bg-slate-800"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            <span>Visit Link</span>
                          </Button>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-slate-400 hover:text-slate-300 hover:bg-slate-800"
                        >
                          <Gift className="mr-2 h-4 w-4" />
                          <span>Reserve Gift</span>
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
