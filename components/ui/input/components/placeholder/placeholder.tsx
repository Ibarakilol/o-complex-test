import clsx from 'clsx';

import type { PlaceholderProps } from './placeholder.props';

import styles from './placeholder.module.scss';

const Placeholder = ({ hide, htmlFor, isValid, placeholder }: PlaceholderProps) => {
  return !hide ? (
    <label
      className={clsx(styles.placeholder, !isValid && styles.placeholderInvalid)}
      htmlFor={htmlFor}
    >
      {placeholder}
    </label>
  ) : null;
};

export default Placeholder;
