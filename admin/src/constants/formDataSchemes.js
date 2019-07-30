export const airplaneFormData = {
  name: '',
  type: '',
  maxLuggageCarryWeight: ''
};

export const airportFormData = {
  name: '',
  country: '',
  city: '',
  latitude: 0,
  longitude: 0
};

export const flightFormData = {
  departureTime: new Date(),
  arrivalTime: new Date(),
  luggageOverweightCost: '',
  isCancelled: false,
  departureAirportId: 0,
  arrivalAirportId: 0,
  airplaneId: 0
};
