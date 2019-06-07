const flightService = require('../services/flight');
const seatService = require('../services/seat');
const costService = require('../services/cost');
const airplaneService = require('../services/airplane');
const FlightResponse = require('../classes/FlightResponse');
const { dbError } = require('../constants/errors');

const getFlights = async params => {
  const flights = await flightService.find(params);

  if (flights instanceof Error) {
    return new FlightResponse(true, dbError.get);
  }

  return new FlightResponse(false, flights);
};

const getFlightsByParams = async params => {
  const flights = await flightService.findByParams(params);
  const flightsWithEnoughSeats = flights.filter(
    async flight => (await seatService.getNumberOfUnbooked(flight.airplaneId)) >= params.numOfPeople
  );

  const suitableFlights = flightsWithEnoughSeats.map(flight => {
    const minCost = await costService.findMinCostByFlightId(flight.id);
    const airplane = await airplaneService.findById(flight.airplaneId);

    return {
      ...flight,
      minCost,
      airplane
    }
  });
  

  if (flights instanceof Error) {
    return new FlightResponse(true, dbError.get);
  }

  return new FlightResponse(false, suitableFlights);
};

const getFlightById = async ({ flightId }) => {
  const flight = await flightService.findById(flightId);

  if (flight instanceof Error) {
    return new FlightResponse(true, dbError.get);
  }

  return new FlightResponse(false, flight);
};

const addFlight = async flight => {
  const isCreated = await flightService.add(flight);

  if (isCreated instanceof Error) {
    return new FlightResponse(true, dbError.create);
  }

  return new FlightResponse();
};

module.exports = { getFlights, getFlightsByParams, getFlightById, addFlight };
