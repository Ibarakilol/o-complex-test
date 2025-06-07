export interface InputProps {
  isDisabled?: boolean;
  isValid?: boolean;
  mask?: string;
  maskPlaceholder?: string;
  maxLength?: number;
  placeholder?: string;
  rows?: number;
  value: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
  onFocus?: () => void;
}
