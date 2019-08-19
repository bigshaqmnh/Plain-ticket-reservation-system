import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function CustomButton({ variant, text, type, onClick, disabled }) {
  return (
    <Button variant={variant} type={type} onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
}

CustomButton.propTypes = {
  variant: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

CustomButton.defaultProps = {
  variant: null,
  type: 'button',
  onClick: null,
  disabled: false
};

export default CustomButton;
