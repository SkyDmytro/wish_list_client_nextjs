import { SettingsPage } from '@/components/SettingsPage/SettingsPage';
import { UserType } from '@/entities/user/types/user';

export const Page = () => {
  const user: UserType = {
    id: '1',
    name: 'skael',
    email: 'skael@gmail.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    friends_requests_received: [],
    friends_requests_sent: [],
    friends: [],
    avatar: null,
  };
  return <SettingsPage userProps={user} />;
};
export default Page;
