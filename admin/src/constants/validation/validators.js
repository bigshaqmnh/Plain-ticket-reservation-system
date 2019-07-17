import * as yup from 'yup';

import invalidText from './invalidText';
import regexPattern from './regexPatterns';
import { minPasswordLength, maxAirplaneTypeLength } from '../common';

const string = yup
  .string()
  .required(invalidText.required)
  .trim();

const number = yup
  .number()
  .required(invalidText.required)
  .typeError(invalidText.notNumber);

const boolean = yup.boolean();

const date = yup.date().required(invalidText.required);

const email = yup
  .string()
  .required(invalidText.requiredEmail)
  .trim()
  .test('isEmailValid', invalidText.invalidEmail, value => regexPattern.email.test(value));

const password = yup
  .string()
  .required(invalidText.requiredPassword)
  .trim()
  .min(minPasswordLength, invalidText.short);

const airplaneType = yup
  .string()
  .required(invalidText.required)
  .trim()
  .max(maxAirplaneTypeLength, invalidText.long);

export default {
  string,
  number,
  boolean,
  date,
  email,
  password,
  airplaneType
};
