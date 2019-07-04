import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function CustomInput(props) {
  const { label, type, name, value, placeholder, invalidFeedback, isValid, onChange, disabled } = props;

  return (
    <Form.Group className="input">
      <Form.Label>{label}</Form.Label>

      <Form.Control
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />

      {!isValid && <Form.Text style={{ color: 'red' }}>{invalidFeedback}</Form.Text>}
    </Form.Group>
  );
}

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  invalidFeedback: PropTypes.string,
  isValid: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

CustomInput.defaultProps = {
  type: 'text',
  value: '',
  placeholder: 'Input value',
  invalidFeedback: 'Invalid input.',
  isValid: true,
  onChange: null,
  disabled: false
};

export default CustomInput;
