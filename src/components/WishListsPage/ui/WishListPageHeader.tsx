import { Button } from '@/components/ui/button';
import { UserType } from '@/types/user';

import { Gift } from 'lucide-react';

export const WishListPageHeader = ({
  wishListOwner,
  isUserTheOwner,
}: {
  wishListOwner: UserType;
  isUserTheOwner: boolean;
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">
        {isUserTheOwner ? 'My Wishlists' : `Wishlists of ${wishListOwner.name}`}
      </h1>
      {isUserTheOwner && (
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Gift className="mr-2 h-4 w-4" />
          Create Wishlist
        </Button>
      )}
    </div>
  );
};
