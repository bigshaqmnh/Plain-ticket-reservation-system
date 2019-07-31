const airportService = require('../services/airport');

const getAll = params => airportService.find(params);

const getById = async airportId => {
  const airport = await airportService.findById(airportId);

  return { data: airport };
};

const add = async airport => {
  const { id, name, country, city, latitude, longitude } = await airportService.add(airport);

  return { id, name, country, city, latitude, longitude };
};

module.exports = { getAll, getById, add };
