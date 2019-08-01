import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import './style.scss';

function CustomInput(props) {
  const {
    label,
    refElement,
    as,
    options,
    type,
    name,
    value,
    placeholder,
    invalidFeedback,
    isValid,
    onChange,
    disabled
  } = props;

  return (
    <Form.Group className="input">
      <Form.Label>{label}</Form.Label>

      <Form.Control
        as={as}
        ref={refElement}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      >
        {options &&
          options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </Form.Control>

      {!isValid && <Form.Text className="form-text">{invalidFeedback}</Form.Text>}
    </Form.Group>
  );
}

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  refElement: PropTypes.shape({}),
  as: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
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
  refElement: null,
  as: 'input',
  options: null,
  type: 'text',
  value: '',
  placeholder: 'Input value',
  invalidFeedback: 'Invalid input.',
  isValid: true,
  onChange: null,
  disabled: false
};

export default CustomInput;
