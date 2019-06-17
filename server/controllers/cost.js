const costService = require('../services/cost');

const getByFlightId = async ({ flightId }) => {
  try {
    const costs = await costService.findByAirplaneId(flightId);

    return costs;
  } catch (err) {
    throw err;
  }
};

const add = async cost => {
  try {
    await costService.add(cost);
  } catch (err) {
    throw err;
  }
};

const update = async ({ id, cost }) => {
  try {
    await costService.update(id, cost);
  } catch (err) {
    throw err;
  }
};

module.exports = { getByFlightId, add, update };
