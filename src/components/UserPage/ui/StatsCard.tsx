import { Gift, Users } from 'lucide-react';

export const StatsCard = ({
  friendsCount,
  wishlistsCount,
}: {
  friendsCount: number;
  wishlistsCount: number;
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-gray-800 bg-black/50 p-4 text-center backdrop-blur-sm">
        <Users className="mx-auto h-6 w-6 text-blue-400" />
        <p className="mt-2 text-2xl font-bold text-white">{friendsCount}</p>
        <p className="text-sm text-gray-400">Friends</p>
      </div>
      <div className="rounded-lg border border-gray-800 bg-black/50 p-4 text-center backdrop-blur-sm">
        <Gift className="mx-auto h-6 w-6 text-purple-400" />
        <p className="mt-2 text-2xl font-bold text-white">{wishlistsCount}</p>
        <p className="text-sm text-gray-400">Wishlists</p>
      </div>
      {/* <div className="rounded-lg border border-gray-800 bg-black/50 p-4 text-center backdrop-blur-sm">
            <Star className="mx-auto h-6 w-6 text-yellow-400" />
            <p className="mt-2 text-2xl font-bold text-white">156</p>
            <p className="text-sm text-gray-400">Favorites</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-black/50 p-4 text-center backdrop-blur-sm">
            <Calendar className="mx-auto h-6 w-6 text-green-400" />
            <p className="mt-2 text-2xl font-bold text-white">12</p>
            <p className="text-sm text-gray-400">Events</p>
          </div> */}
    </div>
  );
};
