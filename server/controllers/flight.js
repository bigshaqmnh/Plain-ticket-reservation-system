const flightService = require('../services/flight');
const seatService = require('../services/seat');
const costService = require('../services/cost');
const CustomError = require('../classes/CustomError');

const getAll = async params => {
  try {
    if (Object.keys(params).length <= 3) {
      return await flightService.find(params);
    }

    const flights = await flightService.findByParams(params);
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
          departureAirport: suitableFlight.departureAirport.dataValues,
          arrivalAirport: suitableFlight.arrivalAirport.dataValues,
          airplane: suitableFlight.airplane.dataValues,
          minCost
        });
      }
    }

    return suitableFlights;
  } catch (err) {
    throw err instanceof CustomError ? err : new CustomError(err);
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

module.exports = { getAll, add, update };
