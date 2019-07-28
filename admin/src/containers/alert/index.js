import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertContext, withAlertContext } from '../../context/alert';
import CustomAlert from '../../components/customAlert';

const alertRef = useRef(document.getElementById('alert'));
const rootElem = document.getElementById('root');

function AlertContainer({ children }) {
  useEffect(() => {
    rootElem.appendChild(alertRef.current);

    return () => alertRef.current.remove();
  }, []);

  return alertRef.current;

  return (
    <AlertContext.Consumer>{({ alert, showAlert }) => showAlert && <CustomAlert {...alert} />}</AlertContext.Consumer>
  );
}

export default withAlertContext(AlertContainer);
