/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';
import CustomAlert from '../../../components/customAlert';

import useFetchData from '../../../hooks/useFetchData';
import useAlert from '../../../hooks/useAlert';
import useScreen from '../../../hooks/useScreen';

import airplaneApi from '../../../api/airplane';

import componentStyles from '../../../constants/componentStyles';
import { airplaneValidationScheme } from '../../../constants/validation/schemes';

import formValidation from '../../../helpers/formValidation';
import formatFromCamelCase from '../../../helpers/formatters/formatString';
import extractFormData from '../../../helpers/extractFormData';

function AirplaneForm({ history, match }) {
  const { path, params } = match;

  const { alert, setAlert, showAlert, setShowAlert } = useAlert();

  // const { isShown, setIsShown, canEdit } = useScreen(path);

  const canEdit = path.includes('add');

  const [isShown, setIsShown] = useState(false);

  const [formData, setFormData] = useState({
    name: { value: '', isValid: true, invalidFeedback: '' },
    type: { value: '', isValid: true, invalidFeedback: '' },
    maxLuggageCarryWeight: { value: '', isValid: true, invalidFeedback: '' }
  });

  if (!canEdit) {
    const airplaneId = +params.airplaneId;

    const { items: airplane, isLoading } = useFetchData(airplaneApi.getAirplane, setAlert, setShowAlert, {
      airplaneId
    });

    useEffect(() => {
      if (!isLoading) {
        setFormData({
          name: { ...formData.name, value: airplane.name },
          type: { ...formData.type, value: airplane.type },
          maxLuggageCarryWeight: { ...formData.maxLuggageCarryWeight, value: airplane.maxLuggageCarryWeight }
        });

        setIsShown(true);
      }
    }, [isLoading]);
  }

  const handleBack = () => history.goBack();

  const handleChange = async event => {
    const { name: propName, value: propValue } = event.target;

    const validatedProp = await formValidation.validateOnChange(airplaneValidationScheme, propName, propValue);

    setFormData({
      ...formData,
      ...validatedProp
    });
  };

  const handleAddItem = async data => {
    try {
      const { data: newAirplane } = await airplaneApi.addAirplane(data);
      const maxPage = Math.ceil(itemsCount / resultsPerPageLimit);

      if (currentPage === maxPage) {
        items.length >= resultsPerPageLimit ? setCurrentPage(maxPage + 1) : setItems([...items, newAirplane]);
      } else {
        setCurrentPage(maxPage);
      }

      setAlert({
        variant: componentStyles.success,
        heading: 'Added',
        mainText: 'Airplane was successfully added.',
        isShown: setShowAlert
      });
    } catch (err) {
      setAlert({
        variant: componentStyles.error,
        heading: 'Not Added',
        mainText: 'An error occured while adding new airplane.',
        isShown: setShowAlert
      });
    } finally {
      setShowAlert(true);
      handleBack();
    }
  };

  const handleSaveClick = () => {
    const validatedForm = formValidation.validateOnSubmit(formData);

    if (!validatedForm.isValid) {
      setAlert({ ...validatedForm.alertData, isShown: setShowAlert });
      setShowAlert(true);
    } else {
      const data = extractFormData(formData);
      handleAddItem(data);
    }
  };

  return isShown ? (
    <div className="form-container">
      {Object.keys(formData).map(key => (
        <CustomInput
          key={key}
          label={formatFromCamelCase(key)}
          name={key}
          value={formData[key].value}
          placeholder={`Input ${formatFromCamelCase(key)}`}
          onChange={handleChange}
          isValid={formData[key].isValid}
          invalidFeedback={formData[key].invalidFeedback}
          disabled={!canEdit}
        />
      ))}
      <div className="buttons">
        <CustomButton variant={componentStyles.default} text="Back" onClick={handleBack} />
        {canEdit && <CustomButton variant={componentStyles.success} text="Save" onClick={handleSaveClick} />}
      </div>
      {showAlert && <CustomAlert {...alert} />}
    </div>
  ) : (
    <Spinner animation="border" />
  );
}

AirplaneForm.propTypes = {
  location: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
};

export default AirplaneForm;
