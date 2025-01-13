import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { wishList } from '@/types/wishList';

import { TableRowComponent } from './TableRow';

export const WishListsTable = ({
  wishlists,
  isUserTheOwner,
}: {
  wishlists: wishList[];
  isUserTheOwner: boolean;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-800 hover:bg-transparent">
          <TableHead className="text-gray-400">Name</TableHead>
          <TableHead className="text-gray-400 ">Items</TableHead>
          <TableHead className="text-gray-400">Created</TableHead>
          <TableHead className="text-gray-400">Last Updated</TableHead>
          <TableHead className="text-gray-400 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {wishlists.map((wishlist) => {
          if (wishlist.access === 'private' && !isUserTheOwner) return null;
          return <TableRowComponent wishlist={wishlist} key={wishlist._id} />;
        })}
      </TableBody>
    </Table>
  );
};
