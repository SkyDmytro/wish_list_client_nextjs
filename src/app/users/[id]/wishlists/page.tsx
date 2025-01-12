import { auth } from '@/auth/authSetup';
import { WishListPage } from '@/components/WishListsPage/WishListPage';
import { UserType } from '@/types/user';
import { wishList } from '@/types/wishList';

const WishlistsPage = async ({ params }: { params: { id: string } }) => {
  const userId = await params.id;
  const authUser = await auth().then((res) => res.user);
  const isUserTheOwner = authUser?._id === userId;
  console.log('authUser', authUser);
  const mockWishlists: wishList[] = [
    {
      _id: '1',
      title: 'Wishlist 1',
      owner: userId,
      createdAt: '2025-01-07T12:31:02.208+00:00',
      updatedAt: '2025-01-07T12:31:02.208+00:00',
    },
    {
      _id: '2',
      title: 'Wishlist 2',
      owner: userId,
      createdAt: '2025-01-07T12:31:02.208+00:00',
      updatedAt: '2025-01-09T12:31:02.208+00:00',
    },
    {
      _id: '3',
      title: 'Wishlist 3',
      owner: userId,
      createdAt: '2025-01-07T12:31:02.208+00:00',
      updatedAt: '2025-01-08T12:31:02.208+00:00',
    },
  ];

  const wishListOwner: UserType = {
    _id: '676aac912f857f318a5a9007',
    name: 'SkyAdmin',
    email: 'skyadmin@admin.com',
    createdAt: '2023-05-30T12:31:02.208+00:00',
    updatedAt: '2023-05-30T12:31:02.208+00:00',
    __v: 0,
  };
  return (
    <WishListPage
      wishlists={mockWishlists}
      isUserTheOwner={isUserTheOwner}
      wishListOwner={wishListOwner}
    />
  );
};

export default WishlistsPage;
