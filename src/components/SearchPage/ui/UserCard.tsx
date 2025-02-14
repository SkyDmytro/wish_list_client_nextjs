import { User2Icon } from 'lucide-react';

export const UserCard = ({ name }: { name: string }) => {
  return (
    <div
      key={name}
      className="flex items-center space-x-3 rounded-lg border border-gray-800 bg-gray-900/50 p-3 w-full"
    >
      <div className="h-10 w-10 rounded-full bg-gray-800  overflow-hidden">
        <User2Icon className="h-10 w-10 " color="gray" />
      </div>
      <div>
        <p className="text-sm font-medium text-white">{name}</p>
      </div>
    </div>
  );
};
