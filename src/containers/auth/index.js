import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import 'babel-polyfill';

import CustomButton from '../../components/customButton';
import CustomInput from '../../components/customInput';
import buttonVariants from '../../constants/button/buttonVariants';
import validationSchema from '../../constants/auth/validationSchema';

function AuthContainer() {
  const [userData, setUserData] = useState({
    email: { value: '', isValid: true, invalidFeedback: '' },
    password: { value: '', isValid: true, invalidFeedback: '' }
  });

  const handleSubmit = async event => {
    event.preventDefault();

    console.log('user data: ', userData);
  };

  const setDataValid = (propName, propValue) => {
    setUserData({
      ...userData,
      [propName]: {
        value: propValue,
        isValid: true,
        invalidFeedback: ''
      }
    });
  };

  const setDataInvalid = (propName, propValue, errorMsg) => {
    setUserData({
      ...userData,
      [propName]: {
        value: propValue,
        isValid: false,
        invalidFeedback: errorMsg
      }
    });
  };

  const handleChange = async event => {
    const { name: propName, value: propValue } = event.target;
    const formData = {
      [propName]: propValue
    };

    await validationSchema[propName]
      .validate(formData)
      .then(() => setDataValid(propName, propValue))
      .catch(error => setDataInvalid(propName, propValue, error.message));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CustomInput
        label="Email"
        type="text"
        name="email"
        value={userData.email.value}
        placeholder="Enter your email"
        invalidFeedback={userData.email.invalidFeedback}
        isValid={userData.email.isValid}
        onChange={handleChange}
      />
      <CustomInput
        label="Password"
        type="password"
        name="password"
        value={userData.password.value}
        placeholder="Enter your password"
        invalidFeedback={userData.password.invalidFeedback}
        isValid={userData.password.isValid}
        onChange={handleChange}
      />
      <CustomButton variant={buttonVariants.default} type="submit" text="Log in" />
    </Form>
  );
}

export default AuthContainer;
