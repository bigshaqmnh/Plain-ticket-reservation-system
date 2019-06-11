const flightService = require('../services/flight');
const seatService = require('../services/seat');
const costService = require('../services/cost');
const FlightResponse = require('../classes/FlightResponse');
const { dbError } = require('../constants/errors');

const getAll = async params => {
  try {
    const flights = await flightService.find(params);

    return new FlightResponse(false, flights);
  } catch (err) {
    return new FlightResponse(true, dbError.get);
  }
};

const getAllByParams = async params => {
  try {
    const flights = await flightService.findByParams(params);
    const suitableFlights = [];

    for (const flight of flights) {
      const numOfUnbookedSeats = await seatService.getNumberOfUnbooked(flight.airplaneId);
      const numOfPeople = params.numOfPeople || 1;

      if (numOfUnbookedSeats >= numOfPeople) {
        const minCost = await costService.findMinCostByFlightId(flight.id);

        suitableFlights.push({
          ...flight,
          departureAirport: flight.departureAirport.dataValues,
          arrivalAirport: flight.arrivalAirport.dataValues,
          airplane: flight.airplane.dataValues,
          minCost
        });
      }
    }

    return new FlightResponse(false, suitableFlights);
  } catch (err) {
    return new FlightResponse(true, dbError.get);
  }
};

const getById = async ({ flightId }) => {
  try {
    const flight = await flightService.findById(flightId);

    return new FlightResponse(false, flight);
  } catch (err) {
    return new FlightResponse(true, dbError.get);
  }
};

const add = async flight => {
  try {
    await flightService.add(flight);

    return new FlightResponse();
  } catch (err) {
    return new FlightResponse(true, dbError.create);
  }
};

const update = async ({ id, flight }) => {
  try {
    await flightService.update(id, flight);

    return new FlightResponse();
  } catch (err) {
    return new FlightResponse(true, dbError.update);
  }
};

module.exports = { getAll, getAllByParams, getById, add, update };
