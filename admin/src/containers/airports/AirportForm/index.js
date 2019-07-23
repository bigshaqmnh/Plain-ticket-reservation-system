import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';
import CustomAlert from '../../../components/customAlert';

import useAlert from '../../../hooks/useAlert';

import airportApi from '../../../api/airport';

import componentStyles from '../../../constants/componentStyles';
import { airportValidationScheme } from '../../../constants/validation/schemes';

import formValidation from '../../../helpers/formValidation';
import formatFromCamelCase from '../../../helpers/formatters/formatString';
import extractFormData from '../../../helpers/extractFormData';

function AirportForm({ airport, canEdit, handleBack, handleSave }) {
  const [formData, setFormData] = useState({
    name: { value: airport.name || '', isValid: true, invalidFeedback: '' },
    country: { value: airport.country || '', isValid: true, invalidFeedback: '' },
    city: { value: airport.city || '', isValid: true, invalidFeedback: '' },
    latitude: { value: airport.latitude || 0 },
    longitude: { value: airport.longitude || 0 }
  });

  const { alert, setAlert, showAlert, setShowAlert } = useAlert();

  const handleChange = async event => {
    const { name: propName, value: propValue } = event.target;

    const validatedProp = await formValidation.validateOnChange(airportValidationScheme, propName, propValue);

    setFormData({
      ...formData,
      ...validatedProp
    });
  };

  const handleSaveClick = () => {
    const validatedForm = formValidation.validateOnSubmit(formData);

    if (!validatedForm.isValid) {
      setAlert({ ...validatedForm.alertData, isShown: setShowAlert });
      setShowAlert(true);
    } else {
      const data = extractFormData(formData);
      handleSave(data);
    }
  };

  const handleAirportSearch = async event => {
    handleChange(event);

    const { value: searchQuery } = event.target;

    const searchResults = await airportApi.searchAirports(searchQuery);

    console.log('results: ', searchResults);
  };

  return (
    <div className="form-container">
      {Object.keys(formData).map(key => {
        const { value, isValid, invalidFeedback } = formData[key];
        const isDisabled = key === 'latitude' || key === 'longitude' || !canEdit;
        const eventHandler = key === 'name' ? handleAirportSearch : handleChange;

        return (
          <CustomInput
            key={key}
            label={formatFromCamelCase(key)}
            name={key}
            value={value}
            placeholder={`Input ${formatFromCamelCase(key)}`}
            onChange={eventHandler}
            isValid={isValid}
            invalidFeedback={invalidFeedback}
            disabled={isDisabled}
          />
        );
      })}
      <div className="buttons">
        <CustomButton variant={componentStyles.default} text="Back" onClick={handleBack} />
        {canEdit && <CustomButton variant={componentStyles.success} text="Save" onClick={handleSaveClick} />}
      </div>
      {showAlert && <CustomAlert {...alert} />}
    </div>
  );
}

AirportForm.propTypes = {
  airport: PropTypes.shape({
    name: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }),
  canEdit: PropTypes.bool,
  handleSave: PropTypes.func,
  handleBack: PropTypes.func.isRequired
};

AirportForm.defaultProps = {
  airport: {},
  canEdit: true,
  handleSave: null
};

export default AirportForm;
