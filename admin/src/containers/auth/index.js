import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Container } from 'react-bootstrap';
import 'babel-polyfill';

import CustomButton from '../../components/customButton';
import CustomInput from '../../components/customInput';

import useFormData from '../../hooks/useFormData';

import { AlertContext } from '../../context/alert';
import { UserContext } from '../../context/user';

import authApi from '../../api/auth';
import userApi from '../../api/user';

import { authFormData } from '../../constants/formDataSchemes';
import componentStyles from '../../constants/componentStyles';
import { authValidationScheme } from '../../constants/validation/schemes';
import handlerOption from '../../constants/handlerOptions';

import { saveUserToken } from '../../helpers/token';

import emailSvg from '../../assets/img/email.svg';
import passwordSvg from '../../assets/img/password.svg';

import './style.scss';

function AuthContainer(props) {
  const { history } = props;

  const { setAlert, setShowAlert } = useContext(AlertContext);

  const { updateUser } = useContext(UserContext);

  const { formData, isShown, handleChange, handleSave: handleSubmit } = useFormData({
    props,
    formDataScheme: authFormData,
    validationScheme: authValidationScheme,
    api: userApi,
    setAlert,
    setShowAlert
  });

  const logIn = async data => {
    try {
      const { data: token } = await authApi.logIn(data);

      saveUserToken(token);

      const { data: user } = await userApi.getInfo();

      updateUser(user);

      history.replace('/');
    } catch (err) {
      setAlert({
        variant: componentStyles.error,
        heading: 'Unable to Log In',
        mainText: 'Please, check your credentials.'
      });
      setShowAlert(true);
    }
  };

  return (
    isShown && (
      <Container>
        <Form className="auth-form">
          <h2>Please, Log In.</h2>
          <div className="email-input">
            <img src={emailSvg} alt="" />
            <CustomInput
              label="Email"
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
          <LinkContainer to="/">
            <CustomButton text="Log in" onClick={() => handleSubmit(handlerOption.LOG_IN, { logIn })} />
          </LinkContainer>
        </Form>
      </Container>
    )
  );
}

AuthContainer.propTypes = {
  history: PropTypes.shape({}).isRequired
};

export default AuthContainer;
