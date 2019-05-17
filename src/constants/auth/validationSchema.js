import * as yup from 'yup';

import infoText from '../infoText';
import regex from '../regex';

const validateEmail = yup.object().shape({
  email: yup
    .string()
    .required(infoText.requiredEmail)
    .trim()
    .test('isEmailValid', infoText.invalidEmail, value =>
      regex.email.test(value)
    )
});

const validatePassword = yup.object().shape({
  password: yup
    .string()
    .required(infoText.requiredPassword)
    .trim()
    .min(6, infoText.short)
});

const validationSchema = {
  email: validateEmail,
  password: validatePassword
};

export default validationSchema;
