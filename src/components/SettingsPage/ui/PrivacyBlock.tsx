import { Key, Shield } from 'lucide-react';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

export const PrivacyBlock = () => {
  return (
    <div className="border border-gray-800 p-6 rounded-lg">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Shield className="mr-2 h-5 w-5" />
          <h2 className="text-lg font-medium">Security & Privacy</h2>
        </div>
        <p className="text-gray-400">
          Manage your security settings and privacy preferences
        </p>
      </div>
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <Key className="mr-2 h-5 w-5" />
            Password
          </h3>
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              className="border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              className="border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              className="border-gray-700"
            />
          </div>
          <Button variant="ghost" className="mt-2 border border-gray-700 ">
            Change Password
          </Button>
        </div>
      </div>
      <div className=" border-t border-gray-800 flex justify-end pt-4 mt-4">
        <Button variant="ghost" className="border border-gray-700 ">
          Save Privacy Settings
        </Button>
      </div>
    </div>
  );
};
