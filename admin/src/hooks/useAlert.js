import { useState } from 'react';

function useAlert() {
  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  return { alert, setAlert, showAlert, setShowAlert };
}

export default useAlert;
