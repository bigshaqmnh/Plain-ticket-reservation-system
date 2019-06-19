const airportService = require('../services/airport');

const getAll = async params => {
  try {
    const airports = await airportService.find(params);

    return airports;
  } catch (err) {
    throw err;
  }
};

const add = async airport => {
  try {
    await airportService.add(airport);
  } catch (err) {
    throw err;
  }
};

module.exports = { getAll, add };
