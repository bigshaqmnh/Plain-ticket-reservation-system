import * as yup from 'yup';

import validate from './validators';

const genValidationScheme = (propName, validator) => yup.object().shape({ [propName]: validator });

export const authValidationScheme = {
  email: genValidationScheme('email', validate.email),
  password: genValidationScheme('password', validate.password)
};

export const airplaneValidationScheme = {
  name: genValidationScheme('name', validate.string),
  type: genValidationScheme('type', validate.airplaneType),
  maxLuggageCarryWeight: genValidationScheme('maxLuggageCarryWeight', validate.number)
};

export const airportValidationScheme = {
  name: genValidationScheme('name', validate.string),
  country: genValidationScheme('country', validate.string),
  city: genValidationScheme('city', validate.string),
  latitude: genValidationScheme('latitude', validate.number),
  longitude: genValidationScheme('longitude', validate.number)
};

export const flightValidationScheme = {
  departureTime: genValidationScheme('departureTime', validate.date),
  arrivalTime: genValidationScheme('arrivalTime', validate.date),
  luggageOverweightCost: genValidationScheme('luggageOverweightCost', validate.number),
  isCancelled: genValidationScheme('isCancelled', validate.boolean),
  departureAirport: genValidationScheme('departureAirport', validate.number),
  arrivalAirport: genValidationScheme('arrivalAirport', validate.number),
  airplane: genValidationScheme('airplane', validate.number)
};

export const accountValidationScheme = {
  username: genValidationScheme('username', validate.string)
};
