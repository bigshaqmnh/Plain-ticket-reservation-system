import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function CustomButton({ variant, type, text, onClick, disabled }) {
  return (
    <Button variant={variant} type={type} onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
}

CustomButton.propTypes = {
  variant: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
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
