import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { wishList as wishListType } from '@/types/wishList';

import Link from 'next/link';

export const TableRowComponent = ({ wishlist }: { wishlist: wishListType }) => {
  return (
    <TableRow
      key={wishlist._id}
      className="border-gray-800 hover:bg-gray-900/50"
    >
      <TableCell className="font-medium">{wishlist.title}</TableCell>
      <TableCell>
        {wishlist.createdAt
          ? new Date(wishlist.createdAt).toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : 'Unknown'}
      </TableCell>
      <TableCell>
        {wishlist.updatedAt
          ? new Date(wishlist.updatedAt).toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : 'Unknown'}
      </TableCell>

      <TableCell className="text-left">
        <span className="">
          {wishlist.access.charAt(0).toUpperCase() + wishlist.access.slice(1)}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <Link href={`/wishlists/${wishlist._id}`}>
          <Button
            variant="ghost"
            className="text-purple-500 hover:text-purple-400 hover:bg-purple-500/10"
          >
            View
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};
