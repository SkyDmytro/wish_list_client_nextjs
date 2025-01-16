import { getRequest } from '@/api/requests';
import { auth } from '@/auth/authSetup';
import { UserPage } from '@/components/UserPage/UserPage';
import { FriendResponse, UserType } from '@/types/user';
import { WishListResponse } from '@/types/wishList';
import { API_URL, wishlistUrl } from '@/utils/config';

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const userId = await params.id;

  const user = await getRequest<UserType>(
    `${API_URL}/api/users/profile/${userId}`,
    session?.user?.token,
  )
    .then((res) => res)
    .catch((err) => console.log(err));

  const wishLists = await getRequest<WishListResponse>(
    `${API_URL}${wishlistUrl}/${userId}/user?page=1&pageSize=3`,
    session?.user?.token,
  )
    .then((res) => res)
    .catch((e) => {
      console.log(e);
      return { items: [], meta: { total: 0 } };
    });

  const friends = await getRequest<FriendResponse>(
    `${API_URL}/api/users/${userId}/friends?page=1&pageSize=3`,
    session?.user?.token,
  )
    .then((res) => res)
    .catch((e) => {
      console.log(e);
      return { items: [], meta: { total: 0 } };
    });

  return (
    <UserPage
      userProps={user || ({} as UserType)}
      friends={{
        items: friends.items,
        totalFriends: friends.meta.total,
      }}
      wishlists={{
        items: wishLists.items,
        totalWishlists: wishLists.meta.total,
      }}
    />
  );
};

export default Page;
