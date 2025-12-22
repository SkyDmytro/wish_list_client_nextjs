import { UserPage } from '@/components/UserPage/UserPage';
import { usersApi } from '@/entities/user/api/users.api';
import { createClient } from '@/utils/supabase/server';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id: userId } = await params;

  const { data: user } = await usersApi.getUser(userId);

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!user) {
    return <div>User not found</div>;
  }

  const friendsList = user.friends || [];
  const totalFriends = friendsList.length;

  return (
    <UserPage
      sessionUser={data.user || null}
      userProps={user}
      friends={{
        items: friendsList,
        totalFriends,
      }}
      wishlists={{
        items: [],
        totalWishlists: 0,
      }}
    />
  );
}
