const costService = require('../services/cost');

const getByFlightId = flightId => costService.findByFlightId(flightId);

const add = cost => costService.add(cost);

const update = (id, cost) => costService.update(id, cost);

module.exports = { getByFlightId, add, update };
