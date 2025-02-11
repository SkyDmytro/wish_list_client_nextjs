import { ReactNode } from 'react';

export interface actionsType {
  component: ReactNode;
  onClick: (item: unknown) => () => void;
  isVisible?: (item: unknown) => boolean;
}
