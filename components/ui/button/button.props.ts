import type { ReactNode } from 'react';

export interface ButtonProps {
  className?: string;
  icon?: ReactNode;
  isDisabled?: boolean;
  label: string;
  onClick: () => void;
}
