import React from 'react';
import { Button } from 'react-bootstrap';

function Button(props) {
  const { variant, type, text, isDisabled, onClick } = props;

  return (
    <Button
      variant={variant}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default Button;
