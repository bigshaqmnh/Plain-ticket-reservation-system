import { useState, useEffect } from 'react';

import useFetchData from './useFetchData';

import componentStyles from '../constants/componentStyles';
import handlerOption from '../constants/handlerOptions';

import getScreenProps from '../helpers/getScreenProps';
import generateFormData from '../helpers/generateFormData';
import formValidation from '../helpers/formValidation';
import extractFormData from '../helpers/extractFormData';

function useFormData({ props, formDataScheme, formatter, validationScheme, api, setAlert, setShowAlert }) {
  const { match, history } = props;
  const { path, params } = match;

  const { isShownByDefault, canEdit } = getScreenProps(path);

  const [isShown, setIsShown] = useState(false);

  const [formData, setFormData] = useState({});

  const id = +params.id;
  const apiMethod = id ? api.getById : api.getInfo;
  const { data, isLoading } = useFetchData(apiMethod, setAlert, setShowAlert, { id }, !isShownByDefault);

  useEffect(() => {
    if (!isLoading) {
      const defaultFormData = data ? generateFormData(formDataScheme, data) : generateFormData(formDataScheme);

      setFormData(formatter ? formatter(defaultFormData) : defaultFormData);

      setIsShown(true);
    }
  }, [isLoading]);

  const handleBack = () => history.goBack();

  const handleChange = async ({ target }) => {
    const { name: propName, value: propValue } = target;

    const validatedProp = await formValidation.validateOnChange(validationScheme, propName, propValue);

    setFormData({
      ...formData,
      ...validatedProp
    });
  };

  const handleAdd = async data => {
    try {
      await api.add(data);

      setAlert({
        variant: componentStyles.success,
        heading: 'Added',
        mainText: 'Item was successfully added.'
      });
    } catch (err) {
      setAlert({
        variant: componentStyles.error,
        heading: 'Not Added',
        mainText: 'An error occured while adding new item.'
      });
    } finally {
      setShowAlert(true);
      handleBack();
    }
  };

  const handleUpdate = async (data, updateId) => {
    try {
      await api.update(data, updateId);

      setAlert({
        variant: componentStyles.success,
        heading: 'Updated',
        mainText: 'Item was successfully updated.'
      });
    } catch (err) {
      setAlert({
        variant: componentStyles.error,
        heading: 'Not Updated',
        mainText: 'An error occured while updating the item.'
      });
    } finally {
      setShowAlert(true);
      handleBack();
    }
  };

  const handleSave = (option, { itemId, logIn, updateUserContext } = {}) => {
    const validatedForm = formValidation.validateOnSubmit(formData);

    if (!validatedForm.isValid) {
      setAlert(validatedForm.alertData);
      setShowAlert(true);
    } else {
      const data = extractFormData(formData);

      switch (option) {
        case handlerOption.UPDATE_USER: {
          handleUpdate(data);
          updateUserContext(data);
          break;
        }
        case handlerOption.UPDATE_ITEM: {
          handleUpdate(data, itemId);
          break;
        }
        case handlerOption.LOG_IN: {
          logIn(data);
          break;
        }
        default: {
          handleAdd(data);
        }
      }
    }
  };

  return { formData, setFormData, isShown, canEdit, handleBack, handleChange, handleSave };
}

export default useFormData;
