import React from 'react';

import Input from '../../../../components/Input';

interface IInputAutoCompleteProps {
  label: string;
  name: string;
  type?: string;
  value?: string;
  placeholder: string;
  required?: boolean;
  onChange: any;
}

function InputAutoComplete({
  label,
  name,
  type,
  value,
  placeholder,
  required,
  onChange
}: IInputAutoCompleteProps): JSX.Element {
  return (
    <Input
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

export default InputAutoComplete;
