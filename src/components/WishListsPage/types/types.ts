import { ReactNode } from 'react';

export interface actionsType {
  component: ReactNode;
  onClick: (id: string) => () => void;
}
