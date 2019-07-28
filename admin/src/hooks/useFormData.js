import { useState, useEffect } from 'react';

import useFetchData from '../hooks/useFetchData';

import getScreenProps from '../helpers/getScreenProps';
import generateFormData from '../helpers/generateFormData';

function useFormData({ path, formDataScheme, apiMethod, params }) {
  const { isShownByDefault, canEdit } = getScreenProps(path);

  const [isShown, setIsShown] = useState(isShownByDefault);

  const [formData, setFormData] = useState({});

  if (!isShownByDefault) {
    const { data, isLoading } = useFetchData(apiMethod, setAlert, setShowAlert, {
      params
    });

    useEffect(() => {
      if (!isLoading) {
        const defaultFormData = generateFormData(formDataScheme, data);

        setFormData(defaultFormData);

        setIsShown(true);
      }
    }, [isLoading]);
  } else {
    const defaultFormData = generateFormData(formDataScheme);

    setFormData(defaultFormData);
  }

  return { formData, setFormData, isShown, canEdit };
}

export default useFormData;
