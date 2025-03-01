import { SettingsPage } from '@/components/SettingsPage/SettingsPage';
import { UserType } from '@/types/user';

export const Page = () => {
  const user: UserType = {
    _id: '1',
    name: 'skael',
    email: 'skael@gmail.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    friendsRequestsReceived: [],
    friendsRequestsSent: [],
    friends: [],
    __v: 0,
  };
  return <SettingsPage user={user} />;
};
export default Page;
