const airplaneService = require('../services/airplane');

const getAll = async params => {
  try {
    const airplanes = await airplaneService.find(params);

    return airplanes;
  } catch (err) {
    throw err;
  }
};

const add = async airplane => {
  try {
    await airplaneService.add(airplane);
  } catch (err) {
    throw err;
  }
};

module.exports = { getAll, add };
