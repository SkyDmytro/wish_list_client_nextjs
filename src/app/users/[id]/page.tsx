import { auth } from '@/auth/authSetup';
import { UserPage } from '@/components/UserPage/UserPage';
import { UserType } from '@/types/user';
import { API_URL } from '@/utils/config';

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

  return <UserPage userProps={user} />;
};

export default Page;
