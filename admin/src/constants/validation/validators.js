import * as yup from 'yup';

import invalidText from './invalidText';
import regexPattern from './regexPatterns';
import * as config from '../../config/config.json';

const string = yup.object().shape({
  name: yup
    .string()
    .required(invalidText.required)
    .trim()
});

const number = yup.object().shape({
  maxLuggageCarryWeight: yup
    .string()
    .required(invalidText.required)
    .test('isNumber', invalidText.notNumber, value => regexPattern.number.test(value))
});

const boolean = yup.object().shape({
  type: yup.boolean()
});

const date = yup.object().shape({
  name: yup.date().required(invalidText.required)
});

const email = yup.object().shape({
  email: yup
    .string()
    .required(invalidText.requiredEmail)
    .trim()
    .test('isEmailValid', invalidText.invalidEmail, value => regexPattern.email.test(value))
});

const password = yup.object().shape({
  password: yup
    .string()
    .required(invalidText.requiredPassword)
    .trim()
    .min(config.minPasswordLength, invalidText.short)
});

const airplaneType = yup.object().shape({
  type: yup
    .string()
    .required(invalidText.required)
    .trim()
    .max(config.maxAirplaneTypeLength, invalidText.long)
});

export default {
  string,
  number,
  boolean,
  date,
  email,
  password,
  airplaneType
};
