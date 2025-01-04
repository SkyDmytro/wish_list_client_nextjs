'use client';

import { Gift, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export const Header = () => {
  const { data: session } = useSession();
  console.log('session', session);
  const userId = session?.user?._id || session?.user?.id;

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl text-gray-300 ">
          <span className="text-gray-300 font-bold">Sky</span>
          Wishes
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {/* <Link href="/search">
          <Search />
        </Link> */}
        <Link href={`/users/${userId}/wishlists`} className="flex gap-2 ">
          My Lists
          <Gift />
        </Link>
        <div
          className="flex items-center gap-2"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </div>
        <Link href={`/users/${userId}`}>
          <User />
        </Link>
      </div>
    </header>
  );
};
