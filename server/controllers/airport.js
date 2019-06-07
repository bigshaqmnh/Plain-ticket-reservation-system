const airportService = require('../services/airport');
const AirportResponse = require('../classes/AirportResponse');
const { dbError } = require('../constants/errors');

const getAirports = async params => {
  const airports = await airportService.find(params);

  if (airports instanceof Error) {
    return new AirportResponse(true, dbError.get);
  }

  return new AirportResponse(false, airports);
};

const getAirportById = async ({ airportId }) => {
  const airport = await airportService.findById(airportId);

  if (airport instanceof Error) {
    return new AirportResponse(true, dbError.get);
  }

  return new AirportResponse(false, airport);
};

const addAirport = async airport => {
  const isCreated = await airportService.add(airport);

  if (isCreated instanceof Error) {
    return new AirportResponse(true, dbError.create);
  }

  return new AirportResponse();
};

module.exports = { getAirports, getAirportById, addAirport };
