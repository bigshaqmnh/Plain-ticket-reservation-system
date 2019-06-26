const costService = require('../services/cost');

const getByFlightId = async flightId => await costService.findByFlightId(flightId);

const add = async cost => await costService.add(cost);

const update = async (id, cost) => await costService.update(id, cost);

module.exports = { getByFlightId, add, update };
