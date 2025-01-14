import { WishListPage } from '@/components/WishListPage/WishListPage';
import { GiftItem } from '@/types/wishList';

const Page = async ({ params }: { params: { id: string } }) => {
  await params.id;
  const gifts: GiftItem[] = [
    {
      name: 'PlayStation 5',
      _id: '1',
      price: 499.99,
      link: 'https://example.com/ps5',
      priority: 'High',
      status: 'Available',
    },
    {
      name: 'Nike Air Max',
      _id: '2',
      price: 129.99,
      link: 'https://example.com/nike',
      priority: 'Medium',
      status: 'Reserved',
    },
    {
      _id: '3',
      name: 'Kindle Paperwhite',
      price: 139.99,
      link: 'https://example.com/kindle',
      priority: 'Low',
      status: 'Available',
    },
  ];
  return <WishListPage gifts={gifts} />;
};

export default Page;
