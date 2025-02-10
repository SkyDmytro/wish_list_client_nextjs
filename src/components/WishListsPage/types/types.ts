import { GiftItem } from '@/types/wishList';

import { ReactNode } from 'react';

export interface actionsType {
  component: ReactNode;
  onClick: (item: string | GiftItem) => () => void;
  isVisible?: (item: GiftItem) => boolean;
}
