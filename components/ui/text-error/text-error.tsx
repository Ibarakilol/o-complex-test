import type { TextErrorProps } from './text-error.props';

import styles from './text-error.module.scss';

const TextError = ({ textError }: TextErrorProps) => {
  return <span className={styles.textError}>{textError}</span>;
};

export default TextError;
