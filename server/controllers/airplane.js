const airplaneService = require('../services/airplane');
const CustomError = require('../classes/CustomError');

const getAll = async params => {
  try {
    const airplanes = await airplaneService.find(params);

    return airplanes;
  } catch (err) {
    return new CustomError(false, err.message);
  }
};

const getById = async ({ airplaneId }) => {
  try {
    const airplane = await airplaneService.findById(airplaneId);

    return airplane;
  } catch (err) {
    return new CustomError(false, err.message);
  }
};

const add = async airplane => {
  try {
    return await airplaneService.add(airplane);
  } catch (err) {
    return new CustomError(false, err.message);
  }
};

module.exports = { getAll, getById, add };
