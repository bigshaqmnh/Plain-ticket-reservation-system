const flightService = require('../services/flight');
const seatService = require('../services/seat');
const costService = require('../services/cost');

const getAll = async params => await flightService.find(params);

const getByParams = async params => {
  const { data: flights, nextPage } = await flightService.findByParams(params);

  if (!flights) return;

  const airplaneIds = flights.map(flight => flight.airplaneId);

  const airplanesWithUnbookedSeats = await seatService.getNumberOfUnbooked(airplaneIds);

  const suitableFlights = [];

  for (const airplane of airplanesWithUnbookedSeats) {
    const numOfPeople = params.numOfPeople || 1;

    if (airplane.numberOfUnbookedSeats >= numOfPeople) {
      const suitableFlight = flights.find(flight => flight.airplaneId === airplane.airplaneId);
      const minCost = await costService.findMinCostByFlightId(suitableFlight.id);

      suitableFlights.push({
        ...suitableFlight,
        minCost
      });
    }
  }

  return nextPage ? { data: suitableFlights, nextPage } : { data: suitableFlights };
};

const add = async flight => await flightService.add(flight);

const update = async (id, flight) => await flightService.update(id, flight);

module.exports = { getAll, getByParams, add, update };
