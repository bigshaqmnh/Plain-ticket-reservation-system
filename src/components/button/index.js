import React from 'react';
import { Button } from 'react-bootstrap';

function Button(props) {
  const { variant, type, text, onClick } = props;

  return (
    <Button variant={variant} type={type} onClick={onClick}>
      {text}
    </Button>
  );
}

export default Button;
