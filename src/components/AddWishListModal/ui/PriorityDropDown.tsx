import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useCallback } from 'react';

import { ChevronDown } from 'lucide-react';

interface PriorityDropdownProps {
  prirority: string;
  handleChange: (value: string) => void;
}

const priorityOptions = ['High', 'Medium', 'Low'] as const;

export const PriorityDropDown = ({
  prirority,
  handleChange,
}: PriorityDropdownProps) => {
  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-blue-500';
      default:
        return 'bg-blue-500';
    }
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-full justify-between bg-[#1a1f29] text-gray-200 border-gray-700 hover:bg-[#252b38]"
          variant="outline"
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${getPriorityColor(prirority)}`}
            />
            {prirority}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#1a1f29] border-gray-700" align="end">
        {priorityOptions.map((priority) => (
          <DropdownMenuItem
            key={priority}
            onClick={() => {
              handleChange(priority);
            }}
            className="hover:bg-[#252b38] text-gray-200"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${getPriorityColor(priority)}`}
              />
              {priority}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
