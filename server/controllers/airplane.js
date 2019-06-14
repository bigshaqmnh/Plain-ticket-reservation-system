const airplaneService = require('../services/airplane');
const ControllerError = require('../classes/ControllerError');
const ServiceError = require('../classes/ServiceError');

const getAll = async params => {
  try {
    const airplanes = await airplaneService.find(params);

    return airplanes;
  } catch (err) {
    throw err instanceof ServiceError ? err : new ControllerError(err.message);
  }
};

const getById = async ({ airplaneId }) => {
  try {
    const airplane = await airplaneService.findById(airplaneId);

    return airplane;
  } catch (err) {
    throw err instanceof ServiceError ? err : new ControllerError(err.message);
  }
};

const add = async airplane => {
  try {
    await airplaneService.add(airplane);
  } catch (err) {
    throw err instanceof ServiceError ? err : new ControllerError(err.message);
  }
};

module.exports = { getAll, getById, add };
