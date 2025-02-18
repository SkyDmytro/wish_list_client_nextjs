'use client';

import { UserType } from '@/types/user';

import { User, X } from 'lucide-react';

interface UsersWithAccessProps {
  users: UserType[];
  onRemove?: (user: UserType) => void;
}

export const UsersWithAccess = ({ users, onRemove }: UsersWithAccessProps) => {
  return (
    <>
      <h4 className="mb-2 text-lg  text-white">Users with access</h4>
      <ul className="flex flex-wrap gap-2">
        {users.map((user) => (
          <li
            key={user._id}
            className="group flex items-center gap-2   bg-gray-700/20 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <div className=" group-hover:bg-gray-600 rounded-full p-1 transition-colors duration-200">
                <User className="w-4 h-4 text-gray-300" />
              </div>
              <span className="text-sm font-medium text-gray-200">
                {user.name}
              </span>
            </div>
            {onRemove && (
              <button
                onClick={() => onRemove(user)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-purple-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </li>
        ))}
        {users.length === 0 && (
          <li className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-400">
            <div className="rounded-full p-1">
              <User className="w-4 h-4 text-gray-500" />
            </div>
            <span>No users with access</span>
          </li>
        )}
      </ul>
    </>
  );
};
