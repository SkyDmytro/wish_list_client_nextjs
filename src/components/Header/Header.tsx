'use client';

import '@/components/ui/dropdown-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Gift, LogOut, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Button } from '../ui/button';

export const Header = () => {
  const { data: session } = useSession();
  const userId = session?.user?._id || session?.user?.id;
  console.log(userId);

  if (!userId) {
    return (
      <header className="flex items-center justify-between p-4 bg-gray-900 text-white h-[68px]">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl text-gray-300 ">
            <span className="font-bold">Sky</span>
            Wishes
          </h1>
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl text-gray-300 ">
          <span className="font-bold">Sky</span>
          Wishes
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="default"
          className="relative rounded-full sm:hidden md:block"
        >
          <Link
            href={`/users/${userId}/wishlists`}
            className="flex gap-2 items-center "
          >
            My Lists
            <Gift />
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
            >
              <User className="h-full w-full" />
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link
                href={`/users/${userId}`}
                className="flex w-full cursor-pointer items-center"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/users/${userId}/wishlists`}
                className="flex w-full cursor-pointer items-center sm:flex md:hidden"
              >
                <Gift className="mr-2 h-4 w-4" />
                My Lists
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                signOut();
              }}
              className="flex cursor-pointer items-center text-red-500 focus:text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
