import type { ReactNode, SyntheticEvent } from 'react';

export interface IconButtonProps {
  className?: string;
  ariaLabel: string;
  icon: ReactNode;
  isDisabled?: boolean;
  onClick: (evt: SyntheticEvent) => void;
}
