import * as yup from 'yup';

import infoText from '../infoText';
import regex from './regex';

const authSchema = yup.object().shape({
  email: yup
    .string()
    .required(infoText.requiredEmail)
    .trim()
    .max(30, infoText.long)
    .matches(regex.email, infoText.invalidEmail),
  password: yup
    .string()
    .required(infoText.requiredPassword)
    .trim()
    .min(6, infoText.short)
    .max(16, infoText.long)
    .matches(regex.password, infoText.invalidPassword)
});

export default authSchema;
