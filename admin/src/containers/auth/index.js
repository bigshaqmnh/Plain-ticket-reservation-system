import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Container } from 'react-bootstrap';
import 'babel-polyfill';

import CustomButton from '../../components/customButton';
import CustomInput from '../../components/customInput';
import CustomAlert from '../../components/customAlert';

import authApi from '../../api/auth';

import componentStyles from '../../constants/componentStyles';
import { authValidationScheme } from '../../constants/validation/schemes';

import formValidation from '../../helpers/formValidation';
import { saveUserToken } from '../../helpers/token';

import emailSvg from '../../assets/img/email.svg';
import passwordSvg from '../../assets/img/password.svg';

import './style.scss';

function AuthContainer(props) {
  const { history } = props;

  const [formData, setFormData] = useState({
    email: { value: '', isValid: true, invalidFeedback: '' },
    password: { value: '', isValid: true, invalidFeedback: '' }
  });

  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = async event => {
    const { name: propName, value: propValue } = event.target;

    const validatedProp = await formValidation.validateOnChange(authValidationScheme, propName, propValue);

    setFormData({
      ...formData,
      ...validatedProp
    });
  };

  const logIn = async data => {
    try {
      const { data: token } = await authApi.logIn(data);

      saveUserToken(token);

      history.replace('/');
    } catch (err) {
      setAlert({
        variant: componentStyles.error,
        heading: 'Unable to Log In',
        mainText: 'Please, check your credentials.',
        isShown: setShowAlert
      });
    } finally {
      setShowAlert(true);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validatedForm = formValidation.validateOnSubmit(formData);

    if (!validatedForm.isValid) {
      setAlert({ ...validatedForm.alertData, isShown: setShowAlert });
      setShowAlert(true);
    } else {
      const data = {
        email: formData.email.value,
        password: formData.password.value
      };
      logIn(data);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="auth-form">
        <h2>Please, Log In.</h2>
        <div className="email-input">
          <img src={emailSvg} alt="" />
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
        </div>
        <div className="password-input">
          <img src={passwordSvg} alt="" />
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
        </div>
        <CustomButton type="submit" text="Log in" />
      </Form>
      {showAlert && <CustomAlert {...alert} />}
    </Container>
  );
}

AuthContainer.propTypes = {
  history: PropTypes.shape({}).isRequired
};

export default AuthContainer;
