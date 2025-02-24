import { getRequest } from '@/api/requests';
import { auth } from '@/auth/authSetup';
import { FriendsPage } from '@/components/FriendsPage/FriendsPage';
import { FriendResponse } from '@/types/user';
import { API_URL } from '@/utils/config';

const page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const { id: userId } = await params;

  const friends = await getRequest<FriendResponse>(
    `${API_URL}/api/users/${userId}/friends?page=1&pageSize=3`,
    session?.user?.token,
  )
    .then((res) => res)
    .catch((e) => {
      console.log(e);
      return {
        items: {
          friends: [],
          friendsRequestsSent: [],
          friendsRequestsReceived: [],
        },
        meta: { total: 0, page: 0, totalPages: 0 },
      };
    });

  return <FriendsPage friendsProps={friends} />;
};

export default page;
