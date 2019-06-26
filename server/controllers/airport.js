const airportService = require('../services/airport');

const getAll = async params => await airportService.find(params);

const add = async airport => await airportService.add(airport);

module.exports = { getAll, add };
