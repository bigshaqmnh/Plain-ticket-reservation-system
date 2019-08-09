import * as React from 'react';
import TextField from '@material-ui/core/TextField';

interface IInputProps {
  key?: string | number;
  label: string;
  name?: string;
  type?: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

function Input({
  key,
  label,
  name,
  type = 'text',
  value = '',
  placeholder = 'Input value',
  required = false,
  onChange,
  error,
  helperText,
  disabled
}: IInputProps): JSX.Element {
  return (
    <TextField
      key={key}
      label={label}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      error={error}
      helperText={helperText}
      disabled={disabled}
    />
  );
}

export default Input;
