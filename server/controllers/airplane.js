const airplaneService = require('../services/airplane');

const getAll = params => airplaneService.find(params);

const add = airplane => airplaneService.add(airplane);

module.exports = { getAll, add };
