const airplaneService = require('../services/airplane');
const AirplaneResponse = require('../classes/AirplaneResponse');
const { dbError } = require('../constants/errors');

const getAirplanes = async params => {
  console.log('params: ', params);
  const airplanes = await airplaneService.find(params);

  if (airplanes instanceof Error) {
    return new AirplaneResponse(true, dbError.get);
  }

  return new AirplaneResponse(false, airplanes);
};

const getAirplaneById = async ({ airplaneId }) => {
  const airplane = await airplaneService.findById(airplaneId);

  if (airplane instanceof Error) {
    return new AirplaneResponse(true, dbError.get);
  }

  return new AirplaneResponse(false, airplane);
};

const addAirplane = async airplane => {
  const isCreated = await airplaneService.add(airplane);

  if (isCreated instanceof Error) {
    return new AirplaneResponse(true, dbError.create);
  }

  return new AirplaneResponse();
};

module.exports = { getAirplanes, getAirplaneById, addAirplane };
