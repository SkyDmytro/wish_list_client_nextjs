import { searchUser } from '@/api/searsUser/searchUser';
import { auth } from '@/auth/authSetup';
import { SearchPage } from '@/components/SearchPage/SearchPage';
import { UserType } from '@/types/user';

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const session = await auth();
  if (!slug) {
    return <div>Enter User Name</div>;
  }
  const users = await searchUser(slug, session?.user?.token || '')
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e);
      return [];
    });

  return <SearchPage usersProps={users as UserType[]} inputValueProps={slug} />;
};
export default page;
