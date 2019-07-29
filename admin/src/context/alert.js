import React, { createContext, useState } from 'react';

export const AlertContext = createContext(null);

export const withAlertContext = Component => () => {
  const [alert, setAlert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <AlertContext.Provider value={{ alert, setAlert, showAlert, setShowAlert }}>
      <Component />
    </AlertContext.Provider>
  );
};
