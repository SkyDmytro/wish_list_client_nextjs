import { getRequest } from '@/api/requests';
import { auth } from '@/auth/authSetup';
import { UserPage } from '@/components/UserPage/UserPage';
import { FriendResponse, UserType } from '@/types/user';
import { WishListResponse } from '@/types/wishList';
import { API_URL, wishlistUrl } from '@/utils/config';

import { NextPage } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const id = (await params).id;
//   // Fetch user data here if needed
//   return {
//     title: `User ${id}`,
//   };
// }

const Page: NextPage<PageProps> = async ({ params }) => {
  const session = await auth();
  // const userId = await params.id;
  const { id: userId } = await params;

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
