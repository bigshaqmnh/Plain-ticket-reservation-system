import * as yup from 'yup';

import validationText from '../validationText';
import * as config from '../../config/config.json';
import ValidationRegexPatterns from '../validationRegexPatterns';

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
    .max(config.maxAirplaneTypeLength, validationText.long)
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
