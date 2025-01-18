import { getRequest } from '@/api/requests';
import { auth } from '@/auth/authSetup';
import { WishListPage } from '@/components/WishListPage/WishListPage';
import { GiftResponse, wishList } from '@/types/wishList';
import { API_URL, wishlistUrl } from '@/utils/config';

const Page = async ({ params }: { params: { id: string } }) => {
  const wishListId = await params.id;
  const session = await auth();

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
    return { items: [], meta: { totalItems: 0 } };
  });

  const isUserTheOwner = wishList.owner === session?.user?._id || false;
  return (
    <WishListPage
      gifts={wishListItems.items || []}
      isOwner={isUserTheOwner}
      wishList={wishList}
      totalItems={wishListItems.meta.totalItems || 0}
    />
  );
};

export default Page;
