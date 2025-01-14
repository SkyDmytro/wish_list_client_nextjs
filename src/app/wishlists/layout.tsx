import { Header } from '@/components/Header/Header';
import { Toast } from '@/components/ui/toast';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SkyWishes - Wish List',
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
      <Toast />
    </main>
  );
}
