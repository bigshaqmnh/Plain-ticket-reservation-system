import * as React from 'react';
import TextField from '@material-ui/core/TextField';

interface IInputProps {
  key?: string | number;
  label: string;
  name?: string;
  className?: string;
  type?: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

function Input({
  label,
  name,
  className = 'input',
  type = 'text',
  value = '',
  placeholder = 'Input value',
  required = false,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  disabled
}: IInputProps): JSX.Element {
  return (
    <TextField
      label={label}
      name={name}
      className={className}
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      error={error}
      helperText={helperText}
      disabled={disabled}
      autoComplete="off"
    />
  );
}

export default Input;
