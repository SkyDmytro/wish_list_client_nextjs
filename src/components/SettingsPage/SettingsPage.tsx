'use client';

import { UserType } from '@/entities/user/types/user';
import { cn } from '@/lib/cn';
import { isUnderDevelopment } from '@/utils/helpers';

import { ReactNode, useMemo, useState } from 'react';

import { Lock, User } from 'lucide-react';

import { Button } from '../ui/button';
import { PrivacyBlock } from './ui/PrivacyBlock';
import { UserBlock } from './ui/UserBlock';

type SettingsBlockType = 'user' | 'privacy';

export const SettingsPage = ({ userProps }: { userProps: UserType }) => {
  const SettingsBlockToComponent: Record<SettingsBlockType, ReactNode> =
    useMemo(
      () => ({
        user: <UserBlock user={userProps} />,
        privacy: <PrivacyBlock />,
      }),
      [userProps],
    );

  const [currentBlock, setCurrentBlock] = useState<SettingsBlockType>('user');
  const isDev = isUnderDevelopment();

  if (!isDev) {
    return <div className="text-white">Under Development</div>;
  }

  return (
    <div className="text-white flex flex-1">
      <div className="w-1/6 h-full p-4">
        <div className="text-lg font-bold mb-4">Settings</div>
        <div className="flex flex-col space-y-2">
          <Button
            variant="ghost"
            className={cn(
              currentBlock === 'user' ? 'bg-[#252a3a] text-white' : '',
              'justify-start',
            )}
            onClick={() => setCurrentBlock('user')}
          >
            <User className="mr-2 h-4 w-4" />
            User
          </Button>
          <Button
            variant="ghost"
            className={cn(
              currentBlock === 'privacy' ? 'bg-[#252a3a]' : '',
              'justify-start',
            )}
            onClick={() => setCurrentBlock('privacy')}
          >
            <Lock className="mr-2 h-4 w-4" />
            Privacy
          </Button>
        </div>
      </div>
      <div className="w-full p-4">{SettingsBlockToComponent[currentBlock]}</div>
    </div>
  );
};
