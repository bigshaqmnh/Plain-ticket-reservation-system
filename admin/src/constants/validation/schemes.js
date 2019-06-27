import validate from './validators';

const authValidationScheme = {
  email: validate.email,
  password: validate.password
};

const airplaneValidationScheme = {
  name: validate.string,
  type: validate.airplaneType,
  maxLuggageCarryWeight: validate.number
};

const flightValidationScheme = {
  departureTime: validate.date,
  arrivalTime: validate.date,
  luggageOverweightCost: validate.number,
  isCancelled: validate.boolean,
  departureAirport: validate.number,
  arrivalAirport: validate.number,
  airplane: validate.number
};

export default { authValidationScheme, airplaneValidationScheme, flightValidationScheme };
