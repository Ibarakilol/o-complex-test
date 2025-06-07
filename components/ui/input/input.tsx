'use client';

import { type ChangeEvent, useCallback, useId, useState } from 'react';
import InputMask from '@mona-health/react-input-mask';
import clsx from 'clsx';

import Placeholder from './components/placeholder';

import type { InputProps } from './input.props';

import styles from './input.module.scss';

interface InputState {
  value: string;
  selection: { start: number; end: number };
}

const Input = ({
  isDisabled,
  isValid = true,
  mask = '',
  maskPlaceholder,
  maxLength,
  placeholder,
  rows,
  value,
  onBlur,
  onChange,
  onFocus,
}: InputProps) => {
  const id = useId();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue = event.currentTarget.value;
      onChange(inputValue);
    },
    [onChange]
  );

  const beforeMaskedStateChangeHandler = (nextState: InputState) => {
    const { value, selection } = nextState;
    let newSelection =
      mask.replaceAll(/9/g, maskPlaceholder!) === value || !selection
        ? { start: 0, end: 0 }
        : selection;

    while (
      value[newSelection.start] === mask[newSelection.start] &&
      newSelection.start < value.length &&
      newSelection.end < value.length
    ) {
      newSelection = { start: newSelection.start + 1, end: newSelection.end + 1 };
    }

    return {
      value,
      selection: newSelection,
    };
  };

  const renderInput = () => {
    return !!rows ? (
      <textarea
        className={clsx(styles.inputTextarea, 'scrollbar')}
        disabled={isDisabled}
        id={id}
        maxLength={maxLength}
        rows={rows}
        value={value}
        onBlur={handleBlur}
        onChange={handleInputChange}
        onFocus={handleFocus}
      />
    ) : mask ? (
      <InputMask
        beforeMaskedStateChange={({ nextState }: { nextState: any }) =>
          beforeMaskedStateChangeHandler(nextState)
        }
        className={styles.inputField}
        disabled={isDisabled}
        id={id}
        mask={mask}
        maskPlaceholder={maskPlaceholder}
        maxLength={maxLength}
        value={value}
        onBlur={handleBlur}
        onChange={handleInputChange}
        onFocus={handleFocus}
      />
    ) : (
      <input
        className={styles.inputField}
        disabled={isDisabled}
        id={id}
        maxLength={maxLength}
        value={value}
        onBlur={handleBlur}
        onChange={handleInputChange}
        onFocus={handleFocus}
      />
    );
  };

  return (
    <div
      className={clsx(styles.input, {
        [styles.inputDisabled]: isDisabled,
        [styles.inputInvalid]: !isValid,
        [styles.inputMulti]: !!rows,
      })}
    >
      {placeholder && (
        <Placeholder
          hide={!!value || isFocused}
          htmlFor={id}
          isValid={isValid}
          placeholder={placeholder}
        />
      )}
      {renderInput()}
    </div>
  );
};

export default Input;
