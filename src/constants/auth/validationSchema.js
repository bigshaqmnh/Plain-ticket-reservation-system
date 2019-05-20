import * as yup from 'yup';

import validationText from '../validationText';
import { minPasswordLength } from '../../config';
import regex from '../regex';

const validateEmail = yup.object().shape({
  email: yup
    .string()
    .required(validationText.requiredEmail)
    .trim()
    .test('isEmailValid', validationText.invalidEmail, value => regex.email.test(value))
});

const validatePassword = yup.object().shape({
  password: yup
    .string()
    .required(validationText.requiredPassword)
    .trim()
    .min(minPasswordLength, validationText.short)
});

const validationSchema = {
  email: validateEmail,
  password: validatePassword
};

export default validationSchema;
