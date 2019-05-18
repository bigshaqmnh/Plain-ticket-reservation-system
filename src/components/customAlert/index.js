import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

function CustomAlert(props) {
  const { variant, heading, mainText, handleDismiss } = props;

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
  handleDismiss: PropTypes.func.isRequired
};

export default CustomAlert;
