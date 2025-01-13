import { getRequest } from '@/api/requests';
import { auth } from '@/auth/authSetup';
import { WishListPage } from '@/components/WishListsPage/WishListPage';
import { UserType } from '@/types/user';
import { wishListResponse } from '@/types/wishList';
import { API_URL, wishlistUrl } from '@/utils/config';

const WishlistsPage = async ({ params }: { params: { id: string } }) => {
  const userId = await params.id;
  const authUser = await auth().then((res) => res.user);
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
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-semibold">User not found</h1>
      </div>
    );
  }

  return (
    <WishListPage
      wishlists={wishLists.items || []}
      isUserTheOwner={isUserTheOwner}
      wishListOwner={user}
    />
  );
};

export default WishlistsPage;
