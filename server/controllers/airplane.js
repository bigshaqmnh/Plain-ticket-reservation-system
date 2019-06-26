const airplaneService = require('../services/airplane');

const getAll = async params => await airplaneService.find(params);

const add = async airplane => await airplaneService.add(airplane);

module.exports = { getAll, add };
