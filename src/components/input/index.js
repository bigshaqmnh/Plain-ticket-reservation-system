import React from 'react';
import { Form } from 'react-bootstrap';

function Input(props) {
  const { label, type, placeholder, infoText, onChange } = props;

  return (
    <Form.Group className="input">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} placeholder={placeholder} />
      {infoText && <Form.Text className="input-text">{infoText}</Form.Text>}
    </Form.Group>
  );
}

export default Input;
