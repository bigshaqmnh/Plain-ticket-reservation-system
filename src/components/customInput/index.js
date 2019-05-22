import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function CustomInput(props) {
  const { label, type, name, value, placeholder, invalidFeedback, isValid, onChange } = props;

  return (
    <Form.Group className="input">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} />
      {!isValid && <Form.Text style={{ color: 'red' }}>{invalidFeedback}</Form.Text>}
    </Form.Group>
  );
}

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  invalidFeedback: PropTypes.string,
  isValid: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

CustomInput.defaultProps = {
  type: 'text',
  value: '',
  invalidFeedback: 'Invalid input.',
  isValid: true
};

export default CustomInput;
