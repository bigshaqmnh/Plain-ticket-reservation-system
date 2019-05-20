import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function CustomButton(props) {
  const { variant, type, text } = props;

  return (
    <Button variant={variant} type={type}>
      {text}
    </Button>
  );
}

CustomButton.propTypes = {
  variant: PropTypes.string.isRequired,
  type: PropTypes.string,
  text: PropTypes.string.isRequired
};

CustomButton.defaultProps = {
  type: 'button'
};

export default CustomButton;
