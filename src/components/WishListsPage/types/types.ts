import { ReactNode } from 'react';

export interface actionsType<T> {
  component: (item: T) => ReactNode;
  onClick: (item: T) => () => void;
  isVisible?: (item: T) => boolean;
}
