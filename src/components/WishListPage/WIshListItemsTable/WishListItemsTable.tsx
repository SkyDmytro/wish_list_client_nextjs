'use client';

import { WishListItemsTableActionsDropDown } from '@/components/WishListItemsActionsDropDown/WishListItemsActionsDropDown';
import { actionsType } from '@/components/WishListsPage/types/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { GiftItem } from '@/types/wishList';
import { currencies } from '@/utils/constants';

import { useState } from 'react';

import {
  ChevronDown,
  ChevronUp,
  Edit,
  ExternalLink,
  Gift,
  Trash,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const WishListItemsTable = ({
  gifts,
  isOwner,
  deleteGift,
  editGift,
  sortGifts,
  reserveGift,
}: {
  sortGifts: (
    sortBy: 'price' | 'priority' | 'status',
    sortOrder: 'asc' | 'desc',
  ) => void;
  gifts: GiftItem[];
  isOwner: boolean;
  deleteGift: (giftId: string) => void;
  reserveGift: (gift: GiftItem) => void;
  editGift: (gift: GiftItem) => void;
}) => {
  const authUser = useSession().data?.user;
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'price' | 'priority' | 'status' | null>(
    null,
  );
  const router = useRouter();

  const handleDelete = (giftId: string) => () => {
    deleteGift(giftId);
  };
  const handleEdit = (gift: GiftItem) => () => {
    editGift(gift);
  };
  const handleRedirectToGiftUrl = (item: GiftItem) => () => {
    router.push(item.url);
  };

  const handleSort = (sortBy: 'price' | 'priority' | 'status') => () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setSortBy(sortBy);
    sortGifts(sortBy, sortOrder);
  };

  const handleReserveGift = (gift: GiftItem) => {
    reserveGift(gift);
  };

  const tableActions: actionsType[] = [
    {
      component: () => (
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-400 hover:text-slate-300 hover:bg-slate-800"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>Visit Link</span>
        </Button>
      ),
      onClick: (item) => handleRedirectToGiftUrl(item as GiftItem),
      isVisible: () => true,
    },
    {
      component: () => (
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-400 hover:text-slate-300 hover:bg-slate-800"
        >
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit Gift</span>
        </Button>
      ),
      onClick: (gift) => handleEdit(gift as GiftItem),
      isVisible: () => isOwner,
    },
    {
      component: (item) => (
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-400 hover:text-slate-300 hover:bg-slate-800"
        >
          <Gift className="mr-2 h-4 w-4" />
          <span>
            {item.status === 'Available'
              ? 'Reserve gift'
              : item.reservedBy === authUser?._id
                ? 'Cancel reservation'
                : ''}
          </span>
        </Button>
      ),
      onClick: (item) => () => {
        handleReserveGift(item as GiftItem);
      },
      isVisible: (gift) =>
        (!isOwner && gift.status === 'Available') ||
        (gift.reservedBy === authUser?._id && gift.status === 'Reserved'),
    },
    {
      component: () => (
        <Button
          variant="ghost"
          className="w-full justify-start bg-red-500 text-white hover:text-slate-300 hover:bg-slate-800"
        >
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete Gift</span>
        </Button>
      ),
      onClick: (gift) => handleDelete((gift as GiftItem)._id),
      isVisible: () => isOwner,
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-slate-800 hover:bg-transparent">
          <TableHead className="text-slate-400">Gift Name</TableHead>
          <TableHead className="text-slate-400" onClick={handleSort('price')}>
            <div className="flex items-center">
              Price
              {sortBy === 'price' &&
                (sortOrder === 'asc' ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                ))}
            </div>
          </TableHead>
          <TableHead
            className="text-slate-400"
            onClick={handleSort('priority')}
          >
            <div className="flex items-center">
              Priority
              {sortBy === 'priority' &&
                (sortOrder === 'asc' ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                ))}
            </div>
          </TableHead>
          <TableHead className="text-slate-400" onClick={handleSort('status')}>
            <div className="flex items-center">
              Status
              {sortBy === 'status' &&
                (sortOrder === 'asc' ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                ))}
            </div>
          </TableHead>
          <TableHead className="text-right text-slate-400">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gifts.map((gift, index) => (
          <TableRow key={index} className="border-slate-800 hover:bg-slate-900">
            <TableCell className="font-medium text-slate-300">
              {gift.name}
            </TableCell>
            <TableCell className="text-slate-300">
              {gift.price.toFixed(2)}
              {currencies[gift.currency]}
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
              <WishListItemsTableActionsDropDown
                actions={tableActions}
                item={gift}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
