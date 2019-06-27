import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import CustomAlert from '../../components/customAlert';
import componentStyles from '../../constants/componentStyles';
import formValidation from '../../helpers/formValidation';
import { flightValidationScheme } from '../../constants/validation/schemes';
import stringFormatter from '../../helpers/stringFormatter';

function FlightAdd(props) {
  const { handleSave, handleBack } = props;

  const [formData, setFormData] = useState({
    departureTime: { value: '', isValid: true, invalidFeedback: '' },
    arrivalTime: { value: '', isValid: true, invalidFeedback: '' },
    luggageOverweightCost: { value: '', isValid: true, invalidFeedback: '' },
    isCancelled: false,
    departureAirport: { value: '', isValid: true, invalidFeedback: '' },
    arrivalAirport: { value: '', isValid: true, invalidFeedback: '' },
    airplane: { value: '', isValid: true, invalidFeedback: '' }
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({});

  const handleChange = async event => {
    const { name: propName, value: propValue } = event.target;

    const validatedProp = await formValidation.validateOnChange(flightValidationScheme, propName, propValue);

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
      const data = {
        name: formData.name.value,
        type: formData.type.value,
        maxLuggageCarryWeight: formData.maxLuggageCarryWeight.value
      };
      handleSave(data);
    }
  };

  return (
    <>
      {Object.keys(formData).map(key => (
        <CustomInput
          key={key}
          label={stringFormatter.toRegular(key)}
          name={key}
          value={formData[key].value}
          placeholder={`Input ${stringFormatter.toRegular(key)}`}
          onChange={handleChange}
          isValid={formData[key].isValid}
          invalidFeedback={formData[key].invalidFeedback}
        />
      ))}
      <CustomButton variant={componentStyles.default} text="Back" onClick={handleBack} />
      <CustomButton variant={componentStyles.success} text="Save" onClick={handleSaveClick} />
      {showAlert && <CustomAlert props={alert} />}
    </>
  );
}

FlightAdd.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
};

export default FlightAdd;
