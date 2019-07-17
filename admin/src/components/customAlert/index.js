import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

function CustomAlert({ variant, heading, mainText, isShown }) {
  const handleDismiss = () => isShown(false);

  return (
    <Alert variant={variant} onClose={handleDismiss} dismissible>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{mainText}</p>
    </Alert>
  );
}

CustomAlert.propTypes = {
  variant: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  mainText: PropTypes.string.isRequired,
  isShown: PropTypes.func.isRequired
};

export default CustomAlert;
