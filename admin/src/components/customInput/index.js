import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import stringFormatter from '../../helpers/stringFormatter';

function CustomInput(props) {
  const { label, type, name, value, placeholder, invalidFeedback, isValid, onChange, isDisabled } = props;

  return (
    <Form.Group className="input">
      <Form.Label>{stringFormatter.toRegular(label)}</Form.Label>
      {isDisabled ? (
        <Form.Control
          type={type}
          name={name}
          value={value}
          placeholder={stringFormatter.toRegular(placeholder)}
          onChange={onChange}
          disabled
        />
      ) : (
        <Form.Control
          type={type}
          name={name}
          value={value}
          placeholder={stringFormatter.toRegular(placeholder)}
          onChange={onChange}
        />
      )}
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
  isDisabled: PropTypes.bool
};

CustomInput.defaultProps = {
  type: 'text',
  value: '',
  placeholder: 'Input value',
  invalidFeedback: 'Invalid input.',
  isValid: true,
  onChange: null,
  isDisabled: false
};

export default CustomInput;
