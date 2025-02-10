import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GiftItem } from '@/types/wishList';

import { Menu } from 'lucide-react';

import { actionsType } from '../WishListsPage/types/types';
import { Button } from '../ui/button';

export const WishListItemsTableActionsDropDown = ({
  actions,
  item,
}: {
  item: GiftItem;
  actions: actionsType[];
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={'icon'}
          className="bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300 rounded-full"
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" bg-slate-900 border border-slate-800 rounded-md"
        align="end"
      >
        {actions.map(
          (action, index) =>
            action.isVisible &&
            action.isVisible(item) && (
              <DropdownMenuItem
                className="cursor-pointer w-full justify-start text-slate-400 hover:text-slate-300 hover:bg-slate-800 p-0 m-0"
                key={index}
                onClick={action.onClick(item)}
              >
                {action.component}
              </DropdownMenuItem>
            ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
