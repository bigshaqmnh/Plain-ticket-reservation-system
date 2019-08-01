import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function Input({ label, name, type, placeholder, required, onChange }) {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
    />
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func
};

Input.defaultProps = {
  type: 'text',
  placeholder: 'Input text',
  required: false,
  onChange: null
};

export default Input;
