import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import 'babel-polyfill';

import CustomButton from '../../components/customButton';
import CustomInput from '../../components/customInput';
import CustomAlert from '../../components/customAlert';
import componentStyle from '../../constants/componentStyles';
import validationSchema from '../../constants/auth/validationSchema';
import defaultAlertData from '../../constants/alert/default';
import alertText from '../../constants/alert/alertType';

import { authApi } from '../../api';

function AuthContainer() {
  const [formData, setFormData] = useState({
    email: { value: '', isValid: true, invalidFeedback: '' },
    password: { value: '', isValid: true, invalidFeedback: '' }
  });

  const [alertData, setAlertData] = useState(defaultAlertData);

  const validateForm = async () => {
    let { isShown, heading, mainText } = defaultAlertData;
    let isValid = true;
    const { email, password } = formData;
    const isEmpty = !email.value || !password.value;
    const isInvalid = !email.isValid || !password.isValid;

    if (isEmpty || isInvalid) {
      const textType = isEmpty ? 'emptyInput' : 'invalidInput';
      const { heading: headingText, mainText: pyz } = alertText[textType];
      isShown = true;
      heading = headingText;
      mainText = pyz;
      isValid = false;
    }

    await setAlertData({
      isShown,
      heading,
      mainText
    });

    return isValid;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const isFormValid = await validateForm();

    if (isFormValid) {
      const { email, password } = formData;
      authApi.logIn({ email: email.value, password: password.value });
    }
  };

  const handleAlertDismiss = () =>
    setAlertData({
      ...alertData,
      isShown: false
    });

  const setDataValid = (propName, propValue) => {
    setFormData({
      ...formData,
      [propName]: {
        value: propValue,
        isValid: true,
        invalidFeedback: ''
      }
    });
  };

  const setDataInvalid = (propName, propValue, errorMsg) => {
    setFormData({
      ...formData,
      [propName]: {
        value: propValue,
        isValid: false,
        invalidFeedback: errorMsg
      }
    });
  };

  const handleChange = async event => {
    const { name: propName, value: propValue } = event.target;

    try {
      await validationSchema[propName].validate({
        [propName]: propValue
      });

      setDataValid(propName, propValue);
    } catch (err) {
      setDataInvalid(propName, propValue, err.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <CustomInput
          label="Email"
          type="text"
          name="email"
          value={formData.email.value}
          placeholder="Enter your email"
          invalidFeedback={formData.email.invalidFeedback}
          isValid={formData.email.isValid}
          onChange={handleChange}
        />
        <CustomInput
          label="Password"
          type="password"
          name="password"
          value={formData.password.value}
          placeholder="Enter your password"
          invalidFeedback={formData.password.invalidFeedback}
          isValid={formData.password.isValid}
          onChange={handleChange}
        />
        <CustomButton variant={componentStyle.default} type="submit" text="Log in" />
      </Form>
      {alertData.isShown && (
        <CustomAlert
          variant={componentStyle.error}
          heading={alertData.heading}
          mainText={alertData.mainText}
          handleDismiss={handleAlertDismiss}
        />
      )}
    </Container>
  );
}

export default AuthContainer;
