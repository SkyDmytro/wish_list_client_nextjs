import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { wishList as wishListType } from '@/types/wishList';

export const TableRowComponent = ({ wishlist }: { wishlist: wishListType }) => {
  return (
    <TableRow
      key={wishlist._id}
      className="border-gray-800 hover:bg-gray-900/50"
    >
      <TableCell className="font-medium">{wishlist.title}</TableCell>
      <TableCell className="text-right">{10}</TableCell>
      <TableCell>
        {wishlist.createdAt
          ? new Date(wishlist.createdAt).toLocaleString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })
          : 'Unknown'}
      </TableCell>
      <TableCell>
        {wishlist.updatedAt
          ? new Date(wishlist.updatedAt).toLocaleString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })
          : 'Unknown'}
      </TableCell>
      <TableCell className="text-right">
        <Button
          onClick={() => console.log(wishlist)}
          variant="ghost"
          className="text-purple-500 hover:text-purple-400 hover:bg-purple-500/10"
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
};
