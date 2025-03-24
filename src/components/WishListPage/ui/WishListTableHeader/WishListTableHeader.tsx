import { Button } from '@/components/ui/button';
import { wishList } from '@/types/wishList';

import { Bookmark, Plus, Users } from 'lucide-react';

export const WishListTableHeader = ({
  wishList,
  totalItems,
  isOwner,
  openAddUserToWishListModal,
  openCreateGiftModal,
}: {
  wishList: wishList;
  totalItems: number;
  isOwner: boolean;
  openAddUserToWishListModal: () => void;
  openCreateGiftModal: () => void;
}) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-white">{wishList.title}</h2>
        <p className="text-slate-400 mt-2">
          {totalItems} items •{' '}
          {new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'medium',
          }).format(new Date(wishList.createdAt || ''))}
        </p>
      </div>
      {isOwner ? (
        <div className="flex self-end gap-4 sm:flex-col md:flex-row">
          {wishList.access === 'private' && (
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={openAddUserToWishListModal}
            >
              <Users className="mr-2 h-4 w-4" />
              Add User
            </Button>
          )}
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={openCreateGiftModal}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Gift
          </Button>
        </div>
      ) : (
        <>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Bookmark className="mr-2 h-4 w-4" />
            Add to Favorites
          </Button>
        </>
      )}
    </div>
  );
};
