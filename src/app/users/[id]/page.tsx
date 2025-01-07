import { auth } from '@/auth/authSetup';
import { UserPage } from '@/components/UserPage/UserPage';
import { UserType } from '@/types/user';
import { wishList } from '@/types/wishList';
import { API_URL, wishlistUrl } from '@/utils/config';

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const userId = await params.id;
  // TODO: change the way data fetchs
  const user: UserType = await fetch(`${API_URL}/api/users/profile/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `jwt=${session?.user?.token}`,
    },
    credentials: 'include',
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const wishLists: wishList[] = await fetch(
    `${API_URL}${wishlistUrl}/${userId}/user`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `jwt=${session?.user?.token}`,
      },
      credentials: 'include',
    },
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });

  console.log(wishLists);

  return <UserPage userProps={user} friends={[]} wishlists={wishLists.items} />;
};

export default Page;
