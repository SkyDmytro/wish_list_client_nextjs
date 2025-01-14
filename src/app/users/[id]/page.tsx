import { getRequest } from '@/api/requests';
import { auth } from '@/auth/authSetup';
import { UserPage } from '@/components/UserPage/UserPage';
import { UserType } from '@/types/user';
import { wishListResponse } from '@/types/wishList';
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

  const wishLists = await getRequest<wishListResponse[]>(
    `${API_URL}${wishlistUrl}/${userId}/user`,
    session?.user?.token,
  )
    .then((res) => res)
    .catch((e) => console.log(e));

  const friends = await getRequest<UserType[]>(
    `${API_URL}/api/users/${userId}/friends`,
    session?.user?.token,
  );

  return (
    <UserPage
      userProps={user || ({} as UserType)}
      friends={friends || []}
      wishlists={wishLists.items || []}
    />
  );
};

export default Page;
