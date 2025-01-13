import { Button } from '@/components/ui/button';

import { CircleX } from 'lucide-react';
import Link from 'next/link';

export const UserNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8 text-white flex pt-24 justify-center">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <div className="bg-gray-800 p-6 rounded-full">
          <CircleX />
        </div>

        <p className="text-3xl font-bold text-white">User Not Found</p>

        <p className="text-gray-400">
          Sorry, we couldn&apos;t find the user you&apos;re looking for. <br />
          They may have been removed or never existed.
        </p>

        <Link href="/home">
          <Button
            variant="link"
            className="mt-4 text-white bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
          >
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
