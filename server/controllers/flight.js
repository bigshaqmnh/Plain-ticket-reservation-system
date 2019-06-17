const flightService = require('../services/flight');
const seatService = require('../services/seat');
const costService = require('../services/cost');
const CustomError = require('../classes/CustomError');

const getAll = async params => {
  try {
    const flights = await flightService.find(params);

    return flights;
  } catch (err) {
    throw err;
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

    return suitableFlights;
  } catch (err) {
    throw err instanceof CustomError ? err : new CustomError(err);
  }
};

const getById = async ({ flightId }) => {
  try {
    const flight = await flightService.findById(flightId);

    return flight;
  } catch (err) {
    throw err;
  }
};

const add = async flight => {
  try {
    await flightService.add(flight);
  } catch (err) {
    throw err;
  }
};

const update = async ({ id, flight }) => {
  try {
    await flightService.update(id, flight);
  } catch (err) {
    throw err;
  }
};

module.exports = { getAll, getAllByParams, getById, add, update };
