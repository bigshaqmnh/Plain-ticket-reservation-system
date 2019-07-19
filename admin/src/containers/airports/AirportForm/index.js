import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';
import CustomAlert from '../../../components/customAlert';

import useAlert from '../../../hooks/useAlert';

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
    latitude: { value: airport.latitude || '' },
    longitude: { value: airport.longitude || '' }
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

  return (
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
