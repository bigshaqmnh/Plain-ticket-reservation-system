import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import 'babel-polyfill';

import CustomButton from '../../components/customButton';
import CustomInput from '../../components/customInput';
import buttonVariants from '../../constants/button/buttonVariants';
import placeholders from '../../constants/placeholders';
import authSchema from '../../constants/auth/authSchema';

function AuthContainer() {
  const [userData, setUserData] = useState({
    email: { value: '', isValid: true, invalidFeedback: '' },
    password: { value: '', isValid: true, invalidFeedback: '' }
  });

  const handleSubmit = async event => {
    event.preventDefault();
    await authSchema
      .validate(userData)
      .then(() => console.log('form data', userData))
      .catch(error => {
        const { path: propName, message: errorMsg } = error;

        setUserData({
          ...userData,
          [propName]: {
            ...userData[propName],
            isValid: false,
            invalidFeedback: errorMsg
          }
        });

        console.log('after error', userData);
      });
  };

  const handleChange = async event => {
    const { name: propName, value: propValue } = event.target;

    await setUserData({
      ...userData,
      [propName]: { ...userData[propName], value: propValue }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CustomInput
        label="Email"
        type="text"
        name="email"
        value={userData.email.value}
        placeholder={placeholders.email}
        invalidFeedback={userData.email.invalidFeedback}
        isValid={userData.email.isValid}
        onChange={handleChange}
      />
      <CustomInput
        label="Password"
        type="password"
        name="password"
        value={userData.password.value}
        placeholder={placeholders.password}
        invalidFeedback={userData.password.invalidFeedback}
        isValid={userData.password.isValid}
        onChange={handleChange}
      />
      <CustomButton
        variant={buttonVariants.default}
        type="submit"
        text="Log in"
      />
    </Form>
  );
}

export default AuthContainer;
