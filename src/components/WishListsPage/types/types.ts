import { ReactNode } from 'react';

export interface actionsType {
  component: (item: unknown) => ReactNode;
  onClick: (item: unknown) => () => void;
  isVisible?: (item: unknown) => boolean;
}
