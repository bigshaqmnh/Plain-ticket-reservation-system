import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function CustomButton(props) {
  const { variant, type, text, onClick, isDisabled } = props;

  return isDisabled ? (
    <Button variant={variant} type={type} onClick={onClick} disabled>
      {text}
    </Button>
  ) : (
    <Button variant={variant} type={type} onClick={onClick}>
      {text}
    </Button>
  );
}

CustomButton.propTypes = {
  variant: PropTypes.string.isRequired,
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool
};

CustomButton.defaultProps = {
  type: 'button',
  onClick: null,
  isDisabled: false
};

export default CustomButton;
