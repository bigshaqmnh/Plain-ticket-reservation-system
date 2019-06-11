const airportService = require('../services/airport');
const AirportResponse = require('../classes/AirportResponse');
const { dbError } = require('../constants/errors');

const getAll = async params => {
  try {
    const airports = await airportService.find(params);

    return new AirportResponse(false, airports);
  } catch (err) {
    return new AirportResponse(true, dbError.get);
  }
};

const getById = async ({ airportId }) => {
  try {
    const airport = await airportService.findById(airportId);

    return new AirportResponse(false, airport);
  } catch (err) {
    return new AirportResponse(true, dbError.get);
  }
};

const add = async airport => {
  try {
    await airportService.add(airport);

    return new AirportResponse();
  } catch (err) {
    return new AirportResponse(true, dbError.create);
  }
};

module.exports = { getAll, getById, add };
