import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import CustomAlert from '../../components/customAlert';
import componentStyles from '../../constants/componentStyles';
import formValidation from '../../helpers/formValidation';
import validationSchema from '../../constants/airplane/validationSchema';

function AirplaneAdd(props) {
  const { handleSave, handleBack } = props;

  const [formData, setFormData] = useState({
    name: { value: '', isValid: true, invalidFeedback: '' },
    type: { value: '', isValid: true, invalidFeedback: '' },
    maxLuggageCarryWeight: { value: '', isValid: true, invalidFeedback: '' }
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({});

  const handleChange = async event => {
    const { name: propName, value: propValue } = event.target;

    const validatedProp = await formValidation.validateOnChange(validationSchema, propName, propValue);

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
          label={key}
          name={key}
          value={formData[key].value}
          placeholder={`input ${key}`}
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

AirplaneAdd.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
};

export default AirplaneAdd;
