const luggageOptionService = require('../services/luggageOption');

const getAll = async () => {
  try {
    const luggageOptions = await luggageOptionService.find();

    return luggageOptions;
  } catch (err) {
    throw err;
  }
};

const getById = async ({ luggageOptionId }) => {
  try {
    const luggageOption = await luggageOptionService.findById(luggageOptionId);

    return luggageOption;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAll, getById };
