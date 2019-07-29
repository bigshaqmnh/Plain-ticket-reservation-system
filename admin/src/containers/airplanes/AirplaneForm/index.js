/* eslint-disable */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';

import useFormData from '../../../hooks/useFormData';

import airplaneApi from '../../../api/airplane';

import { airplaneFormData } from '../../../constants/formDataSchemes';
import componentStyles from '../../../constants/componentStyles';
import { airplaneValidationScheme } from '../../../constants/validation/schemes';

import { AlertContext } from '../../../context/alert';

import formValidation from '../../../helpers/formValidation';
import formatFromCamelCase from '../../../helpers/formatters/formatString';
import extractFormData from '../../../helpers/extractFormData';

function AirplaneForm(props) {
  const { path, params } = match;

  const { setAlert, setShowAlert } = useContext(AlertContext);

  const {
    formData,
    setFormData,
    isShown,
    canEdit,
    handleBack,
    handleChange,
    handleAddItem,
    handleSaveClick
  } = useFormData({
    props,
    formDataScheme: airplaneFormData,
    validationScheme: airplaneValidationScheme,
    apiMethod: airplaneApi,
    setAlert,
    setShowAlert
  });

  // const handleBack = () => history.goBack();

  // const handleChange = async event => {
  //   const { name: propName, value: propValue } = event.target;

  //   const validatedProp = await formValidation.validateOnChange(airplaneValidationScheme, propName, propValue);

  //   setFormData({
  //     ...formData,
  //     ...validatedProp
  //   });
  // };

  // const handleAddItem = async data => {
  //   try {
  //     await airplaneApi.addAirplane(data);

  //     setAlert({
  //       variant: componentStyles.success,
  //       heading: 'Added',
  //       mainText: 'Airplane was successfully added.'
  //     });
  //   } catch (err) {
  //     setAlert({
  //       variant: componentStyles.error,
  //       heading: 'Not Added',
  //       mainText: 'An error occured while adding new airplane.'
  //     });
  //   } finally {
  //     setShowAlert(true);
  //     handleBack();
  //   }
  // };

  // const handleSaveClick = () => {
  //   const validatedForm = formValidation.validateOnSubmit(formData);

  //   if (!validatedForm.isValid) {
  //     setAlert(validatedForm.alertData);
  //     setShowAlert(true);
  //   } else {
  //     const data = extractFormData(formData);
  //     handleAddItem(data);
  //   }
  // };

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
