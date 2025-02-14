import { Input } from '@/components/ui/input';

import { KeyboardEvent } from 'react';

import { SearchIcon } from 'lucide-react';

export const Search = () => {
  const handleEnter = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      const inputField = event.target as HTMLInputElement;
      const query = inputField.value;
      if (query) {
        window.location.href = `/search/${encodeURIComponent(query)}`;
      }
    }
  };
  return (
    <div className="relative w-full h-full flex items-center gap-2">
      <SearchIcon className="absolute left-2" />
      <Input
        placeholder="Search..."
        className="pl-10 border-0 rounded-full focus:border-white focus:border-2"
        onKeyUp={handleEnter}
      />
    </div>
  );
};
