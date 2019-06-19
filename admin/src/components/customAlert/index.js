import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

function CustomAlert({ props }) {
  const { variant, heading, mainText, isShown } = props;

  const handleDismiss = () => isShown(false);

  return (
    <Alert variant={variant} onClose={handleDismiss} dismissible>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{mainText}</p>
    </Alert>
  );
}

CustomAlert.propTypes = {
  props: PropTypes.shape({}).isRequired,
  variant: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  mainText: PropTypes.string.isRequired,
  isShown: PropTypes.func.isRequired
};

export default CustomAlert;
