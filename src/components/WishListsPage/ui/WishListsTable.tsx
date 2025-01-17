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
}: {
  wishlists: wishList[];
  isUserTheOwner?: boolean;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-slate-800 hover:bg-transparent">
          <TableHead className="text-slate-400">Name</TableHead>
          <TableHead className="text-slate-400">Items</TableHead>
          <TableHead className="text-slate-400">Created</TableHead>
          <TableHead className="text-slate-400">Last Updated</TableHead>
          <TableHead className="text-slate-400">Access</TableHead>
          <TableHead className="text-right text-slate-400">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {wishlists.map((wishlist) => {
          return <TableRowComponent wishlist={wishlist} key={wishlist._id} />;
        })}
      </TableBody>
    </Table>
  );
};
