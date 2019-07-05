/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';
import CustomAlert from '../../../components/customAlert';

import useAlert from '../../../hooks/useAlert';

import componentStyles from '../../../constants/componentStyles';
import { flightValidationScheme } from '../../../constants/validation/schemes';

import formValidation from '../../../helpers/formValidation';
import stringFormatter from '../../../helpers/stringFormatter';
import extractFormData from '../../../helpers/extractFormData';

function FlightAdd(props) {
  const { handleSave, handleBack } = props;

  const [formData, setFormData] = useState({
    departureTime: { value: new Date() },
    arrivalTime: { value: new Date() },
    luggageOverweightCost: { value: '', isValid: true, invalidFeedback: '' },
    isCancelled: { value: false },
    departureAirport: { value: '', isValid: true, invalidFeedback: '' },
    arrivalAirport: { value: '', isValid: true, invalidFeedback: '' },
    airplane: { value: '', isValid: true, invalidFeedback: '' }
  });

  const { alert, setAlert, showAlert, setShowAlert } = useAlert();

  const genDateHandler = key => (date, modifiers, event) => {
    console.log('event: ', event.target);
    setFormData({
      ...formData,
      [key]: { value: date }
    });
  };

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
      const data = extractFormData(formData);
      handleSave(data);
    }
  };

  return (
    <>
      {Object.keys(formData).map(key => {
        const { value, isValid, invalidFeedback } = formData[key];
        let component = null;

        if (value instanceof Date) {
          const modifiers = {
            selected: value,
            disabled: { before: key === 'departureTime' ? new Date() : formData.departureTime.value }
          };
          const handleDateChange = genDateHandler(key);

          component = (
            <div key={key} name={key}>
              <CustomInput label={stringFormatter.toRegular(key)} name={key} value={value.toDateString()} />
              <DayPicker modifiers={modifiers} onDayClick={handleDateChange} />
            </div>
          );
        } else if (typeof value === 'boolean') {
          component = (
            <CustomInput
              key={key}
              label={stringFormatter.toRegular(key)}
              name={key}
              as="select"
              options={['No', 'Yes']}
            />
          );
        } else {
          component = (
            <CustomInput
              key={key}
              label={stringFormatter.toRegular(key)}
              name={key}
              value={value}
              placeholder={`Input ${stringFormatter.toRegular(key)}`}
              onChange={handleChange}
              isValid={isValid}
              invalidFeedback={invalidFeedback}
            />
          );
        }

        return component;
      })}
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
