'use client';

import { Input } from '@/components/ui/input';

import { LogOut, Settings } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Button } from '../../ui/button';
import { Label } from '../../ui/label';

export const UserBlock = () => {
  const authUser = useSession();

  if (authUser === null || authUser.status === 'loading') return null;

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
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              defaultValue={authUser.data?.user?.name ?? ''}
              className="border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              defaultValue={authUser.data?.user?.email}
              className="border-gray-700"
            />
          </div>

          <div className="space-y-2 space-x-2">
            <Label htmlFor="language">Interface Language</Label>
            <select
              id="language"
              defaultValue="en"
              className="border-gray-700 bg-slate-800 text-white p-2 rounded"
            >
              <option value="en">English</option>
              <option value="ua">Українська</option>
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
