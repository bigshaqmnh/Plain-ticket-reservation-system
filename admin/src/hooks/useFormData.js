/* eslint-disable */
import { useState, useEffect } from 'react';

import useFetchData from './useFetchData';

import getScreenProps from '../helpers/getScreenProps';
import generateFormData from '../helpers/generateFormData';

function useFormData({ path, formDataScheme, apiMethod, params, setAlert, setShowAlert }) {
  const { isShownByDefault, canEdit } = getScreenProps(path);

  const [isShown, setIsShown] = useState(isShownByDefault);

  const [formData, setFormData] = useState(generateFormData(formDataScheme));

  if (!isShownByDefault) {
    const { data, isLoading } = useFetchData(apiMethod, setAlert, setShowAlert, params);

    useEffect(() => {
      if (!isLoading) {
        const defaultFormData = generateFormData(formDataScheme, data);

        setFormData(defaultFormData);

        setIsShown(true);
      }
    }, [isLoading]);
  }

  return { formData, setFormData, isShown, canEdit };
}

export default useFormData;
