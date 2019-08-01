import React from 'react';

import Input from '../../../../components/Input';

function InputAutoComplete({ label, name, type, placeholder, required, onChange }) {
  return (
    <Input label={label} name={name} type={type} placeholder={placeholder} required={required} onChange={onChange} />
  );
}

export default InputAutoComplete;
