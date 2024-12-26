import { Header } from '@/components/Header/Header';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SkyWishes - User Profile',
  description: 'SkyWishes - View and manage your user profile',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
