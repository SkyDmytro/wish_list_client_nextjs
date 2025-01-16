import { getRequest } from '@/api/requests';
import { auth } from '@/auth/authSetup';
import { WishListsPage } from '@/components/WishListsPage/WishListsPage';
import { UserNotFound } from '@/components/WishListsPage/ui/UserNotFound';
import { UserType } from '@/types/user';
import { wishListResponse } from '@/types/wishList';
import { API_URL, wishlistUrl } from '@/utils/config';

const WishlistsPage = async ({ params }: { params: { id: string } }) => {
  const userId = await params.id;
  const authUser = await auth().then((res) => res.user as UserType);
  const isUserTheOwner = authUser?._id === userId;
  const user = await getRequest<UserType>(
    `${API_URL}/api/users/profile/${userId}`,
    authUser?.token,
  )
    .then((res) => res)
    .catch((err) => console.log(err));

  const wishLists = await getRequest<wishListResponse[]>(
    `${API_URL}${wishlistUrl}/${userId}/user?page=1&pageSize=10`,
    authUser?.token,
  )
    .then((res) => res)
    .catch((e) => console.log(e));

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
