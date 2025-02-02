import { getRequest } from '@/api/requests';
import { auth } from '@/auth/authSetup';
import { WishListPage } from '@/components/WishListPage/WishListPage';
import { GiftResponse, wishList } from '@/types/wishList';
import { API_URL, wishlistUrl } from '@/utils/config';

import { NextPage } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}
const Page: NextPage<PageProps> = async ({ params }) => {
  const { id: wishListId } = await params;
  const session = await auth();
  let access = true;

  const wishList = await getRequest<wishList>(
    `${API_URL}${wishlistUrl}/${wishListId}`,
    session?.user?.token,
  ).catch((e) => {
    console.error(e);
    return {} as wishList;
  });

  const wishListItems = await getRequest<GiftResponse>(
    `${API_URL}${wishlistUrl}/${wishListId}/items`,
    session?.user?.token,
  ).catch((e) => {
    console.log(e);
    if (e.message === 'Access denied') {
      access = false;
    }
    return {
      items: [],
      meta: { totalItems: 0, page: 0, pageSize: 0, totalPages: 0 },
    };
  });

  const isUserTheOwner = wishList.owner === session?.user?._id || false;

  if (!access) {
    return (
      <div className="min-h-full bg-gradient-to-b from-gray-900 to-black p-8 text-white ">
        <h1 className="text-2xl font-semibold text-white">
          No access for this wishlist
        </h1>
      </div>
    );
  }

  return (
    <WishListPage
      pagination={wishListItems.meta}
      giftsProps={wishListItems.items || []}
      isOwner={isUserTheOwner}
      wishList={wishList}
      totalItems={wishListItems.meta.totalItems || 0}
    />
  );
};

export default Page;
