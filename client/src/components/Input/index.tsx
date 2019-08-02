import * as React from 'react';
import TextField from '@material-ui/core/TextField';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  onChange: any;
}

function Input({
  label,
  name,
  type = 'text',
  value = '',
  placeholder = 'Input value',
  required = false,
  onChange
}: InputProps): JSX.Element {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
    />
  );
}

export default Input;
