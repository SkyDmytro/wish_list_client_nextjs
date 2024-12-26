import { Header } from '@/components/Header/Header';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wish List',
  description:
    'Wish List App - Create your wish list and share with your friends',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
