'use client';

import { signIn } from 'next-auth/react';

import { GoogleAuthButton } from './ui/GoogleAuthButton';

export const OAuthComponent = () => {
  const handleAuth = (provider: 'google') => {
    signIn(provider, {
      callbackUrl: 'http://localhost:3001/api/auth/callback/google',
    });
  };
  return (
    <div className="flex justify-center">
      <GoogleAuthButton onClick={handleAuth} />
    </div>
  );
};
