'use client';

import { currencyType } from '@/types/types';
import { currencies } from '@/utils/constants';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';

import { Button } from '../ui/button';
import { DropdownMenu } from '../ui/dropdown-menu';

export const CurrencyDropDown = ({
  currency,
  onChange,
}: {
  currency: string;
  onChange: (currency: currencyType) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-[#1a1f29] text-gray-200 border-gray-700 hover:bg-[#252b38] transition-colors duration-200"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">{currency}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-10 max-h-[180px] w-[--radix-dropdown-menu-trigger-width] overflow-y-auto bg-[#1a1f29] border border-gray-700 rounded-md shadow-lg"
        align="end"
      >
        <div className="grid">
          {Object.keys(currencies).map((currencyCode) => (
            <DropdownMenuItem
              key={currencyCode}
              onClick={() => onChange(currencyCode as currencyType)}
              className="flex items-center px-3 py-2 text-gray-200 hover:bg-[#252b38] hover:text-gray-100 cursor-pointer transition-colors duration-150 focus:bg-[#252b38] focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{currencyCode}</span>
                {currency === currencyCode && (
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
