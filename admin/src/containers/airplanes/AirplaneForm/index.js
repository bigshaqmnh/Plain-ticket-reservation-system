import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';

import useFormData from '../../../hooks/useFormData';

import airplaneApi from '../../../api/airplane';

import { airplaneFormData } from '../../../constants/formDataSchemes';
import componentStyles from '../../../constants/componentStyles';
import { airplaneValidationScheme } from '../../../constants/validation/schemes';

import { AlertContext } from '../../../context/alert';

import formatFromCamelCase from '../../../helpers/formatters/formatString';

function AirplaneForm(props) {
  const { setAlert, setShowAlert } = useContext(AlertContext);

  const { formData, isShown, canEdit, handleBack, handleChange, handleSave } = useFormData({
    props,
    formDataScheme: airplaneFormData,
    validationScheme: airplaneValidationScheme,
    api: airplaneApi,
    setAlert,
    setShowAlert
  });

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
        {canEdit && <CustomButton variant={componentStyles.success} text="Save" onClick={() => handleSave(false)} />}
      </div>
    </div>
  ) : (
    <Spinner animation="border" />
  );
}

export default AirplaneForm;
