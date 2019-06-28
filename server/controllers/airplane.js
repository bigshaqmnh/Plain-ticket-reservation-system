const airplaneService = require('../services/airplane');

const getAll = params => airplaneService.find(params);

const add = async airplane => {
  const { id, name, type, maxLuggageCarryWeight } = await airplaneService.add(airplane);

  return { id, name, type, maxLuggageCarryWeight };
};

module.exports = { getAll, add };
