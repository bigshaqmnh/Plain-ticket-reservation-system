import React from 'react';

import Input from '../../../../components/Input';

interface InputAutoCompleteProps {
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
  placeholder,
  required,
  onChange
}: InputAutoCompleteProps): JSX.Element {
  return (
    <Input label={label} name={name} type={type} placeholder={placeholder} required={required} onChange={onChange} />
  );
}

export default InputAutoComplete;
