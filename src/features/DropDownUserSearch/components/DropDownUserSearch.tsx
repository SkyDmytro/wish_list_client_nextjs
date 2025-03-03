import { searchUser } from '@/api/searsUser/searchUser';
import {
  addUserToWishList,
  deleteUserFromWishList,
} from '@/api/wishListsRequests/wishListsRequests';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserType } from '@/types/user';
import { wishList } from '@/types/wishList';
import { debounced } from '@/utils/debounce';

import { useEffect, useState } from 'react';

import { PlusCircle, Search, User } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { UsersWithAccess as UsersWithAccessComponent } from './UsersWithAccess';

export const DropDownUserSearch = ({
  currentWishList,
}: {
  currentWishList: wishList;
}) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [UsersWithAccess, setUsersWithAccess] = useState<UserType[]>(
    currentWishList.usersWithAccess,
  );
  const authUser = useSession().data?.user;
  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValue(event.target.value);
  };

  const handleAddUser = async (user: UserType) => {
    try {
      await addUserToWishList(currentWishList._id, user._id, authUser?.token);
      setUsersWithAccess((prev) => [...prev, user]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (user: UserType) => {
    try {
      await deleteUserFromWishList(
        currentWishList._id,
        user._id,
        authUser?.token,
      );
      setUsersWithAccess((prev) => prev.filter((u) => u._id !== user._id));
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = async () => {
    if (!authUser) return;
    if (inputValue === '') return;
    const res = await searchUser(inputValue, authUser?.token || '');
    if (res) {
      console.log(res);
      setUsers(res as UserType[]);
    }
  };

  const debouncedSearch = debounced<unknown[], Promise<void>>(
    handleSearch,
    1000,
  );

  useEffect(() => {
    debouncedSearch();
  }, [inputValue]);

  return (
    <div className="min-h-2/3">
      <div className="my-2">
        <UsersWithAccessComponent
          users={UsersWithAccess}
          onRemove={handleDeleteUser}
        />
      </div>
      <h4 className="mb-2 text-lg  text-white">Search users</h4>
      <div className="input relative flex gap-2 items-center">
        <Search className="w-6 h-6 absolute left-2" />
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search for users"
          className="pl-8"
        />
      </div>
      <ScrollArea className="h-[300px] mt-3 rounded-md">
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user._id}
              className="group transition-colors duration-200"
              onClick={() => {
                console.log('click1');
              }}
            >
              <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-700/20 hover:bg-gray-700 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#2c2e33] group-hover:bg-[#363a41] rounded-full p-1.5 transition-colors duration-200">
                    <User className="w-5 h-5 text-gray-300" />
                  </div>
                  <div className="font-medium text-gray-200">{user.name}</div>
                </div>
                <PlusCircle
                  onClick={() => handleAddUser(user)}
                  className="w-5 h-5 z-10 text-purple-400  transition-opacity duration-200"
                />
              </div>
            </div>
          ))}
          {users.length === 0 && (
            <div className="text-center text-gray-400 py-8">No users found</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
