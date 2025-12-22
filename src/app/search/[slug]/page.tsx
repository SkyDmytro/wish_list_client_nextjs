import { SearchPage } from '@/components/SearchPage/SearchPage';
import { usersApi } from '@/entities/user';

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  if (!slug) {
    return <div>Enter User Name</div>;
  }

  const users = await usersApi.getUsers(slug);

  return <SearchPage usersProps={users.data} inputValueProps={slug} />;
};
export default page;
