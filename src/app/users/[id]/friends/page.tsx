import { FriendsPage } from '@/components/FriendsPage/FriendsPage';
import { friendsApi } from '@/features/friends';

const page = async ({ params }: { params: { id: string } }) => {
  const { id: userId } = await params;

  const friends = await friendsApi
    .getFriends(userId, 1, 3)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log(e);
      return {
        items: {
          friends: [],
          requestsReceived: [],
          requestsSent: [],
        },
        total: 0,
      };
    });

  return <FriendsPage friendsProps={friends} />;
};

export default page;
