import * as yup from 'yup';

import validationText from '../validationText';
import ValidationRegexPatterns from '../validationRegexPatterns';
import { maxAirplaneTypeLength } from '../common';

const validateName = yup.object().shape({
  name: yup
    .string()
    .required(validationText.required)
    .trim()
});

const validateType = yup.object().shape({
  type: yup
    .string()
    .required(validationText.required)
    .trim()
    .max(maxAirplaneTypeLength, validationText.long)
});

const validateMaxLuggageCarryWeight = yup.object().shape({
  maxLuggageCarryWeight: yup
    .string()
    .required(validationText.required)
    .test('isNumber', validationText.notNumber, value => ValidationRegexPatterns.number.test(value))
});

const validationSchema = {
  name: validateName,
  type: validateType,
  maxLuggageCarryWeight: validateMaxLuggageCarryWeight
};

export default validationSchema;
