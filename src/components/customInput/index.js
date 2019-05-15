import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function CustomInput(props) {
  const { label, type, placeholder, infoText, onChange } = props;

  return (
    <Form.Group className="input">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} placeholder={placeholder} onChange={onChange} />
      {infoText && <Form.Text className="input-text">{infoText}</Form.Text>}
    </Form.Group>
  );
}

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  infoText: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

CustomInput.defaultProps = {
  type: 'text',
  infoText: ''
};

export default CustomInput;
