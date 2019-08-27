const flightService = require('../services/flight');
const seatService = require('../services/seat');
const costService = require('../services/cost');

const getAll = params => flightService.find(params);

const getById = async flightId => {
  const flight = await flightService.findById(flightId);

  return { data: flight };
};

const getByParams = async params => {
  const { data: flights, nextPage } = await flightService.findByParams(params);

  if (!flights.length) {
    return;
  }

  const airplaneIds = flights.map(flight => flight.airplaneId);

  const airplanesWithUnbookedSeats = await seatService.getNumberOfUnbooked(airplaneIds);

  const suitableFlights = [];

  for (const airplane of airplanesWithUnbookedSeats) {
    const numberOfPassengers = params.numberOfPassengers || 1;

    if (airplane.numberOfUnbookedSeats >= numberOfPassengers) {
      const suitableFlight = flights.find(flight => flight.airplaneId === airplane.airplaneId);
      const minCost = await costService.findMinCostByFlightId(suitableFlight.id);

      suitableFlights.push({
        ...suitableFlight,
        minCost
      });
    }
  }

  if (!suitableFlights.length) {
    return;
  }

  return nextPage ? { data: suitableFlights, nextPage } : { data: suitableFlights };
};

const add = flight => flightService.add(flight);

const update = (id, flight) => flightService.update(id, flight);

module.exports = { getAll, getById, getByParams, add, update };
