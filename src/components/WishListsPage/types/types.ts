import { GiftItem } from '@/types/wishList';

import { ReactNode } from 'react';

export interface actionsType {
  component: <T extends GiftItem>(item: T) => ReactNode;
  onClick: <T>(item: T) => () => void;
  isVisible?: (item: GiftItem) => boolean;
}
