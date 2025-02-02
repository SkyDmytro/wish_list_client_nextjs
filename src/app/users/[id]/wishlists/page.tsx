import { getRequest } from '@/api/requests';
import { auth } from '@/auth/authSetup';
import { WishListsPage } from '@/components/WishListsPage/WishListsPage';
import { UserNotFound } from '@/components/WishListsPage/ui/UserNotFound';
import { UserType } from '@/types/user';
import { WishListResponse } from '@/types/wishList';
import { API_URL, wishlistUrl } from '@/utils/config';

import { NextPage } from 'next';
import { Session } from 'next-auth';

interface PageProps {
  params: Promise<{ id: string }>;
}
const WishlistsPage: NextPage<PageProps> = async ({ params }) => {
  // const userId = await params.id;
  const { id: userId } = await params;

  const { user: authUser } = ((await auth()) as Session) || {};
  const isUserTheOwner = authUser?._id === userId;

  const user = await getRequest<UserType>(
    `${API_URL}/api/users/profile/${userId}`,
    authUser?.token,
  )
    .then((res) => res)
    .catch((err) => {
      console.log(err);
      return {} as UserType;
    });

  const wishLists = await getRequest<WishListResponse>(
    `${API_URL}${wishlistUrl}/${userId}/user?page=1&pageSize=10`,
    authUser?.token,
  )
    .then((res) => res)
    .catch((e) => {
      console.log(e);
      return {
        items: [],
        meta: { total: 0, page: 0, totalPages: 0, pageSize: 0 },
      };
    });

  if (!user) {
    return <UserNotFound />;
  }

  return (
    <WishListsPage
      wishlists={wishLists.items}
      isUserTheOwner={isUserTheOwner}
      wishListOwner={user}
      pagination={wishLists.meta}
    />
  );
};

export default WishlistsPage;
