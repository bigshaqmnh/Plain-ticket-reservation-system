const airportService = require('../services/airport');

const getAll = params => airportService.find(params);

const add = airport => airportService.add(airport);

module.exports = { getAll, add };
