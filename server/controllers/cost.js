const costService = require('../services/cost');
const CostResponse = require('../classes/CostResponse');
const { dbError } = require('../constants/errors');

const getByFlightId = async ({ flightId }) => {
  try {
    const costs = await costService.findByAirplaneId(flightId);

    return new CostResponse(false, costs);
  } catch (err) {
    return new CostResponse(true, dbError.get);
  }
};

const add = async cost => {
  try {
    await costService.add(cost);

    return new CostResponse();
  } catch (err) {
    return new CostResponse(true, dbError.create);
  }
};

const update = async ({ id, cost }) => {
  try {
    await costService.update(id, cost);

    return new CostResponse();
  } catch (err) {
    return new CostResponse(true, dbError.update);
  }
};

module.exports = { getByFlightId, add, update };
