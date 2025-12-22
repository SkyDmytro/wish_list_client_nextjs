'use client';

import { ModalInput } from '@/components/ui/ModalInput';
import { Button } from '@/components/ui/button';
import { UserType } from '@/entities/user/types/user';

import { Label } from '@radix-ui/react-label';
import { LogOut, Settings } from 'lucide-react';

export const UserBlock = ({ user }: { user?: UserType }) => {
  if (!user) return null;

  return (
    <div className="border border-gray-800 p-6 rounded-lg">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Settings className="mr-2 h-5 w-5" />
          <h2 className="text-lg font-medium">Account Settings</h2>
        </div>
        <p className="text-gray-400">
          Manage your account information and preferences
        </p>
      </div>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <ModalInput
              onChange={() => {}}
              labelText="Username"
              inputId="username"
              inputType="text"
              inputValue={user?.name ?? ''}
              className="border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <ModalInput
              onChange={() => {}}
              labelText="Email Address"
              inputId="email"
              inputType="email"
              inputValue={user?.email ?? ''}
              className="border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="language"
              className="text-sm font-medium text-gray-300"
            >
              Language
            </Label>
            <select
              id="language"
              className="w-full p-2 rounded-md border-gray-700 bg-[#1a1f29] text-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-gray-500"
            >
              <option value="en">English</option>
              <option value="es">Ukrainian</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <h3 className="text-lg font-medium flex items-center mb-4">
            <LogOut className="mr-2 h-5 w-5 text-red-400" />
            Account Actions
          </h3>
          <div className="space-y-4 space-x-2">
            <Button
              variant="destructive"
              className="hover:bg-red-600 text-white"
            >
              Delete Account Permanently
            </Button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 flex justify-end pt-4 mt-4">
        <Button variant="ghost" className="border border-gray-700 text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );
};
