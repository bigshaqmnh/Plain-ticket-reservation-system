import React, { createContext, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import CustomAlert from '../components/customAlert';

export const AlertContext = createContext(null);

const alertRef = useRef(document.createElement('div'));
const rootElem = document.getElementById('root');

export const withAlertContext = Component => () => {
  const [alert, setAlert] = useState({});

  useEffect(() => {
    rootElem.appendChild(alertRef.current);

    return () => alertRef.current.remove();
  }, [alert]);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      <Component />
    </AlertContext.Provider>
  );
};

import React, { useRef, useEffect } from 'react';

function AlertContainer({ children }) {
  useEffect(() => {}, []);

  return alertRef.current;

  return (
    <AlertContext.Consumer>{({ alert, showAlert }) => showAlert && <CustomAlert {...alert} />}</AlertContext.Consumer>
  );
}

export default withAlertContext(AlertContainer);
