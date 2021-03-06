import React, { useRef, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Alert } from 'react-bootstrap';

import { AlertContext } from '../../context/alert';

import './style.scss';

function CustomAlert() {
  const alertRef = useRef(document.createElement('div'));
  const rootElem = document.getElementById('root');

  const { alert, showAlert, setShowAlert } = useContext(AlertContext);

  useEffect(() => {
    rootElem.appendChild(alertRef.current);

    return () => alertRef.current.remove();
  }, []);

  if (!showAlert) {
    return null;
  }
  const { variant, heading, mainText, disableAutoClose } = alert;

  const handleDismiss = () => setShowAlert(false);

  !disableAutoClose && setTimeout(handleDismiss, 3000);
  return createPortal(
    <Alert variant={variant} onClose={handleDismiss} dismissible>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{mainText}</p>
    </Alert>,
    alertRef.current
  );
}

export default CustomAlert;
