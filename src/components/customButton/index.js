import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function CustomButton(props) {
  const { variant, type, text, onClick } = props;

  return (
    <Button variant={variant} type={type} onClick={onClick}>
      {text}
    </Button>
  );
}

CustomButton.propTypes = {
  variant: PropTypes.string.isRequired,
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

CustomButton.defaultProps = {
  type: 'button'
};

export default CustomButton;
