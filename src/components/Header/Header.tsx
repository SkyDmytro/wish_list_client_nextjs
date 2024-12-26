'use client';

import decodeJWT from '@/utils/decodeJwt';

import { Gift, Search } from 'lucide-react';
import Link from 'next/link';

export const Header = () => {
  // TODO: get user id from User Store not from local storage
  const token = localStorage.getItem('jwt');
  const id = token ? decodeJWT(token)._id : null;
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <div className="flex items-center gap-2">
        {/* <Image src="/logo.png" alt="Wish List" width={100} height={100} /> */}
        <h1 className="text-2xl text-gray-300 ">
          <span className="text-gray-300 font-bold">Sky</span>
          Wishes
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/search">
          <Search />
        </Link>
        <Link href={`/users/${id}/wishlists`}>
          <Gift />
        </Link>
      </div>
    </header>
  );
};
