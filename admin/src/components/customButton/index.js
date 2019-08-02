import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function CustomButton({ variant, text, onClick, disabled }) {
  return (
    <Button variant={variant} onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
}

CustomButton.propTypes = {
  variant: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

CustomButton.defaultProps = {
  variant: null,
  onClick: null,
  disabled: false
};

export default CustomButton;
