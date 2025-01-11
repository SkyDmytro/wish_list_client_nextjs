import { wishList } from '@/types/wishList';

import { Gift } from 'lucide-react';
import Link from 'next/link';

export const WishListsSection = ({
  wishlists,
  userId,
}: {
  wishlists: wishList[];
  userId: string;
}) => {
  return (
    <div className="rounded-lg border border-gray-800 bg-black/50 p-6 backdrop-blur-sm">
      <h3 className="mb-4 text-lg font-semibold text-white">Wishlists</h3>
      {wishlists.length === 0 && (
        <p className="text-gray-400">User has no wishlists yet.</p>
      )}
      <div className="space-y-3">
        {wishlists.map((list) => (
          <div
            key={list._id}
            className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/50 p-4"
          >
            <div className="flex items-center space-x-3">
              <Gift className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm font-medium text-white">Wishlist</p>
                <p className="text-xs text-gray-400">{list.title}</p>
              </div>
            </div>
            <button className="rounded-lg bg-purple-500 px-3 py-1 text-xs font-medium text-white hover:bg-purple-600">
              View
            </button>
          </div>
        ))}
      </div>
      {wishlists.length > 0 && (
        <Link href={`/users/${userId}/wishlists`}>
          <button className="mt-4 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
            View All Wishlists
          </button>
        </Link>
      )}
    </div>
  );
};
