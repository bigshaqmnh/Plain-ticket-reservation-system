import validate from './validators';

export const authValidationScheme = {
  email: validate.email,
  password: validate.password
};

export const airplaneValidationScheme = {
  name: validate.string,
  type: validate.airplaneType,
  maxLuggageCarryWeight: validate.number
};

export const flightValidationScheme = {
  departureTime: validate.date,
  arrivalTime: validate.date,
  luggageOverweightCost: validate.number,
  isCancelled: validate.boolean,
  departureAirport: validate.number,
  arrivalAirport: validate.number,
  airplane: validate.number
};
