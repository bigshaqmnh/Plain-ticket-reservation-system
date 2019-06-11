const airplaneService = require('../services/airplane');
const AirplaneResponse = require('../classes/AirplaneResponse');
const { dbError } = require('../constants/errors');

const getAll = async params => {
  try {
    const airplanes = await airplaneService.find(params);

    return new AirplaneResponse(false, airplanes);
  } catch (err) {
    return new AirplaneResponse(true, dbError.get);
  }
};

const getById = async ({ airplaneId }) => {
  try {
    const airplane = await airplaneService.findById(airplaneId);

    return new AirplaneResponse(false, airplane);
  } catch (err) {
    return new AirplaneResponse(true, dbError.get);
  }
};

const add = async airplane => {
  try {
    await airplaneService.add(airplane);

    return new AirplaneResponse();
  } catch (err) {
    return new AirplaneResponse(true, dbError.create);
  }
};

module.exports = { getAll, getById, add };
