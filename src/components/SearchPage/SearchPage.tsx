'use client';

import { usersApi } from '@/entities/user';
import { UserType } from '@/entities/user/types/user';

import { useState } from 'react';

import { SearchIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { UserCard } from './ui/UserCard';

export const SearchPage = ({
  inputValueProps,
  usersProps,
}: {
  inputValueProps: string;
  usersProps: UserType[];
}) => {
  const [inputValue, setInputValue] = useState(inputValueProps);
  const [users, setUsers] = useState<UserType[]>(usersProps);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValue(event.target.value);

    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    setUsers(filteredUsers);
  };

  const handleSearch = async () => {
    if (!inputValue) return;
    const res = await usersApi.getUsers(inputValue);
    setUsers(res.data);
  };

  return (
    <div className="text-white h-full flex items-center flex-col">
      <div className="relative w-1/2 pt-10 pb-5  flex items-center">
        <div className="w-full relative  flex items-center gap-2">
          <Input
            value={inputValue}
            className="p-2"
            onChange={handleInputChange}
            placeholder="Search by name"
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </div>
        <Button variant="ghost" size="icon" className="" onClick={handleSearch}>
          <SearchIcon className=" " />
        </Button>
      </div>
      {users.length === 0 && <p className="text-gray-400">No users found</p>}
      {users.map((user) => (
        <Link key={user.id} href={`/users/${user.id}`} className="w-1/2 mb-2">
          <UserCard key={user.id} name={user.name} />
        </Link>
      ))}
    </div>
  );
};
