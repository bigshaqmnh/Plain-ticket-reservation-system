import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';
import CustomAlert from '../../../components/customAlert';

import useAlert from '../../../hooks/useAlert';

import componentStyles from '../../../constants/componentStyles';
import { airplaneValidationScheme } from '../../../constants/validation/schemes';

import formValidation from '../../../helpers/formValidation';
import formatString from '../../../helpers/formatters/formatString';
import extractFormData from '../../../helpers/extractFormData';

function AirplaneAdd(props) {
  const { handleSave, handleBack } = props;

  const [formData, setFormData] = useState({
    name: { value: '', isValid: true, invalidFeedback: '' },
    type: { value: '', isValid: true, invalidFeedback: '' },
    maxLuggageCarryWeight: { value: '', isValid: true, invalidFeedback: '' }
  });

  const { alert, setAlert, showAlert, setShowAlert } = useAlert();

  const handleChange = async event => {
    const { name: propName, value: propValue } = event.target;

    const validatedProp = await formValidation.validateOnChange(airplaneValidationScheme, propName, propValue);

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
    <>
      {Object.keys(formData).map(key => (
        <CustomInput
          key={key}
          label={formatString(key)}
          name={key}
          value={formData[key].value}
          placeholder={`Input ${formatString(key)}`}
          onChange={handleChange}
          isValid={formData[key].isValid}
          invalidFeedback={formData[key].invalidFeedback}
        />
      ))}
      <CustomButton variant={componentStyles.default} text="Back" onClick={handleBack} />
      <CustomButton variant={componentStyles.success} text="Save" onClick={handleSaveClick} />
      {showAlert && <CustomAlert {...alert} />}
    </>
  );
}

AirplaneAdd.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
};

export default AirplaneAdd;
