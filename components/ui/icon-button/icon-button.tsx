import { type SyntheticEvent, useCallback } from 'react';
import clsx from 'clsx';

import type { IconButtonProps } from './icon-button.props';

import styles from './icon-button.module.scss';

const IconButton = ({ className, ariaLabel, icon, isDisabled, onClick }: IconButtonProps) => {
  const handleClick = useCallback(
    (evt: SyntheticEvent) => {
      evt.preventDefault();
      evt.stopPropagation();

      onClick(evt);
    },
    [onClick]
  );

  return (
    <button
      aria-label={ariaLabel}
      className={clsx(styles.iconButton, className, isDisabled && styles.iconButtonDisabled)}
      disabled={isDisabled}
      title={ariaLabel}
      onClick={handleClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
